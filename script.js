var preguntas = [
  { texto: "¿Qué es una variable?", opciones: ["Un espacio que almacena un valor", "Una estructura de repetición", "Un tipo de función", "Una base de datos"], correcta: 0, explicacion: "Una variable guarda un valor que puede cambiar durante el programa." },
  { texto: "¿Cuál estructura repite código?", opciones: ["for", "if", "switch", "import"], correcta: 0, explicacion: "La estructura for repite un bloque de código un número determinado de veces." },
  { texto: "¿Qué es una función?", opciones: ["Un bloque de código reutilizable", "Un tipo de variable", "Un archivo de datos", "Un comando del sistema"], correcta: 0, explicacion: "Una función agrupa instrucciones que se pueden reutilizar en varias partes del programa." },
  { texto: "¿Qué tipo de dato guarda un número entero?", opciones: ["int", "string", "boolean", "float"], correcta: 0, explicacion: "El tipo int almacena números enteros, sin decimales." },
  { texto: "¿Qué símbolo se usa para comentar una línea en muchos lenguajes?", opciones: ["//", "##", "--", "**"], correcta: 0, explicacion: "En lenguajes como C, Java o JavaScript se usa // para comentar una línea." }
];

function revisarFormulario(form) {
  var correo = form.correo.value;
  var password = form.password.value;
  var error = document.getElementById("error");
  if (correo == "" || password == "") {
    error.style.display = "block";
    error.innerHTML = "Por favor llena todos los campos.";
    return false;
  }
  window.location.href = form.destino.value;
  return false;
}

function iniciarEvaluacion() {
  localStorage.setItem("preguntaActual", "1");
  localStorage.setItem("ultimaRespuesta", "");
  localStorage.setItem("correctas", "0");
}

function renderPregunta() {
  var actual = parseInt(localStorage.getItem("preguntaActual") || "1");
  if (actual < 1 || actual > 5 || isNaN(actual)) { actual = 1; localStorage.setItem("preguntaActual", "1"); }
  var p = preguntas[actual - 1];
  var contador = document.getElementById("contador");
  var titulo = document.getElementById("tituloPregunta");
  if (contador) { contador.innerHTML = "Pregunta " + actual + " de 5"; }
  if (titulo) { titulo.innerHTML = p.texto; }
  var opcionesRadio = document.querySelectorAll('input[name="opcion"]');
  for (var j = 0; j < opcionesRadio.length; j++) { opcionesRadio[j].checked = false; }
  for (var i = 0; i < 4; i++) {
    var op = document.getElementById("opcion" + (i + 1));
    if (op) { op.innerHTML = " " + p.opciones[i]; }
  }
}

function responder() {
  var actual = parseInt(localStorage.getItem("preguntaActual") || "1");
  var p = preguntas[actual - 1];
  var sel = document.querySelector('input[name="opcion"]:checked');
  var elegida = sel ? parseInt(sel.value) : -1;
  var correctas = parseInt(localStorage.getItem("correctas") || "0");
  localStorage.setItem("explicacion", p.explicacion);
  if (elegida == p.correcta) {
    localStorage.setItem("correctas", correctas + 1);
    window.location.href = "respuesta-correcta.html";
  } else {
    window.location.href = "respuesta-incorrecta.html";
  }
}

function renderExplicacion() {
  var e = document.getElementById("explicacion");
  var val = localStorage.getItem("explicacion");
  if (e && val) { e.innerHTML = val; }
}

function renderResultado() {
  var correctas = parseInt(localStorage.getItem("correctas") || "0");
  var reforzar = 5 - correctas;
  var pct = Math.round(correctas / 5 * 100);
  var e1 = document.getElementById("porcentaje");
  var e2 = document.getElementById("correctas");
  var e3 = document.getElementById("reforzar");
  if (e1) { e1.innerHTML = pct + "% de respuestas correctas"; }
  if (e2) { e2.innerHTML = "Correctas: " + correctas; }
  if (e3) { e3.innerHTML = "Por reforzar: " + reforzar; }
}

function siguientePregunta() {
  var actual = parseInt(localStorage.getItem("preguntaActual") || "1");
  actual = actual + 1;
  if (actual > 5) {
    localStorage.setItem("preguntaActual", "1");
    window.location.href = "resultado-examen.html";
  } else {
    localStorage.setItem("preguntaActual", actual);
    window.location.href = "pregunta-examen.html";
  }
}
