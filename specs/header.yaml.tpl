swagger: '2.0'
info:
  title: MrKoa
  version: "{{version}}"
host: "{{host}}"
basePath: /api/v1
schemes:
  - https
consumes:
  - application/json
produces:
  - application/json
securityDefinitions:
  token:
    type: apiKey
    name: Authorization
    in: header
