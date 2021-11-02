const express = require("express")

const startServer = (port) => {
    const app = express()
    app.listen(port)
    return app;
}
module.exports = { startServer }