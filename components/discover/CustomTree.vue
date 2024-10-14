<template>
    <div class="elTree">
<!--      <tag v-for="(item,idx) in checkedList" :key="idx" closable @on-close="removeChecked(item)">-->
<!--        <span>{{item.label}}</span>-->
<!--      </tag>-->
      <Input
        v-model="filterText"
        search
        placeholder="输入关键字进行过滤">
      </Input>
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        accordion
        default-expand-all
        empty-text="暂无数据"
        node-key="id"
        :filter-node-method="filterNode"
        icon-class="el-icon-arrow-right"
        :render-content="renderContent"
        show-checkbox
        @check="handleCheck">
      </el-tree>
    </div>

</template>

<script>
export default {
  name: "CustomTree",
  props: {
    treeData: {
      required: true,
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      checkedList: [],
      filterText: '',
      treeData1: [
        {
          id: 0,
          label: 'All',
          children: [
            {
              id: 100,
              label: 'Africa',
              children:  [
                {
                  id: 1,
                  label: 'Albania1',
                  ISO: 'af'
                },
                {
                  id: 2,
                  label: 'Albania2',
                  ISO: 'ax'
                },
                {
                  id: 3,
                  label: 'Albania3',
                  ISO: 'al'
                },
                {
                  id: 4,
                  label: 'Albania4',
                  ISO: 'as'
                },
                {
                  id: 5,
                  label: 'Albania5',
                  ISO: 'ad'
                },
                {
                  id: 6,
                  label: 'Albania6',
                  ISO: 'eh'
                },
              ]
            },
            {
              id: 200,
              label: 'Europe',
              children:  [
                {
                  id: 7,
                  label: '2-Eur1',
                  ISO: 'af'
                },
                {
                  id: 8,
                  label: '2-Eur2',
                  ISO: 'ax'
                },
                {
                  id: 9,
                  label: '2-Eur3',
                  ISO: 'al'
                },
              ]
            },
            {
              id: 300,
              label: 'Asia',
              children:  [
                {
                  id: 10,
                  label: '3-Alb1',
                  ISO: 'as'
                },
                {
                  id: 11,
                  label: '3-Alb2',
                  ISO: 'ad'
                },
                {
                  id: 12,
                  label: '3-Alb3',
                  ISO: 'eh'
                },
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      value = value.toLowerCase();
      return data.label.toLowerCase().includes(value);
    },
    removeChecked(data){
      this.$refs.tree.setChecked(data.id,false, true);
      this.checkedList = this.checkedList.filter(item => item.id !== data.id);
      this.$emit('on-select', this.checkedList);
    },
    findTopLevelKeys(list) {
      const tree = this.$refs.tree;
      const res = list.reduce((acc, item) => {
        if (list.some(x => x.key === item.parentKey)) {
          acc.add(item.parentKey);
        }else {
          acc.add(item.key);
        }
        return acc;
      }, new Set());
      const keys = Array.from(res).map(item => ({key: item, parentKey: tree.getNode(item).parent.key}));

      const childKeys = keys.map(item => item.key);
      const parentKeys = keys.map(item => item.parentKey);

      if (childKeys.some(key => parentKeys.includes(key))){
        return this.findTopLevelKeys(keys);
      }else {
        return res;
      }
    },
    handleCheck(cur, data){
      const tree = this.$refs.tree;
      const allKeys = tree.getCheckedKeys();
      const list = allKeys.map(item => ({key: item, parentKey: tree.getNode(item).parent.key}))
      // 找到所有顶级节点的key值
      const topLevelKeys = this.findTopLevelKeys(list)
      // 将Set转换为数组
      const topLevelKeysArray = Array.from(topLevelKeys);
      this.checkedList = topLevelKeysArray.map(item => tree.getNode(item)).map(item => item.data)
      this.$emit('on-select', this.checkedList);
      },
    renderContent(h, { node, data, store }) {
      const selectedCount = node.childNodes.filter(item => item.checked).length
      return h('span', [
          h('span', {
            class: ['fi', `fi-${data.ISO}`],
            style: {
              display: data.ISO ? 'inline-block' : 'none',
              marginRight: '8px'
            }
          }),
          h('span', node.label),
          h('span', {class: 'active'}, node.level === 2 && selectedCount > 0 ? selectedCount : '')
        ]
      );
    }
    },
}
</script>

<style scoped>
.filter-tree{
  margin-top: 10px;
}
.filter-tree .active{
  color: var(--primary-color);
}
.tag{
  padding: 0 10px;
  border: 1px solid;
  margin: 10px 0;
}
</style>
