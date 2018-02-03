<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">{{item.title}}</h1>
      <section class="section">
        <div class="container">
          <h2 class="title is-2">상품 정보</h2>
          <item-view :item="item"></item-view>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2 class="title is-2">호스트 정보</h2>
          <host-view :host="item.host"></host-view>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2 class="title is-2">상품 주문</h2>
          <div v-if="payments.payment_me.records">
            <p>이미 상품을 주문하셨습니다.</p>
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
      <section class="section">
        <div class="container">
          <h2 class="title is-2">상품 상세</h2>
          <item-content-view :contents="contents"></item-content-view>
        </div>
      </section>
      <section class="section">
        <div class="container" @scroll="handleScroll">
          <h2 class="title is-2">댓글 ({{comments.count}})</h2>
          <comment-form v-if="user != null" :user="user" :callback="addComment"></comment-form>
          <comment-view v-for="(comment, i) in comments.comments" :key="comment.id" :index="i" :comment="comment" :callback="deleteComment"></comment-view>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  import ItemView from '~/components/views/ItemView.vue';
  import ItemContentView from '~/components/views/ItemContentView.vue';
  import HostView from '~/components/views/HostView.vue';
  import RecordForm from '~/components/forms/RecordForm.vue';
  import RecordView from '~/components/views/RecordView.vue';
  import CommentForm from '~/components/forms/CommentForm.vue';
  import CommentView from '~/components/views/CommentView.vue';
  

  export default {
    components: {
      ItemView,
      ItemContentView,
      HostView,
      RecordForm,
      RecordView,
      CommentForm,
      CommentView,
    },

    data() {
      return {
        records: [],
      };
    },

    computed: {
      ...mapGetters({
        user: 'user/getUser',
        item: 'itemDetail/getItem',
        contents: 'itemDetail/getContents',
        comments: 'itemDetail/getComments',
        payments: 'itemDetail/getPayments',
      }),
    },

    async fetch({ store, params, error }) {
      try {
        const { id } = params;
        await Promise.all([
          store.dispatch('itemDetail/getItem', { id }),
          store.dispatch('itemDetail/getContentsOfItem', { id }),
          store.dispatch('itemDetail/getCommentsOfItem', { id, offset: 0 }),
          store.dispatch('itemDetail/getPaymentsOfItem', { id }),
        ]);
      } catch (e) {
        // alert(e.response);
        console.log(e);
        error({ statusCode: e.response.status, message: e.response.statusText });
      }
    },

    methods: {
      async handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          // fetch older 10 comments
          const payload = {
            id: this.item.id,
            offset: this.comments.count,
          };
          await this.$store.dispatch('itemDetail/getCommentsOfItem', payload);
        }
      },
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
      async addComment(comment) {
        try {
          const payload = {
            id: this.item.id,
            comment,
          };
          await this.$store.dispatch('itemDetail/addCommentToItem', payload);
          comment.content = '';
        } catch (e) {
          alert(e.response);
        }
      },
      async deleteComment(id) {
        try {
          await this.$store.dispatch('itemDetail/deleteComment', { id });
        } catch (e) {
          alert(e.response);
        }
      },
      async registerPaymentToItem() {
        try {
          const payload = {
            id: this.item.id,
            records: this.records,
          };
          await this.$store.dispatch('itemDetail/registerPaymentToItem', payload);
          alert('주문 완료');
        } catch (e) {
          alert(e.response);
        }
      },
    },

    created() {
      window.addEventListener('scroll', this.handleScroll);
    },

    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },

    head: {
      title: 'SPARCS 09',
    },
  };
</script>