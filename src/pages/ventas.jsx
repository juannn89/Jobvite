import React, { useEffect, useState, useRef } from 'react';
import Navbar from 'components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'
import { obtenerUsuarios, obtenerProductos, crearVenta } from 'utils/api';
import { Tooltip, Dialog } from '@material-ui/core';


const Ventas = () => {
    const form = useRef(null);
    const [vendedores, setvendedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosTabla, setProductosTabla] = useState([]);

    useEffect(() => {
        const obtenerVendedores = async () => {
            await obtenerUsuarios(
                (response) => {
                    setvendedores(response.data)
                },
                (error) => {
                    console.error(error);
                }
            );
        };
        const definirProductos = async () => {
            await obtenerProductos(
                (response) => {
                    setProductos(response.data);
                },
                (error) => {
                    console.error(error);
                });
        }

        definirProductos();
        obtenerVendedores();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault(); //para que el form pida que datos faltan
        const fd = new FormData(form.current);

        const formData = {};
        fd.forEach((value, key) => {
            formData[key] = value;
        });

        console.log('form data', formData);

        const listaProductos = Object.keys(formData).map((k) => {
            if (k.includes('producto')) {
                return productosTabla.filter((v) => v._id === formData[k])[0];
            }
            return null;
        }).filter((v) => v);

        /* Object.keys(formData).forEach((k) => {
            if (k.includes('cantidad')) {
                const indice = parseInt(k.split('_')[1]);
                listaProductos[indice]['cantidad'] = formData[k];
            }
        }); */

        const datosVenta = {
            vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
            valorT: formData.valorT,
            productos: listaProductos,
        };

        console.log(listaProductos);

        await crearVenta(datosVenta,
            (response) => {
                console.log(response);
                toast.info('Venta registrada', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            (error) => {
                console.error((error));
                toast.info('Error en venta', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        );
    };
    return (
        <> <Navbar/> 
            <div className='flex flex-col bg-blue-50 items-center justify-center overflow-y'>
                <h2 className='text-3xl font-extrabold text-gray-900 m-6 mb-10'>Pagina de administracion de ventas</h2>
                <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                    <label className='flex flex-col justify-center items-center my-3' htmlFor='vendedor'>
                        <span className='flex flex-col font-bold'>Vendedor</span>
                        <select name="vendedor" className='flex w-full p-2' defaultValue='' required>
                            <option disabled value=''>Seleccione un vendedor</option>
                            {vendedores.map((el) => {
                                return <option key={nanoid()} value={el._id}>{`${el.name}`}</option>;
                            })}
                        </select>
                    </label>

                    <TablaProductos
                        productos={productos}
                        setProductos={setProductos}
                        setProductosTabla={setProductosTabla}
                    />

                    {/* <label className='flex w-full items-center justify-center flex-col my-3'>
                        <span className='font-bold'>Valor total venta</span>
                        <input
                            className='flex w-full bg-gray-150 border-gray-600 p-2'
                            type="number"
                            name='valorT'
                            required
                        />
                    </label> */}
                    <button
                        className='flex w-full items-center justify-center self-center bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white my-2'
                        type='submit'>
                        Registrar Venta
                    </button>
                </form>
            </div>
        </>
    );
};

const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
    const [productoAAgregar, setProductoAAgregar] = useState({});
    const [filasTabla, setFilasTabla] = useState([]);
    const [SumTotal, setSumTotal] = useState(0);


    useEffect(() => {
        const handlesumar = () => {
            const sumar = filasTabla.map((productos) => parseFloat(productos.total))
                .reduce((previous, current) => {
                    return previous + current;
                }, 0);
            setSumTotal(sumar);
        };
        handlesumar();
    });

    /* useEffect(() => {
        console.log(productoAAgregar);
    }, [productoAAgregar]); */

    useEffect(() => {
        setProductosTabla(filasTabla);
    }, [filasTabla, setProductosTabla]);

    const agregrarProducto = () => {
        setFilasTabla([...filasTabla, productoAAgregar]);
        setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
        setProductoAAgregar({});
    };

    const eliminarProducto = (productoAEliminar) => {
        setFilasTabla(filasTabla.filter(v => v._id !== productoAEliminar._id));
        setProductos([...productos, productoAEliminar]);
    };

    const modificarProducto = (productos, cantidad) => {
        setFilasTabla(
            filasTabla.map((ft) => {
                if (ft._id === productos._id) {
                    ft.cantidad = cantidad;
                    ft.total = productos.valor * cantidad;
                }
                return ft;
            })
        );
    };

    return (
        <div>
            <div className='flex items-center justify-center'>
                <label className='flex flex-col items-center justify-center' htmlFor='producto'>
                    <select
                        className='p-2'
                        name='producto'
                        value={productoAAgregar._id ?? ''}
                        onChange={(e) => setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])}>
                        <option disabled value=''>Seleccione un producto</option>
                        {productos.map((el) => {
                            return (
                                <option
                                    key={nanoid()}
                                    value={el._id}>
                                    {`${el.nombre} ${el.codigo}`}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <button
                    type='buton'
                    onClick={() => agregrarProducto()}
                    className='w-full bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white text my-2 ml-4'>Agregar producto
                </button>
            </div>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Valor Unitario</th>
                        <th>Valor Total</th>
                        <th>Eliminar</th>
                        <th className='hidden'>Input</th>
                    </tr>
                </thead>
                <tbody>
                    {filasTabla.map((el, index) => {
                        return (
                            <FilaProducto
                                key={el._id}
                                prod={el}
                                index={index}
                                eliminarProducto={eliminarProducto}
                                modificarProducto={modificarProducto}
                            />
                        );
                    })}
                    {/* <tr>
                        <td>Total Venta</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{SumTotal}</td>
                        <td></td>
                    </tr> */}
                </tbody>
            </table>
            <label className='flex w-full items-center justify-center flex-col my-3'>
                <span className='font-bold'>Valor total venta</span>
                <input
                    className='flex text-center bg-gray-150 border-gray-600 p-2'
                    name='valorT'
                    value={SumTotal}
                    required
                />
            </label>
            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={true}
            />
        </div>
    );
};

const FilaProducto = ({ prod, index, eliminarProducto, modificarProducto }) => {
    const [producto, setProducto] = useState(prod);
    useEffect(() => {
        console.log('prod', producto);
    }, [producto]);
    return (
        <tr>
            <td>{producto._id}</td>
            <td>{producto.codigo}</td>
            <td>{producto.nombre}</td>
            <td><label htmlFor={`cantidad_${index}`}>
                <input
                    required
                    min='1'
                    type="number"
                    name={`cantidad_${index}`}
                    value={producto.cantidad}
                    onChange={(e) => {
                        modificarProducto(producto, e.target.value === '' ? '0' : e.target.value);
                        setProducto({
                            ...producto,
                            cantidad: e.target.value === '' ? '0' : e.target.value,
                            total:
                                parseFloat(producto.valor) *
                                parseFloat(e.target.value === '' ? '0' : e.target.value),
                        });
                    }}
                />
            </label>
            </td>
            <td>{producto.valor}</td>
            <td>{parseFloat(producto.total ?? 0)}</td>
            <td className='text-center'>
                <Tooltip title='Eliminar producto' arrow>
                <i onClick={() => eliminarProducto(producto)} className='fas fa-trash text-red-500 cursor-pointer' />
                </Tooltip>
            </td>
            <input hidden defaultValue={producto._id} name={`producto_${index}`} />
        </tr>
    );
};
    
/* const ventasBackend  =[
    {
        identificacionVendedor:1140888888,
        nombreVendedor:"Lucas corredor",
        codigoVenta:1,
        codigoProducto:1,
        cantidad:10,
        valorUnitario:15000,
        valorTotal:150000,
        fechaVenta:"2020/05/5",
        documentoCliente:1140777777,
        nombreCliente:"pepito perez",
    },
]

const Ventas = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');

    useEffect(()=>{
        //obtener lista de Ventas desde el backend
        setVentas(ventasBackend)
    },[]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registrar Venta');
            
        } else {
            setTextoBoton('Listar Venta');
        
        }
        }, [mostrarTabla]); 

    return (
        <div className='h-full min-h-screen bg-blue-50 w-full flex-col'>
            <Navbar />
            <h2 className=' flex flex-col items-center text-3xl font-extrabold text-gray-900 m-6 mb-10'>Pagina de administracion de ventas</h2>
            
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
                        <TablaVentas 
                        listaVentas={ventas} 
                        setMostrarTabla={setMostrarTabla}/>
                    ) : (
                        <FormularioCreacionVentas
                        setMostrarTabla={setMostrarTabla}
                        listaVentas={ventas}
                        setVentas={setVentas}
                        />
                )}
            </div>
            <ToastContainer position='bottom-center' autoClose={3000} />
        </div>     
    )
}


//Pagina para registrar los productos
const FormularioCreacionVentas=({setMostrarTabla, listaVentas, setVentas})=>{
        const form = useRef(null);
        const submitForm = (e) => {
            e.preventDefault(); //para que el form pida que datos faltan
            const fd = new FormData(form.current);
        
            const formData = {};
            fd.forEach((value, key) => {
                formData[key] = value;
            });
            console.log(formData)
            setMostrarTabla(true);   //true: dirige hacia la tabla al agregar un product, false: no mueve
            toast.success("Producto agregado con exito");
            setVentas([...listaVentas,formData]);
        };
        return(
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-extrabold text-gray-900 mb-7 '> Formulario de Registro de Ventas</h2>

                <form ref={form} onSubmit={submitForm} className="flex flex-col">
                    <h3 className='text-lg font-extrabold text-gray-900 mb-7 '>Datos del vendedor</h3>

                    <div className='grid grid-cols-2'>        
                        <label className='flex flex-col font-bold' htmlFor='identificacionVendedor' >Identifacion
                            <input type='number' name='identificacionVendedor' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>   
                        </label>                 
                                    
                        <label className='flex flex-col font-bold' htmlFor='Vendedor' >Nombre
                            <input type='text' name='nombreVendedor' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>   
                        </label>   
                    </div>


                    <h3 className='text-lg font-extrabold text-gray-900 mb-7 mt-7'>Datos de la venta </h3>              

                    <div className='grid grid-cols-3'>              
                        <label className='flex flex-col font-bold' htmlFor='codigoVenta' >Codigo venta
                            <input type='number' name='codigoVenta' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>
                                                
                        <label className='flex flex-col font-bold' htmlFor='codigoProduto' >Codigo producto
                            <input type='number' name='codigoProducto' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>        

                        <label className='flex flex-col font-bold' htmlFor='cantidad' >Cantidad
                            <input type='number' name='cantidad' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>    
                        
                        <label className='flex flex-col font-bold' htmlFor='valorUnitario' >Valor unitario
                            <input type='number' name='valorUnitario' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>    

                        <label className='flex flex-col font-bold' htmlFor='valorTotal' >Valor total
                            <input type='number' name='valorTotal' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>    

                        <label className='flex flex-col font-bold' htmlFor='fechaVenta' >Fecha venta
                            <input type='date' name='fechaVenta' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>     

                        <label className='flex flex-col font-bold' htmlFor='documentoCliente' >Documento cliente
                            <input type='number' name='documentoCliente' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>     

                        <label className='flex flex-col font-bold' htmlFor='nombreCliente' >Nombre cliente
                            <input type='number' name='nombreCliente' className='bg-gray-150 border-gray-600 p-2 rounded-lg m-2' required/>
                        </label>
                     </div>

                    <button type='submit' className='bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white '> Guardar </button>
   
                </form>  
                <ToastContainer
                    position='top-right' 
                    autoClose={2000} 
                    hideProgressBar={true}
                    />
            </div>    
    )
}

//Pagina para mostrar Ventas
const TablaVentas = ({ listaVentas,setMostrarTabla}) => {

    return(   
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold mb-10'>Todos las Ventas </h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Identificacion vendedor</th>
                        <th>Nombre vendedor </th>
                        <th>Codigo venta </th>
                        <th>Codigo producto</th>
                        <th>Cantidad </th>
                        <th>Valor unitario </th>
                        <th>Fecha venta</th>
                        <th>Docuemento cliente </th>
                        <th>Nombre cliente </th>
                    </tr> 
                </thead>
                <tbody>
                    {listaVentas.map((ventas)=>{
                        return(
                            <tr key={nanoid()}>
                                <td>{ventas.identificacionVendedor}</td>
                                <td>{ventas.nombreVendedor} </td>
                                <td>{ventas.codigoVenta}</td>
                                <td>{ventas.codigoProducto}</td>
                                <td>{ventas.cantidad}</td>
                                <td>{ventas.valorUnitario} </td>
                                <td>{ventas.fechaVenta}</td>
                                <td>{ventas.documentoCliente}</td>
                                <td>{ventas.nombreCliente}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div> 
        )
} */

export default Ventas ;  