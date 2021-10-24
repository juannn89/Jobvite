import axios from 'axios';


const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
}
//P E S T A Ñ A   D E    P R O D U C T O S

//get
export const obtenerProductos = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET', url: 'http://localhost:5000/productos/',
    headers: {
      Authorization: getToken(),
    }
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//post
export const crearProducto = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/productos/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken()},
    data,
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//patch
export const editarProducto = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:5000/productos/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//delete
export const borrarProducto = async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `http://localhost:5000/productos/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//CRUD PARA USUARIOS

//get
export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `http://localhost:5000/usuarios/`,
    headers: {
      Authorization: getToken(),
    }
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};



//P E S T A Ñ A   D E    V E N T A S 

//get

//post
export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST', url: `http://localhost:5000/ventas/`, headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//patch

//delete