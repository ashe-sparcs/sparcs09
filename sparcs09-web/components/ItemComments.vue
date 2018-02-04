<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">댓글 ({{comments.count}})</h2>
      <p class="has-text-centered"><a @click="getOlderComments">예전 댓글 불러오기</a></p>
      <hr>
      <comment-view v-for="(comment, i) in comments.comments" :key="comment.id" :index="i" :user="user" :comment="comment" :callback="deleteComment"></comment-view>
      <comment-form v-if="user != null" :user="user" :callback="addComment"></comment-form>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex';

  import CommentForm from '~/components/forms/CommentForm.vue';
  import CommentView from '~/components/views/CommentView.vue';

  export default {
    components: {
      CommentView,
      CommentForm,
    },
    data() {
      return {
        records: [],
      };
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        item: 'item/getItem',
        comments: 'comments/getComments',
      }),
    },
    methods: {
      async addComment(comment) {
        try {
          const payload = {
            id: this.item.id,
            comment,
          };
          await this.$store.dispatch('comments/addCommentToItem', payload);
          comment.content = '';
        } catch (e) {
          alert(e.response);
        }
      },
      async deleteComment(id) {
        try {
          await this.$store.dispatch('comments/deleteComment', { id });
        } catch (e) {
          alert(e.response);
        }
      },
      async getOlderComments() {
        const payload = {
          id: this.item.id,
          offset: this.comments.comments.length,
        };
        await this.$store.dispatch('comments/getCommentsOfItem', payload);
      },
    },
  };
</script>
