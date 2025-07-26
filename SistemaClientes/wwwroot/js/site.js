// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Funciones comunes para el sitio web
$(document).ready(function() {
    // Agregar animación fade-in a las tarjetas
    $('.card').addClass('fade-in');
    
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Validación de formularios
    $('form').on('submit', function(e) {
        var form = $(this);
        if (!form[0].checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.addClass('was-validated');
    });
    
    // Auto-hide para alertas
    setTimeout(function() {
        $('.alert').fadeOut('slow');
    }, 5000);
});

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    const alertClass = 'alert-' + tipo;
    const html = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Insertar al inicio del contenedor principal
    $('.container').prepend(html);
    
    // Auto-hide después de 5 segundos
    setTimeout(function() {
        $('.alert').fadeOut('slow');
    }, 5000);
}

// Función para validar cédula (formato básico)
function validarCedula(cedula) {
    // Remover espacios y guiones
    cedula = cedula.replace(/[\s-]/g, '');
    
    // Verificar que solo contenga números
    if (!/^\d+$/.test(cedula)) {
        return false;
    }
    
    // Verificar longitud mínima
    if (cedula.length < 5) {
        return false;
    }
    
    return true;
}

// Función para formatear números
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-CR').format(numero);
}

// Función para formatear fechas
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para limpiar formularios
function limpiarFormulario(formId) {
    $('#' + formId)[0].reset();
    $('#' + formId + ' .alert').remove();
    $('#' + formId + ' .form-control').removeClass('is-valid is-invalid');
}

// Función para confirmar acciones
function confirmarAccion(mensaje, callback) {
    if (confirm(mensaje)) {
        callback();
    }
}

// Función para descargar archivos
function descargarArchivo(contenido, nombreArchivo, tipoMime) {
    const blob = new Blob([contenido], { type: tipoMime });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Función para leer archivos
function leerArchivo(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsText(file);
}

// Función para validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para generar ID único
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para capitalizar texto
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Función para truncar texto
function truncarTexto(texto, longitud) {
    if (texto.length <= longitud) {
        return texto;
    }
    return texto.substring(0, longitud) + '...';
}

// Función para copiar al portapapeles
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        mostrarNotificacion('Texto copiado al portapapeles', 'success');
    }).catch(function() {
        mostrarNotificacion('Error al copiar texto', 'danger');
    });
}

// Función para exportar tabla a CSV
function exportarTablaCSV(tablaId, nombreArchivo) {
    const tabla = document.getElementById(tablaId);
    const filas = tabla.getElementsByTagName('tr');
    let csv = [];
    
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const encabezados = filas[i].getElementsByTagName('th');
        let fila = [];
        
        // Agregar encabezados
        for (let j = 0; j < encabezados.length; j++) {
            fila.push('"' + encabezados[j].innerText + '"');
        }
        
        // Agregar celdas
        for (let j = 0; j < celdas.length; j++) {
            fila.push('"' + celdas[j].innerText + '"');
        }
        
        csv.push(fila.join(','));
    }
    
    const contenido = csv.join('\n');
    descargarArchivo(contenido, nombreArchivo + '.csv', 'text/csv');
}
