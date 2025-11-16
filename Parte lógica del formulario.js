const id_servicio = "service_21r2x6r"; 
const id_plantillas = "template_873mcoj"; 

let formulario; 
let botonEnviar;
const scriptURL = "https://script.google.com/macros/s/AKfycbz4-LTRJ5nxcHj613m-vfMRHLU1NugA5-PSSWN6alqOlDwTVgtqyjT384h9_iCCeyjn/exec";

window.recaptchaVerificado = function(response) {
    if (botonEnviar) {
        botonEnviar.disabled = false;
        console.log("reCAPTCHA verificado. Botón habilitado.");
    }
}

window.recaptchaExpirado = function() {
    if (botonEnviar) {
        botonEnviar.disabled = true;
        console.log("reCAPTCHA expirado. Botón deshabilitado.");
    }
}

function enviarEmail(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("exampleInputEmail1").value.trim();
    let asunto = document.getElementById("consulta").value.trim();
    let mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === "" || email === "" || asunto === "" || mensaje === "") {
        alert("Por favor complete todos los campos antes de enviar.");
        return; 
    }
    
    if (botonEnviar.disabled) {
        alert("Por favor verifique el reCAPTCHA antes de enviar.");
        return;
    }

    const formData= new FormData(formulario);

    const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asunto,
        message_html: mensaje
    };


    emailjs.send(id_servicio, id_plantillas, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensaje enviado');
            
            formulario.reset(); 
            grecaptcha.reset();
            botonEnviar.disabled = true;
            
        }, (error) => {
            console.log('FAILED...', error);
            alert('Falló el envío');
            grecaptcha.reset(); 
            botonEnviar.disabled = true;
        });

        fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });
}

document.addEventListener('DOMContentLoaded', () => {
    formulario = document.getElementById('formulario');
    botonEnviar = document.getElementById('boton');
    
    if (formulario) {
        formulario.addEventListener('submit', enviarEmail);
    }
}); 
