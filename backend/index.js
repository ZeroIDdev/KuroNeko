import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(`Request made to ${req.url}`)
    next();
})
app.use('/api/user',userRouter)
// URL koneksi ke server MongoDB lokal
const url = 'mongodb://localhost:27017/Anime';

// Terhubung ke MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Koneksi ke MongoDB gagal:'));
db.once('open', () => {
    console.log('Terhubung ke MongoDB');})


app.listen(4000,()=>{
    console.log(`listening on http://localhost:4000`)
})