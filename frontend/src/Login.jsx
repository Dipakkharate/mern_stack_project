import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from "gapi-script"
import axios from 'axios';
export default function Login() {
    const responseGoogleSuccess = async (res) => {
        console.log(res.tokenId);
        const { data } = await axios.post("http://localhost:5000/api/auth/google", { tokenId: res.tokenId })
        console.log(data);
    };

    const responseGoogleFail = () => {

    }
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: "541159612409-uk4dai5j3c3c38tageldkp6h4ua10ild.apps.googleusercontent.com",
                scope: ""
            })
        })
    }, [])

    return (
        <>
            <GoogleLogin
                clientId="541159612409-uk4dai5j3c3c38tageldkp6h4ua10ild.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
                cookiePolicy={'single_host_origin'}
            />

        </>
    )
}
