import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


const SidebarUsuarios = () => {
    const { logout } = useAuth0();

    const cerrarSesion = () => {
        logout({ returnTo: 'http://localhost:3000/inicio' });
        localStorage.setItem('token', null);
    };
    return (
        <div>
        {<nav className="menu-nav">
            <ul className="menu-contenedor">
                    <button className="menu-item">
                    <Link to ="/" className="menu-link">cerrar sesión</Link>
                </button>
            </ul>
        </nav>}
            <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
        </div>
    )
}

export default SidebarUsuarios

