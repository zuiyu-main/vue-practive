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
      var doc = { species: 'dog', name: '新建文件加的name' }

      // Always use upsert for both inserts and modifies
      db.animals.upsert(doc, function() {
        // Success:

        // Query dog (with no query options beyond a selector)
        db.animals.findOne({ species: 'dog' }, {}, function(res) {
          console.log("Dog's name is: " + res.name)
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