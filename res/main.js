const tiers = document.getElementsByClassName("tier");
const answer = document.querySelectorAll('.answerWrapper > *');
const question = document.getElementById("questions");
let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");

const array = [1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000];
let questions = [
    ["Jak se jmenuje Till?", "Jan", "Petr", "Štěpán", "Adam", false],
    ["Existuje čokoláda __________ pečeť.", "Studentská", "Česká", "Slovenská", "Světová", false],
    ["Co používá společnost Apple za operační systém na mobilech?", "iOS", "Android", "Linux", "Windows", false],
    ["Kolik sálů má kino Cinestar v Boleslavi?", 4, 3, 5, 6, false],
    ["Kdo je největší automobilkou v Česku?", "Škoda Auto", "Volkswagen", "Audi", "Tesla", false],
    ["Co obsahuje klasická Studenstká pečeť?", "rozinky, arašídy, želé", "višeň, kokos, želé", "rozinky, arašídy, pistácie", "rozinky, kokos, želé", false],
    ["Ve které skupině se vyskytuje Vojta Odstrčil?", "3. Ai ANJ2", "3. Ai ANJ1", "3. Bi ANJ1", "3. Bi ANJ2", false],
    ["Jaký je cíl hry 2048?", "Dosáhnout čísla 2048.", "Zabít všechny opice na světě.", "Zníčit Riot Games za Vex.", "Zabít Lucifera.", false],
    ["Co dělá hudební skupina Pentakill za žánr?", "Metal", "Rock", "Rap", "K-pop", false],
    ["Kdo je achkare?", "Člověk, který trollí lidi na Twitchi.", "Náhodný člověk", "Pražský bezdomovec", "Pravěký otrok v Egyptě", false],
    ["Kdo je RATIRL?", "Člověk, který se proslavil svýma schopnostma hrát League of Legends.", "Nestabilní člověk v blázinci", "Krysa", "Potkan", false],
    ["Co nepatří mezi ovoce?", "Šiška", "Jablko", "Broskev", "Hruška", false],
    ["Jaký žánr má League of Legends?", "MOBA", "RPG", "MMORPG", "FPS", false],
    ["Kdo je Geralt z Rivie?", "Postava ve hře Zaklínač", "Pasák", "Spasitel", "Démon", false],
    ["Jak se řeknou slovensky játra?", "Pečeň", "Čučoriedka", "Rolka", "Smýkačka", false]
];

let i = array.length - 1;
let currentTier = array.length;
let correctAns = true;
let x = Math.floor(Math.random()*array.length);
let y = 1;
let button = 0;
let answerArray = [];

[...tiers].forEach((tier) => {
    tier.innerHTML = new Intl.NumberFormat('cz-CS', { style: 'currency', currency: 'CZK' }).format(array[i]);
    i--;
});

const restart = () => {
    for (let i = 0; i < questions.length; i++) {
        questions[i][5] = false;
    }
    currentTier = array.length;
    for (let i = 0; i < array.length - 1; i++) {
        tiers[i].style.backgroundColor = "#131516";
        tiers[i].style.color = "white";
        tiers[i].style.fontWeight = "";
    }
    load();
}

const updateTiers = () => {
    currentTier--;
    if (currentTier > 0) {
        tiers[currentTier].style.backgroundColor = "yellow";
        tiers[currentTier].style.color = "black";
        tiers[currentTier].style.fontWeight = "900";
    }
    if (currentTier < 14) {
        tiers[currentTier + 1].style.backgroundColor = "#131516";
        tiers[currentTier + 1].style.color = "white";
        tiers[currentTier + 1].style.fontWeight = "";
    }
    if (currentTier == 0) {
        question.innerHTML = "<h1>Vyhrál jsi! Získáváš " + new Intl.NumberFormat('cz-CS', { style: 'currency', currency: 'CZK' }).format(array[array.length - 1]) + " a za 5 sekund se restartuje hra!</h1>";
        currentTier = array.length;
        tiers[currentTier - 1].style.backgroundColor = "#131516";
        tiers[currentTier - 1].style.color = "white";
        tiers[currentTier - 1].style.fontWeight = "";
        window.setTimeout(restart, 5000);
    }
}

const genRan = () => {
    while(answerArray.length < 4){
        let r = Math.floor(Math.random() * 4) + 1;
        if(answerArray.indexOf(r) === -1) answerArray.push(r);
    }
}

const load = () => {
    x = Math.floor(Math.random()*array.length);
    question.innerHTML = "<h1>" + questions[x][0] + "</h1>";
    
    if (questions[x][5] == true) {
        load();
    } else {
        updateTiers();
    }

    for (let i = 0; i < answer.length; i++) {
        genRan();
        answer[i].value = questions[x][answerArray[i]];
        if (window.screen.width < 350) {
            answer[i].innerHTML = "<p>" + questions[x][answerArray[i]] + "</p>";
        } else {
            answer[i].innerHTML = "<h1>" + questions[x][answerArray[i]] + "</h1>";
        }
    }
}

const submitAnswer = () => {
    switch (button) {
        case 0:
            if (answer[0].value != questions[x][1]) {
                wrongAnsFn();
            } else {
                correctAnsFn();
            }
            break;

        case 1:
            if (answer[1].value != questions[x][1]) {
                wrongAnsFn();
            } else {
                correctAnsFn();
            }
            break;

        case 2:
            if (answer[2].value != questions[x][1]) {
                wrongAnsFn();
            } else {
                correctAnsFn();
            }
            break;

        case 3:
            if (answer[3].value != questions[x][1]) {
                wrongAnsFn();
            } else {
                correctAnsFn();
            }
            break;
    }
}

const correctAnsFn = () => {
    currentTier++;
    question.innerHTML = questions[x][0];
    questions[x][5] = true;
    updateTiers();
    load();
    answerArray = [];
    if (currentTier < 0) {
        restart();
    }
}

const wrongAnsFn = () => {
    currentTier = array.length;
    correctAns = false;
    question.innerHTML = "<h1>Prohrál jsi! Za 5 sekund se restartuje hra!</h1>";
    window.setTimeout(restart, 5000);
}

ans1.onclick = () => {
    button = 0;
    submitAnswer();
}
    
ans2.onclick = () => {
    button = 1;
    submitAnswer();
}
    
ans3.onclick = () => {
    button = 2;
    submitAnswer();
 }
    
ans4.onclick = () => {
    button = 3;
    submitAnswer();
}

window.onload = load();