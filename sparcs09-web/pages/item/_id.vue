<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">{{item.title}}</h1>
      <host-view></host-view>
      <item-content-view></item-content-view>
      <item-view></item-view>
      <item-order></item-order>
      <item-comments></item-comments>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  import ItemView from '~/components/views/ItemView.vue';
  import ItemContentView from '~/components/views/ItemContentView.vue';
  import HostView from '~/components/views/HostView.vue';
  import ItemOrder from '~/components/ItemOrder.vue';
  import ItemComments from '~/components/ItemComments.vue';
  

  export default {
    components: {
      ItemView,
      ItemContentView,
      HostView,
      ItemOrder,
      ItemComments,
    },

    data() {
      return {
      };
    },

    computed: {
      ...mapGetters({
        item: 'item/getItem',
      }),
    },

    async fetch({ store, params, error }) {
      try {
        const { id } = params;
        await Promise.all([
          store.dispatch('item/getItem', { id }),
          store.dispatch('contents/getContentsOfItem', { id }),
          store.dispatch('comments/getCommentsOfItem', { id, offset: 0 }),
          store.dispatch('payments/getPaymentsOfItem', { id }),
        ]);
      } catch (e) {
        // alert(e.response);
        console.log(e);
        error({ statusCode: e.response.status, message: e.response.statusText });
      }
    },

    methods: {
    },

    head: {
      title: 'SPARCS 09',
    },
  };
</script>