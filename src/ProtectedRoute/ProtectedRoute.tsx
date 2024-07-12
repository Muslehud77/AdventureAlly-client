import { ReactNode } from "react";

type ProtectedRouteProps = {
  children:ReactNode
};

const ProtectedRoute = ({children}:ProtectedRouteProps) => {

    // const 


  return (
    <div>
     <h1>This is ProtectedRoute</h1>
    </div>
  );
};

export default ProtectedRoute;