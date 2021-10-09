import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarVentas from 'components/Sidebar-ventas';

function VentasBuscar(){
    return (
        <>

            <Navbar />
            <SidebarVentas />
            <div className="contenedor-formulario">
                <form id='formulario-venta-buscar' className="formulario-sombra" action="">
                    <h3> Formulario de Busqueda de Venta</h3>
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">Ventas </legend>
                        <div className="formulario">
                            <label htmlFor="venta-codigo" >Codigo del cliente</label>
                            <div>
                                <input type="number" name="venta-codigo" id="venta-codigo" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-nombre" >Nombre del cliente </label>
                            <div>
                                <input type="text" name="venta-nombre" id="venta-nombre" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-modelo" >Codigo de venta</label>
                            <div>
                                <input type="text" name="venta-codigo" id="venta-codigo" className="contenedorInput1" required />
                            </div>
                        </div>

 
                    </fieldset>
                    <input type="button" onclick="location.href='/venta_buscar.html';"  className="botonBuscar" value="Buscar"/>
                </form>

            </div>
            <Footer />

        </>
    )
}

export default VentasBuscar;