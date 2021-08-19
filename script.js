const schema = require('./input.json')

const data = []

for (const key in schema) {
  const value = schema[key]
  const customField = key.toLowerCase().includes('custom')
  data.push({
    "custom_field": customField,
    "field_name": value,
    "internal_field_name": key
  })
}

const createCsvWriter = require('csv-writer').createObjectCsvWriter
const writer = createCsvWriter({
  path: 'output.csv',
  header: [
    {
      id: 'field_name',
      title: 'Field Name'
    },
    {
      id: 'internal_field_name',
      title: 'Internal Field Name'
    },
    {
      id: 'custom_field',
      title: 'Is Custom Field'
    }
  ]
})

writer
  .writeRecords(data)
  .then(()=> console.log('Done!'))
