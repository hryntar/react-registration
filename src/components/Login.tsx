import { FC, useRef, useEffect, useState } from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/auth";

const Login: FC = () => {
   const { setAuth} = useAuth();

   const navigate = useNavigate();
   const location = useLocation();
   const from: string = location.state?.from?.pathname || "/";

   const userRef = useRef<HTMLInputElement>(null);
   const errRef = useRef<HTMLInputElement>(null);


   const [user, resetUser, userAttribs] = useInput("user" ,'');
   const [pwd, setPwd] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const [check, toggleCheck] = useToggle("persist", false); 

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      setErrMsg("");
   }, [user, pwd]);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         });
         console.log(JSON.stringify(response?.data));
         const accessToken = response?.data?.accessToken;
         const roles = response?.data?.roles;
         setAuth({ user, pwd, roles, accessToken });
         // setUser("");
         resetUser('');
         setPwd("");
         navigate(from, { replace: true });
      } catch (error) {
         const axiosError = error as AxiosError;
         if (!axiosError?.response) {
            setErrMsg("No server response");
         } else if (axiosError.response?.status === 400) {
            setErrMsg("Missing username or password");
         } else if (axiosError.response?.status === 401) {
            setErrMsg("Unauthorized");
         } else {
            setErrMsg("Something went wrong(. Try later");
         }
         errRef.current?.focus();
         console.error(axiosError);
      }
   }; 



   return (
      <section>
         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
         </p>
         <h1>Sign In</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
               type="text"
               id="username"
               ref={userRef}
               autoComplete="off"
               // onChange={(e) => setUser(e.target.value)}
               // value={user}
               {...userAttribs}
               required
            />

            <label htmlFor="password">Password:</label>
            <input
               type="password"
               id="password"
               autoComplete="off"
               onChange={(e) => setPwd(e.target.value)}
               value={pwd}
               required
            />

            <button type="submit">Sign In</button>
            <div className="persistCheck">
               <input
                  type="checkbox"
                  id="persist"
                  onChange={toggleCheck}
                  checked={check}
               />
               <label htmlFor="persist">Trust this device</label>
            </div>
         </form>
         <p>
            Don't have an account?
            <br />
            <span className="line">
               <Link to="/register">Sign Up</Link>
            </span>
         </p>
      </section>
   );
};

export default Login;
