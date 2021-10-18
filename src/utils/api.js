import axios from 'axios';



export const obtenerProductos = async (setProductos) => {
  const options = { method: 'GET', url: 'http://localhost:5000/productos/'};

  await axios.request(options).then(function (response){
    setProductos(response.data);
  })
  .catch(function (error){
    console.error(error);
  }); 
};
