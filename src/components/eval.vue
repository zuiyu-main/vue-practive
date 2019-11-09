<template>
  <div>
    eval
    <button @click="fun">调用吧</button>
  </div>
</template>
<script>
import * as testApi from '@/service/index'
export default {
  name: 'eval',
  methods: {
    fun() {
      console.log('dfdf')
      testApi.testindex({ type: 1, msg: 'hello' }).then(res => {
        console.log('方法返回', res)
      })
    }
  }
}
</script>