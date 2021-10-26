import React from 'react'
import { Link } from 'react-router-dom'



const SidebarUsuarios = () => {

    return (
        <div>
        {<nav className="menu-nav">
            <ul className="menu-contenedor">
                    <button className="menu-item">
                    <Link to ="/" className="menu-link">cerrar sesión</Link>
                </button>
            </ul>
        </nav>}
            
        </div>
    )
}

export default SidebarUsuarios

