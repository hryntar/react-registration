import { FC } from "react";
import { useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth: FC<{allowedRoles: number[]}> = ({allowedRoles}) => {
   const {auth} = useAuth(); 
   const location = useLocation();

   return (
      // auth?.user.length
      //    ? <Outlet />
      //    : <Navigate to='/login' state={{from: location}} replace />
      auth?.roles?.find(role => allowedRoles?.includes(role))
         ? <Outlet />
         : auth?.accessToken.length 
            ? <Navigate to="/unauthorized" state={{from: location}} replace/>
            : <Navigate to='/login' state={{from: location}} replace />
   );
};

export default RequireAuth;
