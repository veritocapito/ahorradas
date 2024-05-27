// Cargar categorias
const categoriasSelect = document.querySelector('#categorias-select');
const listaCategorias = document.querySelector('#lista-categorias');

function cargarCategorias(categorias) {
    categoriasSelect.innerHTML = ''; // Limpiar las categorías anteriores
    categorias.forEach(categoria => {
        let nuevaCategoria = document.createElement('option');
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria;
        categoriasSelect.appendChild(nuevaCategoria);
    });
    mostrarCategorias();
}

// Cargar storage
function cargarStorage() {
    const categorias = localStorage.getItem('categorias');
    const operaciones = localStorage.getItem('operaciones');

    if (!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];
        localStorage.setItem('categorias', JSON.stringify(categoriasDefault));
        cargarCategorias(categoriasDefault);
    } else {
        let nuevasCategoriasArray = JSON.parse(categorias);
        cargarCategorias(nuevasCategoriasArray);
    }

    mostrarOperaciones();
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
        monto: montoNuevaOperacion.value,
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
    vistaNuevaOperacion.style.display = 'none';
    vistaBalance.style.display = 'flex';
}

btnAgregarOperacion.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    crearOperacion();
});

function mostrarOperaciones() {
    const operaciones = localStorage.getItem('operaciones');
    const operacionesParseadas = operaciones ? JSON.parse(operaciones) : [];
    const conOperaciones = document.querySelector('#con-operaciones');
    const sinOperaciones = document.querySelector('#sin-operaciones');

    mostrarOperaciones.innerHTML = ''; // Limpiar las operaciones anteriores

    if (operacionesParseadas.length > 0) {
        sinOperaciones.style.display = 'none';
        conOperaciones.style.display = 'flex';
        operacionesParseadas.forEach(operacion => {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.innerHTML = `
            <div class="flex gap-2">
                <div class="text-bold">
                    <h3 class="">${operacion.descripcion}</h3>
                </div>
                <div class="">
                    <span class="tag">${operacion.tipo}</span>
                </div>
                <div class="">
                    ${operacion.fecha}
                </div>
                <div class="">
                    ${operacion.monto}
                </div>
                <div class="">
                    <p class="is-fullwidth">
                        <a href="#" class="bg-blue-500 text-white py-1 px-2 mr-2 rounded">Editar</a>
                        <a href="#" class="bg-red-500 text-white py-1 px-2 rounded">Eliminar</a>
                    </p>
                </div>
            </div>`;
            conOperaciones.appendChild(nuevoElemento);
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