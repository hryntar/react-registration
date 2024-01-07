import { useEffect, useRef, useState, FC } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../api/axios";
import { Link } from "react-router-dom";

const USER_REGEX: RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

const REGISTER_URL: string = "/register";

const Registration: FC = () => {
   const userRef = useRef<HTMLInputElement>(null);
   const errRef = useRef<HTMLInputElement>(null);

   const [user, setUser] = useState("");
   const [validUser, setValidUser] = useState(false);
   const [userFocus, setUserFocus] = useState(false);

   const [pwd, setPwd] = useState("");
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd] = useState("");
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errMsg, setErrMsg] = useState("");
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      const result = USER_REGEX.test(user);
      setValidUser(result);
   }, [user]);
   useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      setValidPwd(result);
      setValidMatch(pwd === matchPwd);
   }, [pwd, matchPwd]);

   useEffect(() => {
      setErrMsg("");
   }, [user, pwd, matchPwd]);

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
         setErrMsg("Invalid Entry");
         return;
      }
      try {
         const response = await axios.post(REGISTER_URL, { user, pwd });
         console.log(response);
         setSuccess(true);
      } catch (error) {
         setErrMsg("Some error. Try later");
         console.error(error);
      }
   }

   return (
      <>
         {success ? (
            <section>
               <h1>You successfully registered an account </h1>
               <p>
                  <Link to="/login">Sign In</Link>
               </p>
            </section>
         ) : (
            <section>
               <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                  {errMsg}
               </p>
               <h1>Register</h1>
               <form onSubmit={handleSubmit}>
                  <label htmlFor="username">
                     Username:
                     <FontAwesomeIcon icon={faCheck} className={validUser ? "valid" : "hide"} />
                     <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "invalid"} />
                  </label>
                  <input
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     onChange={(e) => setUser(e.target.value)}
                     required
                     aria-invalid={validUser ? "false" : "true"}
                     aria-describedby="uidnote"
                     onFocus={() => setUserFocus(true)}
                     onBlur={() => setUserFocus(false)}
                  />
                  <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     4 to 24 characters.
                     <br />
                     Must begin with a letter.
                     <br />
                     Letters, numbers, underscores, hyphens allowed.
                  </p>

                  <label htmlFor="password">
                     Password:
                     <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                     <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                  </label>
                  <input
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
                     aria-invalid={validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                     onFocus={() => setPwdFocus(true)}
                     onBlur={() => setPwdFocus(false)}
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     8 to 32 characters.
                     <br />
                     Must include uppercase and lowercase letters, a number.
                     <br />
                  </p>

                  <label htmlFor="confirm_pwd">
                     Confirm Password:
                     <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                     <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                  </label>
                  <input
                     type="password"
                     id="confirm_pwd"
                     onChange={(e) => setMatchPwd(e.target.value)}
                     value={matchPwd}
                     required
                     aria-invalid={validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                     onFocus={() => setMatchFocus(true)}
                     onBlur={() => setMatchFocus(false)}
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                     <FontAwesomeIcon icon={faInfoCircle} />
                     Must match the first password input field.
                  </p>

                  <button disabled={!validUser || !validPwd || !validMatch ? true : false}>Sign Up</button>
               </form>
               <p>
                  Already registered?
                  <br />
                  <span className="line">
                     <Link to="/login">Sign In</Link>
                  </span>
               </p>
            </section>
         )}
      </>
   );
};

export default Registration;
