import { useUser } from 'context/userContext';
import React from 'react';
import Navbar from './Navbar';

const PrivateRoute = ({ roleList, children }) => {
    
    const { userData } = useUser();
    if (roleList.includes(userData.rol)) {
        return children;
    }
    return <div flex>
        <Navbar />
        <div className='flex flex-col justify-center items-center py-10'>
            <span>No esta autorizado para ingresar, por favor inicie sección como administrador.</span> 
        </div>
    </div>;
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
