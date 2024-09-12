// Cargar categorias

function cargarCategorias(categorias) {
    const categoriasNuevaOperacion = document.querySelector('#categoria-nueva-operacion');
    const categoriasFiltro = document.querySelector('#categorias-filtro');
    
    
    categoriasNuevaOperacion.innerHTML = ''; // Limpiar las opciones previas
    categoriasFiltro.innerHTML = ''; // Limpiar las opciones previas
    
    categorias.forEach(categoria => {
        let nuevaCategoria = document.createElement('option');
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria;
        categoriasNuevaOperacion.appendChild(nuevaCategoria);

        let option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriasFiltro.appendChild(option);
    });

    mostrarCategorias();
}

const operaciones = localStorage.getItem('operaciones');
const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

function mostrarOperaciones() {

    const conOperaciones = document.querySelector('#con-operaciones');
    const sinOperaciones = document.querySelector('#sin-operaciones');

    mostrarOperaciones.innerHTML = ''; // Limpiar las operaciones anteriores

    if (operacionesParseadas.length > 0) {
        sinOperaciones.style.display = 'none';
        conOperaciones.style.display = 'flex';
        operacionesParseadas.forEach(operacion => {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.innerHTML = `
            <div class="flex justify-between mt-6">
                <div class="w-1/4 text-gray-600">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="bg-teal-100 rounded text-sm text-teal-800 py-1 px-2 m-auto">
                    <span class="tag">${operacion.categoria}</span>
                </div>
                <div class="text-gray-600 m-auto">
                    ${operacion.fecha}
                </div>
                <div class="text-gray-600 font-bold m-auto">
                    ${operacion.monto}
                </div>
                <div class="m-auto">
                    <p class="is-fullwidth">
                        <a href="#" class="text-blue rounded mx-0 text-sm">Editar</a>
                        <a href="#" class="text-blue rounded mx-0 text-sm">Eliminar</a>
                    </p>
                </div>
            </div>`;
            conOperaciones.appendChild(nuevoElemento);
        });
    } else {
        sinOperaciones.style.display = 'block';
    }
}

// Obtener las referencias de los elementos del balance
const balanceGanancias = document.getElementById('balance-ganancias');
const balanceGastos = document.getElementById('balance-gastos');
const balanceTotal = document.getElementById('balance-total');


