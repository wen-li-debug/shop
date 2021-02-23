<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
       <el-input placeholder="请输入内容" v-model="queryInfo.query" class="search" clearable @clear="getUsers">
        <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
      </el-input>
      <el-button type="primary" @click="isAddUser = true">添加用户</el-button>

        <el-table
          ref="singleTable"
          :data="usersData"
          border
          stripe
        >
        <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="upStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="updateUserClick(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false" >
            <el-button type="danger" icon="el-icon-delete" size="small" @click="delUserClick(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享" placement="top-start" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <user-add
      :isAddUser="isAddUser"
      @upisAddUser="isAddUser = false"
      @addUser="addUser"
      />

      <!-- 修改用户 -->
      <user-update
        :isUpdateUser="isUpdateUser"
        @upisupdateUser="isUpdateUser = false"
        :upDateUser="upDateUser"
        @closeUpdateUser="closeUpdateUser"
      />
  </div>
</template>

<script>
import { users, myStatus, updateUserInfo, delUser } from '@/api/users'
import UserAdd from './usersChildren/add'
import UserUpdate from './usersChildren/update'

export default {
  name: 'MainIndex',
  components: {
    UserAdd,
    UserUpdate
  },
  props: {},
  data () {
    return {
      usersSearch: '',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      usersData: [],
      total: 0,
      // 控制添加用户界面的显示和隐藏
      isAddUser: false,
      // 控制修改用户界面的显示和隐藏
      isUpdateUser: false,
      // 需要修改用户的数据
      upDateUser: {}
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getUsers()
  },
  mounted () {},
  methods: {
    async getUsers () {
      const data = await users(this.queryInfo)
      if (data.meta.status !== 200) {
        this.$message({
          type: 'error',
          message: data.meta.msg
        })
        return
      }
      this.usersData = data.data.users
      this.total = data.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsers()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUsers()
    },
    // 修改状态
    async upStatus (users) {
      const data = await myStatus(users.id, users.mg_state)
      if (data.meta.status !== 200) {
        users.mg_state = !users.mg_state
        return this.$message.error('修改失败，请稍后重试')
      }
      this.$message.success('修改状态成功')
    },
    addUser () {
      this.isAddUser = false
      this.getUsers()
    },
    // 获取需要修改的用户信息
    async updateUserClick (id) {
      console.log(id)
      const data = await updateUserInfo(id)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.isUpdateUser = true
      this.upDateUser = data.data
    },
    // 修改用户成功
    closeUpdateUser () {
      this.isUpdateUser = false
      this.getUsers()
    },
    // 删除用户信息
    delUserClick (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await delUser(id)
        if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
        console.log(data)
        this.getUsers()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  width: 300px;
  margin-right: 40px;
}
.el-table{
  margin: 20px 0;
}
</style>
