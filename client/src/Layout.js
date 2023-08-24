import React from 'react'
import { Outlet , useLocation} from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  const location = useLocation();
  const headerExcludedPaths = ['/login', '/register'];

  const shouldRenderHeader = !headerExcludedPaths.includes(location.pathname);
  return (
    <main>
       {shouldRenderHeader &&  <Header />}
        <Outlet />
    </main>
  )
}

export default Layout;