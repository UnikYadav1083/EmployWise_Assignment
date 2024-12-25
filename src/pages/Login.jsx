import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios";
function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [validateEmail, setValidateEmail] = useState("");
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            alert("already logged in");
            setTimeout(() => { navigate("/userlist") }, 700);
        }
    })
    return (
        <div className="flex items-center justify-center w-screen h-screen p-1">
            <div className="p-4 text-center border-2 border-black rounded-xl">
                <div className="py-4 text-4xl font-bold">
                    Login
                </div>
                <div className="px-4 pt-1 pb-4 text-sm text-slate-500">
                    Enter your credentials to access your account
                </div>
                <div >
                    <InputBox onChange={(e) => { setUserName(e.target.value) }} heading="Email" plchldr="johndoe@example.com" />
                    <div className="flex justify-start">
                        {validateEmail ? <div className="text-sm text-red-800 bg-red-5">{validateEmail}</div> : <></>}
                    </div>
                </div>
                <InputBox onChange={(e) => { setPassword(e.target.value) }} heading="Password" plchldr="******" type="password" />
                <Button onClick={() => {

                    if (!username) {
                        setValidateEmail("Required");
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
                        setValidateEmail('Invalid email address');
                    }
                    else {
                        axios.post("https://reqres.in/api/login", {
                            username,
                            password
                        }).then((response) => {
                            console.log(response);
                            setSuccess(true);
                            localStorage.setItem("token", response.data.token);
                            navigate("/userlist");
                        }).catch((err) => {
                            console.log(err);
                            setError(true)
                        });
                    }

                }} btnm="Login" />
                {success ?
                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" >
                        <span class="font-medium">Successfully Loggedin</span>
                    </div> :
                    <></>}
                {error ?
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " >
                        <p class="font-medium">Something went wrong</p>
                        <p>Check if correct email or password is given</p>
                    </div> :
                    <></>
                }
                <BottomWarning to="/" label="Don't have an account" buttonText="SignUp" />
            </div>
        </div>);
}
export default Login;
