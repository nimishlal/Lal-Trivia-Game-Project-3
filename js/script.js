//Intit Variables
let diff = "../data/easyQ.json";//can be medium or hard
let play = document.getElementById('play');
let injectionArea = document.getElementById('injectionArea');

let totalScore = 0;
let Incorrect = 0;
let totalQuestions = 20;
let tQuestions = [];
let qNum = 0;
let timer = 5;
let interval;

play.addEventListener('click', function (e) {
    injectA("../Menu.html");
})

function loadJSon(url) {
    let xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tQuestions = JSON.parse(this.responseText).ezQ;
            console.log(tQuestions);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function loadQuestions() {
    clearInterval(interval);
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    //load the next questions
    questions.innerText = tQuestions[qNum].q;
    a1.innerText = tQuestions[qNum].a1;
    a2.innerText = tQuestions[qNum].a2;
    a3.innerText = tQuestions[qNum].a3;
    a4.innerText = tQuestions[qNum].a4;
    interval = setInterval(updateTime, 1000);
}

function checkAnswer(answer) {
    //retrives the answer and see if it is correct
    //increment your correct number
    let correct = document.getElementById('correct');
    console.log('checkAnswer ran');
    if (answer === tQuestions[qNum].c) {
        totalScore++;
    }
    else {
        Incorrect++;
    }
    correct.innerText = `${totalScore}/${totalQuestions}`;
    timer = 5;
    counter.innerText = timer;
    //go to next question
    nextQuestion();

}

function nextQuestion() {
    //prep to go to next question
    //loadquestions
    if (qNum < totalQuestions) {
        //will run until you hit total questions =20;
        qNum++;
        loadQuestions();
    }
    else {
        //load up ending screen
        //alert("You finished the game congrats i have spoken")
        //clears the interval 
        //gameoverLoad();
        injectA('../gameover.html');
        clearInterval(interval);

    }

}


function updateTime() {
    //Make sure time isnt over and it is showimg correct time
    let counter = document.getElementById('counter');
    timer--;
    if (timer == 0) {
        timer = 5;
        counter.innerText = timer;
        nextQuestion();
    }
    else {
        counter.innerText = timer;
    }
}

function injectA(url) {
    let xmlhttp = new XMLHttpRequest();
    //let url = "../Menu.html";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);
            console.log(myArr);
            //injectHTML(myArr);
            //inject.innerHTML=myArr;
            //add our conditional statements
            if (url == "../Menu.html") {
                console.log("It works")
                page1Load(myArr);
            }
            else if (url == "../Options.html") {
                page2Load(myArr);
            }
            else if (url == "../instructions.html") {
                intructionsLoad(myArr);
            }
            else if (url == "../game.html") {
                gameLoad(myArr);
            }
            else if(url=="../gameover.html"){
                gameoverLoad(myArr);
            }
            else {
                alert('ADD A FUCKING ELSE IF THING');
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function page1Load(info) {
    //Going to load page 1 HTML Elements and click events
    injectionArea.innerHTML = info;

    let options = document.getElementById('options');
    options.addEventListener('click', function (e) {
        injectA("../Options.html");
    })
    let easy = document.getElementById('easy');
    easy.addEventListener('click', function (e) {
        injectA("../instructions.html");
        loadJSon(diff);

    })
    let hrdBtn = document.getElementById('hrdBtn');
    hrdBtn.addEventListener('click', function (e) {
        loadJSON("../instructions.html")
    })

}

function page2Load(info) {
    injectionArea.innerHTML = info;
    let backbtn = document.getElementById('backBtn');
    backbtn.addEventListener('click', function (e) {
        injectA("../Menu.html");
    })

}
function intructionsLoad(info) {
    injectionArea.innerHTML = info;
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', function (e) {
        injectA("../game.html");
    })
}
function gameLoad(info) {
    injectionArea.innerHTML = info;

    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    
    a1.addEventListener('click',function(e){
        console.log(e);
        checkAnswer(e.toElement.innerText);
    })
    a2.addEventListener('click',function(e){
        checkAnswer(e.toElement.innerText);
    })
    a3.addEventListener('click',function(e){
        checkAnswer(e.toElement.innerText);
    })
    a4.addEventListener('click',function(e){
        checkAnswer(e.toElement.innerText);
    })
    loadQuestions();
}
function gameoverLoad(info){
    injectionArea.innerHTML=info;
    let playAgain=document.getElementById('playAgain');
    playAgain.addEventListener('click',function(e){
        injectA("../Menu.html");
    });
}

//loadJSon(diff);
