const contacto_form = document.getElementById("contacto-form");
const inputs = document.querySelectorAll("#contacto-form input")

// Validaciones de expresiones
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	usuario:  /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	numero: /^\d{10}$/ // 10 números
}


const campos = {
	nombre : false,
	email : false,
	usuario : false,
	numero : false
}

// validacion de campos pendientes por llenar 
const validarFormulario = (e) =>{
	switch (e.target.name){
		case "nombre":
			validarCampo (expresiones.nombre, e.target, "nombre");	
		break;
		case "email":
			validarCampo (expresiones.email, e.target, "email");
		break;
		case "usuario":
			validarCampo (expresiones.usuario, e.target, "usuario");	
		break;
		case "numero":
			validarCampo (expresiones.numero, e.target, "numero");	
		break;
	}

}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.add('fa-check');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.remove('fa-xmark');
		document.querySelector(`#grupo_${campo} .form_error`).classList.remove('form_error-activo');
		campos[campo] = true;
		
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.add('fa-xmark');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.remove('fa-check');
		document.querySelector(`#grupo_${campo} .form_error`).classList.add('form_error-activo');
		campos[campo] = false;
		
	}
}


inputs.forEach((input)=>{
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);

});

contacto_form.addEventListener('submit', (e) =>{
	e.preventDefault();

	if (campos.nombre && campos.email && campos.usuario && campos.numero){
		document.getElementById("formulario_mensaje-exito").classList.add("formulario_mensaje-exito-activo");
        
		setTimeout(()=>{
			document.getElementById("formulario_mensaje-exito").classList.remove("formulario_mensaje-exito-activo");
		},3000);

		document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo-correcto');
		});
	} else {
		document.getElementById("formulario_mensaje").classList.add("formulario_mensaje-activo");
		setTimeout(()=>{
			document.getElementById("formulario_mensaje").classList.remove("formulario_mensaje-activo");
		},3000)
	}
});

// Capturar informacion 
function capturar() {
    const usuario = document.getElementById("usuario").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("numero").value;

    console.log("usuario: "+ usuario);
    console.log("Nombre: "+ nombre);
    console.log("Email: "+ email);
    console.log("numero: "+ mensaje);
};

// Limpiar formulario
function limpiarForm() {
	alert("Limpiar Formulario");
	document.getElementById("contacto-form").reset();
};

// Funciones para los botones
window.onload = function() {

	const botonLimpiar = document.getElementById("limpiar");
	botonLimpiar.onclick = limpiarForm;

	const botonEnviar = document.contacto_form.enviar_btn;
	botonEnviar.onclick = capturar;

};

// localStorage 
const input = document.querySelectorAll('#contacto-form input');
console.log(input);

const objectInput = {
    usuario: input[0].value,
    nombre: input[1].value,
    email: input[2].value,
    numero: input[3].value
}

localStorage.clear();
localStorage.setItem('formulario', JSON.stringify(objectInput))

const oILocalStorage = JSON.parse(localStorage.getItem('formulario'))

console.log('El primer dato es', localStorage.key(0));

console.log(`El valor del localStorage es: ${localStorage.key(0)}`,oILocalStorage);

const key = localStorage.key(0);

setTimeout(()=>{
    localStorage.removeItem('formulario')
    console.log('Se elimina el dato del localStorage');
}, 5000); 