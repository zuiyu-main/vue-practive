<template>
  <div>
    <h1>indexdb</h1>
    <button @click="getNum('name')">getNum</button>
    <button @click="add()">add</button>
  </div>
</template>
<script>
const customerData = [
  { ssn: '1111', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '52222', name: 'Donna', age: 32, email: 'donn1a@home.org' },
  { ssn: '3333', name: '12', age: 32, email: 'donna2@home.org' },
  { ssn: '4444', name: 'we', age: 32, email: 'donn3a@home.org' },
  { ssn: '4444555', name: 'da', age: 32, email: 'don4na@home.org' },
  { ssn: '666', name: 'Donsna', age: 32, email: 'don5na@home.org' }
]
var db
var request = indexedDB.open('MyTestDatabase')
request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!")
}
request.onsuccess = function(event) {
  db = event.target.result
  var transaction = db.transaction(['customers'])
  var objectStore = transaction.objectStore('customers')
  var request = objectStore.get('444-44-4444')
  request.onerror = function(event) {
    // 错误处理!
  }
  request.onsuccess = function(event) {
    // 对 request.result 做些操作！
    // alert('Name for SSN 444-44-4444 is ' + request.result.name)
  }
}

request.onupgradeneeded = function(event) {
  db = event.target.result
  // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
  // 因为 ssn 可以保证是不重复的
  var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

  // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
  objectStore.createIndex('name', 'name', { unique: false })

  // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
  objectStore.createIndex('email', 'email', { unique: true })

  // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
  objectStore.transaction.oncomplete = function(event) {
    // 将数据保存到新创建的对象仓库
    var customerObjectStore = db
      .transaction('customers', 'readwrite')
      .objectStore('customers')
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer)
    })
  }
}
export default {
  data() {
    return {
      num: 0,
      customerData: [
        {
          ssn: '444-44-4444',
          name: 'Bill',
          age: 35,
          email: 'bill@company.com'
        },
        {
          ssn: '555-55-5555',
          name: 'Donna',
          age: 32,
          email: 'donn1a@home.org'
        },
        { ssn: '555-55-6666', name: '12', age: 32, email: 'donn2a@home.org' },
        { ssn: '555-55-7777', name: 'we', age: 32, email: 'donn3a@home.org' },
        { ssn: '555-55-8888', name: 'da', age: 32, email: 'donna4@home.org' },
        {
          ssn: '555-55-9999',
          name: 'Donsna',
          age: 32,
          email: 'don5na@home.org'
        }
      ]
    }
  },
  methods: {
    getNum(indexName) {
      console.log('numnum', indexName, db)
      var transaction = db.transaction(['customers'])
      var objectStore = transaction.objectStore('customers')
      var myIndex = objectStore.index('name')
      var countRequest = myIndex.count()
      countRequest.onsuccess = function() {
        console.log('nameindexnum666', countRequest.result)
      }
    },
    add() {
      var transaction = db.transaction(['customers'], 'readwrite')
      var objectStore = transaction.objectStore('customers')
      this.customerData.forEach(function(customer) {
        var request = objectStore.add(customer)
        request.onsuccess = function(event) {
          // event.target.result === customer.ssn;
        }
      })
    }
  },
  created() {},
  mounted() {}
}
</script>