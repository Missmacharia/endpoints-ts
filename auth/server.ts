import express from 'express'
import dotenv from 'dotenv'

// import cors from 'cors'

dotenv.config()
import auth_router from './routes/auth_routes'

const app= express()

app.use(express.json())
// app.use(cors())

app.use("/api/auth", auth_router)

app.listen(4000, ()=>{
    console.log(`server running 4000`);
    
})


