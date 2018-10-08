<template>
  <div>
    <router-link to="/login">ログイン</router-link>
    <router-link to="/dashboard">ダッシュボード</router-link>
  </div>
</template>

<script>
  export default {
    name: "index",
    asyncData ({redirect}) {
      redirect('/login')
    }
  }
</script>

<style scoped>

</style>
