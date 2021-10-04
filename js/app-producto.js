const form = document.getElementById('formulario-producto');
const inputs=document.querySelectorAll('#formulario-producto input');     

function guardar(){
    var codigo= document.getElementById("producto-codigo").value;
    var nombre= document.getElementById("producto-nombre").value;
    var modelo= document.getElementById("producto-modelo").value;
    var valor= document.getElementById("producto-valor").value;
    var cantidad= document.getElementById("producto-cantidad").value;
    var descripcion= document.getElementById("producto-descripcion").value;

    if (nombre==""){
        alert("El nombre del producto es obligatorio");
        document.getElementById("producto-codigo").focus();
    }else{
        if(modelo==""){
            alert("El modelo es obligatorio");
            document.getElementById("producto-modelo").focus();
        }else{
            if(valor==""){
                alert("El valor es obligatorio"); 
                document.getElementById("producto-modelo").focus();
            }else{
                if(cantidad==""){
                    alert("La cantidad de productos es obligatoria"); 
                    document.getElementById("producto-cantidad").focus();
                }else{
                    if(descripcion==""){
                        alert("La descripcion es obligatoria"); 
                        document.getElementById("producto-descripcion").focus();
                    }else{
                        alert("El producto se ha guardado correctamente");
                        console.log(nombre);
                        }
                    }
                }
            }
        }
}

function limpiar(){
  form.reset();
}


function buscar(){


}


function download(data,filename){
    let file = new Blob([JSON.stringify(data)],{type:"application/json"});
    let a =document.createElement('a');
    a.href=  URL.createObjectURL(file);
    a.download=filename;
    console.log(a);
    }