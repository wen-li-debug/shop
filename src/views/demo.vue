<template>
  <div class="" ref="demoRef">{{message}}
    <div>
      <button @click="btn">改变set</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      message: [1, 2, 3]
    }
  },
  watch: {},
  computed: {},
  created () {
    this.$nextTick(() => {
      console.log(11, this.$refs.demoRef)
    })
  },
  mounted () {},
  methods: {
    btn () {
      this.$set(this.message, 1, 14)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
