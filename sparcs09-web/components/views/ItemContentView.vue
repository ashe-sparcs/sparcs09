<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">상품 정보</h2>
      <div class="content">
        <div v-for="content in contents" :key="content.order" class="level">
          <div class="container" v-if="content.kind == 0">
            <p>{{content.content}}</p>
          </div>
          <div class="container" v-else-if="content.kind == 1">
            <figure class="image is-16by9">
              <img :src="imageUrl(content.image)">
            </figure>
          </div>
          <div class="container" v-else-if="content.kind == 2">
            <p>
              <a :href="content.link">상품 링크</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      contents: 'contents/getContents',
    }),
  },
  methods: {
    imageUrl(url) {
      return process.env.SPARCS09_STATIC_DOMAIN + url.replace('images', '');
    },
  },
};
</script>
