import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarProductos from 'components/Sidebar-productos';

function ProductosBuscar(){
    return(
        <>

            <Navbar />
            <SidebarProductos />

            <div className="contenedor-formulario">
                    <form id="formulario-producto-buscar" className="formulario-sombra" action="">
                        <h3>Formulario de Búsqueda del Producto</h3>
                        
                        <fieldset className="formulario-buscar">
                            <legend className="titulo">Datos de Búsqueda </legend>


                            <div className="formulario" id="producto-codigo">
                                <label htmlFor="producto-codigo" >Codigo del producto</label>
                                <div>
                                    <input type="number" name="producto-codigo" id="producto-codigo" className="contenedorInput1" />   
                                </div>                   
                            </div>

                            <div className="formulario" id="producto-nombre">
                                <label htmlFor="producto-nombre" >Nombre del producto</label>
                                <div>
                                    <input type="text" name="producto-nombre" id="producto-nombre" className="contenedorInput1" />   
                                </div>                   
                            </div>
                        </fieldset>

                        <input type="button" className="botonBuscar2" value="Buscar"/>  
                    </form>
            </div>
            <Footer />
        </>
    )
}

export default ProductosBuscar;