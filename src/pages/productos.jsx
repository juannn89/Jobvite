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
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(()=>{
        const obtenerProductos= async()=>{
            const options = { method: 'GET', url: 'http://localhost:5000/productos'};
            await axios.request(options).then(function (response){
                setProductos(response.data);
            })
            .catch(function (error){
                console.error(error);
            });        
        };

        if (ejecutarConsulta){
            obtenerProductos();

            setEjecutarConsulta(false);
        }
    },[ejecutarConsulta]);


    useEffect(()=>{
        //obtener lista de productos desde el backend
        if (mostrarTabla){
            setTextoBoton('Registrar Producto');
            setEjecutarConsulta(true);
        } else{
            setTextoBoton('Listar Productos')
        }
    },[mostrarTabla]);


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
                        setEjecutarConsulta={setEjecutarConsulta}/>
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
const FormularioCreacionProductos=({setMostrarTabla})=>{
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
                url:'http://localhost:5000/productos',
                headers:{'Content-Type':'application/json'},
                data:{
                    codigo:      nuevoProducto.codigo,
                    nombre:      nuevoProducto.nombre,
                    valor:       nuevoProducto.valor,
                    estado:      nuevoProducto.estado
                },
            };

            await axios.request(options).then(function (response){
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

const FilaProductos =({productos,setEjecutarConsulta})=>{
    const [edit, setEdit]=useState(false);
    const [infoNuevoProducto,setInfoNuevoProducto]=useState({
        codigo:      productos.codigo,
        nombre:      productos.nombre,
        valor:       productos.valor,
        estado:      productos.estado
    });
    const actualizarProducto = async()=>{
        console.log(infoNuevoProducto);
        //enviar informacion al backend
        const options={
            method:'PATCH',
            url:'http://localhost:5000/productos/editar',
            headers:{'Content-Type':'application/json'},
            data:{...infoNuevoProducto,id: productos._id},
        };

        await axios.request(options).then(function (response){
            console.log(response.data);
            toast.success("Producto modificado con exito");
            setEdit(false);
            setEjecutarConsulta(true);
        })
        .catch(function(error){
            console.error(error);
            toast.error("Error al modificar producto");
        });
    }


    const eliminarProducto=async()=>{
        const options={
            method:'DELETE',
            url:'http://localhost:5000/productos/eliminar',
            headers:{'Content-Type':'application/json'},
            data:{id: productos._id},
        };

        await axios
        .request(options)
        .then(function (response){
            console.log(response.data);
            toast.success("Producto eliminado con exito");
            setEjecutarConsulta(true)
        })
        .catch(function(error){
            console.error(error);
            toast.error("Error al eliminar producto");
        });
    }

    return (     
        <tr>
            {edit?(
                <>
                    <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" value={infoNuevoProducto.codigo} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, codigo: e.target.value})}  /></td>
                    <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" value={infoNuevoProducto.nombre} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto,  nombre: e.target.value})} /></td>
                    <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" value={infoNuevoProducto.valor} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, valor: e.target.value})} /></td>
                    <td><input className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" value={infoNuevoProducto.estado} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto,  estado: e.target.value})} /></td>
                </>
                ):(
                <>
                    <td>{productos.codigo}</td>
                    <td>{productos.nombre} </td>
                    <td>{productos.valor}</td>
                    <td>{productos.estado}</td>

                </> 
            )}
            <td>
                <div className='flex w-full justify-around'>
                    {edit?(
                        <i onClick={()=>actualizarProducto()} className='fas fa-check text green-700 hover:text-green-500' />
                        ):(
                        <i onClick={()=>setEdit(!edit)} className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500' />
                        )}

                    <i onClick={()=>eliminarProducto() } className='fas fa-trash text-red-700 hover:text-red-500' />
                </div>
            </td>
        </tr>
    )


}

//Pagina para mostrar productos
const TablaProductos = ({listaProductos,setEjecutarConsulta}) => {
    useEffect(()=>{
        console.log('este es el listado de productos en el componente tabla',listaProductos);
    },[listaProductos]);


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
                    {listaProductos.map((productos)=>{
                        return <FilaProductos key={nanoid()} productos={productos} setEjecutarConsulta={setEjecutarConsulta} />;
                        })
                    }
                </tbody>
            </table>
        </div> 
        )
}

export default Producto ;    