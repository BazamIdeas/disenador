module.exports = {
  apps : [
      {
        name: "disenador",
        script: "./app.js",
        watch: true,
        ignore_watch : ["node_modules", "public/tmp", "fuentes"],
        env: {
          "NODE_ENV": "produccion",
        },
        env_test: {
          "NODE_ENV": "test",
        }
      }
  ]
}