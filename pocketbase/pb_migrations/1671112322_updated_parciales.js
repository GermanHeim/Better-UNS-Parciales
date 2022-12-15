migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ficpm89nv0m0ppr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ec1v3xx",
    "name": "archivos",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "maxSize": 5242880,
      "mimeTypes": [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ficpm89nv0m0ppr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ec1v3xx",
    "name": "archivos",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "maxSize": 5242880,
      "mimeTypes": [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
