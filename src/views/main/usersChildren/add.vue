<template>
  <div class="add-container">
    <el-dialog
      title="添加用户"
      :visible.sync="newisAddUser"
      width="50%"
      @close="closeClick"
      @closed="$emit('upisAddUser')"
      >
      <el-form :model="addUser" :rules="addRules" ref="addUserRef" label-width="70px" class="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('upisAddUser')">取 消</el-button>
        <el-button type="primary" @click="subAddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser } from '@/api/users'

export default {
  name: 'UserAdd',
  components: {},
  props: {
    isAddUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 自定义规则
    const emailValid = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!reg.test(value)) return callback(new Error('输入的邮箱格式不正确'))
      callback()
    }
    const moblie = (rule, value, callback) => {
      const reg = /^1[3|5|7|8|][0-9]{9}$/
      if (!reg.test(value)) return callback(new Error('输入的电话号码格式错误'))
      callback()
    }
    return {
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ' '
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: emailValid, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: moblie, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {
    newisAddUser: {
      set (val) {
        return val
      },
      get () {
        return this.isAddUser
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    closeClick () {
      this.$refs.addUserRef.resetFields()
      this.$emit('upisAddUser')
    },
    // 提交
    subAddUser () {
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) return
        // 提交
        const data = await addUser(this.addUser)
        if (data.meta.status !== 201) return this.$message.error('发送失败，请稍后重试')
        this.$message.success('添加成功')
        this.$emit('addUser')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.addForm{
  padding: 0 40px;
}
</style>
