import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from 'utils/api';
import Navbar from 'components/Navbar';
import { nanoid } from 'nanoid';
import { editarUsuario } from 'utils/api';


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            await obtenerUsuarios((response) => {
                console.log('usuarios', response.data);
                setUsuarios(response.data);
            },
                (err) => {
                    console.log(err);
                });
        };
        fetchUsuarios();
    }, []);
    return (
        <>
        <Navbar />
        <div className=' flex flex-col justify-center items-center'>
            
            admin usuarios

            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => {
                        return (
                            <tr key={nanoid()}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td> <EstadoUsuario user={user} /> </td>
                                <td>
                                    <RolesUsuario user={user} />
                                </td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
};

const RolesUsuario = ({ user }) => {
    const [rol, setRol] = useState(user.rol);
    useEffect(() => {
        const editUsuario = async () => {
            await editarUsuario(user._id, { rol }, (response) => {
                console.log(response);
            },
                (err) => { 
                    console.err(err);
                });
        };
        if (user.rol !== rol); {
            editUsuario();
        } 
    }, [rol, user]);
    return (
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="" disabled>Seleccione rol</option>
            <option value="admin">Admin</option>
            <option value="vendedor">Vendedor</option>
            <option value="sin rol">Sin rol</option>
        </select>
    );
};

const EstadoUsuario = ({ user }) => {
    const [estado, setEstado] = useState(user.estado ?? '');
    useEffect(() => {
        const editUsuario = async () => {
            await editarUsuario(user._id, { estado }, (response) => {
                console.log(response);
            },
                (err) => {
                    console.err(err);
                });
        };
        if (user.estado !== estado); {
            editUsuario();
        }
    }, [estado, user]);
    return <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="" disabled>Seleccione un estado</option>
        <option value="autorizado">Autorizado</option>
        <option value="pendiente">Pendiente</option>
        <option value="rechazado">Rechazado</option>

        </select>
};

export default Usuarios;





/* import React, {useEffect, useState} from 'react'
import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {nanoid} from 'nanoid'


const usuariosBackend  =[
    {
        nombre:"Juan Cruz",
        tipodocumento:"C??dula de ciudadan??a",
        numerodocumento:15568415,
        correo:"prueba@react.com",
        telefono:3103259550,
        rol:"Vendedor",
        estado:"Inactivo",
    },
]



const Usuarios = () => {

    const [mostrarTabla, setMostrarTabla]=useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');

    useEffect(()=>{
        setUsuarios(usuariosBackend);
    },[]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registrar Usuario');
            
        } else {
            setTextoBoton('Listar Usuarios');
        
        }
        }, [mostrarTabla]); 

    return (
        <div className='h-full min-h-screen bg-blue-50 w-full flex-col'>
            <Navbar /> 
            <h2 className=' flex flex-col items-center text-3xl font-extrabold text-gray-900 m-6 mb-10'>P??gina de Administraci??n de Usuarios</h2>

            <div className='flex flex-col items-center '>
                <button 
                    onClick={()=>setMostrarTabla(!mostrarTabla)}
                    className="text-white bg-indigo-500 p-3 rounded-full m-6 px-20 ">
                    {textoBoton}
                </button>
            </div>

            <div className='flex h-full flex-col  justify-left '>
                    {mostrarTabla ? (
                        <TablaUsuarios 
                        listaUsuarios={usuarios} 
                        setMostrarTabla={setMostrarTabla}/>
                    ) : (
                        <FormularioCreacionUsuarios
                        setMostrarTabla={setMostrarTabla}
                        listaUsuarios={usuarios}
                        setUsuarios={setUsuarios}
                        />
                )}
            </div>
        </div>
    )
}

const TablaUsuarios = ({listaUsuarios,setMostrarTabla})=>{

    return (
        <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold mb-10'>Todos los Usuarios </h2>
        <table className='tabla'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo Documento</th>
                    <th>Numero de Documento</th>
                    <th>Correo Electr??nico</th>
                    <th>Tel??fono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr> 
            </thead>
            <tbody>
                {listaUsuarios.map((usuario)=>{
                    return(
                        <tr>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.tipodocumento} </td>
                            <td>{usuario.numerodocumento}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <div className='flex w-full justify-around'>
                                    <i className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500' />
                                    <i className='fas fa-trash text-red-700 hover:text-red-500' />
                                </div>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div> 
    );
};

const FormularioCreacionUsuarios = ()=>{

    return (
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
                                <option value={1}>C??dula de ciudadan??a</option>
                                <option value={2}>C??dula de extranjer??a</option>
                                <option value={3}>Tarjeta de identidad</option>
                                <option value={4}>Pasaporte</option>
                    </select> 
                </label>
                                        
                <label className='flex flex-col font-bold' htmlFor='codigoProduto' >Numero de Documento  
                    <input type='number' name='documento' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                </label>        

                <label className='flex flex-col font-bold' htmlFor='cantidad' >Correo Electr??nico
                    <input type='email' name='correo' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                </label>    
                
                <label className='flex flex-col font-bold' htmlFor='valorUnitario' >Tel??fono
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
    );
};

export default Usuarios;
 */