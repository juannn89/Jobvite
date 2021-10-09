import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarVentas from 'components/Sidebar-ventas';
import { ToastContainer, toast } from 'react-toastify';
import React, {useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useLocation} from 'react-router-dom'
import axios from 'axios'

function VentasRegistrar(){

    const form=useRef(null);

    const submitForm = (e)=>{
        e.preventDefault();
        const fd= new FormData(form.current);

        const ventas={};
        fd.forEach((value,key) =>{
            ventas[key]=value;
        });  
        toast.success("Venta registrada con exito")    
    }


    return (
        <>

            <Navbar />
            <SidebarVentas />
            <div className="contenedor-formulario">
                <form ref={form} onSubmit={submitForm} id='formulario-venta-registrar' className="formulario-sombra" action="">
                    <h3> Formulario de Resgistro de Venta</h3>
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">Cliente </legend>
                        <div className="formulario">
                            <label htmlFor="producto-codigo" >Codigo de venta</label>
                            <div>
                                <input type="number" name="venta-codigo" id="venta-codigo" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-nombre" >Nombre </label>
                            <div>
                                <input type="text" name="venta-nombre" id="venta-nombre" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-modelo" >Apellido</label>
                            <div>
                                <input type="text" name="venta-modelo" id="venta-modelo" className="contenedorInput1" required />
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-valor" >Codigo</label>
                            <div>     
                                <input type="number" name="venta-valor" id="venta-valor" className="contenedorInput1" required />
                            </div>
                        </div>
 
                    </fieldset>
                    <input type="button" className="botonBuscar" value="Buscar"/>
                    <br />

                
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">venta </legend>
                        <div className="formulario">
                            <label htmlFor="venta-codigo" >Codigo</label>
                            <div>
                                <input type="number" name="venta-codigo" id="venta-codigo" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-nombre" >Nombre del venta </label>
                            <div>
                                <input type="text" name="venta-nombre" id="venta-nombre" className="contenedorInput1" required />   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-modelo" >Modelo</label>
                            <div>
                                <input type="text" name="venta-modelo" id="venta-modelo" className="contenedorInput1" required />
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-valor" >Costo</label>
                            <div>     
                                <input type="number" name="venta-valor" id="venta-valor" className="contenedorInput1" required />
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="venta-valor" >Cantidad</label>
                            <div>     
                                <input type="number" name="venta-valor" id="venta-valor" className="contenedorInput1" required />
                            </div>
                        </div>
                    </fieldset>   
                        
                    <input type="submit"   className="botonBuscar" value="Registrar Venta"/>  
                    <Link to="/ventas-buscar" >
                            <button type="button" className="botonBuscar">
                                Buscar
                             </button>
                    </Link>        
                </form>  
                <ToastContainer
                    position="top-right"   
                />
            </div>
            <Footer />

        </>
    )
}

export default VentasRegistrar;