<template>
  <div class="goods-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
       <el-input placeholder="请输入内容" v-model="queryInfo.query" class="search" clearable @clear="getGoodsList">
        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
      </el-input>
      <el-button type="primary" @click="$router.push('/addGoods')">添加用户</el-button>
      <el-table
        :data="goodData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
        ></el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width= '130'
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width= '130'
        ></el-table-column>
        <el-table-column
          label="创建时间"
          width= '230'
        >
          <template v-slot="scope">
            {{scope.row.add_tiem | dataTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button icon="el-icon-edit" type="primary" size="mini">修改</el-button>
            <el-button icon="el-icon-delete" type="warning" size="mini" @click="delGoods(scope.row.goods_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { goodsList, delGoods } from '@/api/goods'

export default {
  name: 'GoodsIndex',
  components: {},
  props: {},
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      goodData: [],
      total: 0
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getGoodsList()
  },
  mounted () {},
  methods: {
    // 获取商品信息
    async getGoodsList () {
      const data = await goodsList(this.queryInfo)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.goodData = data.data.goods
      this.total = data.data.total
    },
    handleCurrentChange (num) {
      this.queryInfo.pagenum = num
      this.getGoodsList()
    },
    handleSizeChange (size) {
      this.queryInfo.pagesize = size
      this.getGoodsList()
    },
    // 删除商品
    async delGoods (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'cancel') return this.$message.info('已取消删除')
      const data = await delGoods(id)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.$message.success('删除商品成功')
      this.getGoodsList()
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  width: 350px;
  margin-right: 20px;
}
</style>
