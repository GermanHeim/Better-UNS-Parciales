migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ficpm89nv0m0ppr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lndffpj9",
    "name": "tipo",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "parcial",
        "final regular",
        "coloquio",
        "recuperatorio",
        "final libre"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ficpm89nv0m0ppr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lndffpj9",
    "name": "tipo",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "parcial",
        "final regular",
        "coloquio",
        "recuperatorio",
        "final libre"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
