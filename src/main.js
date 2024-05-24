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
    vistaBalance.classList.add('hidden'&&'lg:hidden');    
    vistaCategorias.classList.add('hidden');
    vistaReportes.classList.add('hidden');
    vistaNuevaOperacion.classList.add('hidden');

    mostrarVista.classList.remove('hidden');
}

/* const cambiarVistaBalance = (mostrarVista) => {
    vistaBalance.classList.add('hidden'&&'lg:hidden');
    vistaCategorias.classList.add('hidden');
    vistaReportes.classList.add('hidden');
    vistaNuevaOperacion.classList.add('hidden');
    mostrarVista.classList.remove('hidden'&&'lg:hidden');
} */

btnBalance.addEventListener('click', () => cambiarVistaBalance(vistaBalance));
btnCategorias.addEventListener('click', () => cambiarVista(vistaCategorias));
btnReportes.addEventListener('click', () => cambiarVista(vistaReportes));
btnNuevaOperacion.addEventListener('click', () => cambiarVista(vistaNuevaOperacion));
btnCancelarOperacion.addEventListener('click', () => cambiarVistaBalance(vistaBalance));


const btnFiltros = document.getElementById('btn-filtros');
const vistaFiltros = document.getElementById('vista-filtros');

const ocultarFiltros = () => {
    vistaFiltros.classList.toggle('hidden');
    btnFiltros.innerHTML === 'Ocultar Filtros' 
    ?   btnFiltros.innerHTML = 'Mostrar Filtros' 
    :   btnFiltros.innerHTML = 'Ocultar Filtros'
}

btnFiltros.addEventListener('click', ocultarFiltros);


const burgerMenu = document.getElementById('burger-menu');
