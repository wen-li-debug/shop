<template>
  <div class="orders-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-input placeholder="请输入内容" v-model="queryInfo.query" class="search" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="orderData"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          type="index"
        ></el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号"
          width='280'
        ></el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格"
        ></el-table-column>
        <el-table-column
          label="是否付款"
        >
          <template v-slot="scope">
            <el-tag v-if="scope.row.pay_status === '0'">未付款</el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货"
        ></el-table-column>
        <el-table-column
          label="下单时间"
          width='200'
        >
          <template v-slot="scope">
            {{scope.row.create_time | dataTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button type="primary" size="mini" class="el-icon-edit" @click="showBoxdialogVisible = true"></el-button>
            <el-button type="success" size="mini" class="el-icon-location"></el-button>
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
    <!-- 修改地址对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="showBoxdialogVisible"
      width="50%"
      @closed="$refs.addressRef.resetFields()"
      >
      <el-form :model="addressForm" :rules="addressRules" ref="addressRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="citydata"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.adress2"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showBoxdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="showBoxdialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import citydata from './citydata'
import { orderList } from '@/api/order'

export default {
  name: 'OrdersIndex',
  components: {},
  props: {},
  data () {
    return {
      queryInfo: {
        query: '',
        pagesize: 5,
        pagenum: 1
      },
      orderData: [],
      total: 0,
      showBoxdialogVisible: false,
      addressForm: {
        address1: '',
        address2: ''
      },
      addressRules: {
        address1: [
          { required: true, message: '请输入省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      citydata
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getOrderList()
  },
  mounted () {},
  methods: {
    async getOrderList () {
      const data = await orderList(this.queryInfo)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.orderData = data.data.goods
      this.total = data.data.total
    },
    handleSizeChange (size) {
      this.queryInfo.pagesize = size
      this.getOrderList()
    },
    handleCurrentChange (num) {
      this.queryInfo.pagenum = num
      this.getOrderList()
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
