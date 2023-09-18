module.exports = (io) => {

    let nickNames = [];

    io.on('connection', socket => {

        console.log('Nuevo usuario conectado');

        //Al recibir un mensaje recojemos los datos:

        socket.on('Enviar mensaje', (datos) => {
            //console.log(datos);

            io.sockets.emit('Nuevo mensaje', {
                msg:datos,
                username:socket.nickname
            })

        })

        socket.on('Nuevo usuario', (datos, callback) => {

            if (nickNames.indexOf(datos) != -1) {
                callback(false);
            }else {
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname)

                io.sockets.emit('Nombre usuario', nickNames);
            }

        });

        socket.on('disconnect', datos => {

            if (!socket.nickname) {
                return;
            }else{
                nickNames.splice(nickNames.indexOf(socket.nickname), 1)
                io.sockets.emit('Nombre usuario', nickNames)
            }

        })

    })
}