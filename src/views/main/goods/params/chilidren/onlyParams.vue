<template>
  <div class="only-container">
    <el-table
      :data="onlyTableData"
      style="width: 100%">
      <el-table-column
        type="expand"
      >
        <template v-slot="scope">
          <el-tag v-for="(item, id) in scope.row.attr_vals" :key="id" closable @close="closeTag(id, scope.row)">
            {{item}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
      ></el-table-column>
      <el-table-column
        prop="attr_name"
        label="参数名称"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="scope">
          <el-button type="primary" class="el-icon-edit" @click="$emit('editParams', { attrId: scope.row.attr_id, attr_sel: 'only' })">修改</el-button>
          <el-button type="danger" class="el-icon-delete" @click="$emit('delParams', scope.row.attr_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'OnlyParams',
  components: {},
  props: {
    onlyTableData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    handleInputConfirm (row) {
      // 判断是否有值
      if (row.inputValue.trim().length === 0) {
        row.inputVisible = false
        row.inputValue = ''
        return
      }
      // input有值
      row.attr_vals.push(row.inputValue)
      row.inputValue = ''
      row.inputVisible = false
      console.log(row.attr_vals)
      // 发送请求
      this.$emit('upAttr', row)
    },
    showInput (row) {
      row.inputVisible = true
      // input自动获取焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 删除tag
    closeTag (id, row) {
      row.attr_vals.splice(id, 1)
      this.$emit('upAttr', row)
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag{
  margin: 10px;
}
.input-new-tag{
  width: 120px;
}
</style>
