
const socket = io();

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    const links = document.querySelectorAll('.tab-links');
    links.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.tab-links[data-tab="${tabId}"]`).classList.add('active');
}

function registrarFrequencias() {
    const frequencias = [];
    for (let i = 0; i < 10; i++) {
        const status = document.getElementById(`frequenciaStatus${i}`).value;
        frequencias.push(status);
    }
    socket.emit('registrarFrequencias', frequencias);
}

function registrarFrequenciaAluno() {
    const index = document.getElementById('alunoIndex').value - 1;
    const status = document.getElementById('frequenciaStatusAluno').value;

    if (index >= 0 && index < 10) {
        socket.emit('registrarFrequencias', { index, status });
    } else {
        alert('Número do aluno inválido. Deve ser entre 1 e 10.');
    }
}

socket.on('atualizarFrequencias', (frequencias) => {
    const listaFrequencias = document.getElementById('listaFrequencias');
    listaFrequencias.innerHTML = '';
    frequencias.forEach((status, index) => {
        listaFrequencias.innerHTML += `<li>Aluno ${index + 1}: ${status || 'Não registrado'}</li>`;
    });
});

window.onload = () => {
    showTab('tabTodos');
};
