<template>
  <div class="rights-container">
    <el-dialog
      title="提示"
      :visible.sync="newshowRightVisible"
      width="50%"
      @close="$emit('closeSetRight')"
      >
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        :default-checked-keys="defKeys"
        :props="treeProps"
        default-expand-all
        ref="treeRolus"
        >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newshowRightVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolusRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'RightsIndex',
  components: {},
  props: {
    showRightVisible: {
      type: Boolean,
      required: true
    },
    rightsList: {
      type: Array,
      required: true
    },
    defKeys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  watch: {},
  computed: {
    newshowRightVisible: {
      set (val) {
        this.$emit('showRightClick', val)
      },
      get () {
        return this.showRightVisible
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 添加权限
    addRolusRights () {
      // 获取全选和半选的权限
      const keys = [
        ...this.$refs.treeRolus.getCheckedKeys(),
        ...this.$refs.treeRolus.getHalfCheckedKeys()
      ]
      const id = keys.join(',')
      this.$emit('addRolesRights', id)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
