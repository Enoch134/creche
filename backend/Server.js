import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import db from "./config/Database.js"
import bodyParser from 'body-parser'
import  SequelizeStore from 'connect-session-sequelize'
import session from 'express-session'
import flash from 'express-flash'
import UserRoute from "./routes/UserRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import RegisterRoute from "./routes/RegisterRoute.js"

const app = express()
app.use(express.static('./public'))

// body-parser middleware use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(flash());

app.use(session({
    secret: process.env.SESS_SECRET="secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        
    }
}));

(async()=>{
    await db.sync();
})();


app.use(cors())


app.use(UserRoute)
app.use(AuthRoute)
app.use(RegisterRoute)



dotenv.config()
const PORT = process.env.PORT || 3902
app.listen(PORT,(error) =>{
    error ? console.log(error):console.log(`Server is running on http://localhost:${PORT}`)
})
