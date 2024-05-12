const express = require('express')
const cors = require('cors')



const app = express()
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())


const uploadRouter = require('./Routes/UploadRouter')
const drawRouter = require('./Routes/DrawRouter')
const deleteRouter = require('./Routes/DeleteRouter')

app.use('/file',uploadRouter)  
app.use('/file',drawRouter)
app.use('/file', deleteRouter)


app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})

