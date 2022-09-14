import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ component: Component, ...restOfProps }) {

    const { user } = useSelector(
        (state) => state.auth
      )
  
      if( !user ) {
        return <Navigate to="/" replace />
      }

      return <Outlet />
  }


export default ProtectedRoute;
