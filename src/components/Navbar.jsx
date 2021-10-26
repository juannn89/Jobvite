import React, { useEffect, useState } from 'react';
import logo from 'img/logo.png'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';


const Navbar = () => {
    
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false);
    const { setUserData } = useUser();

    useEffect(() => {
        const fetchAuth0Token = async () => {
            setLoadingUserInformation(true);
            const accessToken = await getAccessTokenSilently({
                audience: `api-auth-jobvite`,
            });
            localStorage.setItem('token', accessToken);
            await obtenerDatosUsuario(
                (response) => {
                    console.log("response", response);
                    setUserData(response.data);
                    setLoadingUserInformation(false);
                },
                (err) => {
                    console.log('err', err);
                    setLoadingUserInformation(false);
                    logout({ returnTo: 'http://localhost:3000/' });
                });
        };
        if (isAuthenticated) {
            fetchAuth0Token();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading || loadingUserInformation)
        return <ReactLoading className='flex flex-col justify-cente items-center' type='cylon' color='#222333' height={660} width={700} />;

    if (!isAuthenticated) {
        return loginWithRedirect();
    }

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
                            <Link to="/usuarios" className="cabecera-menu-link">Usuarios</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}


export default Navbar;