import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function PublicRoute({ component: Component, ...restOfProps }) {

    const { user } = useSelector(
        (state) => state.auth
      )
  
      if( user ) {
        return <Navigate to="/dashboard" replace />
      }

      return <Outlet />
  }


export default PublicRoute;
