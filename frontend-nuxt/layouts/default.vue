<template>
  <div id="app">
    <header class="page-header">
      <div class="logo">
        <router-link to="/dashboard" >やるきさがし</router-link>
      </div>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/dashboard">ダッシュボード</router-link></li>
        </ul>
      </nav>
      <nav class="nav-end">
        <ul>
          <li>
            <a><i class="material-icons md-24">settings</i></a>
            <ul>
              <li>
                <a href="#">{{this.getUser.email}}</a>
              </li>
              <li>
                <router-link to="/setting">プロフィール</router-link>
              </li>
              <li>
                <a @click="logout" >ログアウト</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <div class="page-line"></div>
    <div class="page-main">

      <div class="page-sidebar">
        <span class="circle-icon-base">
          <router-link to="/dashboard/env">+</router-link>
        </span>
        <span class="circle-icon-base">
          <a><i class="material-icons md-24">search</i></a>
        </span>
      </div>

      <div class="page-contents">
        <!-- コンテンツ -->
        <nuxt />
      </div>
    </div>
    <footer class="page-footer">

    </footer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firebase } from '~/plugins/firebase'
export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'login/isAuthenticated',
      getUser: 'login/getUser'
    }),
  },
  methods: {
    logout () {
      this.$store.dispatch('login/doLogout').then(response => {
        this.$router.push('/login')
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss">
</style>


