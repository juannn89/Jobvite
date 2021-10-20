import axios from 'axios';

//P E S T A Ñ A   D E    P R O D U C T O S

//get
export const obtenerProductos = async (setProductos) => {
  const options = { method: 'GET', url: 'http://localhost:5000/productos'};

  await axios.request(options).then(function (response){
    setProductos(response.data);
  })
  .catch(function (error){
    console.error(error);
  }); 
};


//post

//patch

//delete






//P E S T A Ñ A   D E    V E N T A S 

//get

//post

//patch

//delete








//P E S T A Ñ A   D E    U S U A R I O S

//get

//post

//patch

//delete