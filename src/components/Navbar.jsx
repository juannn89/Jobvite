import logo from 'img/logo.png'
import {Link} from 'react-router-dom'


const Navbar=()=>{

    return(
        <header className="cabecera">
            <div className="cabecera-contenedor">
                <div className="cabecera-logo">
                    <img src={logo} alt="Logo empresa" className='h-10' />
                </div>
                <nav className="cabecera-menu">
                    <ul className="cabecera-menu-contenedor">
                        <li className="cabecera-menu-item">
                            <Link to="/inicio" className="cabecera-menu-link">Inicio</Link>
                        </li>
                        <li className="cabecera-menu-item">
                            <Link to="/ventas" className="cabecera-menu-link">Ventas</Link>
                        </li>
                        <li className="cabecera-menu-item">
                            <Link to="/productos" className="cabecera-menu-link">producto</Link>  
                        </li>  
                        <li className="cabecera-menu-item">
                            <Link to="/usuarios-buscar" className="cabecera-menu-link">Usuarios</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;