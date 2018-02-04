<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">구매 정보</h2>
      <div class="container">
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <td>가격</td>
              <td>{{priceWithCommas}} 원</td>
            </tr>
            <tr>
              <td>결제 방법</td>
              <td>{{item.payment_method}}</td>
            </tr>
            <tr>
              <td>기한</td>
              <td>{{item.deadline}} 까지</td>
            </tr>
            <tr>
              <td>배송일</td>
              <td>{{item.delivery_date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    computed: {
      ...mapGetters({
        item: 'item/getItem',
      }),
      priceWithCommas() {
        return this.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
  };
</script>
