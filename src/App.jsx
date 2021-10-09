
import Login from 'pages/login';
import Inicio from 'pages/inicio';
import VentasRegistrar from 'pages/ventas-registrar';
import VentasBuscar from 'pages/ventas-buscar';
import ProductosBuscar from 'pages/productos-buscar';
import ProductosRegistrar from 'pages/productos-registrar';
import UsuariosBuscar from 'pages/usuarios-buscar';
import UsuariosRegistrar from 'pages/usuarios-registrar';



import {BrowserRouter as Router, Switch,Route} from "react-router-dom";


import 'styles/style-login.css';
import 'styles/style-menu.css';
import 'styles/style-pestañas.css';
import 'styles/normalize.css';




function App() {
  return (
    <div>
      <Router>
        <Switch>

          <Route path='/inicio'> 
            <Inicio />
          </Route>

          <Route path='/ventas-registrar'> 
            <VentasRegistrar />
          </Route>

          <Route path='/ventas-buscar'> 
            <VentasBuscar />
          </Route>

          <Route path='/productos-buscar'> 
            <ProductosBuscar />
          </Route>

          <Route path='/productos-registrar'> 
            <ProductosRegistrar />
          </Route>

          <Route path='/usuarios-buscar'> 
            <UsuariosBuscar />
          </Route>

          <Route path='/usuarios-registrar'> 
            <UsuariosRegistrar />
          </Route>

          <Route path='/'> 
            <Login />
          </Route>

        </Switch>  
      </Router>
    </div>
  );
}

export default App;
