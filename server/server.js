const app = require('express')()
const env = require('dotenv').config()
const {PORT} = process.env

app.use(express)

app.listen(PORT,()=>console.log(`server running at PORT :${PORT}`))