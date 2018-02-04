<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">호스트 정보</h2>
      <div class="container">
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <td>이름</td>
              <td>{{item.host.name}}</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>{{item.host.phone}}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>{{item.host.email}}</td>

            </tr>
            <tr>
              <td>주소</td>
              <td>{{item.host.address}}</td>

            </tr>
            <tr>
              <td>카카오톡 아이디</td>
              <td>{{item.host.kakao_id}}</td>
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
  },
  created() {
    console.log('loaded item is');
    console.log(this.item);
  },
};
</script>

