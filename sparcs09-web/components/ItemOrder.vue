<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">상품 구매</h2> 
      <div v-if="payments.payment_me.records">
        <p>이미 상품을 주문하셨습니다.</p>
        <br>
        <a class="button">주문 수정</a>
      </div>
      <div v-else>
        <record-form :option_categories="item.option_categories" :callback="addRecord"></record-form>
        <record-view v-for="(record, i) in records" :key="i" :index="i" :option_categories="item.option_categories" :record="record" :callback="removeRecord"></record-view>
        <a class="button" @click="registerPaymentToItem()">주문</a>
      </div>
      <hr>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex';

  import RecordForm from '~/components/forms/RecordForm.vue';
  import RecordView from '~/components/views/RecordView.vue';

  export default {
    components: {
      RecordForm,
      RecordView,
    },
    data() {
      return {
        records: [],
      };
    },
    computed: {
      ...mapGetters({
        item: 'item/getItem',
        payments: 'payments/getPayments',
      }),
    },
    methods: {
      addRecord(record) {
        // add option object to page.
        const recordCopy = JSON.parse(JSON.stringify(record));
        record.quantity = 0;
        console.log(this.records);
        this.records.push(recordCopy);
      },
      removeRecord(recordIndex) {
        // remove option object to page.
        this.records.splice(recordIndex, 1);
      },
      async registerPaymentToItem() {
        try {
          const payload = {
            id: this.item.id,
            records: this.records,
          };
          await this.$store.dispatch('payments/registerPaymentToItem', payload);
          alert('주문 완료');
        } catch (e) {
          alert(e.response);
        }
      },
    },
  };
</script>
