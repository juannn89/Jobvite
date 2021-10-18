import React from 'react'
import {Link} from 'react-router-dom'


const SidebarProductos = () => {
    return (
        <nav className="menu-nav">
            <ul className="menu-contenedor">
                <li className="menu-item">
                    <Link to="/productos-buscar" className="menu-link">BUSQUEDA PRODUCTO</Link>
                </li>
                <li className="menu-item">
                    <Link to="/productos-registrar" className="menu-link">REGISTRO PRODUCTO</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarProductos

