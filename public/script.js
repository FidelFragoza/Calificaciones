const form = document.getElementById('calificacion-form');
const calificacionesList = document.getElementById('calificaciones-list');
const apiUrl = 'http://localhost:5161/api/calificacion';

// Obtener todas las calificaciones al cargar la página
async function obtenerCalificaciones() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    calificacionesList.innerHTML = '';
    data.forEach(calificacion => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${calificacion.nombre}</td>
        <td>${calificacion.materia}</td>
        <td>${calificacion.calificacion}</td>
        <td>
          <button onclick="editarCalificacion(${calificacion.id}, '${calificacion.nombre}', 
          '${calificacion.materia}', ${calificacion.calificacion})">Editar</button>
          <button onclick="eliminarCalificacion(${calificacion.id})">Eliminar</button>
        </td>
      `;
      calificacionesList.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener las calificaciones:", error);
    alert("No se pudieron cargar las calificaciones. Verifica la conexión con la API.");
  }
}

// Crear o actualizar una calificación
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('calificacion-id').value;
  const nombre = document.getElementById('nombre').value;
  const materia = document.getElementById('materia').value;
  const calificacion = parseFloat(document.getElementById('calificacion').value);

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;
  const body = id
    ? { id: parseInt(id), nombre, materia, calificacion } // Para actualizar incluye el ID
    : { nombre, materia, calificacion }; // Para crear, no incluye el ID

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok || res.status === 204) { // Maneja códigos 200 y 204 como éxito
      form.reset();
      obtenerCalificaciones();
    } else {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error al guardar la calificación:", error);
    alert("No se pudo guardar la calificación. Verifica la conexión con la API.");
  }
});

// Editar una calificación
function editarCalificacion(id, nombre, materia, calificacion) {
  document.getElementById('calificacion-id').value = id;
  document.getElementById('nombre').value = nombre;
  document.getElementById('materia').value = materia;
  document.getElementById('calificacion').value = calificacion;
}

// Eliminar una calificación
async function eliminarCalificacion(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    obtenerCalificaciones();
  } catch (error) {
    console.error("Error al eliminar la calificación:", error);
    alert("No se pudo eliminar la calificación. Verifica la conexión con la API.");
  }
}

// Cargar calificaciones al inicio
obtenerCalificaciones();
