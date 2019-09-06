<template>
  <div>
    <h1>vuex</h1>
    <h2>
      <a href="https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc">学习地址</a>
    </h2>
    <h2>我是页面读取的 [{{this.$store.state.count}}]</h2>
    <h2>我是getter计算之后的[ {{this.$store.getters.getStateCount}}]</h2>
    <p>count 的值{{this.$store.state.count}}</p>
    <h2>mapState 获取的值[{{count1}}]</h2>
    <one></one>
    <button @click="addFun">+</button>
    <button @click="reductionFun">-</button>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import one from './one'
export default {
  name: 'vuex',
  components: {
    one
  },
  data() {
    return {
      msg: 'welcome vuex'
    }
  },
  computed: {
    ...mapState({
      count1: state => state.count
    })
  },
  methods: {
    addFun() {
      this.$store.dispatch('addFun', 10)
      // this.$store.commit('add')
    },
    reductionFun() {
      this.$store.dispatch('reductionFun', 10)
      // this.$store.commit('reduction')
    }
  }
}
</script>