const express = require("express")
require("dotenv").config({ path: "./config/.env" })
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const app = express()
const cors = require("cors")
const { dbConnect } = require("./config/db")
dbConnect()


app.use(cors())
app.use(express.json())
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
    if (err) {
        console.log("error" + err);
    } else {
        console.log(`SERVER IS RUNNIG ON http://localhost: ${PORT}`);
    }
})
