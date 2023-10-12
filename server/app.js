import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import dbConnection from './utils/dbConnection'
import userRouter from './routes/userRouter'
import adminRouter from './routes/adminRouter'


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(morgan("dev"))
app.use(cors({
    origin:'http://localhost:3000',
    credentials : true
}))
app.use(cookieParser())

app.use(logger("dev"));

app.use('/',userRouter)
app.use('/admin',adminRouter)


dbConnection()
// const db = mongoose.connection
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });


app.listen(4000, () => {
    console.log('App listening on port 4000');
})

export default app