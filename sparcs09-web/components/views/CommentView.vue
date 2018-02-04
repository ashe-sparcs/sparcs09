<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.writer.name}}</strong>&nbsp;<small>31m</small>
          <br>
          {{comment.content}}
        </p>
      </div>
    </div>
    <div class="media-right">
      <button v-if="user && user.sid == comment.writer.sid && !comment.is_deleted" class="delete" @click="callback(comment.id)" :disabled="comment.is_deleted"></button>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
};
</script>