// Función para calcular ganancias
const calcularGanancias = () => {
    const operaciones = localStorage.getItem('operaciones');
    const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

    let ganancias = 0;
    operacionesParseadas.forEach(operacion => {
        if (operacion.tipo === 'Ganancia') {
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
    const operaciones = localStorage.getItem('operaciones');
    const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

    let gastos = 0;
    operacionesParseadas.forEach(operacion => {
        if (operacion.tipo === 'Gasto') {
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
    const operaciones = localStorage.getItem('operaciones');
    const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

    let total = 0;
    operacionesParseadas.forEach(operacion => {
        if (operacion.tipo === 'Ganancia') {
            total += parseFloat(operacion.monto);
        } else if (operacion.tipo === 'Gasto') {
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
    const categorias = localStorage.getItem('categorias');

    if (!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];
        localStorage.setItem('categorias', JSON.stringify(categoriasDefault));
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
const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-nueva-operacion');
const btnCancelarOperacion = document.getElementById('btn-cancelar-operacion');
const btnAgregarOperacion = document.getElementById('btn-agregar-operacion');

const vistaBalance = document.getElementById('vista-balance');
const vistaCategorias = document.getElementById('vista-categorias');
const vistaReportes = document.getElementById('vista-reportes');
const vistaNuevaOperacion = document.getElementById('vista-nueva-operacion');

const cambiarVista = (mostrarVista) => {
    vistaBalance.style.display = 'none';
    vistaCategorias.style.display = 'none';
    vistaReportes.style.display = 'none';
    vistaNuevaOperacion.style.display = 'none';

    mostrarVista.style.display = 'flex';
}

btnBalance.addEventListener('click', () => cambiarVista(vistaBalance));
btnCategorias.addEventListener('click', () => cambiarVista(vistaCategorias));
btnReportes.addEventListener('click', () => cambiarVista(vistaReportes));
btnCancelarOperacion.addEventListener('click', () => cambiarVista(vistaBalance));
btnNuevaOperacion.addEventListener('click', () => cambiarVista(vistaNuevaOperacion));

// Boton Filtros
const btnFiltros = document.getElementById('btn-filtros');
const vistaFiltros = document.getElementById('vista-filtros');

const ocultarFiltros = () => {
    vistaFiltros.classList.toggle('hidden');
    btnFiltros.innerHTML === 'Ocultar Filtros'
        ? btnFiltros.innerHTML = 'Mostrar Filtros'
        : btnFiltros.innerHTML = 'Ocultar Filtros'
}

btnFiltros.addEventListener('click', ocultarFiltros);


// Menu Hamburguesa
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
    const icon = btnMenu.querySelector('i');
    if (menu.classList.contains('top-[80px]')) {
        icon.classList.remove('fa-close');
        icon.classList.add('fa-bars');
        menu.classList.remove('top-[80px]', 'opacity-100');
        menu.classList.add('top-[-400px]', 'opacity-0');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-close');
        menu.classList.remove('top-[-400px]', 'opacity-0');
        menu.classList.add('top-[80px]', 'opacity-100');
    }
});


//Nueva Operacion
btnNuevaOperacion.addEventListener('click', () => {
    vistaBalance.style.display = 'none';
    vistaNuevaOperacion.classList.remove('hidden');
}
);

const descripcionNuevaOperacion = document.getElementById('descripcion-nueva-operacion');
const montoNuevaOperacion = document.getElementById('monto-nueva-operacion');
const tipoNuevaOperacion = document.getElementById('tipo-nueva-operacion');
const categoriaNuevaOperacion = document.getElementById('categoria-nueva-operacion');
const fechaNuevaOperacion = document.getElementById('fecha-nueva-operacion');

function crearOperacion() {
    let nuevaOperacion = {
        descripcion: descripcionNuevaOperacion.value,
        monto: parseFloat(montoNuevaOperacion.value),
        tipo: tipoNuevaOperacion.value,
        categoria: categoriaNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    }

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
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    cargarCategorias(categorias);
    calcularGanancias();
    calcularGastos();
    calcularTotal();
    vistaNuevaOperacion.style.display = 'none';
    vistaBalance.style.display = 'flex';
}

btnAgregarOperacion.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    crearOperacion();
});


// Mostrar Operaciones
function mostrarOperaciones() {
    const operaciones = localStorage.getItem('operaciones');
    const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];
    const conOperaciones = document.querySelector('#con-operaciones');
    const sinOperaciones = document.querySelector('#sin-operaciones');

    conOperaciones.innerHTML = ''; // Limpiar las operaciones anteriores

    if (operacionesParseadas.length > 0) {
        sinOperaciones.style.display = 'none';
        conOperaciones.style.display = 'flex';
        operacionesParseadas.forEach((operacion, index) => {
            //botonEliminar.classList.add('bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded');
            //botonEditar.classList.add('bg-blue-500', 'text-white', 'py-1', 'px-2', 'mr-2', 'rounded');

            const nuevaOperacion = document.createElement('div');
            nuevaOperacion.innerHTML = `
            <div class="flex justify-between items-center p-2 mt-10">
                <div class="w-1/4 text-gray-600">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="bg-teal-100 rounded text-sm text-teal-800 py-1 px-2 m-auto">
                    <span class="tag">${operacion.categoria}</span>
                </div>
                <div class="text-gray-600 m-auto">
                    ${operacion.fecha}
                </div>
                <div class="text-gray-600 font-bold m-auto">
                    ${operacion.monto}
                </div>
                <div class="m-auto">
                    <p class="is-fullwidth">
                        <a href="#" class="bg-blue-500 text-white py-1 px-2 rounded" onclick="editarOperacion(${index})">Editar</a>
                        <a href="#" class="bg-red-500 text-white py-1 px-2 mr-2 rounded" onclick="eliminarOperacion(${index})">Eliminar</a>
                    </p>
                </div>
            </div>`;

            conOperaciones.appendChild(nuevaOperacion);

        });
    } else {
        sinOperaciones.style.display = 'block';
    }
}

// Mostrar Categorías
function mostrarCategorias() {
    const categorias = localStorage.getItem('categorias');
    const categoriasParseadas = categorias ? JSON.parse(categorias) : [];
    const listaCategorias = document.querySelector('#lista-categorias');

    listaCategorias.innerHTML = ''; // Limpiar las categorías anteriores

    categoriasParseadas.forEach(categoria => {
        const categoriaElemento = document.createElement('li');
        categoriaElemento.classList.add('flex', 'justify-between', 'items-center', 'border', 'p-2', 'mb-2');

        const nombreCategoria = document.createElement('span');
        nombreCategoria.textContent = categoria;

        const contenedorBotones = document.createElement('div');

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList.add('bg-blue-500', 'text-white', 'py-1', 'px-2', 'mr-2', 'rounded');
        botonEditar.addEventListener('click', () => editarCategoria(categoria));

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded');
        botonEliminar.addEventListener('click', () => eliminarCategoria(categoria));

        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);

        categoriaElemento.appendChild(nombreCategoria);
        categoriaElemento.appendChild(contenedorBotones);

        listaCategorias.appendChild(categoriaElemento);
    });
}

function cargarCategoriasEdicion() {
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const categoriasSelect = document.getElementById('categoria-operacion');
    categoriasSelect.innerHTML = ''; // Limpiar las opciones anteriores

    categorias.forEach(categoria => {
        let option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriasSelect.appendChild(option);
    });
}

// Editar Operación
function editarOperacion(index) {
    let operaciones = localStorage.getItem('operaciones');
    let operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];
    // Obtener la operación a editar
    const operacion = operacionesParseadas[index];

    // Cargar las categorías desde el localStorage en el campo de selección
    cargarCategoriasEdicion();

    // Llenar los campos del formulario con los datos de la operación
    document.getElementById('descripcion-operacion').value = operacion.descripcion;
    document.getElementById('monto-operacion').value = operacion.monto;
    document.getElementById('tipo-operacion').value = operacion.tipo;
    document.getElementById('categoria-operacion').value = operacion.categoria;
    document.getElementById('fecha-operacion').value = operacion.fecha;

    // Mostrar el formulario de nueva operación
    document.getElementById('vista-editar-operacion').classList.remove('hidden');
    document.getElementById('vista-balance').style.display = 'none';

    // Clonar y reemplazar el botón "Guardar cambios"
    const newBtn = document.getElementById('btn-editar-operacion');
    const newBtnClone = newBtn.cloneNode(true);
    newBtn.parentNode.replaceChild(newBtnClone, newBtn);

    // Asignar evento click para guardar los cambios
    newBtnClone.addEventListener('click', function () {
        operacion.descripcion = document.getElementById('descripcion-operacion').value;
        operacion.monto = parseFloat(document.getElementById('monto-operacion').value);
        operacion.tipo = document.getElementById('tipo-operacion').value;
        operacion.categoria = document.getElementById('categoria-operacion').value;
        operacion.fecha = document.getElementById('fecha-operacion').value;

        localStorage.setItem('operaciones', JSON.stringify(operacionesParseadas));

        mostrarOperaciones();
        mostrarCategorias();
        calcularGanancias();
        calcularGastos();
        calcularTotal();

        // Ocultar el formulario y mostrar la vista de balance
        document.getElementById('vista-editar-operacion').classList.add('hidden');
        document.getElementById('vista-balance').style.display = 'flex';
    });

    // Seleccionar la categoría actual de la operación
    document.getElementById('categoria-operacion').value = operacion.categoria;

    // Clonar y reemplazar el botón "Cancelar"
    const cancelarBtn = document.getElementById('btn-cancelar-edicion');
    const cancelarBtnClone = cancelarBtn.cloneNode(true);
    cancelarBtn.parentNode.replaceChild(cancelarBtnClone, cancelarBtn);

    // Asignar evento click para cancelar y volver a la vista de balance
    cancelarBtnClone.addEventListener('click', function () {
        console.log('estoy en el boton cancelar');
        document.getElementById('vista-editar-operacion').classList.add('hidden');
        document.getElementById('vista-balance').style.display = 'flex';
    });
}


// Eliminar Operación
function eliminarOperacion(index) {
    let operaciones = localStorage.getItem('operaciones');
    let operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];

    operacionesParseadas.splice(index, 1);

    localStorage.setItem('operaciones', JSON.stringify(operacionesParseadas));

    mostrarOperaciones();
    mostrarCategorias();
    calcularGanancias();
    calcularGastos();
    calcularTotal();
}

// Llamar a mostrarOperaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarOperaciones();
    mostrarCategorias();
    calcularGanancias();
    calcularGastos();
    calcularTotal();
});




