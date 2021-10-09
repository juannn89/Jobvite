import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarProductos from 'components/Sidebar-productos';
import { ToastContainer, toast } from 'react-toastify';
import React, {useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useLocation} from 'react-router-dom'
import axios from 'axios'




function ProductosRegistrar(){
    
    const form=useRef(null);

    const submitForm = (e)=>{
        e.preventDefault();
        const fd= new FormData(form.current);

        const productos={};
        fd.forEach((value,key) =>{
            productos[key]=value;
        });  
        toast.success("Producto agregado con exito")    
    }

    return(
        <>

            <Navbar />
            <SidebarProductos />
            <div className="contenedor-formulario">
                <form ref={form} onSubmit={submitForm} id='formulario-producto-registrar' className="formulario-sombra" action="">
                    <h3> Formulario de Registro de Producto</h3>
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">Datos de Registro </legend>
                        <div className="formulario">
                            <label htmlFor="producto-codigo" >Codigo del producto</label>
                            <div>
                                <input type="number" name="producto-codigo" id="producto-codigo" className="contenedorInput1" required/>   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="producto-nombre" >Nombre del producto</label>
                            <div>
                                <input type="text" name="producto-nombre" id="producto-nombre" className="contenedorInput1" required/>   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="producto-modelo" >Modelo</label>
                            <div>
                                <input type="text" name="producto-modelo" id="producto-modelo" className="contenedorInput1" required/>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="producto-valor" >Valor unitario</label>
                            <div>     
                                <input type="number" name="producto-valor" id="producto-valor" className="contenedorInput1" required/>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="producto-cantidad" >Cantidad</label>
                            <div>
                                <input type="number" name="producto-cantidad" id="producto-cantidad" className="contenedorInput1" required/>
                            </div>  
                        </div>

                        <div className="formulario">
                            <label htmlFor="producto-descripcion" >Descripcion</label>
                            <div>
                                <input type="text" name="producto-descripcion" id="producto-descripcion" className="contenedorInput1" required/>
                            </div>
                        </div>

                    </fieldset>

                    <input type="submit"  value="Guardar"/> 
                    <input type="button"  value="Crear nuevo"/> 
                    <input type="button"  value="Limpiar"/> 

                    <Link to="/productos-buscar" >
                            <button type="button" className="botonBuscar">
                                Buscar/Actualizar
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

export default ProductosRegistrar;