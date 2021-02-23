<template>
  <el-container>
    <el-header class="header">
      <header-index />
    </el-header>
    <el-container>
      <el-aside class="aside" :width="isCollapse ? '64px': '200px'">
        <aside-index :isCollapse="isCollapse" @iscolse="isCollapse = !isCollapse"/>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderIndex from '../header/'
import AsideIndex from '../aside/'

export default {
  name: 'HomeIndex',
  components: {
    HeaderIndex,
    AsideIndex
  },
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  watch: {},
  computed: {},
  filters: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.el-container{
  height: 100%;
}
.header{
  background-color: #373d41;
}
.aside{
  background-color: #333744;
}
.main{
  background-color: #eaedf1;
}
</style>
