import React from 'react'
import {Link} from 'react-router-dom'


const SidebarUsuarios = () => {
    return (
        <nav className="menu-nav">
            <ul className="menu-contenedor">
                <li className="menu-item">
                    <Link to ="/" className="menu-link">cerrar sesión</Link>
                </li>
            </ul>
        </nav>  
    )
}

export default SidebarUsuarios

