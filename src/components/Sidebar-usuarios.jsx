import React from 'react'
import {Link} from 'react-router-dom'

const SidebarUsuarios = () => {
    return (
        <nav className="menu-nav">
            <ul className="menu-contenedor">
                <li className="menu-item">
                    <Link to="/usuarios-buscar" className="menu-link">Busqueda usuario</Link>
                </li>
                <li className="menu-item">
                    <Link to="/usuarios-registrar" className="menu-link">Registro usuario</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarUsuarios
