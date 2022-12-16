import express from 'express'
import auth from './routes/auth'
import dotenv from 'dotenv'
import { connect } from './utils/dbConnect'
const app = express()
dotenv.config()
app.use(express.json())
app.use('/api/auth',auth)



// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something went wrong!";
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack
//     });
// });

const PORT  = 3001;
app.listen(PORT,()=>{
    connect()
    console.log('server running');
})