import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarUsuarios from 'components/Sidebar-usuarios';

function UsuariosBuscar(){
    return (
        <>

            <Navbar />
            <SidebarUsuarios />
            <div className="contenedor-formulario">
                <form id='formulario-usuario-buscar' className="formulario-sombra" action="">
                    <h3> Formulario de Busqueda de Usuarios</h3>
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">Datos de busqueda </legend>
                        <div className="formulario">
                            <label htmlFor="producto-codigo" >Codigo</label>
                            <div>
                                <input type="number" name="usuario-codigo" id="usuario-codigo" className="contenedorInput1" />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-nombre" >Nombre</label>
                            <div>
                                <input type="text" name="usuario-nombre" id="usuario-nombre" className="contenedorInput1" />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-modelo" >Documento</label>
                            <div>
                                <input type="number" name="usuario-documento" id="usuario-documento" className="contenedorInput1" />
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-modelo" >Email</label>
                            <div>
                                <input type="email" name="usuario-email" id="usuario-email" className="contenedorInput1" />
                            </div>
                        </div>

 
                    </fieldset>
                    <input type="button"   className="botonBuscar" value="Buscar"/>
                    <input type="button"   className="botonBuscar" value="Limpiar"/>
                </form>

            </div>
            <Footer />

        </>
    )
}

export default UsuariosBuscar;