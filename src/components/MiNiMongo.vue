<template>
  <div>
    <h1>mongodb</h1>
  </div>
</template>
<script>
var minimongo = require('minimongo')

var IndexedDb = minimongo.IndexedDb

// Create IndexedDb
var db = new IndexedDb(
  { namespace: 'mydb' },
  function() {
    // Add a collection to the database
    db.addCollection('animals', function() {
      var doc = {
        species: 'testdog',
        name: '新建文件加的name989',
        test: {
          id: 989,
          name: 999
        }
      }

      // Always use upsert for both inserts and modifies
      db.animals.upsert(doc, function() {
        // Success:

        // Query dog (with no query options beyond a selector)
        db.animals.findOne({ species: 'dog' }, {}, function(res) {
          console.log("Dog's name is: " + res.name)
        })
        db.animals.findOne({ species: { $regex: /te/ } }, {}, function(res) {
          console.log("Dog's name is111: " + res.name)
        })
        const thisParams = {
          'test.name': 999
        }
        db.animals.findOne(thisParams, {}, function(res) {
          console.log("Dog's name is111 elem: " + res.name)
        })
        db.animals.findOne(thisParams, {}, function(res) {
          console.log("Dog's name is111 elem count: " + res.name)
        })
      })
    })
  },
  function() {
    alert('some error!')
  }
)
export default {}
</script>