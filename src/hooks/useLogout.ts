import axios from "../api/axios";
import useAuth from "./useAuth";
import { authInitialState } from "../context/AuthProvider";

const useLogout = () => {
   const {setAuth}  = useAuth();

   const logout = async () => {
      setAuth(authInitialState);
      try {
         await axios('/logout', {
            withCredentials: true
         })
      } catch (error) {
         console.error(error); 
      }
   }
   return logout;
}

export default useLogout;