<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_logo">
        <img class="logo" src="@/assets/logo.png" alt="">
      </div>
      <div class="login_main">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input
             v-model="loginForm.username"
             prefix-icon="iconfont icon-user"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="iconfont icon-password"
              type="password"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button type="info" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import '../../style/icon.css'
import { login } from '@/api/login'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const data = await login(this.loginForm)
        if (data.meta.status === 200) {
          // 登录成功
          this.$message({
            type: 'success',
            showClose: true,
            message: '登录成功'
          })
          // 保存token到sessionStorage
          sessionStorage.setItem('token', data.data.token)
          // 跳转到home 首页
          this.$router.push('/home')
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: data.meta.msg
          })
        }
      })
    },
    onReset () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
  .login_box{
    width: 500px;
    height: 320px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .login_logo{
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 1px solid #ccc;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;
      .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login_main{
      margin-top: 100px;
      padding: 0 20px;
      .form-btn{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
