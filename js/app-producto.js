const formulario = document.getElementById('formulario-producto');
const inputs=document.querySelectorAll('#formulario-producto input');     

form.onsubmit=(event)=>{
    event.preventDefault();
    console.log(formDataToJSON());
}


function formDataToJSON(){
    const user ={};
    Array.from(form.elemtns).forEach((element) => {
        if(element.name) user[element.name] =element.value;
    });
    return user
}
