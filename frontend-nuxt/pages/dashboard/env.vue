<template>
  <div>
    <h2>現状整理</h2>
    <div class="env-area">
      <div class="env-header">
        <div class="env-base-box env-box-color-1">環境</div>
        <div class="env-base-box env-box-color-2">想い</div>
        <div class="env-base-box env-box-color-3">理想</div>
        <div class="env-base-box env-box-color-4">現実</div>
      </div>
      <div class="env-detail" v-for="formIndex in formNum" :key="formIndex">
        <EnvDetailForm
          v-bind:key="formIndex"
          v-bind:position="formIndex"
          v-bind:formNum="formNum"
          v-on:change-detail-form="changeDetailForm"
          v-on:delete-detail-form="deleteDetailForm"
          ref="envDetailForm"
          />
      </div>
      <div class="list-box list-box-add" @click="addDetailForm()">
        <div class="list-box-mark">+</div>
        <div class="list-box-explain">追加</div>
      </div>
    </div>
    <div class="button-area">
      <button @click="save" v-bind:class="this.buttonClasses">
        保存
        <div class="ld ld-ring ld-spin"></div>
      </button>
      <button @click="clear" class="auth-button clear-button">
        クリア
      </button>
    </div>
    <div class="modal">
      <input id="modal-trigger" class="checkbox" type="checkbox" v-bind:checked="this.modalChecked">
      <div class="modal-overlay" @click="modalCheckOff">
        <label for="modal-trigger" class="o-close"></label>
        <div class="modal-wrap from-top">
          <label for="modal-trigger" class="close" @click="modalCheckOff">&#10006;</label>
            <h2 class="my-modal-title"><i class="material-icons md-48 success">check</i>登録完了</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnvDetailForm from '@/components/environment/EnvDetailForm'
import firebase from '@/plugins/firebase'
import { EnvUtility } from '@/utility/EnvUtility'
import { mapGetters } from 'vuex'
export default {
  name: 'Environment',
  components: {
    EnvDetailForm
  },
  data () {
    return {
      formNum: 1,
      formIndex: 0,
      // Vuexのストアで管理すべきオブジェクト
      formData: [{}],
      buttonClasses: {
        'auth-button': true,
        'ld-ext-right': true,
        'running': false
      },
      modalChecked: ''
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'login/getUser'
    })
  },
  methods: {
    save () {
      this.buttonClasses.running = true
      let user = this.getUser

      const summary = EnvUtility.getSummaryFromData(this.formData)

      firebase.firestore().collection('envs').add({
        user: user.uid,
        data: this.formData,
        summary: summary,
        created_dt: new Date()
      }).then((docRef) => {
        this.buttonClasses.running = false
        this.modalChecked = "checked"
      }).catch((error) => {
        this.buttonClasses.running = false
      })

    },
    clear () {
      this.formData = this.formData.map(formObj => {
        return {}
      })
      this.$refs.envDetailForm.forEach(component => {
        component.resetDetailForm()
      });
    },
    addDetailForm () {
      this.formNum += 1
      this.formData.push({})
    },
    changeDetailForm (key, formObj) {
      this.formData[key] = formObj
    },
    deleteDetailForm (key) {
      this.formNum -= 1
      this.formData.splice(key, 1)
    },
    modalCheckOff () {
      this.modalChecked = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/env-detail.scss";


</style>