// Editar Categoría
function editarCategoria(categoria) {
    const nuevoNombre = prompt('Editar nombre de la categoría:', categoria);
    if (nuevoNombre) {
        let categorias = JSON.parse(localStorage.getItem('categorias'));
        const index = categorias.indexOf(categoria);
        if (index !== -1) {
            categorias[index] = nuevoNombre;
            localStorage.setItem('categorias', JSON.stringify(categorias));
            cargarCategorias(categorias);
        }
    }
}

// Eliminar Categoría
function eliminarCategoria(categoria) {
    if (confirm(`¿Está seguro de que desea eliminar la categoría "${categoria}"?`)) {
        let categorias = JSON.parse(localStorage.getItem('categorias'));
        categorias = categorias.filter(cat => cat !== categoria);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        cargarCategorias(categorias);
    }
}

const agregarCategoriaBtn = document.getElementById('agregar-categoria-btn');
agregarCategoriaBtn.addEventListener('click', () => {
    const nombreCategoriaInput = document.getElementById('nombre-categoria-input');
    const nuevaCategoria = nombreCategoriaInput.value.trim();
    if (nuevaCategoria) {
        let categorias = JSON.parse(localStorage.getItem('categorias'));
        categorias.push(nuevaCategoria);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        nombreCategoriaInput.value = '';
        cargarCategorias(categorias);
    }
});




//FILTROS
function cargarCategorias(categorias) {
    const categoriasNuevaOperacion = document.querySelector('#categoria-nueva-operacion');
    const categoriasFiltro = document.querySelector('#filtro-categoria'); // Agregar al filtro también

    categoriasFiltro.innerHTML = '<option value="">Todas las categorías</option>'; // Limpiar las opciones previas

    categorias.forEach(categoria => {
        let nuevaCategoria = document.createElement('option');
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria;
        categoriasNuevaOperacion.appendChild(nuevaCategoria);

        let option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriasFiltro.appendChild(option);
    });

    mostrarCategorias();
}


function aplicarFiltros() {
    const btnFiltros = document.getElementById('btn-aplicar-filtros');

    // Si ya están aplicados los filtros, se limpian
    if (filtrosAplicados) {
        limpiarFiltros();
        btnFiltros.textContent = 'Aplicar filtros';
        btnFiltros.classList.remove('bg-red-500');
        btnFiltros.classList.add('bg-teal');
        filtrosAplicados = false;
        return;
    }

    // Obtener los valores seleccionados en los filtros
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;
    const tipoSeleccionado = document.getElementById('filtro-tipo').value;
    const fechaDesde = document.getElementById('filtro-fecha-desde').value;
    const fechaHasta = document.getElementById('filtro-fecha-hasta').value;
    const ordenSeleccionado = document.getElementById('filtro-orden').value;

    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    // Filtrar las operaciones basadas en las selecciones
    const operacionesFiltradas = operaciones.filter(operacion => {
        let cumpleCategoria = true, cumpleTipo = true, cumpleFechaDesde = true, cumpleFechaHasta = true;

        // Si hay una categoría seleccionada que no sea "Todas", filtramos por esa categoría
        if (categoriaSeleccionada !== 'Todas') {
            cumpleCategoria = operacion.categoria === categoriaSeleccionada;
        }

        // Si hay un tipo seleccionado que no sea "Todos", filtramos por ese tipo
        if (tipoSeleccionado !== 'Todos') {
            cumpleTipo = operacion.tipo === tipoSeleccionado;
        }

        // Filtrar por fechas
        if (fechaDesde) {
            cumpleFechaDesde = new Date(operacion.fecha) >= new Date(fechaDesde);
        }
        if (fechaHasta) {
            cumpleFechaHasta = new Date(operacion.fecha) <= new Date(fechaHasta);
        }

        return cumpleCategoria && cumpleTipo && cumpleFechaDesde && cumpleFechaHasta;
    });

    // Aplicar el orden a las operaciones filtradas
    const operacionesOrdenadas = ordenarOperaciones(operacionesFiltradas, ordenSeleccionado);

    // Mostrar las operaciones filtradas y ordenadas
    mostrarOperacionesFiltradas(operacionesOrdenadas);

    // Cambiar el botón a "Limpiar filtros"
    btnFiltros.textContent = 'Limpiar filtros';
    btnFiltros.classList.remove('bg-teal');
    btnFiltros.classList.add('bg-red-500');
    filtrosAplicados = true; // Marcamos que los filtros están aplicados
}


function ordenarOperaciones(operaciones, criterio) {
    switch (criterio) {
        case 'Más reciente':
            return operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        case 'Menos reciente':
            return operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        case 'Mayor monto':
            return operaciones.sort((a, b) => parseFloat(b.monto) - parseFloat(a.monto));
        case 'Menor monto':
            return operaciones.sort((a, b) => parseFloat(a.monto) - parseFloat(b.monto));
        case 'A/Z':
            return operaciones.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
        case 'Z/A':
            return operaciones.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
        default:
            return operaciones; // Si no se selecciona un criterio, no se ordena.
    }
}


function limpiarFiltros() {
    // Restablecer valores de los filtros
    document.getElementById('filtro-tipo').value = 'Todos';
    document.getElementById('filtro-categoria').value = 'Todas';
    document.getElementById('filtro-fecha-desde').value = '';
    document.getElementById('filtro-fecha-hasta').value = '';
    document.getElementById('filtro-orden').value = 'Más reciente';

    // Mostrar todas las operaciones
    mostrarOperaciones();
}



function mostrarOperacionesFiltradas(operaciones) {
    const conOperaciones = document.querySelector('#con-operaciones');
    const sinOperaciones = document.querySelector('#sin-operaciones');

    conOperaciones.innerHTML = ''; // Limpiar las operaciones anteriores

    if (operaciones.length > 0) {
        sinOperaciones.style.display = 'none';
        conOperaciones.style.display = 'flex';
        operaciones.forEach((operacion, index) => {
            const nuevaOperacion = document.createElement('div');
            nuevaOperacion.innerHTML = `
            <div class="flex justify-between items-center p-2 mt-10">
                <div class="w-1/4 text-gray-600">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="bg-teal-100 rounded text-sm text-teal-800 py-1 px-2 m-auto">
                    <span class="tag">${operacion.categoria}</span>
                </div>
                <div class="text-gray-600 m-auto">
                    ${operacion.fecha}
                </div>
                <div class="text-gray-600 font-bold m-auto">
                    ${operacion.monto}
                </div>
                <div class="m-auto">
                    <p class="is-fullwidth">
                        <a href="#" class="bg-blue-500 text-white py-1 px-2 rounded" onclick="editarOperacion(${index})">Editar</a>
                        <a href="#" class="bg-red-500 text-white py-1 px-2 mr-2 rounded" onclick="eliminarOperacion(${index})">Eliminar</a>
                    </p>
                </div>
            </div>`;

            conOperaciones.appendChild(nuevaOperacion);
        });
    } else {
        sinOperaciones.style.display = 'block';
    }
}


document.getElementById('btn-aplicar-filtros').addEventListener('click', aplicarFiltros);


//-----------------------------

//REPORTES

// Mostrar vista reportes
const conReportes = document.getElementById("con-reportes");
const sinReportes = document.getElementById("sin-reportes");

function mostrarReportes() {
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
    if (
        operaciones.some((operacion) => operacion.tipo === "Ganancia") &&
        operaciones.some((operacion) => operacion.tipo === "Gasto")
    ) {
        sinReportes.classList.add("hidden");
        conReportes.classList.remove("hidden");
    } else {
        sinReportes.classList.remove("hidden");
        conReportes.classList.add("hidden");
    }
}

mostrarReportes();

function calcularReportes() {
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
    const categorias = {};
    const meses = {};

    operaciones.forEach(operacion => {
        const fecha = new Date(operacion.fecha);
        const mesAnio = `${fecha.getMonth() + 1}-${fecha.getFullYear()}`; // Mes y año (ej. "9-2024")

        // Agrupar por categoría
        if (!categorias[operacion.categoria]) {
            categorias[operacion.categoria] = { ganancia: 0, gasto: 0, balance: 0 };
        }
        if (operacion.tipo === 'Ganancia') {
            categorias[operacion.categoria].ganancia += parseFloat(operacion.monto);
        } else if (operacion.tipo === 'Gasto') {
            categorias[operacion.categoria].gasto += parseFloat(operacion.monto);
        }
        categorias[operacion.categoria].balance += (operacion.tipo === 'Ganancia')
            ? parseFloat(operacion.monto)
            : -parseFloat(operacion.monto);

        // Agrupar por mes
        if (!meses[mesAnio]) {
            meses[mesAnio] = { ganancia: 0, gasto: 0 };
        }
        if (operacion.tipo === 'Ganancia') {
            meses[mesAnio].ganancia += parseFloat(operacion.monto);
        } else if (operacion.tipo === 'Gasto') {
            meses[mesAnio].gasto += parseFloat(operacion.monto);
        }
    });

    return { categorias, meses };
}


function obtenerMaximos(categorias, meses) {
    let maxGananciaCategoria = '', maxGastoCategoria = '', maxBalanceCategoria = '';
    let maxGanancia = 0, maxGasto = 0, maxBalance = -Infinity;

    // Calcular las categorías con mayores valores
    for (const categoria in categorias) {
        if (categorias[categoria].ganancia > maxGanancia) {
            maxGanancia = categorias[categoria].ganancia;
            maxGananciaCategoria = categoria;
        }
        if (categorias[categoria].gasto > maxGasto) {
            maxGasto = categorias[categoria].gasto;
            maxGastoCategoria = categoria;
        }
        if (categorias[categoria].balance > maxBalance) {
            maxBalance = categorias[categoria].balance;
            maxBalanceCategoria = categoria;
        }
    }

    let maxGananciaMes = '', maxGastoMes = '';
    let maxMesGanancia = 0, maxMesGasto = 0;

    // Calcular los meses con mayores valores
    for (const mes in meses) {
        if (meses[mes].ganancia > maxMesGanancia) {
            maxMesGanancia = meses[mes].ganancia;
            maxGananciaMes = mes;
        }
        if (meses[mes].gasto > maxMesGasto) {
            maxMesGasto = meses[mes].gasto;
            maxGastoMes = mes;
        }
    }

    return {
        maxGananciaCategoria, maxGastoCategoria, maxBalanceCategoria,
        maxGanancia, maxGasto, maxBalance,
        maxGananciaMes, maxMesGanancia, maxGastoMes, maxMesGasto
    };
}


