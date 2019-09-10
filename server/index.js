require("dotenv").config()
const express = require('express')
const session = require("express-session")
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')
let {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)

app.use(checkForSession)



app.post("/api/register", authController.register)
app.post("/api/login", authController.login)
app.post("/api/signout", authController.signout)
app.get("/api/user", authController.getUser)

app.get("/api/swag", swagController.read)

app.post("/api/cart/checkout", cartController.checkout)
app.post("/api/cart/:id", cartController.add)
app.delete("/api/cart/:id", cartController.delete)

app.get("/api/search", searchController.search)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening to ${SERVER_PORT}.`)
})
