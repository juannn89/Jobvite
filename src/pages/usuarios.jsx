import React from 'react'
import Navbar from 'components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {nanoid} from 'nanoid'


const Usuarios = () => {
    return (
        <div className='h-full min-h-screen bg-blue-50 w-full flex-col'>
            <Navbar /> 
            <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-900 mb-7 '> Formulario de Registro de Usuarios</h2>

            <form  className="flex flex-col">
                <h3 className='text-lg font-extrabold text-gray-900 mb-7 '>Datos del Usuario</h3>

                <label className='flex flex-col font-bold' htmlFor='codigoProduto' >Nombre Completo 
                        <input type='text' name='nombre' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                </label> 

                <div className='grid grid-cols-3'>              
                    <label className='flex flex-col font-bold' htmlFor='codigoVenta' >Tipo de Documento
                        <select name='tipodocumento' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' defaultValue={1}  required>
                                    <option value={1}>Cédula de ciudadanía</option>
                                    <option value={2}>Cédula de extranjería</option>
                                    <option value={3}>Tarjeta de identidad</option>
                                    <option value={4}>Pasaporte</option>
                        </select> 
                    </label>
                                            
                    <label className='flex flex-col font-bold' htmlFor='codigoProduto' >Numero de Documento  
                        <input type='number' name='documento' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                    </label>        

                    <label className='flex flex-col font-bold' htmlFor='cantidad' >Correo Electrónico
                        <input type='email' name='correo' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                    </label>    
                    
                    <label className='flex flex-col font-bold' htmlFor='valorUnitario' >Teléfono
                        <input type='number' name='telefono' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                    </label>    

                    <label className='flex flex-col font-bold' htmlFor='valorTotal' >Rol Usuario
                        <select name='rol' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' defaultValue={1}  required>
                                        <option value={1}>Administrador</option>
                                        <option value={2}>Vendedor</option>
                        </select> 
                    </label>    

                    <label className='flex flex-col font-bold' htmlFor='fechaVenta' >Estado Usuario
                        <select name='estado' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' defaultValue={1}  required>
                                            <option value={1}>Activo</option>
                                            <option value={2}>Inactivo</option>
                        </select>
                    </label>     

                 </div>

                <button type='submit' className='bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white '> Guardar </button>

            </form>  
       
            </div>    
        </div>
    )
}



export default Usuarios;
