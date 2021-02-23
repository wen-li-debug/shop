<template>
  <div class="update-container">
     <el-dialog
      title="修改用户"
      :visible.sync="newisUpdateUser"
      width="50%"
      @close="closeClick"
      @closed="$emit('upisupdateUser')"
      >
      <el-form :model="upDateUser" :rules="updateRules" ref="updateUserRef" label-width="70px" class="updateForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="upDateUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="upDateUser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="upDateUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('upisupdateUser')">取 消</el-button>
        <el-button type="primary" @click="subUpdateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser } from '@/api/users'

export default {
  name: 'UpdateUser',
  components: {},
  props: {
    isUpdateUser: {
      type: Boolean,
      default: false
    },
    upDateUser: {
      type: Object,
      required: true
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
      updateRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
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
    newisUpdateUser: {
      set (val) {
        return val
      },
      get () {
        return this.isUpdateUser
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    closeClick () {
      this.$refs.updateUserRef.resetFields()
      this.$emit('upisupdateUser')
    },
    subUpdateUser () {
      this.$refs.updateUserRef.validate(async valid => {
        if (!valid) return
        const data = await updateUser(this.upDateUser.id, { email: this.upDateUser.email, mobile: this.upDateUser.mobile })
        if (data.meta.status !== 200) return this.$message.error('请求失败，请稍后重试')
        this.$message.success('更新成功')
        this.$emit('closeUpdateUser')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.updateForm{
  padding: 0 40px;
}
</style>
