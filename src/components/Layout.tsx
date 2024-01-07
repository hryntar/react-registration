import { Outlet } from "react-router-dom";
import { FC } from "react";

const Layout: FC = () => {
   return (
      <main className="App">
         <Outlet />
      </main>
   );
};

export default Layout;
