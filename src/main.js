// Cargar categorias

function cargarCategorias(categorias) {
  const categoriasNuevaOperacion = document.querySelector(
    "#categoria-nueva-operacion"
  );
  const categoriasFiltro = document.querySelector("#categorias-filtro");

  categoriasNuevaOperacion.innerHTML = "";
  categoriasFiltro.innerHTML = "";

  categorias.forEach((categoria) => {
    let nuevaCategoria = document.createElement("option");
    nuevaCategoria.value = categoria;
    nuevaCategoria.textContent = categoria;
    categoriasNuevaOperacion.appendChild(nuevaCategoria);

    let option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categoriasFiltro.appendChild(option);
  });

  mostrarCategorias();
}

const operaciones = localStorage.getItem("operaciones");
const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

function mostrarOperaciones() {
  const conOperaciones = document.querySelector("#con-operaciones");
  const sinOperaciones = document.querySelector("#sin-operaciones");

  mostrarOperaciones.innerHTML = ""; // Limpiar las operaciones anteriores

  if (operacionesParseadas.length > 0) {
    sinOperaciones.style.display = "none";
    conOperaciones.style.display = "flex";
    operacionesParseadas.forEach((operacion) => {
      const nuevoElemento = document.createElement("div");
      nuevoElemento.innerHTML = `
            <div class="flex justify-between mt-6 id="nuevo-elemento">
                <div class="w-1/4 text-gray-600">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="bg-teal-100 rounded text-sm text-teal-800 py-1 px-2 m-auto">
                    <span class="tag">${operacion.categoria}</span>
                </div>
                <div class="text-gray-600 m-auto">
                    ${operacion.fecha}
                </div>
                <div class="text-gray-600 font-bold m-auto ${
                  operacion.tipo === "Ganancia"
                    ? "text-green-600"
                    : "text-red-600"
                }">
                    ${operacion.monto}
                </div>
                <div class="m-auto">
                    <p class="is-fullwidth">
                        <a href="#" class="text-sm text-blue-500 text-white py-1 px-2 rounded">Editar</a>
                        <a href="#" class="text-sm text-red-600 text-white py-1 px-2 rounded">Eliminar</a>
                    </p>
                </div>
            </div>`;
      conOperaciones.appendChild(nuevoElemento);
    });
  } else {
    sinOperaciones.style.display = "block";
  }
}

//if (operacionesParseadas.length > 0) { }

// Obtener las referencias de los elementos del balance
const balanceGanancias = document.getElementById("balance-ganancias");
const balanceGastos = document.getElementById("balance-gastos");
const balanceTotal = document.getElementById("balance-total");

// Función para calcular ganancias
const calcularGanancias = () => {
  const operaciones = localStorage.getItem("operaciones");
  const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

  let ganancias = 0;
  operacionesParseadas.forEach((operacion) => {
    if (operacion.tipo === "Ganancia") {
      ganancias += parseFloat(operacion.monto);
    }
  });

  balanceGanancias.innerHTML = `
        <p class="text-black text-xl py-2">Ganancias</p>
        <p class="text-green text-xl py-2">+$${ganancias.toFixed(2)}</p>
    `;
};

// Función para calcular gastos
const calcularGastos = () => {
  const operaciones = localStorage.getItem("operaciones");
  const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

  let gastos = 0;
  operacionesParseadas.forEach((operacion) => {
    if (operacion.tipo === "Gasto") {
      gastos += parseFloat(operacion.monto);
    }
  });

  balanceGastos.innerHTML = `
        <p class="text-black text-xl py-2">Gastos</p>
        <p class="text-red text-xl py-2">-$${gastos.toFixed(2)}</p>
    `;
};

// Función para calcular el balance total
const calcularTotal = () => {
  const operaciones = localStorage.getItem("operaciones");
  const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

  let total = 0;
  operacionesParseadas.forEach((operacion) => {
    if (operacion.tipo === "Ganancia") {
      total += parseFloat(operacion.monto);
    } else if (operacion.tipo === "Gasto") {
      total -= parseFloat(operacion.monto);
    }
  });

  balanceTotal.innerHTML = `
        <h4 class="text-black text-2xl py-2">Total</h4>
        <p class="text-black font-bold text-xl py-2">$${total.toFixed(2)}</p>
    `;
};

// Cargar storage
function cargarStorage() {
  const categorias = localStorage.getItem("categorias");

  if (!categorias) {
    const categoriasDefault = [
      "Comida",
      "Servicios",
      "Salidas",
      "Educación",
      "Transporte",
      "Trabajo",
    ];
    localStorage.setItem("categorias", JSON.stringify(categoriasDefault));
    cargarCategorias(categoriasDefault);
  } else {
    let nuevasCategoriasArray = JSON.parse(categorias);
    cargarCategorias(nuevasCategoriasArray);
  }

  mostrarOperaciones();
  calcularGanancias();
  calcularGastos();
  calcularTotal();
}

cargarStorage();

//Cambiar Vistas
const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const btnCancelarOperacion = document.getElementById("btn-cancelar-operacion");
const btnAgregarOperacion = document.getElementById("btn-agregar-operacion");

const vistaBalance = document.getElementById("vista-balance");
const vistaCategorias = document.getElementById("vista-categorias");
const vistaReportes = document.getElementById("vista-reportes");
const vistaNuevaOperacion = document.getElementById("vista-nueva-operacion");

const cambiarVista = (mostrarVista) => {
  vistaBalance.style.display = "none";
  vistaCategorias.style.display = "none";
  vistaReportes.style.display = "none";
  vistaNuevaOperacion.style.display = "none";

  mostrarVista.style.display = "flex";
};

btnBalance.addEventListener("click", () => cambiarVista(vistaBalance));
btnCategorias.addEventListener("click", () => cambiarVista(vistaCategorias));
btnReportes.addEventListener("click", () => cambiarVista(vistaReportes));
btnCancelarOperacion.addEventListener("click", () =>
  cambiarVista(vistaBalance)
);

btnNuevaOperacion.addEventListener("click", () =>
  cambiarVista(vistaNuevaOperacion)
);

// Boton Filtros
const btnFiltros = document.getElementById("btn-filtros");
const vistaFiltros = document.getElementById("vista-filtros");

const ocultarFiltros = () => {
  vistaFiltros.classList.toggle("hidden");
  btnFiltros.innerHTML === "Ocultar Filtros"
    ? (btnFiltros.innerHTML = "Mostrar Filtros")
    : (btnFiltros.innerHTML = "Ocultar Filtros");
};

btnFiltros.addEventListener("click", ocultarFiltros);

// Menu Hamburguesa
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => {
  const icon = btnMenu.querySelector("i");
  if (menu.classList.contains("top-[80px]")) {
    icon.classList.remove("fa-close");
    icon.classList.add("fa-bars");
    menu.classList.remove("top-[80px]", "opacity-100");
    menu.classList.add("top-[-400px]", "opacity-0");
  } else {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-close");
    menu.classList.remove("top-[-400px]", "opacity-0");
    menu.classList.add("top-[80px]", "opacity-100");
  }
});

//Nueva Operacion
btnNuevaOperacion.addEventListener("click", () => {
  vistaBalance.style.display = "none";
  vistaNuevaOperacion.classList.remove("hidden");
});

const descripcionNuevaOperacion = document.getElementById(
  "descripcion-nueva-operacion"
);
const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
const categoriaNuevaOperacion = document.getElementById(
  "categoria-nueva-operacion"
);
const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");

function crearOperacion() {
  let nuevaOperacion = {
    descripcion: descripcionNuevaOperacion.value,
    monto: parseFloat(montoNuevaOperacion.value),
    tipo: tipoNuevaOperacion.value,
    categoria: categoriaNuevaOperacion.value,
    fecha: fechaNuevaOperacion.value,
  };

  const operaciones = localStorage.getItem("operaciones");
  if (operaciones === null) {
    let nuevoArray = [nuevaOperacion];
    localStorage.setItem("operaciones", JSON.stringify(nuevoArray));
  } else {
    let parsedStorage = JSON.parse(operaciones);
    parsedStorage.push(nuevaOperacion);
    localStorage.setItem("operaciones", JSON.stringify(parsedStorage));
  }
  mostrarOperaciones();
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  cargarCategorias(categorias);
  calcularGanancias();
  calcularGastos();
  calcularTotal();
  vistaNuevaOperacion.style.display = "none";
  vistaBalance.style.display = "flex";
}

btnAgregarOperacion.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  crearOperacion();
});

// Mostrar Operaciones
function mostrarOperaciones() {
  const operaciones = localStorage.getItem("operaciones");
  const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];
  const conOperaciones = document.querySelector("#con-operaciones");
  const sinOperaciones = document.querySelector("#sin-operaciones");

  conOperaciones.innerHTML = `<div class="flex justify-between mt-8">
    <div class="font-bold w-1/4">Descripción</div>
    <div class="font-bold">Categoría</div>
    <div class="font-bold">Fecha</div>
    <div class="font-bold">Monto</div>
    <div class="font-bold mr-10">Acciones</div>
</div>`; // Limpiar las operaciones anteriores

  if (operacionesParseadas.length > 0) {
    sinOperaciones.style.display = "none";
    conOperaciones.style.display = "flex";
    operacionesParseadas.forEach((operacion, index) => {
      //botonEliminar.classList.add('bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded');
      //botonEditar.classList.add('bg-blue-500', 'text-white', 'py-1', 'px-2', 'mr-2', 'rounded');

      const nuevaOperacion = document.createElement("div");
      nuevaOperacion.innerHTML = `
            <div class="flex justify-between items-center p-2 mt-6">
                <div class="w-1/4 text-gray-800 font-bold">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="text-sm bg-teal-100 rounded text-sm text-teal-900 py-1 px-2">
                    <span class="tag">${operacion.categoria}</span>
                </div>
                <div class="text-gray-600">
                    ${operacion.fecha}
                </div>
                <div class="text-gray-600 font-bold ${operacion.tipo === "Ganancia"
                    ? "text-green-600"
                    : "text-red-600"}">
                    ${operacion.tipo === "Ganancia" ? "+$"+operacion.monto : "$"+operacion.monto}
                </div>
                <div class="right">
                    <p class="is-fullwidth">
                        <a href="#" class="text-sm text-blue-500 text-white py-1 px-2 rounded" onclick="editarOperacion(${index})">Editar</a>
                        <a href="#" class="text-sm text-red-500 text-white py-1 px-2 mr-2 rounded" onclick="eliminarOperacion(${index})">Eliminar</a>
                    </p>
                </div>
            </div>`;

      conOperaciones.appendChild(nuevaOperacion);
    });
  } else {
    sinOperaciones.style.display = "block";
    conOperaciones.innerHTML = ``;
  }
}

// Mostrar Categorías
function mostrarCategorias() {
  const categorias = localStorage.getItem("categorias");
  const categoriasParseadas = categorias ? JSON.parse(categorias) : [];
  const listaCategorias = document.querySelector("#lista-categorias");

  listaCategorias.innerHTML = ""; // Limpiar las categorías anteriores

  categoriasParseadas.forEach((categoria) => {
    const categoriaElemento = document.createElement("li");
    categoriaElemento.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "mb-2"
    );

    const nombreCategoria = document.createElement("span");
    nombreCategoria.textContent = categoria;
    nombreCategoria.classList.add(
      "text-sm",
      "bg-teal-100",
      "rounded",
      "text-teal-900",
      "py-1",
      "px-2"
    );

    const contenedorBotones = document.createElement("div");

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add(
      "text-blue-500",
      "text-sm",
      "text-white",
      "py-1",
      "px-2",
      "mr-2",
      "rounded"
    );
    botonEditar.addEventListener("click", () => editarCategoria(categoria));

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add(
      "text-red-500",
      "text-sm",
      "text-white",
      "py-1",
      "px-2",
      "rounded"
    );
    botonEliminar.addEventListener("click", () => eliminarCategoria(categoria));

    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);

    categoriaElemento.appendChild(nombreCategoria);
    categoriaElemento.appendChild(contenedorBotones);

    listaCategorias.appendChild(categoriaElemento);
  });
}

function cargarCategoriasEdicion() {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  const categoriasSelect = document.getElementById("categoria-operacion");
  categoriasSelect.innerHTML = ""; // Limpiar las opciones anteriores

  categorias.forEach((categoria) => {
    let option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categoriasSelect.appendChild(option);
  });
}

