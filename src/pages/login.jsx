import {Link} from 'react-router-dom'
import gmailLogo from 'img/gmail.png'


const Login=()=>{
    return (
        <div className="container">
                <section className="form-login">
                    <h5>Formulario Login</h5>
                    <input className="controls" type="text" name="usuario" value="" placeholder="Usuario"/>
                    <input className="controls" type="password" name="contrasena" value="" placeholder="Contraseña"/>
                    <form action="">
                        <Link to="/inicio" >
                            <button type="button" className="buttons">
                                Ingresar
                             </button>
                        </Link>
                        <div className="contenedor-gmail">
                            <Link to="/inicio"><img src={gmailLogo} className="ingreso-gmail" alt="img gmail"/></Link>
                        </div>
                    </form>
                    <p><Link to="#">¿Olvidaste tu Contraseña?</Link></p>
                </section>
        </div>    
    )
}

export default Login;