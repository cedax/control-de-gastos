const loginForm = document.querySelector('#login-form');

errorsLoginList = {
    'auth/user-not-found': 'El usuario no existe',
    'auth/wrong-password': 'La contraseña es incorrecta',
    'auth/too-many-requests': 'Se ha usado una contraseña incorrecta demasiadas veces, espere unos segundos',
    'generic': 'Ha ocurrido un error, concacte al soporte tecnico del sitio y proporcione el codigo login/01/'
}

let getHeader = (xhr, headerName) => {
    const headers = xhr.getAllResponseHeaders();
    const headersArray = headers.trim().split('\n');
    const authorizationHeader = headersArray.find(header => header.toLowerCase().startsWith(`${headerName}:`));

    if (authorizationHeader) {
        const authorizationValue = authorizationHeader.split(':')[1].trim();
        return authorizationValue;
    } else {
        return null;
    }
}

loginForm.addEventListener('submit', (e) => {
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.preventDuplicates = true;

    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    $.post('/api/auth/login', {
        email,
        password
    }, (data, textStatus, xhr) => {
        if(data.ok){
            console.log(data.data);
            const token = getHeader(xhr, 'authorization');
            localStorage.setItem('token', token);
            window.location.href = '/';
        }else {
            const errorCode = data.data.errorCode;

            if(errorsLoginList[errorCode]){
                errorMessage = errorsLoginList[errorCode];
            }else {
                errorMessage = errorsLoginList['generic'] + errorCode;
            }

            toastr.info(errorMessage, {
                timeOut: 5000
            })
        }
    });

});