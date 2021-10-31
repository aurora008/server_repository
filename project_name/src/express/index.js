const express = require("express")

const startServer = (port) => {
    const app = express()
    app.listen(port | 3000)
    return app;
}
module.exports = { startServer }