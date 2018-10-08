<template>
  <div class="env-detail-area">
    <span v-if="dataPosition > 1 && dataPosition === formNum " class="delete-icon" @click="deleteDetailForm">X</span>
    <div class="env-details">
      <span v-if="formDataForDetail">
        <span v-for="(envData, index) in this.formData" v-bind:key="index">
          <EnvDetailInput v-bind:envType="index"
                          v-bind:envData="envData"
                          v-on:set-env-tag="setEnvTag"
                          v-on:bind-init-data="bindInitData"
                          ref="envDetailInput"
          />
        </span>
      </span>
      <span v-if="!formDataForDetail">
        <span v-for="envTypeIndex in envTypeMax" v-bind:key="envTypeIndex">
          <EnvDetailInput v-bind:envType="envTypeIndex"
                          v-on:set-env-tag="setEnvTag"
                          ref="envDetailInput"
          />
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import EnvDetailInput from '~/components/environment/EnvDetailInput'
export default {
  name: 'EnvDetailForm',
  components: {
    EnvDetailInput
  },
  props: ['position', 'formNum', 'formDataForDetail'],
  data () {
    return {
      dataPosition: this.position,
      formData: {},
      envTags: {},
      envTypeIndex: 1,
      envTypeMax: 4
    }
  },
  mounted () {
    // 新規登録時：現状整理データはundefined
    // 更新時    ：現状整理データが渡ってきている
    if(this.formDataForDetail !== undefined ) {
      this.formData = this.formDataForDetail
    }
  },
  methods: {
    bindInitData (tagObj) {
      this.setEnvTag(tagObj)
    },
    // EnvDetailInputから受け取った入力内容、親（dashboard/index）に反映
    setEnvTag (tagObj) {
      this.envTags[tagObj.type] = tagObj.contents
      this.$emit('change-detail-form', this.formDataKey, this.envTags)
    },
    deleteDetailForm () {
      this.$emit('delete-detail-form', this.formDataKey)
    },
    resetDetailForm () {
      this.$refs.envDetailInput.forEach(component => {
        component.clearContent()
      })
    }
  },
  computed: {
    formDataKey () {
      return this.dataPosition - 1
    }
  }
}
</script>

<style lang="scss" scoped>
.env-details {
  display: flex;
  flex-flow: column;
  transition: all .2s;
  margin-right: 10px;
}

.env-detail-area {
  display: flex;
  justify-content: flex-end;
}
.delete-icon {
  width: 30px;
  height: 30px;
  background-color: #e74c3c;
  border-radius: 30px;
  color: #FFF;
  text-align: center;
  line-height: 30px;
  position: absolute;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
    color: #EEE;
  }
}
</style>
