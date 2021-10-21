import Navbar from 'components/Navbar';
import SidebarInicio from 'components/Sidebar-inicio';


const Inicio=()=>{
    return (
            <>

                <Navbar />           
                <SidebarInicio />                
                <div className="contenedor-formulario">
                    <p>
                        Bienvenido (a) señor usuario a su aplicativo web de gestión de ventas.
                    </p>
                </div>              
            </>           
    )
}

export default Inicio;