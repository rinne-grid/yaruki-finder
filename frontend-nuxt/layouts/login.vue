<template>
  <div id="app">
    <header class="page-header">
      <div class="logo">
        <router-link to="/login" >やるきさがし</router-link>
      </div>
      <nav class="nav-end">
      </nav>
    </header>
    <div class="page-line"></div>
    <div class="page-main">
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
}
</script>

<style lang="scss">
</style>


