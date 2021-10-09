import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {Link} from 'react-router-dom'

function Inicio(){
    return (
            <>

                <Navbar />
                <div className="menu">
                        <nav className="menu-nav">
                            <ul className="menu-contenedor">
                                <li className="menu-item">
                                    <Link to ="/" className="menu-link">cerrar sesión</Link>
                                </li>
                            </ul>
                        </nav>
                </div>   
                <div className="contenedor-formulario">
                    <p>
                        Bienvenido (a) señor usuario a su aplicativo web de gestión de ventas.
                    </p>
                </div>              
                <Footer />

            </>
                
    )
}

export default Inicio;