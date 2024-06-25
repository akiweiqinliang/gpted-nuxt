<template>
  <table class="bidTableStyle">
    <tbody>
      <tr>
        <td>{{ lang === 'zh' ? '日期' : 'Date' }}</td>
        <td>{{ bidDetailTable.date }}</td>
      </tr>
      <tr>
        <td>
          {{ lang === 'zh' ? '贷款编号和标题' : 'Loan Number And Title' }}
        </td>
        <td>{{ bidDetailTable.loan }}</td>
      </tr>
      <tr>
        <td>
          {{ lang === 'zh' ? '合同编号和标题' : 'Contract Number And Title' }}
        </td>
        <td>{{ bidDetailTable.contract }}</td>
      </tr>
      <tr>
        <td>
          {{
            lang === 'zh' ? '投标截止时间' : 'Deadline for Submission of Bids'
          }}
        </td>
        <td>{{ bidDetailTable.deadline }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TenderTable',
  props: {
    lang: {
      required: true,
      type: String,
      default() {
        return 'zh';
      },
    },
    bidDetailTable: {
      required: true,
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped lang="scss">
.bidTableStyle {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  td {
    border: 0.8px solid;
    padding: 15px 10px;
    min-width: 120px;
  }
}
</style>
