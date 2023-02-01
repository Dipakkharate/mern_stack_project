const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const user = require("./../models/userModle");
const bcrypt = require("bcryptjs");

exports.loginWithGoogle = async (req, res) => {
    try {
        if (!req.body.tokenId) {
            return res.status(401).json({ message: "Please provide tokenID" });
        }
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
        const {
            payload: { email_verified, email, name, picture },
        } = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: process.env.GOOGLE_CLIENT,
        });
        // console.log(result);
        if (!email_verified) {
            return res.status(401).json({
                meesage: "Unautherized",
            });
        }
        const result = await user.findOne({ email });
        if (result) {
            //login
            const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);
            res.json({
                message: "Login success",
                token,
                result: {
                    name,
                    email,
                    profile: picture,
                },
            });
        } else {
            //register
            const password = bcrypt.hashSync("123", 10);
            const register = await user.create({
                name,
                email,
                profile: picture,
                password,
            });
            const token = jwt.sign({ id: register._id }, process.env.JWT_KEY);
            res.json({
                message: "SignUp success",
                token,
                result: {
                    name,
                    email,
                    profile: picture,
                },
            });
        }
        // console.log(req.body);
    } catch (error) {
        res.json({ message: `Error${error}` });
    }
};
// const { OAuth2Client } = require("google-auth-library")
// const user = require("../models/userModle")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")


// exports.loginWithGoogle = async (req, res) => {
//     try {
//         if (!req.body.tokenId) {
//             return res.status(401).json({
//                 meassge: "please proved  email"
//             })
//         }
//         const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
//         const { payload: email_verified, email, name, picture } = await client.verifyIdToken({ idToken: req.body.tokenId, audience: process.env.GOOGLE_CLIENT })
//         if (!email_verified) {
//             return res.status(401).json({
//                 meassge: "unauthorised"
//             })
//         }

//         const result = await user.findOne({ email })
//         console.log(result);
//         if (result) {
//             const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)
//             res.json({
//                 message: "Login Success",
//                 token,
//                 result: {
//                     name,
//                     email,
//                     profile: picture
//                 }
//             })
//         } else {
//             const password = bcrypt.hashSync("123", 10)
//             const register = await user.create({
//                 name,
//                 email,
//                 profile: picture,
//                 password
//             });
//             const token = jwt.sign({ id: register._id }, process.env.JWT_KEY)
//             res.json({
//                 message: "signup Success",
//                 token,
//                 result: {
//                     name,
//                     email,
//                     profile: picture
//                 }
//             })
//         }

//     } catch (error) {
//         res.json({
//             meassge: `error $ {error}`
//         })

//     }
// };


// // LoginTicket {
// //     envelope: {
// //         alg: 'RS256',
// //             kid: '713fd68c966e29380981edc0164a2f6c06c5702a',
// //                 typ: 'JWT'
// //     },
// //     payload: {
// //         iss: 'accounts.google.com',
// //             azp: '541159612409-uk4dai5j3c3c38tageldkp6h4ua10ild.apps.googleusercontent.com',
// //                 aud: '541159612409-uk4dai5j3c3c38tageldkp6h4ua10ild.apps.googleusercontent.com',
// //                     sub: '117763275830465094851',
// //                         email: 'dipakkharte22@gmail.com',
// //                             email_verified: true,
// //                                 at_hash: 'yJbaTNCKrqdmNmoanpQfuA',
// //                                     name: 'dipak kharate',
// //                                         picture: 'https://lh3.googleusercontent.com/a/ALm5wu18eaLmFApTB4nzz1eDR_IIoiYtDpnGTHxXExbp=s96-c',
// //                                             given_name: 'dipak',
// //                                                 family_name: 'kharate',
// //                                                     locale: 'en',
// //                                                         iat: 1668174168,
// //                                                             exp: 1668177768,
// //                                                                 jti: '3702b6c57a1b49eac5f0f384bdc15e7a11cd4e7a'
// //     }
// // }