function mostrarTotalesPorCategorias(categorias) {
    const contenedorCategorias = document.querySelector('#totales-categorias');
    contenedorCategorias.innerHTML = ''; // Limpiar el contenido anterior

    for (const categoria in categorias) {
        const categoriaRow = document.createElement('div');
        categoriaRow.classList.add('flex', 'justify-between', 'mt-6');

        categoriaRow.innerHTML = `
            <div class="w-1/4 text-gray-600">${categoria}</div>
            <div class="m-auto text-green-600 font-bold">$${categorias[categoria].ganancia.toFixed(2)}</div>
            <div class="m-auto text-red-600 font-bold">$${categorias[categoria].gasto.toFixed(2)}</div>
            <div class="m-auto text-black font-bold">$${categorias[categoria].balance.toFixed(2)}</div>
        `;

        contenedorCategorias.appendChild(categoriaRow);
    }
}


function mostrarTotalesPorMes(meses) {
    const contenedorMeses = document.querySelector('#totales-meses');
    contenedorMeses.innerHTML = ''; // Limpiar el contenido anterior

    for (const mes in meses) {
        const mesRow = document.createElement('div');
        mesRow.classList.add('flex', 'justify-between', 'mt-6');

        mesRow.innerHTML = `
            <div class="w-1/4 text-gray-600">${mes}</div>
            <div class="m-auto text-green-600 font-bold">$${meses[mes].ganancia.toFixed(2)}</div>
            <div class="m-auto text-red-600 font-bold">$${meses[mes].gasto.toFixed(2)}</div>
            <div class="m-auto text-black font-bold">$${(meses[mes].ganancia - meses[mes].gasto).toFixed(2)}</div>
        `;

        contenedorMeses.appendChild(mesRow);
    }
}


function mostrarReportes() {
    const { categorias, meses } = calcularReportes();
    const maximos = obtenerMaximos(categorias, meses);

    // Mostrar totales por categorías
    mostrarTotalesPorCategorias(categorias);

    // Mostrar totales por mes
    mostrarTotalesPorMes(meses);

    // Actualizar categoría con mayor ganancia, gasto, balance
    document.querySelector('#cat-mayor-ganancia div:nth-child(2)').textContent = `${maximos.maxGananciaCategoria}`;
    document.querySelector('#cat-mayor-ganancia div:nth-child(3)').textContent = `$${maximos.maxGanancia.toFixed(2)}`;

    document.querySelector('#cat-mayor-gasto div:nth-child(2)').textContent = `${maximos.maxGastoCategoria}`;
    document.querySelector('#cat-mayor-gasto div:nth-child(3)').textContent = `$${maximos.maxGasto.toFixed(2)}`;

    document.querySelector('#cat-mayor-balance div:nth-child(2)').textContent = `${maximos.maxBalanceCategoria}`;
    document.querySelector('#cat-mayor-balance div:nth-child(3)').textContent = `$${maximos.maxBalance.toFixed(2)}`;

    // Actualizar mes con mayor ganancia y gasto
    document.querySelector('#mes-mayor-ganancia div:nth-child(2)').textContent = `${maximos.maxGananciaMes}`;
    document.querySelector('#mes-mayor-ganancia div:nth-child(3)').textContent = `$${maximos.maxMesGanancia.toFixed(2)}`;

    document.querySelector('#mes-mayor-gasto div:nth-child(2)').textContent = `${maximos.maxGastoMes}`;
    document.querySelector('#mes-mayor-gasto div:nth-child(3)').textContent = `$${maximos.maxMesGasto.toFixed(2)}`;
}



btnReportes.addEventListener('click', () => {
    cambiarVista(vistaReportes);
    mostrarReportes();
});


//-----------------------------