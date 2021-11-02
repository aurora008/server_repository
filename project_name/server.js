require("dotenv/config")
const { startServer } = require("./src/express")
const userLoginRouter = require("./src/express/userLoginRouter")
const userRegisterRouter = require("./src/express/userRegisterRouter")


const app = startServer(process.env.SERVER_PORT);
app.use('/userLogin', userLoginRouter)
app.use('/userRegister', userRegisterRouter)
//=============
const config = require('./src/config')
app.get('/', (req, res) => {
    res.send(config)
})
//app.use(cors())

