<template>
  <div class="edit-container">
    <el-dialog
      :title="'修改' + newParamType"
      :visible.sync="newShowParamsDialogVisible"
      width="50%"
      @close="closeEditParams"
      >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="newParamType" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newShowParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEditParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditParams',
  components: {},
  props: {
    paramType: {
      type: String,
      required: true
    },
    showParamsdialogVisible: {
      type: Boolean,
      dafault: false
    },
    editParam: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      editFormRules: {
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
    },
    editForm () {
      return this.editParam
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 关闭对话框
    closeEditParams () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改
    subEditParams () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.$emit('subEditParams', { attr_name: this.editForm.attr_name, attr_sel: this.paramType })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
