import React from 'react'
import {Link} from 'react-router-dom'


const SidebarProductos = () => {
    return (
        <nav class="menu-nav">
            <ul class="menu-contenedor">
                <li class="menu-item">
                    <Link to="/productos-buscar" class="menu-link">BUSQUEDA PRODUCTO</Link>
                </li>
                <li class="menu-item">
                    <Link to="/productos-registrar" class="menu-link">REGISTRO PRODUCTO</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarProductos

