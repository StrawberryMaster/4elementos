setTimeout(() => {
    if (typeof localStorage !== 'undefined') {
        const { name, results, espectro } = localStorage;
        if (results || espectro) {
            showResults(name, results, espectro);
        } else {
            showErrors();
        }
    } else {
        showErrors();
    }
}, 50);


function showErrors() {
    const errorsScreen = document.querySelector('.errorDiv');
    const resultScreen = document.querySelector('.resultsDiv');
    errorsScreen.style.display = 'block'
    resultScreen.style.display = 'none'
}

function showResults() {
    const results = localStorage.getItem("results");
    const name = localStorage.getItem("name");
    const img = document.getElementById("elementResult");
    const spectroString = localStorage.getItem("espectro");
    const spectroArray = spectroString.split(',');

    // Set agent name
    if (results === "Medo") {
        document.getElementById("agentName").innerHTML = `Criatura Desconhecida`;
    } else {
        document.getElementById("agentName").innerHTML = name ? `Agente ${name}` : 'Agente Desconhecido';
    }

    // Set image source and class
    img.src = `images/elementos/${results}.webp`;
    img.classList.add(`${results}Result`);

    // Set user guide and description
    const elementInfo = elements[results] || elements.Medo;
    document.getElementById("elementResultName").innerHTML = results;
    document.getElementById("fraseGuia").innerHTML = `"${elementInfo.fraseGuia}"`;
    document.getElementById("descElement").innerHTML = elementInfo.desc;

    // Set other element information
    const otherElementInfo = elementInfo.outrasInfo.agts;
    document.getElementById("known1").innerHTML = `${otherElementInfo.agt_1}`;
    document.getElementById("known2").innerHTML = `${otherElementInfo.agt_2}`;
    document.getElementById("known3").innerHTML = `${otherElementInfo.agt_3}`;

    // Set spectro values
    document.getElementById("emocValue").innerHTML = `${spectroArray[0]}%`;
    document.getElementById("soliValue").innerHTML = `${spectroArray[1]}%`;
    document.getElementById("ordeValue").innerHTML = `${spectroArray[2]}%`;
    document.getElementById("caosValue").innerHTML = `${spectroArray[3]}%`;
}