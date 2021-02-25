<template>
  <div class="setRoles-container">
    <el-dialog
      title="提示"
      :visible.sync="newShowRolesVisible"
      width="50%"
      @close="rolesVal = ''"
      >
      <div>
        <p>当前的用户: {{userInfo.username}}</p>
        <p>当前的角色: {{userInfo.role_name}}</p>
        <p>
          <span>分配当前角色: </span>
          <el-select v-model="rolesVal" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newShowRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'SetRoles',
  components: {},
  props: {
    showRolesVisible: {
      type: Boolean,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    },
    rolesList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      rolesVal: ''
    }
  },
  watch: {},
  computed: {
    newShowRolesVisible: {
      set (val) {
        this.$emit('showRoles', val)
      },
      get () {
        return this.showRolesVisible
      }
    }
  },
  created () {
    console.log(this.rolesList)
  },
  mounted () {},
  methods: {
    async addRolesClick () {
      this.$emit('addRolesClick', this.rolesVal)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
