"use strict"

let btns = document.querySelectorAll('.link');
let currentUrl='';

for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        partial(btn.href);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    partial('home.html');
});

let contUsuarios = [];

  function partial(url) {
   
  currentUrl=url;
   
    document.querySelector('.contenido').innerHTML = "<h1> Aguarde ... </h1>";
    fetch(url)
        .then((response) => response.text())
        .then((html) => {

            document.querySelector('.contenido').innerHTML = html;
           if (currentUrl.includes('contacto.html') ) {
              funcionesJs(); 
              usuarios();
            }
            
        })
        .catch((err) => {
            alert(err);
        });  
  }
  function funcionesJs(){

  document.querySelector('#refrescar').addEventListener('click', refrescarCapchat);
  document.querySelector('#enviar').addEventListener('click', comparacionCapchat);
  document.querySelector('#borrarTabla').addEventListener('click', resetearBoton);
    
    let capchat;

    let valorcapchat = ["4f56dh", "8f56ds", "7f5d4s", "g4f5ds"];
    
    let form = document.querySelector('#form');

    form.addEventListener('submit', valoresForm);

    numeroCapchat();

    function numeroCapchat() {

        let posicionCapchat = Math.floor(Math.random() * 4);
    
        capchat = valorcapchat[posicionCapchat];
    
        document.querySelector("#capchat").innerHTML = capchat;
    
        document.querySelector("#entrada").value = "";
    }
    function comparacionCapchat(e) {
    
      e.preventDefault();

        let resultadoValidacion = document.querySelector("#validacion");
    
        //let carga = document.querySelector("#cargaUsuario");
    
        if (validarCapchat() ) {
            
            resultadoValidacion.innerHTML = "VALIDACIÓN CORRECTA";
            
            valoresForm(e);
            
        } else {
            
            resultadoValidacion.innerHTML = "VALIDACIÓN INCORRECTA";
    
        }
    
        numeroCapchat();
    }
    function validarCapchat() {
       let entrada = document.querySelector("#entrada").value;
    
       if (capchat===entrada) {
        return true;
        
       } else {
        return false;
       }
    }
    function refrescarCapchat() {
        
      numeroCapchat();
        
    }
    function resetearBoton(e){
         
        contUsuarios.pop();  
        valoresForm(e);
           
    }
    function valoresForm(e) {

  e.preventDefault();  

  let formData = new FormData(form);
  
  let nombre = formData.get('nombre');
  
  let apellido = formData.get('apellido');
  
  let telefono = formData.get('telefono');
  
  let email = formData.get('email');
  
  let contrasena = formData.get('contrasena');
  
  let ciudad = formData.get('ciudad');
  
  let calle = formData.get('calle');
  
  let altura = formData.get('altura');
  
  let piso = formData.get('piso');
  
  let depto = formData.get('depto');

  let usuario = [];
  
  usuario = {
    "nombre" : nombre,
    "apellido" : apellido,
    "telefono" : telefono,
    "email" : email,
    "contrasena" : contrasena,
    "ciudad" : ciudad,
    "calle" : calle,
    "altura" : altura,  
    "piso" : piso,
    "depto" : depto   
  }

  if (validarCapchat()) {
    contUsuarios.push(usuario);
    
  }
  resetearForm();
  datosImprimir();
    }
    function resetearForm() {
        
        form.reset();
    }


  }
  function datosImprimir() {
   
  let usuarioDom = document.querySelector("#cargaUsuario");
  
  usuarioDom.innerHTML = '';
  
  let contador = 1;
      
  for (const usuario of contUsuarios) {
      
      let fila = document.createElement("tr");
      
      let encabezado = document.createElement("th");        
      encabezado.textContent = "USUARIO" + contador;
      fila.appendChild(encabezado);
 
      let datosUsuario = {
          
          "nombre":(usuario.nombre),
          
          "apellido":(usuario.apellido),
          
          "telefono":(usuario.telefono),
          
          "email":(usuario.email),
          
          "contrasena":(usuario.contrasena),
          
          "ciudad":(usuario.ciudad),
          
          "calle":(usuario.calle),
          
          "altura":(usuario.altura),
          
          "piso":(usuario.piso),
          
          "depto":(usuario.depto),
      
      }
 
  
    let celda0 = document.createElement("td");
      fila.appendChild(celda0)
      celda0.textContent = datosUsuario.nombre;
    
    let celda1 = document.createElement("td"); 
      fila.appendChild(celda1)
      celda1.textContent =datosUsuario.apellido;
    
    let celda2 = document.createElement("td");
      fila.appendChild(celda2)
      celda2.textContent =datosUsuario.telefono;
    
    let celda3 = document.createElement("td");
      fila.appendChild(celda3)
      celda3.textContent =datosUsuario.email;
    
    let celda4 = document.createElement("td");
      fila.appendChild(celda4)
      celda4.textContent =datosUsuario.contrasena;
    
    let celda5 = document.createElement("td");
      fila.appendChild(celda5)
      celda5.textContent =datosUsuario.ciudad;
    
    let celda6 = document.createElement("td");
      fila.appendChild(celda6)
      celda6.textContent =datosUsuario.calle; 
    
    let celda7 = document.createElement("td");
      fila.appendChild(celda7)
      celda7.textContent =datosUsuario.altura;
    
    let celda8 = document.createElement("td");
      fila.appendChild(celda8)
      celda8.textContent =datosUsuario.piso;
    
    let celda9 = document.createElement("td");
      fila.appendChild(celda9)
      celda9.textContent =datosUsuario.depto;
           
  usuarioDom.appendChild(fila);
  
  contador++;
    }
  }     
  async function usuarios() {

      const url = 'https://649dcad49bac4a8e669e52ae.mockapi.io/api/v1/usuario';

      const lista = document.querySelector("#cargaUsuario");

      lista.innerHTML = "";

        try {
        
        let res = await fetch(url);
        let json = await res.json();
          
        for (const usuario of json) {
            
          contUsuarios.push(usuario);
          datosImprimir();
        
        }

      } catch (error) {
        
        console.log(error);
      
      }

  }