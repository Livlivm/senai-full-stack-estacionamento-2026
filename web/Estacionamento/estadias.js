const API = "http://localhost:3000/estadia";

const form = document.getElementById("formEstadia");
const lista = document.getElementById("lista");


form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
        placa: document.getElementById("placa").value,
        valorHora: document.getElementById("valorHora").value
    };

    await fetch(`${API}/cadastrar`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(dados)
    });

    form.reset();

    listar();
});


async function listar(){

    const response = await fetch(`${API}/listar`);

    const dados = await response.json();

    lista.innerHTML = "";

    dados.forEach(item => {

        lista.innerHTML += `

            <div class="card">

                <h3>Estadia ${item.id}</h3>

                <p><strong>Placa:</strong> ${item.placa}</p>

                <p><strong>Entrada:</strong> ${item.entrada}</p>

                <p><strong>Saída:</strong>
                ${item.saida ? item.saida : "Em aberto"}
                </p>

                <p><strong>Valor Hora:</strong>
                R$ ${item.valorHora}
                </p>

                <p><strong>Valor Total:</strong>
                ${
                    item.valorTotal
                    ? "R$ " + item.valorTotal
                    : "Em aberto"
                }
                </p>

            </div>

        `;
    });
}

listar();
