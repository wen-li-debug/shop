<template>
  <div class="header-container">
    <div class="header-left">
      <img src="./logo.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <div class="header-right">
      <button @click="outBtn">退出</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 注销用户
    outBtn () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.header-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .header-left{
    display: flex;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
    }
    span{
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
    }
  }
  .header-right{
    .el-button{
      width: 40px;
      height: 40px;
      background-color: #fff;
      padding: 5px;
      color:rgba(3, 0, 0, 0.24);
    }
  }
}
</style>
