const API = "http://localhost:3000/automovel";

const form = document.getElementById("formAutomovel");
const lista = document.getElementById("lista");


form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
        placa: document.getElementById("placa").value,
        proprietario: document.getElementById("proprietario").value,
        tipo: document.getElementById("tipo").value,
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        cor: document.getElementById("cor").value,
        ano: document.getElementById("ano").value,
        telefone: document.getElementById("telefone").value
    };

    await fetch(`${API}/cadastrar`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(dados)
    });

    form.reset();

    carregar();
});


async function carregar(){

    const response = await fetch(`${API}/listar`);

    const dados = await response.json();

    lista.innerHTML = "";

    dados.forEach(item => {

        lista.innerHTML += `

            <div class="card">

                <h3>${item.modelo}</h3>

                <p><strong>Placa:</strong> ${item.placa}</p>

                <p><strong>Proprietário:</strong> ${item.proprietario}</p>

                <p><strong>Tipo:</strong> ${item.tipo}</p>

            </div>

        `;
    });
}

carregar();
