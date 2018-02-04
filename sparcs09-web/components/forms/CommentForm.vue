<template>
  <article class="media">
    <figure class="media-left">
      <p><strong>{{user.name}}</strong> </p>
    </figure>
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea class="textarea" v-model="comment_input.content" placeholder="댓글을 작성하세요"></textarea>
        </p>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <a class="button is-primary" @click="callback(comment_input)">제출</a>
          </div>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      comment_input: {
        content: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  props: {
    callback: {
      type: Function,
      required: true,
    },
  },
};
</script>
