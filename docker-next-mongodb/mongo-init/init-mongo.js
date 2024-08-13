db = db.getSiblingDB('mydatabase')

db.createCollection('example')
db.example.insertMany([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
])
