const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth.routes"))

app.get('/',(req,res)=>{
    res.send("Homepage is working");
})


const connectDB = require("./config")
const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
})