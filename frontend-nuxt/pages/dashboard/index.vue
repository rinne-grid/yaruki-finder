<template>
  <div>
    <h2>ダッシュボード</h2>
    <unit-box :envDataObjects="this.envDataObjects"></unit-box>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapState } from 'vuex'
import UnitBox from '~/components/environment/UnitBox.vue'

export default {
  name: 'Dashboard',
  computed: {
  },
  components: {
    UnitBox
  },
  data () {
    return {
      envDataObjects: {},
    }
  },
  async asyncData ({store, redirect}) {
    let envDataObjects = {}
    let user = store.getters['login/getUser']
    if(user) {
      // 対象ユーザの現状整理データを取得する
      await firebase.firestore().collection("envs").orderBy("created_dt", "desc").where("user", "==", user.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            envDataObjects[doc.id] = {id: doc.id, res: doc.data()}
          })
        })
        .catch((error) => {
          console.log(error)
        })

      let payload = envDataObjects
      // Vuexストアに保持
      store.dispatch('envs/setEnvObjects', payload)
      return {
        envDataObjects: envDataObjects,
      }
    } else {
      redirect('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 30px;
  font-weight: normal;
}

.ld-icon-invisible {
  display: none;
}
</style>
