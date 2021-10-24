import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchAuth0Token = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: `api-auth-jobvite`,
            });
            localStorage.setItem('token', accessToken);
        };
        if (isAuthenticated) {
            fetchAuth0Token();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading)
        return <ReactLoading type='cylon' color='#222333' height={660} width={700} />;
    
    if (!isAuthenticated) {
        return loginWithRedirect();
    }
    
    return <>{children}</>;

};

/*  return isAuthenticated ? (<>{children}</>
    ) : (
        <div>
            <div>No esta autorizado</div>
            <Link to='/'>
                <span> Por favor realice Login </span>
            </Link>
        </div>
    ) */
export default PrivateRoute;
