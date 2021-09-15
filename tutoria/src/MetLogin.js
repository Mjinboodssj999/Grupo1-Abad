import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Componentes/Login";
import { LogoutButton } from "./Componentes/Logout";
import { Profile } from "./Componentes/Profile"
import Coordinador from './pages/Coordinador/Coordinador.js';
function MetLogin() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <Coordinador />
          <Profile />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  )
}

export default MetLogin
