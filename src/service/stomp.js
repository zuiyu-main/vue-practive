import Stomp from 'stompjs'
import Vue from 'vue'

if (typeof WebSocket == 'undefined') {
  console.log('不支持websocket')
}
// 初始化 ws 对象
// 8001 nginx代理请求
var ws = new WebSocket('ws://127.0.0.1:8001/ws')
// 获得Stomp client对象
var stompClient = Stomp.over(ws)
// 定义连接成功回调函数
var on_connect = function (x) {
  //data.body是接收到的数据
  console.log('stomp connection success')
  // route key
  stompClient.subscribe('/exchange/online/send.*', function (data) {
    var msg = data.body
    alert('收到数据：' + msg)
  })
}

// 定义错误时回调函数
var on_error = function () {
  console.log('stomp connection error')
}

var headers = {
  login: 'admin',
  passcode: 'admin',
  //虚拟主机，默认“/”
  host: 'my_vhost',
  'heart-beat': '0,0'
}
stompClient.connect(headers, on_connect, on_error)




Vue.prototype.$stompClient = stompClient
window.stompClient = stompClient






