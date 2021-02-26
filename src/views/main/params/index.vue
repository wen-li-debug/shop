<template>
  <div class="params-container">
    <div>
      {{message}}
    </div>
    <div>
      <input type="text" v-model.trim="ip1">
    </div>
    <ul>
      <li is="Demo"></li>
    </ul>
    <button @click="btn">改变</button>
  </div>
</template>

<script>
import Demo from './demo'

export default {
  name: 'ParamsIndex',
  components: {
    Demo
  },
  props: {},
  data () {
    return {
      message: 1,
      ip1: ''
    }
  },
  watch: {
    message: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      immediate: true
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    btn () {
      this.message++
      console.log(this.ip1)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
