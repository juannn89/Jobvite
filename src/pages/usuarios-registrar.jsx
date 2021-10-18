import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import SidebarUsuarios from 'components/Sidebar-usuarios';
import { ToastContainer, toast } from 'react-toastify';
import React, {useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import axios from 'axios'


const UsuariosRegistrar=()=>{

    const form=useRef(null);

    const submitForm = (e)=>{
        e.preventDefault();
        const fd= new FormData(form.current);

        const usuarios={};
        fd.forEach((value,key) =>{
            usuarios[key]=value;
        });  
        toast.success("Usuario agregado con exito")    
    }

    return (
        <>

            <Navbar />
            <SidebarUsuarios />
            <div className="contenedor-formulario">
                <form ref={form} onSubmit={submitForm} id='formulario-usuario-registrar' className="formulario-sombra" >
                    <h3> Formulario de Registro de  Usuarios</h3>
                    <fieldset className="formulario-registrar">
                        <legend className="titulo">Datos Basicos </legend>
                        <div className="formulario">
                            <label htmlFor="usuario-codigo" >Codigo</label>
                            <div>
                                <input type="number" name="usuario-codigo" id="usuario-codigo" className="contenedorInput1" required/>   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-nombre" >Nombre Completo</label>
                            <div>
                                <input type="text" name="usuario-nombre" id="usuario-nombre" className="contenedorInput1" required/>   
                            </div>                   
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-tipo-documento" >Tipo de Documento</label>
                            <div>
                                    <select name="usuario-tipo-documento" className="contenedorInput1" required>
                                        <option value="0">Cédula de ciudadanía</option>
                                        <option value="1">Cédula de extranjería</option>
                                        <option value="2">Tarjeta de identidad</option>
                                        <option value="3">Pasaporte</option>
                                        <option value="4">Número de Identificación</option>
                                    </select>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-documento" >Numero de Documento</label>
                            <div>
                                <input type="number" name="usuario-documento" id="usuario-documento" className="contenedorInput1" required/>
                            </div>
                        </div>


                        <div className="formulario">
                            <label htmlFor="usuario-email" >Email</label>
                            <div>
                                <input type="email" name="usuario-email" id="usuario-email" className="contenedorInput1" required/>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-numero" >Telefono</label>
                            <div>
                                <input type="number" name="usuario-numero" id="usuario-numero" className="contenedorInput1" required/>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-rol" >Rol Usuario</label>
                            <div>
                                <input type="text" name="usuario-rol" id="usuario-rol" className="contenedorInput1" required/>
                            </div>
                        </div>

                        <div className="formulario">
                            <label htmlFor="usuario-estado" >Estado</label>
                            <div>
                                <input type="text" name="usuario-estado" id="usuario-estado" className="contenedorInput1" required/>
                            </div>
                        </div>

 
                    </fieldset>
                    <input type="submit" className="botonBuscar" value="Guardar" />
                    <Link to="/usuarios-buscar" >
                            <button type="button" className="botonBuscar">
                                Actualizar
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

export default UsuariosRegistrar;