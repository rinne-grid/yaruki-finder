<template>
  <div class="detail-box">
    <textarea v-model="envTag.contents" @change="envTagChange"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: 'EnvDetailInput',
  props: ['envType', 'envData'],
  data () {
    return {
      envTag: {
        type: this.envType,
        contents: ''
      }
    }
  },
  beforeMount () {
    this.envTag.contents = this.envData
    this.$emit('bind-init-data', this.envTag)
  },
  methods: {
    envTagChange () {
      this.$emit('set-env-tag', this.envTag)
    },
    clearContent () {
      this.envTag.contents = ""
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  height: 144px;
  width: 250px;
  transition: all .2s;

  border-radius: 5px;
  margin-top: 8px;
  margin-left: 4px;
  padding-top: 6px;
  text-align: center;

  & textarea {
    width: 90%;
    height: 90%;
    border-radius: 5px;
  }
}
</style>
