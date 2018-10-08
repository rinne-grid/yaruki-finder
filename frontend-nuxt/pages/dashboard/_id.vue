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
      <template v-if="formData">
        <div class="env-detail" v-for="formIndex in formNum" :key="formIndex">
          <env-detail-form
            v-bind:position="formIndex"
            v-bind:formNum="formNum"
            v-bind:key="formIndex"
            v-bind:formDataForDetail="formData[formIndex-1]"
            v-on:change-detail-form="changeDetailForm"
            v-on:delete-detail-form="deleteDetailForm"
            ></env-detail-form>
        </div>
      </template>

      <template v-if="!formData">
        <div class="env-detail" v-for="formIndex in formNum" :key="formIndex">
          <env-detail-form
            v-bind:key="formIndex"
            v-bind:position="formIndex"
            v-bind:formNum="formNum"
            v-on:change-detail-form="changeDetailForm"
            v-on:delete-detail-form="deleteDetailForm"
            ref="envDetailForm"
            />
        </div>
      </template>
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
  name: "EnvDetailReload",
  components: {
    EnvDetailForm
  },
  computed: {
    ...mapGetters({
      getEnvDataByKey: 'envs/getEnvDataByKey',
      getUser: 'login/getUser'
    })
  },
  beforeMount () {
    let envData = this.getEnvDataByKey(this.$route.params.id)
    this.formData = envData.res.data
    this.formNum = this.formData.length
  },
  data () {
    return {
      formData: [{}],
      formNum: 1,
      formIndex: 0,
      buttonClasses: {
        'auth-button': true,
        'ld-ext-right': true,
        'running': false
      },
      modalChecked: ''
    }
  },
  methods: {
    save () {
      this.buttonClasses.running = true
      let user = this.getUser
      // https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ja
      let docRef = firebase.firestore().collection('envs').doc(this.$route.params.id)
      const summary = EnvUtility.getSummaryFromData(this.formData)

      docRef.update(
        {
          data: this.formData,
          summary: summary
        }
      ).then(() => {
        this.buttonClasses.running = false
        this.modalChecked = "checked"
      }).catch((error) => {
        this.buttonClasses.running = false
        console.log(error)
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
      this.formData.push({1:"",2:"",3:"",4:""})
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
