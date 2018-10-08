<template>
    <div class="login-form-container">
      <div class="login-form">
        <div class="login-form-title">
          <p>やるきさがしにログインする</p>
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
        <div>
          <button @click="login" v-bind:class="this.loginButtonClasses">
            ログイン
            <div class="ld ld-ring ld-spin"></div>
          </button>
        </div>
        <div class="regist-new-user-block">
          <router-link to="/signup">新規登録</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  name: 'Login',
  layout: 'login',
  data () {
    return {
      email: '',
      password: '',
      loginButtonClasses: {
        'auth-button': true,
        'ld-ext-right': true,
        'running': false
      }
    }
  },
  methods: {
    login () {
      this.loginButtonClasses.running = true;
      let payload = {username: this.email, password: this.password}
      this.$store.dispatch('login/doLogin', payload).then(response => {
        this.loginButtonClasses.running = false;
        //localStorage.setItem('jwt', response.user.jwt)
        // 認証状態をセット
        this.$store.dispatch('login/setAuthState')
        this.$router.push('/dashboard')
      }).catch(error => {
        this.loginButtonClasses.running = false;
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
