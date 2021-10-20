import Navbar from 'components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import React, {useEffect,useState, useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {nanoid} from 'nanoid'




const Producto = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');

    useEffect(()=>{
        //obtener lista de productos desde el backend
        if (mostrarTabla){
            const options = { method: 'GET', url: 'http://localhost:5000/productos'};
            axios.request(options).then(function (response){
                setProductos(response.data);
            })
            .catch(function (error){
                console.error(error);
            });        
        }
    },[mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registrar Producto');
            
        } else {
            setTextoBoton('Listar Productos');
        
        }
        }, [mostrarTabla]); 

    return (
        <div className='h-full min-h-screen bg-blue-50 w-full flex-col'>
            <Navbar />
            <h2 className=' flex flex-col items-center text-3xl font-extrabold text-gray-900 m-6 mb-10'>Pagina de administracion de productos </h2>
            
            <div className='flex flex-col items-center '>
                    <button
                        onClick={() => {
                            setMostrarTabla(!mostrarTabla);
                        }}
                        className="text-white bg-indigo-500 p-3 rounded-full m-6 px-20 ">
                        {textoBoton}
                    </button> 
            </div>

            <div className='flex h-full flex-col  justify-left '>
                    {mostrarTabla ? (
                        <TablaProductos 
                        listaProductos={productos} 
                        setMostrarTabla={setMostrarTabla}/>
                    ) : (
                        <FormularioCreacionProductos
                        setMostrarTabla={setMostrarTabla}
                        listaProductos={productos}
                        setProductos={setProductos}
                        />
                )}
            </div>
            <ToastContainer position='bottom-center' autoClose={3000} />
        </div>     
    )
}

//Pagina para registrar los productos
const FormularioCreacionProductos=({setMostrarTabla, listaProductos, setProductos})=>{
    const form = useRef(null);
    
        const submitForm = async(e) => {
            e.preventDefault(); //para que el form pida que datos faltan
            const fd = new FormData(form.current);
        
            const nuevoProducto = {};
            fd.forEach((value, key) => {
                nuevoProducto[key] = value;
            });

            const options={
                method:'Post',
                url:'http://localhost:5000/productos/nuevo',
                headers:{'Content-Type':'application/json'},
                data:{codigo:nuevoProducto.codigo,nombre:nuevoProducto.nombre,valor:nuevoProducto.valor,estado:nuevoProducto.estado},
            };

            await axios
                .request(options)
                .then(function (response){
                    console.log(response.data);
                    toast.success("Producto agregado con exito");
                })
                .catch(function(error){
                    console.error(error);
                    toast.error("Error al crear producto");
                });


            setMostrarTabla(true);   //true: dirige hacia la tabla al agregar un product, false: no mueve
            
        };
        return(
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-extrabold text-gray-900 mb-7 '> Formulario de Registro de Producto</h2>
                <form ref={form} onSubmit={submitForm} className="flex flex-col">
                             
                    <label className='flex flex-col font-bold' htmlFor='codigo' >Codigo del producto
                        <input type='number' name='codigo' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>   
                    </label>                 
                                   
                    <label className='flex flex-col font-bold' htmlFor='nombre' >Descripcion
                        <input type='text' name='nombre' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>   
                    </label>                 
                                    
                    <label className='flex flex-col font-bold' htmlFor='valor' >Valor
                        <input type='number' name='valor' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                    </label>
                                            
                    <label className='flex flex-col font-bold' htmlFor='estado' >Estado
                        <select name='estado' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' defaultValue={1}  required>
                                <option value={1}>Disponible</option>
                                <option value={2}>No Disponible</option>
                        </select> 
                    </label>        


                    <button type='submit' className='bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white '>
                        Guardar Producto
                    </button>
   
                </form>  
                <ToastContainer
                    position='top-right' 
                    autoClose={2000} 
                    hideProgressBar={true}
                    />
            </div>    
    )
}

//Pagina para mostrar productos
const TablaProductos = ({listaProductos, setMostrarTabla}) => {

    return(   
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold mb-10'>Todos los productos </h2>
            <table className='tabla'>
                <thead>
                    <tr>
                     <th>Codigo</th>
                        <th>Nombre del producto</th>
                        <th>Valor unitario </th>
                        <th>Estado </th>
                        <th>Acciones </th>
                    </tr> 
                </thead>
                <tbody>
                    {listaProductos.map((producto)=>{
                        return(
                            <tr key={nanoid()}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre} </td>
                                <td>{producto.valor}</td>
                                <td>{producto.estado}</td>
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
        )
}

export default Producto ;    
