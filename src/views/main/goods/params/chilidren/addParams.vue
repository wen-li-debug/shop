<template>
  <div class="addParams-container">
    <el-dialog
      :title="'添加'+newParamType"
      :visible.sync="newShowParamsDialogVisible"
      width="50%"
      @close="closeAddParams"
      >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="newParamType" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newShowParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subAddParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddParams',
  components: {},
  props: {
    paramType: {
      type: String,
      required: true
    },
    showParamsdialogVisible: {
      type: Boolean,
      dafault: false
    }
  },
  data () {
    return {
      addForm: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {
    newParamType () {
      if (this.paramType === 'only') {
        return '静态属性'
      } else {
        return '动态参数'
      }
    },
    newShowParamsDialogVisible: {
      set () {
        this.$emit('setShowParamsdialogVisible', false)
      },
      get () {
        return this.showParamsdialogVisible
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 关闭对话框
    closeAddParams () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加
    subAddParams () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.$emit('subAddParams', { attr_name: this.addForm.attr_name, attr_sel: this.paramType })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
