<template>
  <div class="roles-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table border :data="RolesList" stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1, id1) in scope.row.children" :key="item1.id" :class="['bborder', id1 === 0 ? 'tborder': '', 'vcenter']">
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, id2) in item1.children" :key="item2.id" :class="[id2 === 0 ? '': 'tborder', 'vcenter']">
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-row v-for="(item3, id3) in item2.children" :key="item3.id" :class="id3 === 0 ? '': 'tborder'">
                      <el-col>
                        <el-tag closable type="warning" @close="closeRoles(scope.row, item3.id)">{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
        ></el-table-column>
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="320"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="updateUserClick(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="delUserClick(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="small"  @click="setRightsVidator(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 显示权限的对话框 -->
    <right-index
     :showRightVisible="showRightVisible"
     @showRightClick="showRightVisible = $event"
     :rightsList="rightsList"
     :defKeys="defKeys"
     @closeSetRight="defKeys = []"
     @addRolesRights="addRolesRights"
    />
  </div>
</template>

<script>
import { getRolesList, delRoles, getRightsList, addRolesRights } from '@/api/power'
import RightIndex from './children/rights'

export default {
  name: 'RolesIndex',
  components: {
    RightIndex
  },
  props: {},
  data () {
    return {
      RolesList: [],
      showRightVisible: false,
      rightsList: [],
      defKeys: [], // 用于收集权限的id
      rolesId: ''
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getRolesList()
  },
  mounted () {},
  methods: {
    async getRolesList () {
      const data = await getRolesList()
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.RolesList = data.data
    },
    // 删除权限
    async closeRoles (roles, id) {
      const confirmResult = await this.$confirm('是否需要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error)
      if (confirmResult === 'cancel') {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        return
      }
      const data = await delRoles(roles.id, id)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      roles.children = data.data
      this.$message.success('删除权限成功')
    },
    // 分配权限(树形结构)
    async setRightsVidator (roles) {
      // 获取权限列表
      const data = await getRightsList('tree')
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.rightsList = data.data
      this.getdefKeys(roles, this.defKeys)
      this.rolesId = roles.id
      this.showRightVisible = true
    },
    // 使用递归收集权限id
    getdefKeys (node, arr) {
      // 判断node 中没有了children
      if (!node.children) {
        return arr.push(node.id)
      }
      // node中还有children,使用递归遍历
      node.children.forEach(item => {
        this.getdefKeys(item, arr)
      })
    },
    // 给角色添加权限
    async addRolesRights (id) {
      const data = await addRolesRights(this.rolesId, id)
      if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
      this.$message.success('分配成功')
      this.showRightVisible = false
      this.getRolesList()
    }
  }
}
</script>
<style lang="less" scoped>
.el-row{
  padding: 10px;
}
.bborder{
  border-bottom: 1px solid #ccc;
}
.tborder{
  border-top: 1px solid #ccc;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
