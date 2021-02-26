<template>
  <div class="categories-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="showOrderClick">添加分类</el-button>
      <tree-grid
        :data="cateList"
        :columns="columns"
        show-index
        index-text="#"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <!-- 状态 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-error" v-if="scope.row.cat_deleted" style="color: red"></i>
          <i class="el-icon-success" v-else style="color: lightgreen"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="handle">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="updateUserClick(scope.row.id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delUserClick(scope.row.id)">删除</el-button>
        </template>
      </tree-grid>
      <el-pagination
        @size-change="handleSizeCate"
        @current-change="handleCurrentCate"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加分类 -->
    <add-cate
      :dialogVisitor="dialogVisitor"
      @showDialog="dialogVisitor = $event"
      :parentCateList= "parentCateList"
      @addCate="addCate"
    />
  </div>
</template>

<script>
import { catesList } from '@/api/goods'
import AddCate from './children/addCate'

export default {
  name: 'CategoriesIndex',
  components: {
    AddCate
  },
  props: {},
  data () {
    return {
      cateList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 设置每一列
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'handle'
        }
      ],
      // 控制添加分类的显示和隐藏
      dialogVisitor: false,
      parentCateList: []
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getCateList()
  },
  mounted () {},
  methods: {
    handleSizeCate (size) {
      this.queryInfo.pagesize = size
      this.getCateList()
    },
    handleCurrentCate (num) {
      this.queryInfo.pagenum = num
      this.getCateList()
    },
    async getCateList () {
      const data = await catesList(this.queryInfo)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.total = data.data.total
      this.cateList = data.data.result
      console.log(data)
    },
    // 获取父级分类数据列表
    async getParentCateList () {
      const data = await catesList({ type: 2 })
      if (data.meta.status !== 200) return this.$message.error('请求数据失败，请稍后重试')
      this.parentCateList = data.data
      console.log(data)
    },
    // 显示分类
    showOrderClick () {
      this.getParentCateList()
      this.dialogVisitor = true
    },
    // 添加分类
    addCate () {
      this.dialogVisitor = false
      this.getCateList()
    }
  }
}
</script>
<style lang="less" scoped>
.zk-table{
  margin: 20px 0;
}
</style>
