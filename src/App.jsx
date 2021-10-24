
import Login from 'pages/login';
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




function App() {
  return (
    <Auth0Provider
      domain="jobvite.us.auth0.com"
      clientId="B0d49EzpBQ49WiGPZD1ppSMemSPxNYbB"
      redirectUri={window.location.origin}
      audience='api-auth-jobvite'
    >
    <div>
      <PrivateRoute>
        <Router>
        <Switch>
          
          <Route path='/inicio'>
            <Inicio />
          </Route>
            
          <Route path='/ventas'>
              <Ventas />
          </Route>

          <Route path='/productos'> 
            <Producto />
          </Route>

          <Route path='/usuarios'> 
              <Usuarios />
          </Route>
          
          <Route path='/'> 
              <Login />
          </Route>

        </Switch>  
        </Router>
      </PrivateRoute>
      </div>
    </Auth0Provider>
  );
}

export default App;
