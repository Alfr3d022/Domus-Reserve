document.addEventListener("DOMContentLoaded", function () {
    console.log("teadwadaw")
    const selectElement = document.getElementById("meuSelect");
    const dataSelecionadaElement = document.getElementById("dataSelecionada");
    dataSelecionadaElement.textContent = selectElement.value;
});
