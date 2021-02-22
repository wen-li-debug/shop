<template>
  <div class="">
    {{date | newDate('323')}}
    <button @click="speak">点击</button>
  </div>
</template>

<script>
import mixin1 from '@/utils/minix1'

export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      date: '2012-01-12'
    }
  },
  mixins: [mixin1],
  watch: {},
  computed: {},
  filters: {
    newDate (val, message) {
      console.log(val, message)
      return val + '11'
    }
  },
  created () {},
  mounted () {
    console.log('minixMounted1')
    this.getData()
    console.log(this.version)
  },
  methods: {
    speak () {
      console.log('this is minix1')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
