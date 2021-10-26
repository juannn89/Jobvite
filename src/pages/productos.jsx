import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
//import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerProductos, crearProducto, editarProducto, borrarProducto } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'components/Navbar';
import ReactLoading from 'react-loading';
import PrivateComponent from 'components/PrivateComponent';
import { Tooltip, Dialog } from '@material-ui/core';

const Producto = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            await obtenerProductos(
                (response) => {
                    setProductos(response.data);
                    setEjecutarConsulta(false);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
        if (ejecutarConsulta) {
            fetchProductos();
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de productos desde el backend
        if (mostrarTabla) {
            setTextoBoton('Registrar Producto');
        } else {
            setTextoBoton('Listar Productos')
        }
    }, [mostrarTabla]);

    useEffect(() => {
        //obtener lista de productos desde el backend
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    return (
        <><Navbar />
        <div className='h-full bg-blue-50 w-full flex-col'>
            <h2 className=' flex flex-col items-center text-3xl font-extrabold text-gray-900 p-6 mb-3'>Pagina de administracion de productos </h2>
                <div className='flex flex-col items-center '>
                <PrivateComponent roleList={['admin']}>
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla);
                    }}
                    className="text-white bg-indigo-500 p-3 rounded-full m-6 px-20 ">
                    {textoBoton}
                </button>
                </PrivateComponent>
            </div>

            <div className='flex h-full flex-col  justify-left '>
                {mostrarTabla ? (
                    <TablaProductos
                        listaProductos={productos}
                        setEjecutarConsulta={setEjecutarConsulta}
                        loading={loading}
                    />
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
        </>
    );
};

//Pagina para registrar los productos
const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
    const form = useRef(null);
    const submitForm = async (e) => {
        e.preventDefault(); //para que el form pida que datos faltan
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        await crearProducto({
            codigo: nuevoProducto.codigo,
            nombre: nuevoProducto.nombre,
            valor: nuevoProducto.valor,
            estado: nuevoProducto.estado
        },
            (response) => {
                console.log(response.data);
                toast.success('Producto agregado con éxito');
            },
            (error) => {
                console.error(error);
                toast.error("Error creando el producto");
            }
        );

        setMostrarTabla(true);   //true: dirige hacia la tabla al agregar un product, false: no mueve

            
    };
    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-900 mb-7 '> Formulario de Registro de Producto</h2>
            <form ref={form} onSubmit={submitForm} className="flex flex-col">
                             
                <label className='flex flex-col font-bold' htmlFor='codigo' >Codigo del producto
                    <input type='number' name='codigo' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required />
                </label>
                                   
                <label className='flex flex-col font-bold' htmlFor='nombre' >Descripcion
                    <input type='text' name='nombre' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required />
                </label>
                                    
                <label className='flex flex-col font-bold' htmlFor='valor' >Valor
                    <input type='number' name='valor' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required />
                </label>
                                            
                <label className='flex flex-col font-bold' htmlFor='estado' >Estado
                    <select name='estado' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' defaultValue={1} required>
                        <option value='Disponible'>Disponible</option>
                        <option value='No disponible'>No Disponible</option>
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
};

//Pagina para mostrar productos
const TablaProductos = ({ loading, listaProductos, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
        setProductosFiltrados(
            listaProductos.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaProductos]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='Buscar'
                className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500' />
            
            <div>
                <h2 className='text-2xl font-extrabold mb-10'>Todos los productos </h2>
                {loading ? (
                    <ReactLoading type='cylon' color='#222333' height={660} width={700} />
                ) : (
                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre del producto</th>
                                <th>Valor unitario </th>
                                <th>Estado </th>
                                <PrivateComponent roleList={['admin']}>
                                    <th>Acciones </th>
                                </PrivateComponent>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProductos.map((productos) => {
                                return <FilaProductos
                                    key={nanoid()}
                                    productos={productos}
                                    setEjecutarConsulta={setEjecutarConsulta} />;
                            })
                            }
                        </tbody>
                    </table>
                )}
            </div>
            <div className='flex flex-col w-full m-2 md:hidden'>
                {productosFiltrados.map((el) => {
                    return (
                        <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
                            <span>{el.codigo}</span>
                            <span>{el.nombre}</span>
                            <span>{el.valor}</span>
                            <span>{el.estado}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const FilaProductos = ({ productos, setEjecutarConsulta }) => {
    const [edit, setEdit]=useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        codigo:      productos.codigo,
        nombre:      productos.nombre,
        valor:       productos.valor,
        estado:      productos.estado
    });

    const actualizarProducto = async () => {
        //enviar informacion al backend
        await editarProducto(productos._id,
            {
                codigo: infoNuevoProducto.codigo,
                nombre: infoNuevoProducto.nombre,
                valor: infoNuevoProducto.valor,
                estado: infoNuevoProducto.estado,
            },
            (response) => {
                console.log(response.data);
                toast.success("Producto modificado con éxito");
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                console.error(error);
                toast.error("Error al modificar producto");
            }
        );
    };

    const eliminarProducto = async () => {
        
        await borrarProducto(productos._id, (response) => {
            console.log(response.data);
            toast.success("Producto eliminado con éxito");
            setEjecutarConsulta(true)
        },
        (error) => {
            console.error(error);
            toast.error("Error al eliminar producto");
        });
        setOpenDialog(false);
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
            <PrivateComponent roleList = {['admin']}>
            <td>
                <div className='flex w-full justify-around'>
                    {edit?(
                        <><Tooltip title='Confirmar Edición' arrow>
                        <i onClick={()=>actualizarProducto()} className='fas fa-check text green-700 hover:text-green-500' />
                        </Tooltip>
                        <Tooltip title='Cancelar edición' arrow>
                        <i onClick={() => setEdit(!edit)} className='fas fa-ban text-yellow-700 hover:text-yellow-500' />
                        </Tooltip></>
                        ):(
                        <><Tooltip title='Editar producto' arrow>   
                        <i onClick={()=>setEdit(!edit)} className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500' />
                        </Tooltip>
                        <Tooltip title='Eliminar producto' arrow>       
                        <i onClick={()=>setOpenDialog(true) } className='fas fa-trash text-red-700 hover:text-red-500' />
                        </Tooltip></>
                        )}
                </div>
                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>
                        ¿Está seguro de querer eliminar el vehículo?
                        </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button onClick={() => eliminarProducto()} className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'>
                                Sí
                            </button>
                            <button onClick={() => setOpenDialog(false)} className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md' >
                                No
                            </button>
                        </div>
                    </div>
                </Dialog>
            </td>
            </PrivateComponent>
        </tr>
    )
}

export default Producto;    
