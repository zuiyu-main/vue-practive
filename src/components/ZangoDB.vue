<template>
  <div>
    <h1>zangodb</h1>
    <button @click="search">查找</button>
  </div>
</template>
<script >
let db = new zango.Db('mydb', { people: ['age'] })
let people = db.collection('people')

let docs = [
  { name: 'Frank', age: 20 },
  { name: 'Thomas', age: 33 },
  { name: 'Todd', age: 33 },
  { name: 'John', age: 28 },
  { name: 'Peter', age: 33 },
  { name: 'George', age: 28 }
]

people
  .insert(docs)
  .then(() => {
    return people
      .find({
        name: { $ne: 'John' },
        age: { $gt: 20 }
      })
      .group({
        _id: { age: '$age' },
        count: { $sum: 1 }
      })
      .project({
        _id: 0,
        age: '$_id.age'
      })
      .sort({
        age: -1
      })
      .forEach(doc => console.log('doc:', doc))
  })
  .catch(error => console.error(error))
// and fal
export default {
  data() {
    return {}
  },
  methods: {
    search() {
      console.log('search')
      let db = new zango.Db('mydb', { people: ['age'] })
      let people = db.collection('people')
      people
        .find({ name: { $regex: /Geo/ } })
        .toArray()
        .then(res => {
          console.log('resres', res)
        })
    }
  }
}
</script>

