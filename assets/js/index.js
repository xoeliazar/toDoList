const tareas = [
  { id: 1, tarea: "Limpiar", completada: false },
  { id: 2, tarea: "Estudiar", completada: false },
  { id: 3, tarea: "Cocinar", completada: false },
];
const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const contador = document.querySelector("#total");
const contadorCompletadas = document.querySelector("#realizadas");

renderizar(tareas);

btnAgregar.addEventListener("click", () => {
  const nombreTarea = tareaInput.value;
  if (nombreTarea === "") {
    alert("Debes escribir una tarea para poder asignarla.");
    return;
  }
  let lastId = 0;
  if (tareas.length > 0) {
    lastId = tareas[tareas.length - 1].id;
  }
  const nuevaTarea = {
    id: lastId + 1,
    tarea: nombreTarea,
    completada: false,
  };
  tareas.push(nuevaTarea);
  tareaInput.value = "";
  renderizar(tareas);
});

function renderizar(tareas) {
  let html = "";
  let tareasRealizadas = 0;
  for (const tarea of tareas) {
    html += `
    <tr id="tarea-${tarea.id}">
      <td class="id-container">${tarea.id}</td>
      <td>${tarea.tarea}</td>
      <td><input type="checkbox" id="checkbox-${tarea.id}" ${
      tarea.completada ? "checked" : ""
    } onclick="completeCheck(${tarea.id})"></td>
      <td><button onclick="borrar(${tarea.id})">Borrar</button></td>
    </tr>`;
    if (tarea.completada) {
      tareasRealizadas++;
    }
  }
  listaDeTareas.innerHTML = html;
  contador.innerHTML = `${tareas.length}`;
  contadorCompletadas.innerHTML = tareasRealizadas;
}

function completeCheck(id) {
  const tarea = tareas.find((tareas) => tareas.id === id);
  tarea.completada = !tarea.completada;
  renderizar(tareas);
}

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id === id);
  tareas.splice(index, 1);
  renderizar(tareas);
}
