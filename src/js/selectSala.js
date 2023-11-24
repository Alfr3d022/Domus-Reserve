document.addEventListener("DOMContentLoaded", async function () {
    const selectElement = document.getElementById("meuSelect");

    console.log("Início da execução do script.");

    try {
        // Faz a requisição ao servidor para obter os dados
        const response = await fetch("http://127.0.0.1:3000/retornaSelect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Dados recebidos com sucesso:", data);
            
            // Adiciona as opções ao <select>
            data.dates.forEach(date => {
                const option = document.createElement("option");
                option.value = date;
                option.text = date;
                selectElement.appendChild(option);
            });

            console.log("Opções adicionadas ao select.");
        } else {
            console.error("Erro ao obter dados do servidor:", response.status);
        }
    } catch (error) {
        console.error("Erro durante a execução do script:", error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("meuSelect");
    const buttonElement = document.getElementById("BtnAlugar");

    // Adiciona um evento de clique ao botão
    buttonElement.addEventListener("click", async function () {
        try {
            // Obtém a data selecionada no select
            const selectedDate = selectElement.value;

            // Faz a requisição ao servidor para alterar o indicador de disponibilidade
            const response = await fetch("http://127.0.0.1:3000/alteraIndTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: selectedDate }),
            });

            if (response.ok) {
                console.log("Indicador de disponibilidade alterado com sucesso!");
            } else {
                console.error("Erro ao alterar o indicador de disponibilidade:", response.status);
            }
        } catch (error) {
            console.error("Erro durante a execução do script:", error);
        }
    });
});
