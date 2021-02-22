// minix.js
export default {
  data () {
    return {
      name: 'minix',
      minixName: 'minixObj',
      flag: false
    }
  },
  mounted () {
    console.log('minixMounted')
  },
  methods: {
    speak () {
      console.log('this is minix')
    },
    getData () {
      console.log('getdata')
      return '100'
    }
  }
}
