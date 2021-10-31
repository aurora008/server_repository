require("dotenv/config")
const { startServer } = require("./src/express")
const userLoginRouter = require("./src/express/userLoginRouter")
//const cors = require("cors")

const app = startServer(process.env.SERVER_PORT);
app.use('/userLogin', userLoginRouter)
//=============
const config = require('./src/config')
app.get('/', (req, res) => {
    res.send(config)
})
//app.use(cors())

