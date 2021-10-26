
import Inicio from 'pages/inicio';
import Ventas from 'pages/ventas';
import Producto from 'pages/productos';
import Usuarios from 'pages/usuarios';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import 'styles/style-login.css';
import 'styles/style-menu.css';
import 'styles/style-pestañas.css';
import 'styles/normalize.css';
import { Auth0Provider } from '@auth0/auth0-react';
import PrivateRoute from 'components/PrivateRoute';
import { UserContext } from 'context/userContext';
import { useState } from 'react';




function App() {
  const [userData, setUserData] = useState({});

  return (
    
    <Auth0Provider
      domain="jobvite.us.auth0.com"
      clientId="B0d49EzpBQ49WiGPZD1ppSMemSPxNYbB"
      redirectUri='http://localhost:3000/'
      audience='api-auth-jobvite'
    >
      <div>
        <UserContext.Provider value={{ userData, setUserData}}>
        
        <Router>
        <Switch>
            
          <Route path='/ventas'>
            <PrivateRoute roleList={[ 'admin', 'vendedor']}>
              <Ventas />
            </PrivateRoute>
          </Route>

          <Route path='/productos'> 
            <PrivateRoute roleList={[ 'admin', 'vendedor']}>
              <Producto />
            </PrivateRoute>
          </Route>

          <Route path='/usuarios'> 
            <PrivateRoute roleList={[ 'admin', 'vendedor']}>
              <Usuarios />
            </PrivateRoute>
          </Route>
          
          <Route path='/'>
            <PrivateRoute roleList={[ 'admin', 'vendedor', 'sin rol']}>
              <Inicio />
            </PrivateRoute>
          </Route>

        </Switch>  
        </Router>
      
      </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;