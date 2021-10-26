import Navbar from 'components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";


const Inicio = () => {
    const { logout } = useAuth0();

    const cerrarSesion = () => {
        logout({ returnTo: 'http://localhost:3000/' });
        localStorage.setItem('token', null);
    };

    return (
            <>

                <Navbar />           
                <div className="contenedor-formulario">
                    <p>
                        Bienvenido (a) señor usuario a su aplicativo web de gestión de ventas.
                </p>
                <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                </div>              
            </>           
    )
}

export default Inicio;