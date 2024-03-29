import { FC } from "react";
import { Link } from "react-router-dom";

const Editor: FC = () => {
   return (
      <section>
         <h1>Editors Page</h1>
         <br />
         <p>You must have been assigned an Editor role.</p>
         <div className="flexGrow">
            <Link to="/">Home</Link>
         </div>
      </section>
   );
};

export default Editor;