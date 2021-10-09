import React from 'react'
import {Link} from 'react-router-dom'

const SidebarVentas = () => {
    return (
        <nav className="menu-nav">
            <ul className="menu-contenedor">
                <li className="menu-item">
                    <Link to="/ventas-registrar" className="menu-link">registro venta</Link>
                </li>
                <li className="menu-item">
                    <Link to="/ventas-buscar" className="menu-link">Consulta venta</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarVentas
