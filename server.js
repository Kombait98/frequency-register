const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const frequencias = new Array(10).fill(null);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('registrarFrequencias', (dadosFrequencias) => {
        if (Array.isArray(dadosFrequencias)) {
            dadosFrequencias.forEach((status, index) => {
                frequencias[index] = status;
            });
        } else {
            const { index, status } = dadosFrequencias;
            frequencias[index] = status;
        }
        console.log(`Frequências recebidas: ${frequencias}`);
        io.emit('atualizarFrequencias', frequencias);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
});