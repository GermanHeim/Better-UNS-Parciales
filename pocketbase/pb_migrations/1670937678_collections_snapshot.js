migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2022-12-03 18:26:45.043Z",
      "updated": "2022-12-10 23:47:24.711Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif"
            ],
            "thumbs": null
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "ficpm89nv0m0ppr",
      "created": "2022-12-05 15:36:50.845Z",
      "updated": "2022-12-13 01:18:46.597Z",
      "name": "parciales",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "zukwktto",
          "name": "materia",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "analisis-matematico-i",
              "analisis-matematico-ii",
              "fisica-ii",
              "derecho-constitucional",
              "sociologia",
              "fisica-i"
            ]
          }
        },
        {
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
        },
        {
          "system": false,
          "id": "sg0uxrwh",
          "name": "fecha",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "xz7hl6je",
          "name": "profesor",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "medupja3",
          "name": "descripcion",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 256,
            "pattern": ""
          }
        },
        {
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
        },
        {
          "system": false,
          "id": "19koscoa",
          "name": "numero",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
