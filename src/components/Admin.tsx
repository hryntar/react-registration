import { FC } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";

const Admin: FC = () => {
   return (
      <section>
         <h1>Admins Page</h1>
         <br />
         <Users />
         <br />
         <div className="flexGrow">
            <Link to="/">Home</Link>
         </div>
      </section>
   );
};

export default Admin;
