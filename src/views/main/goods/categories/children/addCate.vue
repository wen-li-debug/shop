<template>
  <div class="addCate-container">
    <el-dialog
      title="提示"
      :visible.sync="newDialogVisitor"
      width="50%"
      >
      <el-form :model="cateList" :rules="cateRules" ref="cateRulesRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="cateList.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="cateVal"
            :options="parentCateList"
            expandTrigger= 'hover'
            :props="cateProps"
            @change="handleChangeCate"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisitor = false">取 消</el-button>
        <el-button type="primary" @click="addCateClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addCate } from '@/api/goods'

export default {
  name: 'AddCate',
  components: {},
  props: {
    dialogVisitor: {
      type: Boolean,
      required: true
    },
    parentCateList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      cateList: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      cateRules: {
        cat_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      cateVal: [],
      // 设置props 类型
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  watch: {},
  computed: {
    newDialogVisitor: {
      set (val) {
        this.$emit('showDialog', val)
      },
      get () {
        return this.dialogVisitor
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 监听select改变
    handleChangeCate (val) {
      // 判断是否点击了父级分类
      if (this.cateVal.length > 0) {
        // 设置父级id
        this.cateList.cat_pid = this.cateVal[this.cateVal.length - 1]
        // 设置等级
        this.cateList.cat_level = this.cateVal.length
      } else {
        this.cateList.cat_pid = 0
        this.cateList.cat_level = 0
      }
    },
    // 添加分类提交
    addCateClick () {
      // 判断是否符合规范
      this.$refs.cateRulesRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const data = await addCate(this.cateList)
        if (data.meta.status !== 201) return this.$message.error('请求失败，请稍后重试')
        this.$message.success('添加成功')
        this.$emit('addCate')
      })
      // 清空form表单
      this.cateList = {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      }
      this.cateVal = ''
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader{
  width: 100%;
}
</style>
