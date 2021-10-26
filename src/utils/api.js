import axios from 'axios';

//const baseURL = "http://localhost:5000"
const baseURL = "https://sleepy-scrubland-44534.herokuapp.com"

const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
}
//P E S T A Ñ A   D E    P R O D U C T O S

//get
export const obtenerProductos = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET', url: `${baseURL}/productos/`,
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
    url: `${baseURL}/productos/`,
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
    url: `${baseURL}/productos/${id}/`,
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
    url: `${baseURL}/productos/${id}/`,
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
    url: `${baseURL}/usuarios/`,
    headers: {
      Authorization: getToken(),
    }
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/usuarios/self`,
    headers: {
      Authorization: getToken(), 
    }
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//Patch
export const editarUsuario = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${baseURL}/usuarios/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
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
    method: 'POST', url: `${baseURL}/ventas/`, headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

//patch

//delete