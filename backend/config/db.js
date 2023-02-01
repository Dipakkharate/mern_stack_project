const mongoose = require("mongoose")
exports.dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("mongo is connect");
    } catch (error) {
        console.log("error" + error);
    }
}