$(document).ready(function () {
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.preventDuplicates = true;

    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
    }else {
        $.ajax({
            url: '/api/auth/verify',
            type: 'POST',
            headers: {
                'authorization': token
            },
            success: function (data) {
                if (data.ok) {
                    toastr.success('Bienvenido ' + data.user.email, {
                        timeOut: 3000
                    });
                    localStorage.setItem('email', data.user.email);
                }
            },
            error: function (xhr, status, error) {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                window.location.href = '/login';
            }
        });
    }

    // Obtener una referencia al elemento canvas del DOM
    const $grafica = document.querySelector("#grafica");
    // Las etiquetas son las que van en el eje X. 
    const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"]
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosVentas2020 = {
        label: "Ventas por mes",
        data: [5000, 1500, 8000, 5102, 55500], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    };
    new Chart($grafica, {
        type: 'line',// Tipo de gráfica
        data: {
            labels: etiquetas,
            datasets: [
                datosVentas2020,
                // Aquí más datos...
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
        }
    });
});