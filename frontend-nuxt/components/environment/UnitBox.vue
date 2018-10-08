<template>
  <div class="list-area">
    <div class="list-box list-box-add" v-bind:key="envData.id" v-for="envData in this.envDataObjects" @click="showEnvData(envData)" >
      <div class="list-box-mark">{{envData.res.created_dt.toDate().toLocaleString('ja-jp', {timeZone: 'Asia/Tokyo'} )}}</div>

      <div class="list-box-explain">{{envData.res.summary}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitBox",
  props: [
    'envDataObjects'
  ],
  computed: {
  },
  methods: {
    showEnvData (envData) {
      this.$router.push('/dashboard/' + envData.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-contents {
}

.list-area {
  display: flex;
  flex-flow: row;
  align-content: space-around;
}

.list-box {
  width: 340px;
  height: 240px;
  background: rgba(122, 121, 119, 0.4);
  border-radius: 5px;
  margin-left: 20px;
}

.list-box-add {

  text-align: center;
  color: #555555;
  background-color: #EAEAEA;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background-color: #1abc9c;
    color: #EAEAEA;
    transition: all .2s;
  }
}

.list-box-mark {
  margin-top: 30px;
  font-size: 0.8rem;
}
.list-box-explain {
  margin-top: 10px;
  font-size: 1.1rem;

}
</style>
