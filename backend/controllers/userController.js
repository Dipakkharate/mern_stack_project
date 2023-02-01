const user = require("../models/userModle")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.registerUser = async (req, res) => {
    try {

        const result = await user.create(req.body)

        res.status(201).json({
            message: "reegister successfully",
            result

        })
    } catch (error) {
        res.status(402).json({
            message: "error" + error
        })

    }
}
exports.getAllUser = async (req, res) => {
    try {
        // console.log(req.query);
        // const page = +req.query.page
        // const perpage = +req.query.perpage
        const page = parseInt(req.query.page || "0")
        const perpage = req.query.perpage === "0" ? 5 : parseInt(req.query.perpage || "5")
        console.log(page, perpage);

        const total = await user.countDocuments()
        const result = await user.find().skip(page * perpage).limit(perpage)
        res.json({
            // count: result.length,
            totalBtn: Math.ceil(total / perpage),
            message: "fetch Successs",
            result
        })
    } catch (error) {
        res.status(402).json({
            message: "error" + error
        })

    }
}
exports.deleteAllUser = async (req, res) => {
    try {
        const result = await user.deleteMany()
        res.json({
            message: "delete all succesfilly Successs",

        })
    } catch (error) {
        res.status(402).json({
            message: "error" + error
        })

    }
}



// exports.loginUser = async (req, res) => {
//     try {
//         const result = await user.findOne({ email: req.body.email })
//         if (!result) {
//             return res.status(400).json({
//                 message: "email not register with us"
//             })
//         }

//         const varify = await bcrypt.compare(req.body.password, result.password)
//         if (!varify) {
//             return res.json({
//                 message: "password not match"
//             })
//         }

//         const token = jwt.sign({ id: result._id }, process.env.JWT_KEY, { expiresIn: "1w" })
//         res.json({
//             message: "user Login",
//             result: {
//                 name: result.name,
//                 email: result.email,
//                 token
//             }
//         })
//     } catch (error) {
//         res.status(402).json({
//             message: "error" + error
//         })

//     }
// }

