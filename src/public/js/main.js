$(function() {

    const socket = io();
    let nick = '';

    //Accedemos a los elementos del DOM:

    const messageForm = $('#messages-form');
    const messageInput = $('#message');
    const chat = $('#chat');
    
    const nickForm = $('#nick-form')
    const nickError = $('#nick-error')
    const nickName = $('#nick-name')

    const userNames = $('#usernames')

    //Eventos:

    //Enviamos un mensaje al servidor;
    messageForm.submit(e => {
        
        e.preventDefault();
        socket.emit('Enviar mensaje', messageInput.val());
        messageInput.val('');

    })

    //Obtenemos respuesta del servidor:
    socket.on('Nuevo mensaje', (datos) => {
        //console.log(datos);

        let color = '#f4f4f4'

        if (nick == datos.username) {
            color = '#9ff4c5'
        }

        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b class="msg-b">${datos.username}:</b><p class="msg">${datos.msg}</p></div>`);
    });

    //Nuevo usuario:
    nickForm.submit( e => {

        e.preventDefault();

        socket.emit('Nuevo usuario', nickName.val(), datos => {

            if (datos) {
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else {
                nickError.html(`<div class"alert alert-danger">El usuario ya existe.</div>`)
            }

            nickName.val('');

        })

    })

    //Obtenemos el Array de usuarios conectados:

    socket.on('Nombre usuario', datos => {
        
        let html = '';
        let color = '';
        let salir = ''; 

        for (let i  = 0; i  < datos.length; i++) {
            
            if (nick == datos[i]) {
                color = "#027f43";
                salir = '<a class"enlace-salir" href="/">Salir</a>'
            }else {
                color = "#000"
                salir = ''
            }

            html += `<p style="color: ${color}">${datos[i]} ${salir}</p>`
            
        }

        userNames.html(html);

    })

})




