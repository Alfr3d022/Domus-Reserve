// Informações sobre Salas
const salas = [
    { nomeDentro: 'Sala 1 - Bloco Laranjão', imagem: 'imagens/sala1.jpeg', rota: 'sala1.html' },
    { nomeDentro: 'Sala 2 - Bloco Laranjão', imagem: 'imagens/sala2.avif', rota: 'sala2.html' },
    { nomeDentro: 'Sala 3 - Bloco Laranjão', imagem: 'imagens/sala3.jpeg', rota: 'sala3.html' },
    { nomeDentro: 'Sala 4 - Bloco Laranjão', imagem: 'imagens/sala4.png', rota: 'sala4.html' }
];

// Informações sobre Eventos
const InstalaçõesUnifeb = [
    { nomeDentro: 'Quadra', imagem: 'imagens/quadra.jpg', rota: 'quadra.html'},
    { nomeDentro: 'Teatro', imagem: 'imagens/teatro.webp', rota: 'anfiteatro.html'},
    { nomeDentro: ' ‎ ', imagem: 'imagens/preto.webp'},
    { nomeDentro: ' ‎ ', imagem: 'imagens/preto.webp'}
];

// Informações sobre Laboratórios
const laboratorios = [
    { nomeDentro: 'T.I - Laboratórios 1', imagem: 'imagens/laboratorioTI1.jpg', rota: 'lab1.html' },
    { nomeDentro: 'T.I - Laboratórios 2', imagem: 'imagens/laboratorioTI2.jpg', rota: 'lab2.html' },
    { nomeDentro: 'T.I - Laboratórios 3', imagem: 'imagens/laboratorioTI3.jpg', rota: 'lab3.html' },
    { nomeDentro: 'M.V - Laboratórios 1', imagem: 'imagens/laboratorioMV1.jpg', rota: 'labMV.html' }
];

// Função para criar elementos
function criarElementos(containerId, dados) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < dados.length; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item', 'w3-hover-opacity');

        const img = document.createElement('img'); // Crie um elemento de imagem
        img.src = dados[i].imagem; // Defina o caminho da imagem
        img.alt = dados[i].nomeDentro; // Defina o texto alternativo para a imagem

        const nomeDentro = document.createElement('div');
        nomeDentro.classList.add('nome');
        nomeDentro.textContent = dados[i].nomeDentro;

        gridItem.addEventListener('click', function () {
            if (dados[i].rota) {
                window.location.href = dados[i].rota;
            } else {
                console.log("Rota não especificada para este item.");
            }
        });

        gridItem.appendChild(img); // Adicione a imagem ao gridItem
        gridItem.appendChild(nomeDentro);

        container.appendChild(gridItem);
    }
}

// Criar elementos para cada tópico
criarElementos('gridContainerSalas', salas);
criarElementos('gridContainerEventos', InstalaçõesUnifeb);
criarElementos('gridContainerQuartos', laboratorios);



