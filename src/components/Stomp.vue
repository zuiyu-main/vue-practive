<template>
  <div>
    <span>stompClient</span>
    <button @click="sendMsg">/exchange/mytest/send.*</button>
  </div>
</template>
<script>
import Stomp from 'stompjs'
import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../service/config'
export default {
  name: 'entry',
  data() {
    return {}
  },
  created() {},
  methods: {
    sendMsg() {
      // 要发送的key
      this.$stompClient.send('/exchange/online/send.1', {}, '{id:1}')
    }
  }
}
</script>