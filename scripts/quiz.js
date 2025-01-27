let answers = {};
let qn = 0;
let prev_answer = null;
const result = {
    emocao: 1,
    solidao: 1,
    ordem: 1,
    caos: 1,
};

const questionsObject = questions.reduce((acc, question) => {
    acc[question.id] = question;
    return acc;
}, {});

const questionsOrder = Object.keys(questionsObject);
for (let i = questionsOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsOrder[i], questionsOrder[j]] = [questionsOrder[j], questionsOrder[i]];
}

initQuestion();

function initQuestion() {
    const currentQuestion = questionsObject[questionsOrder[qn]];
    document.getElementById("question").textContent = `#${qn + 1} | ${currentQuestion.question}`;
}

function updateResult(answer, effectMultiplier = 1) {
    const effects = questionsObject[questionsOrder[qn]].effect;
    Object.keys(effects).forEach(key => {
        result[key] += effects[key] * answer * effectMultiplier;
    });
}

function next(answer) {
    if (qn >= questionsOrder.length) return;

    updateResult(answer);
    prev_answer = answer;

    if (++qn < questionsOrder.length) {
        initQuestion();
    } else {
        lastScreen();
    }
}

function prev() {
    if (prev_answer == null) {
        return;
    }

    qn--;
    updateResult(prev_answer, -1);

    prev_answer = null;
    initQuestion();
}

function lastScreen() {
    const container = document.querySelector('.quiz-container');
    const lastScreen = document.querySelector('.endTest');

    container.style.display = 'none';
    lastScreen.style.display = 'block';
}

function sendResults() {
    localStorage.clear();

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    function highestSpectrum(arr) {
        let max = arr[0]
        let where;
        let spec;

        arr.forEach(element => {
            if (element > max) { max = element }
        })

        where = arr.indexOf(max)

        spec = (where === 0) ? 'Sangue'
            : (where === 1) ? 'Morte'
                : (where === 2) ? 'Conhecimento'
                    : 'Energia';

        return spec
    }

    function checkDraw(arr) {
        max = arr[0]
        arr.forEach(element => {
            if (element > max) { max = element }
        })

        where = arr.indexOf(max)
        arr.splice(where, 1)

        let bol;
        for (let i = 1; i < 4; i++) {
            if (arr[i] === max) {
                bol = true
                break;
            } else {
                bol = false;
            }
        }

        return bol;
    }

    function drawnedElements(arr, compWith) {
        max = arr[0]
        arr.forEach(element => {
            if (element > max) { max = element }
        })

        where = arr.indexOf(max)
        let array = [];

        if (where === 0) { array = ['Sangue'] } else
            if (where === 1) { array = ['Morte'] } else
                if (where === 2) { array = ['Conhecimento'] }
                else { array = ['Energia'] }

        if (compWith[0] === max) { array.push('Sangue') }
        if (compWith[1] === max) { array.push('Morte') }
        if (compWith[2] === max) { array.push('Conhecimento') }
        if (compWith[3] === max) { array.push('Energia') }

        let drawned = array.shift()
        return array;
    }

    const porcentRes = [
        50 + Math.floor(percentage(result.emocao, 80)),
        50 + Math.floor(percentage(result.solidao, 80)),
        50 + Math.floor(percentage(result.ordem, 80)),
        50 + Math.floor(percentage(result.caos, 80)),
    ]

    const maxValue = 100;
    const userEspectroPer = [
        Math.floor(percentage(porcentRes[0], maxValue)),
        Math.floor(percentage(porcentRes[1], maxValue)),
        Math.floor(percentage(porcentRes[2], maxValue)),
        Math.floor(percentage(porcentRes[3], maxValue))
    ]

    let bool = checkDraw(porcentRes)
    let resultEsp;

    if (bool === true) {
        const drawned = drawnedElements(userEspectroPer, userEspectroPer)

        if (drawned.length === 4) {
            resultEsp = "Medo"
        } else {
            let winningCases;

            if (drawned === ["Sangue", "Morte"]) { winningCases = "Morte" } else
                if (drawned === ["Sangue", "Conhecimento"]) { winningCases = "Sangue" } else
                    if (drawned === ["Morte", "Energia"]) { winningCases = "Energia" } else
                        if (drawned === ["Conhecimento", "Energia"]) { winningCases = "Conhecimento" } else {
                            winningCases = drawned[0]
                            resultEsp = winningCases
                        }
        }
    } else {
        resultEsp = highestSpectrum(userEspectroPer)
    }

    name = document.getElementById("uname").value;
    localStorage.setItem("name", name);
    localStorage.setItem("espectro", userEspectroPer)
    localStorage.setItem("results", resultEsp);
    location.href = 'results.html';
}
