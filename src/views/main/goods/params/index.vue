<template>
  <div class="params-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意: 只允许为第三级分类设置相关参数"
        show-icon
        type="warning">
      </el-alert>
      <div class="cader">
        <span>选择商品分类:</span>
        <el-cascader
          v-model="paramsVal"
          :options="paramsList"
          :props="cateProps"
          @change="handleChangeParams"></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="showParamsdialogVisible = true">添加参数</el-button>
          <many-params :manyTableData="manyTableData" @editParams="editParams"/>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="showParamsdialogVisible = true">添加属性</el-button>
          <only-params :onlyTableData="onlyTableData" @editParams="editParams" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数窗口 -->
    <add-params
      :paramType="activeName"
      :showParamsdialogVisible="showParamsdialogVisible"
      @setShowParamsdialogVisible="showParamsdialogVisible = $event"
      @subAddParams="subAddParams"
    />
    <!-- 修改参数窗口 -->
    <edit-params
      :paramType="activeName"
      :showParamsdialogVisible="showEditParamsdialogVisible"
      @setShowParamsdialogVisible="showEditParamsdialogVisible = $event"
      @subEditParams="subEditParams"
      :editParam="editParam"
    />
  </div>
</template>

<script>
import { catesList } from '@/api/goods'
import { getParamsList, addParams, paramsData, editParams } from '@/api/params'
import OnlyParams from './chilidren/onlyParams'
import ManyParams from './chilidren/manyParams'
import AddParams from './chilidren/addParams'
import EditParams from './chilidren/editParams'

export default {
  name: 'ParamsIndex',
  components: {
    OnlyParams,
    ManyParams,
    AddParams,
    EditParams
  },
  props: {},
  data () {
    return {
      paramsVal: '',
      paramsList: [],
      activeName: 'many',
      onlyTableData: [],
      manyTableData: [],
      editParam: {},
      showParamsdialogVisible: false,
      showEditParamsdialogVisible: false,
      // 设置props 类型
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }
    }
  },
  watch: {},
  computed: {
    isBtnDisable () {
      console.log(this.paramsVal.length)
      if (this.paramsVal.length === 3) {
        return false
      }
      return true
    },
    paramsId () {
      if (this.paramsVal.length === 3) {
        return this.paramsVal[2]
      } else {
        return null
      }
    }
  },
  created () {
    this.getParamsList()
  },
  mounted () {},
  methods: {
    async getParamsList () {
      const data = await catesList()
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.paramsList = data.data
    },
    handleChangeParams () {
      console.log(this.paramsVal)
      this.getTableData()
    },
    handleClick () {
      this.getTableData()
    },
    // 获取动态参数和静态参数数据
    async getTableData () {
      if (this.paramsVal.length === 3) {
        const data = await getParamsList(this.paramsId, this.activeName)
        if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
        if (this.activeName === 'only') {
          this.onlyTableData = data.data
        } else {
          this.manyTableData = data.data
        }
      }
    },
    // 添加参数
    async subAddParams (obj) {
      const data = await addParams(this.paramsVal[this.paramsVal.length - 1], obj)
      if (data.meta.status !== 201) return this.$message.error('请求失败，请稍后重试')
      this.$message.success('添加参数成功')
      this.getTableData()
      this.showParamsdialogVisible = false
    },
    // 显示修改参数对话框
    async editParams (obj) {
      // 获取需要修改的id
      const data = await paramsData(this.paramsVal[this.paramsVal.length - 1], obj.attrId, obj.attr_sel)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.editParam = data.data
      this.showEditParamsdialogVisible = true
    },
    // 修改参数
    async subEditParams (obj) {
      const data = await editParams(this.paramsVal[this.paramsVal.length - 1], this.editParam.attr_id, obj)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.$message.success('修改参数属性成功')
      this.getTableData()
      this.showEditParamsdialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.cader{
  margin: 20px 0;
  span{
    margin-right: 20px;
  }
}
</style>
