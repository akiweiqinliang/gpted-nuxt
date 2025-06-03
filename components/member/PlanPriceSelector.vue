<template>
  <div class="container">
    <div class="upper">
    <h2 class="headerTitle">Get Pro Plan</h2>
    <RadioGroup v-model="type" class="group">
    <div class="monthly" :class="{ 'active' : type === 'monthly' }" @click="handleChangeType('monthly')">
      <div>
        <p>Monthly</p>
        <span>$ 360</span>
      </div>
      <Radio label="monthly"><span></span></Radio>
    </div>
    <div class="yearly" :class="{ 'active' : type === 'yearly' }" @click="handleChangeType('yearly')">
      <div>
        <p>Yearly</p>
        <span class="discount">$ 4230</span><span>$ 3600</span>
      </div>
      <Radio label="yearly"><span></span></Radio>
    </div>
    </RadioGroup>
    </div>
    <div class="footer">
      <span v-dompurify-html="tips"></span>
      <Button type="primary" long class="confirmBtn" @click="handleConfirm">Get Pro Plan <Icon type="ios-arrow-round-forward" /></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanPriceSelector",
  data() {
    return {
      type: "monthly", // Default selected plan
      tips: `By subscribing to your plan, you agree to the <span class="priceHighlight">Terms of Service</span> and <span class="priceHighlight">Privacy Policy</span>.`
    };
  },
  methods: {
    handleChangeType(type) {
      this.type = type;
    },
    handleConfirm() {
      this.$emit("change", this.type); // Emit the selected type to parent component
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.upper{
  flex-grow: 1;
  .headerTitle{
    font-size: 20px;
  }
  .group{
    width: 100%;
    margin-top: 20px;
  }
  .monthly, .yearly {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 36px 22px 24px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;

    p {
      font-weight: bold;
      margin-bottom: 12px;
    }

    span {
      color: #FFB803;
      font-weight: bold;
    }

    .discount {
      text-decoration: line-through;
      color: #D1D1D1;
      margin-right: 5px;
    }

  }
  .yearly{
    position: relative;
    margin-top: 24px;
    &::after {
      content: '-30%';
      position: absolute;
      top: -7px;
      right: -10px;
      font-size: 14px;
      padding: 0 8px;
      background: #F6FFEE;
      color: #57C22D;
      z-index: 1;
      border-radius: 40px 40px 40px 40px;
      border: 1px solid #57C22D;
    }
  }
  .active{
    background: var(--primary-bg-color3);
    border: 1px solid var(--primary-color);
  }

}
.footer{
  span{
    font-size: 12px;
    color: var(--text-color3);
  }
  .confirmBtn{
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    margin-top: 16px;
    height: auto;
  }
}
</style>
<style>

.priceHighlight{
  color: var(--primary-color);
}
</style>