// Editar Operación
function editarOperacion(index) {
  let operaciones = localStorage.getItem("operaciones");
  let operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];
  // Obtener la operación a editar
  const operacion = operacionesParseadas[index];

  // Cargar las categorías desde el localStorage en el campo de selección
  cargarCategoriasEdicion();

  // Llenar los campos del formulario con los datos de la operación
  document.getElementById("descripcion-operacion").value =
    operacion.descripcion;
  document.getElementById("monto-operacion").value = operacion.monto;
  document.getElementById("tipo-operacion").value = operacion.tipo;
  document.getElementById("categoria-operacion").value = operacion.categoria;
  document.getElementById("fecha-operacion").value = operacion.fecha;

  // Mostrar el formulario de nueva operación
  document.getElementById("vista-editar-operacion").classList.remove("hidden");
  document.getElementById("vista-balance").style.display = "none";

  // Clonar y reemplazar el botón "Guardar cambios"
  const newBtn = document.getElementById("btn-editar-operacion");
  const newBtnClone = newBtn.cloneNode(true);
  newBtn.parentNode.replaceChild(newBtnClone, newBtn);

  // Asignar evento click para guardar los cambios
  newBtnClone.addEventListener("click", function () {
    operacion.descripcion = document.getElementById(
      "descripcion-operacion"
    ).value;
    operacion.monto = parseFloat(
      document.getElementById("monto-operacion").value
    );
    operacion.tipo = document.getElementById("tipo-operacion").value;
    operacion.categoria = document.getElementById("categoria-operacion").value;
    operacion.fecha = document.getElementById("fecha-operacion").value;

    localStorage.setItem("operaciones", JSON.stringify(operacionesParseadas));

    mostrarOperaciones();
    mostrarCategorias();
    calcularGanancias();
    calcularGastos();
    calcularTotal();

    // Ocultar el formulario y mostrar la vista de balance
    document.getElementById("vista-editar-operacion").classList.add("hidden");
    document.getElementById("vista-balance").style.display = "flex";
  });

  // Seleccionar la categoría actual de la operación
  document.getElementById("categoria-operacion").value = operacion.categoria;

  // Clonar y reemplazar el botón "Cancelar"
  const cancelarBtn = document.getElementById("btn-cancelar-edicion");
  const cancelarBtnClone = cancelarBtn.cloneNode(true);
  cancelarBtn.parentNode.replaceChild(cancelarBtnClone, cancelarBtn);

  // Asignar evento click para cancelar y volver a la vista de balance
  cancelarBtnClone.addEventListener("click", function () {
    console.log("estoy en el boton cancelar");
    document.getElementById("vista-editar-operacion").classList.add("hidden");
    document.getElementById("vista-balance").style.display = "flex";
  });
}

// Eliminar Operación
function eliminarOperacion(index) {
  let operaciones = localStorage.getItem("operaciones");
  let operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

  operacionesParseadas.splice(index, 1);

  localStorage.setItem("operaciones", JSON.stringify(operacionesParseadas));

  mostrarOperaciones();
  mostrarCategorias();
  calcularGanancias();
  calcularGastos();
  calcularTotal();
}

// Llamar a mostrarOperaciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarOperaciones();
  mostrarCategorias();
  calcularGanancias();
  calcularGastos();
  calcularTotal();
});

// Editar Categoría
function editarCategoria(categoria) {
  const nuevoNombre = prompt("Editar nombre de la categoría:", categoria);
  if (nuevoNombre) {
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    const index = categorias.indexOf(categoria);
    if (index !== -1) {
      categorias[index] = nuevoNombre;
      localStorage.setItem("categorias", JSON.stringify(categorias));
      cargarCategorias(categorias);
    }
  }
}

// Eliminar Categoría
function eliminarCategoria(categoria) {
  if (
    confirm(`¿Está seguro de que desea eliminar la categoría "${categoria}"?`)
  ) {
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    categorias = categorias.filter((cat) => cat !== categoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    cargarCategorias(categorias);
  }
}

const agregarCategoriaBtn = document.getElementById("agregar-categoria-btn");
agregarCategoriaBtn.addEventListener("click", () => {
  const nombreCategoriaInput = document.getElementById(
    "nombre-categoria-input"
  );
  const nuevaCategoria = nombreCategoriaInput.value.trim();
  if (nuevaCategoria) {
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    categorias.push(nuevaCategoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    nombreCategoriaInput.value = "";
    cargarCategorias(categorias);
  }
});

// Mostrar vista reportes

const conReportes = document.getElementById("con-reportes");
const sinReportes = document.getElementById("sin-reportes");
if (
  operacionesParseadas.some((operacion) => operacion.tipo === "Ganancia") &&
  operacionesParseadas.some((operacion) => operacion.tipo === "Gasto")
) {
  sinReportes.classList.add("hidden");
  conReportes.classList.remove("hidden");
} else {
  sinReportes.classList.remove("hidden");
  conReportes.classList.add("hidden");
}

// Resumen de balance

let catMayorGanancia = document.getElementById("cat-mayor-ganancia");
let catMayorGasto = document.getElementById("cat-mayor-gasto");
let catMayorBalance = document.getElementById("cat-mayor-balance");
let mesMayorGanancia = document.getElementById("mes-mayor-ganancia");
let mesMayorGasto = document.getElementById("mes-mayor-gasto");





//Filtros
let tipoFiltro = document.getElementById("tipo-filtro")

function tipoFiltrado(event){
if (nuevoElemento.node.contains(operacion.tipo === "Ganancia")){

}
}

tipoFiltro.addEventListener("input", tipoFiltrado)