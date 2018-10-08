<template>
  <div>
    <div class="login-form-container">
      <div class="login-form">
        <div class="login-form-title">
          <p>やるきさがしに登録する</p>
        </div>
        <div class="login-form-component">
          <label for="email">メールアドレス</label>
          <br>
          <input type="email" id="email" v-model="email" class="login-input" />
        </div>
        <div class="login-form-component">
          <label for="password">パスワード</label>
          <br>
          <input type="password" id="password" v-model="password" class="login-input" />
        </div>
        <div class="login-form-component">
          <label for="displayName">名前</label>
          <br>
          <input type="text" id="displayName" v-model="displayName" class="login-input" />
        </div>
        <div>
          <button @click="signup" v-bind:class="this.loginButtonClasses">
            新規登録
            <div class="ld ld-ring ld-spin"></div>
          </button>
        </div>
        <div class="regist-new-user-block">
          <router-link to="/login">ログイン</router-link>
        </div>
        <div class="error-message">
          {{ this.errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Singup',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      displayName: '',
      loginButtonClasses: {
        'auth-button': true,
        'ld-ext-right': true,
        'running': false
      }
    }
  },
  computed: {
    ...mapGetters({
      'getUser': 'login/getUser',
    })
  },
  methods: {
    signup () {
      if (this.email === '' || this.password === '') {
        this.errorMessage = 'メールアドレスとパスワードは必須です'
        return false;
      }
      this.loginButtonClasses.running = true;
      let payload = {username: this.email, password: this.password}
      let options = {displayName: this.displayName}
      this.$store.dispatch('login/doSignup', payload
      ).then(response => {
          const uid = firebase.auth().currentUser.uid
          firebase.firestore().collection('users').add({
            user: uid,
            email: this.email,
            displayName: this.displayName
          }).then(response => {
            this.loginButtonClasses.running = false;
            this.$store.dispatch('login/setAuthState')
            this.$router.push('/dashboard')
          }).catch(error => {
            console.log("usersの登録に失敗")
            console.error(error)
          })

      }).catch(error => {
        this.loginButtonClasses.running = false;
        console.error(error)
        console.error("Failed Signup")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-button {
  margin-top: 40px;
  background-color: #e67e22;
  color: #FFF;
  border: none;
  width: 320px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #d35400;
  }
}

</style>
