module.exports = {
  apps : [
      {
        name: "disenador",
        script: "./app.js",
        watch: true,
        env: {
          "NODE_ENV": "produccion",
        }
      }
  ]
}