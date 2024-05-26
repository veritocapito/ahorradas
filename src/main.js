//cargar categorias
const categoriasSelect = document.querySelector('#categorias-select');

function cargarCategorias(categorias) {
    categorias.forEach(categoria => {
        let nuevaCategoria = document.createElement('option');
        nuevaCategoria.value = categoria
        nuevaCategoria.textContent = categoria
        categoriasSelect.appendChild(nuevaCategoria)
    });
}

//cargar storage

function cargarStorage() {
    const categorias = localStorage.getItem('categorias')
    const operaciones = localStorage.getItem('operaciones')

    if (!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"]
        localStorage.setItem('categorias', categoriasDefault)
        cargarCategorias(categoriasDefault)
    } else {
        let nuevaCategoria = ''
        let nuevasCategoriasArray = []

        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i] !== ",") {
                nuevaCategoria += categorias[i]
                if (i === categorias.length - 1) {
                    nuevasCategoriasArray.push(nuevaCategoria)
                }
            } else {
                nuevasCategoriasArray.push(nuevaCategoria)
                nuevaCategoria = ''
            }
        }
        cargarCategorias(nuevasCategoriasArray)
    }
    mostrarOperaciones();
}

cargarStorage()

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
            <div class="flex w-2/3">
                <div class="">
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
                        <a href="#" class="mr-3 is-size-7 edit-link">Editar</a>
                        <a href="#" class="is-size-7 delete-link">Eliminar</a>
                    </p>
                </div>
            </div>`;
            conOperaciones.appendChild(nuevoElemento);
        });
    } else {
        sinOperaciones.style.display = 'block';
    }
}

