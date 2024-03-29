import { FC } from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

interface IUser {
   username: string;
}

const Users: FC = () => {
   const [users, setUsers] = useState<IUser[]>([]);
   const axiosPrivate = useAxiosPrivate();

   const navigate = useNavigate();
   const location = useLocation();


   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getUsers = async () => {
         try {
            const response = await axiosPrivate.get("/users", {
               signal: controller.signal,
            });
            console.log(response.data);
            isMounted && setUsers(response.data);
         } catch (error) {
            if (isMounted) {
               console.error(error); 
               navigate('/login', {state: {from: location}, replace: true})
            }
         }
      };

      getUsers();

      return () => {
         isMounted = false;
         controller.abort();
      };
   }, []);

   return (
      <article>
         <h2>Users list</h2>
         {users?.length ? (
            <ul>
               {users.map((user, idx) => (
                  <li key={idx}>{user?.username}</li>
               ))}
            </ul>
         ) : (
            <p>No users to display</p>
         )}
      </article>
   );
};

export default Users;
