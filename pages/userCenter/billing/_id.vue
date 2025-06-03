<template>
<div>
  <Card class="firstCard">
    <Row justify="space-between" align="middle">
      <span class="title">Order<span class="id">{{ billId }}</span></span>
      <Button icon="md-paper">Invoice</Button>
    </Row>
  </Card>
  <Card class="secondCard" :padding="0">
    <ul>
      <li>
        <span>State</span> <span :class="stateMap[bill.state].className">{{ stateMap[bill.state].text }}</span>
      </li>
      <li>
        <span>Product type</span> <span>{{ bill.productType }}</span>
      </li>
      <li>
        <span>Order number</span> <span>{{ bill.orderNumber }}</span>
      </li>
      <li>
        <span>Amount</span> <span>{{ bill.amount }}</span>
      </li>
      <li>
        <span>Payment method</span> <span>{{ bill.paymentMethod }}</span>
      </li>
      <li>
        <span>Payee</span> <span>{{ bill.payee }}</span>
      </li>
      <li>
        <span>Order creation time</span> <span>{{ bill.orderCreationTime }}</span>
      </li>
      <li>
        <span>Payment time</span> <span>{{ bill.paymentTime }}</span>
      </li>
    </ul>
  </Card>
</div>
</template>

<script>
export default {
  name: "BillDetail",
  layout: 'userCenter',
  asyncData({ params }) {
    const billId = params.id
    return {
      billId,
    }
  },
  data() {
    return {
      stateMap: {
        0: {
          text: 'pay success',
          className: 'green'
        },
        1: {
          text: 'pay failed',
          className: 'red'
        },
      },
      bill: {
        state: 0,
        orderNumber: '123456789',
        productType: 'Premium Subscription',
        amount: '100.00',
        paymentMethod: 'Credit Card',
        orderCreationTime: 'Nov. 20, 2023 16:20:23',
        paymentTime: 'Nov. 20, 2023 16:20:24',
        payee: 'A certain technology limited company',

      }
    }
  }
}
</script>

<style scoped lang="scss">
.firstCard{
  .title, .id{
    font-size: 18px;
    color: var(--text-color2);
    font-weight: bold;
  }
  .id{
    color: var(--text-color1);
    margin-left: 16px;
  }
}
.secondCard{
  padding: 40px 50px;
  margin-top: 20px;
  .green{
    color: var(--success-color);
  }
  .red{
    color: var(--error-color);
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
    li{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      padding: 30px 0;
      &:last-child{
        border-bottom: none;
        padding-bottom: 0;
      }
      &:nth-child(1){
        padding-top: 0;
      }
      span{
        font-size: 14px;
        color: var(--text-color7);
        &:first-child{
          color: var(--text-color1);
          font-weight: bold;
          position: relative;
          padding-left: 12px;
        }
        &:first-child::after{
          content: '';
          position: absolute;
          left: 0;
          background: var(--primary-color);
          width: 4px;
          height: 16px;
          top: 2px;
        }
      }
    }
  }
}
</style>
