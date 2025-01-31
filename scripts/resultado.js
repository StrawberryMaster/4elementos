document.addEventListener("DOMContentLoaded", () => {
    if (typeof localStorage !== "undefined") {
        const name = localStorage.getItem("name");
        const results = localStorage.getItem("results");
        const espectro = localStorage.getItem("espectro");

        if (results || espectro) {
            showResults(name, results, espectro);
        } else {
            showErrors();
        }
    } else {
        showErrors();
    }
});

function showErrors() {
    const errorsScreen = document.querySelector('.errorDiv');
    const resultScreen = document.querySelector('.resultsDiv');

    if (errorsScreen.style.display !== 'block') errorsScreen.style.display = 'block';
    if (resultScreen.style.display !== 'none') resultScreen.style.display = 'none';
}

function showResults(name, results, espectroString) {
    const img = document.getElementById("elementResult");
    const spectroArray = espectroString ? espectroString.split(',') : [];

    // Nome do agente
    const agentName = results === "Medo"
        ? "Criatura Desconhecida"
        : name ? `Agente ${name}` : "Agente Desconhecido";
    document.getElementById("agentName").innerHTML = agentName;

    // Imagem do elemento
    img.src = `images/elementos/${results}.webp`;
    img.className = '';
    img.classList.add(`${results}Result`);

    // Valores dos elementos
    const elementInfo = elements[results] || elements?.Medo || {};
    document.getElementById("elementResultName").innerHTML = results;
    document.getElementById("fraseGuia").innerHTML = `"${elementInfo.fraseGuia || ""}"`;
    document.getElementById("descElement").innerHTML = elementInfo.desc || "";

    // Valores dos agentes
    const { agt_1 = "N/A", agt_2 = "N/A", agt_3 = "N/A" } = elementInfo.outrasInfo?.agts || {};
    document.getElementById("known1").innerHTML = agt_1;
    document.getElementById("known2").innerHTML = agt_2;
    document.getElementById("known3").innerHTML = agt_3;

    // Valores do espectro
    const [emocValue = 0, soliValue = 0, ordeValue = 0, caosValue = 0] = spectroArray;
    document.getElementById("emocValue").innerHTML = `${emocValue}%`;
    document.getElementById("soliValue").innerHTML = `${soliValue}%`;
    document.getElementById("ordeValue").innerHTML = `${ordeValue}%`;
    document.getElementById("caosValue").innerHTML = `${caosValue}%`;
}