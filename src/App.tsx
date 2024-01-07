import { Route, Routes } from "react-router-dom";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

enum Role {
   User = 2001,
   Admin = 5320,
   Editor = 1808,
}

function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* Public routes */}
               <Route path="register" element={<Registration />} />
               <Route path="login" element={<Login />} />
               <Route path="linkpage" element={<LinkPage />} />
               <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<PersistLogin />}>
               {/* Protected routes */}
               <Route element={<RequireAuth allowedRoles={[Role.User]} />}>
                  <Route path="/" element={<Home />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
                  <Route path="admin" element={<Admin />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Editor]} />}>
                  <Route path="editor" element={<Editor />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Admin, Role.Editor]} />}>
                  <Route path="lounge" element={<Lounge />} />
               </Route>
            </Route>

            {/* Missing page */}
            <Route path="*" element={<Missing />} />
         </Route>
      </Routes>
   );
}

export default App;
