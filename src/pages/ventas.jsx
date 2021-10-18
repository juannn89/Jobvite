import Navbar from 'components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import React, {useEffect,useState, useRef} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {nanoid} from 'nanoid'

const ventasBackend  =[
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
        
            const nuevaVenta = {};
            fd.forEach((value, key) => {
                nuevaVenta[key] = value;
            });
            console.log(nuevaVenta)
            setMostrarTabla(true);   //true: dirige hacia la tabla al agregar un product, false: no mueve
            toast.success("Producto agregado con exito");
            setVentas([...listaVentas,nuevaVenta]);
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
            <h2 className='text-2xl font-extrabold mb-10'>Todos los Ventas </h2>
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
}



export default Ventas ;    
