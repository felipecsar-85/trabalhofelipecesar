let series = [];

const listaSeries = document.getElementById("listaSeries");
const status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnAprovados = document.getElementById("btnAprovados");
const btnReprovados = document.getElementById("btnReprovados");


async function carregarSeries() {
    try {
        status.textContent = "Carregando series...";
        const resposta = await fetch("series.json");
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o JSON.");
        }
        series = await resposta.json();

        status.textContent = `${series.length} series carregadas.`;

        mostrarSeries(series);
        
    } catch (erro) {
        status.textContent = `Erro: ${erro.message}`
    }
    
}


function mostrarSeries(lista) {

    listaSeries.innerHTML = "";

    if (lista.length  === 0) {
        listaSeries.innerHTML = "<p>Nenhuma serie encontrada.</p>";
        return;
        }
        lista.forEach((series) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h2>${series.titulo}</h2>
            <img src= "${series.imagem}" alt= "${series.titulo}">
            <p><strong>Genero:</strong> ${series.genero}</p>
            <p><strong>Ano:</strong> ${series.ano}</p>
            <p><strong>Temporadas: </strong> ${series.temporadas}</p>
            
        `;

        listaSeries.appendChild(card);
        });

        }

        carregarSeries()

function mostrarTodos() {

    mostrarSeries(series);

    status.textContent = `${series.length} series encontradas. `;
}

function mostrarAprovados() {

    const aprovados = series.filter((serie) => serie.temporadas > 6);

    mostrarSeries(aprovados);

    status.textContent = `${aprovados.length} series antigas.`;
}

function mostrarReprovados() {

    const reprovados = series.filter((serie) => serie.temporadas < 6);

    mostrarSeries(reprovados);

    status.textContent = `${reprovados.length} series recentes.`;
}


btnBuscar.addEventListener("click", carregarSeries);
btnTodos.addEventListener("click", mostrarTodos);
btnAprovados.addEventListener("click", mostrarAprovados);
btnReprovados.addEventListener("click", mostrarReprovados);

