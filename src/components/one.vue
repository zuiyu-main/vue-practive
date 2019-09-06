<template>
  <div>
    <h2>one 页面count值【{{count1}}】</h2>
    <button @click="addFun">one页面加1</button>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      count1: state => state.count
    })
  },
  methods: {
    addFun() {
      this.$store.dispatch('addFun', 1)
    }
  }
}
</script>