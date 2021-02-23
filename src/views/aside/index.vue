<template>
  <div class="aside-container">
    <div class="aside-fold" @click="$emit('iscolse')">
      |||
    </div>
    <el-menu
      :default-active="'/' + activePath "
      background-color="#333744"
      text-color="#fff"
      active-text-color="#4B8AF1"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <el-submenu :index="menus.id + ''" v-for="(menus, index) in menusLists" :key="menus.id">
        <template slot="title">
          <i :class="iconList[index]" class="icontitle"></i>
          <span>{{ menus.authName }}</span>
        </template>
        <el-menu-item-group v-for="menusChild in menus.children" :key="menusChild.id">
          <el-menu-item :index="'/' + menusChild.path" @click="recordPath(menusChild.path)">
            <i class="el-icon-menu"></i>
            <span>{{ menusChild.authName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     </el-menu>
  </div>
</template>

<script>
import { menusList } from '@/api/home'
import '../../style/icon.css'

export default {
  name: 'AsideIndex',
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menusLists: [],
      iconList: [
        'iconfont icon-icon-user',
        'iconfont icon-quanxian',
        'iconfont icon-shangpin',
        'iconfont icon-5',
        'iconfont icon-shuju'
      ],
      activePath: ''
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getMenusList()
    this.activePath = sessionStorage.getItem('activePath')
  },
  mounted () {},
  methods: {
    // 获取列表数据
    async getMenusList () {
      const data = await menusList()
      if (data.meta.status !== 200) {
        this.$message({
          type: 'error',
          message: data.data.meta.msg
        })
        return
      }
      this.menusLists = data.data
    },
    // 记录原来列表的path
    recordPath (path) {
      sessionStorage.setItem('activePath', path)
    }
  }
}
</script>
<style lang="less" scoped>
.aside-menu{
  background-color: #333744;
  color: #fff;
}
.el-menu{
  border-right: 0;
}
.icontitle{
  margin-right: 5px;
}
.aside-fold{
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  background-color: #4a5064;
  font-size: 12px;
  line-height: 24px;
  cursor: pointer;
}
</style>
