<template>
  <div class="only-container">
    <el-table
      :data="onlyTableData"
      style="width: 100%">
      <el-table-column
        type="expand"
      ></el-table-column>
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
          <el-button type="danger" class="el-icon-delete">删除</el-button>
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
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
