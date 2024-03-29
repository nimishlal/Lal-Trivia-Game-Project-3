//Intit Variables
let diff = "../data/easyQ.json";//can be medium or hard
let play = document.getElementById('play');
let injectionArea = document.getElementById('injectionArea');

let totalScore = 0;
let Incorrect = 0;
let totalQuestions = 20;
let tQuestions = [];
let qNum = 0;
let timer = 20;
let interval;
let ezqArr = [];
let hdqArr = [];
let difficulty = 0;


let audio = new Audio("../music/hp.mp3")

play.addEventListener('click', function (e) {
    injectA("../Menu.html");
    audio.play();
})

function ranQues(q) {
    console.log("it works")
    for (let i = 0; i < totalQuestions; i++) {
        let rNum = Math.floor(Math.random()*q.length)
        tQuestions.push(q[rNum]);
        q.splice(rNum,1);
    }
    console.log(tQuestions);
}

function loadJSon(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ezqArr = JSON.parse(this.responseText).ezQ;
            hdqArr = JSON.parse(this.responseText).hdQ;
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function loadQuestions() {
    console.log(qNum);

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
    //console.log('checkAnswer ran');
    if (answer === tQuestions[qNum].c) {
        totalScore++;
    }
    else {
        Incorrect++;
    }
    correct.innerText = `${totalScore}/${totalQuestions}`;
    timer = 20;
    counter.innerText = timer;
    //go to next question
    nextQuestion();

}

function nextQuestion() {
    //prep to go to next question
    //loadquestions
    qNum++;
    if (qNum < totalQuestions) {
        //will run until you hit total questions =20;
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
        timer = 20;
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
            //console.log(myArr);
            //injectHTML(myArr);
            //inject.innerHTML=myArr;
            //add our conditional statements
            if (url == "../Menu.html") {
                //console.log("It works")
                menuLoad(myArr);
            }
            else if (url == "../Options.html") {
                optionsLoad(myArr);
            }
            else if (url == "../instructions.html") {
                intructionsLoad(myArr);
            }
            else if (url == "../game.html" && difficulty==1) {
                gameLoad(myArr, ezqArr);
            }
            else if(url=="../game.html"&&difficulty==2){
                gameLoad(myArr,hdqArr);
            }
            else if (url == "../gameover.html") {
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

function menuLoad(info) {
    //Going to load page 1 HTML Elements and click events
    injectionArea.innerHTML = info;

    let options = document.getElementById('options');
    options.addEventListener('click', function (e) {
        injectA("../Options.html");
    })
    let easy = document.getElementById('easy');
    easy.addEventListener('click', function (e) {
        difficulty=1;
        injectA("../instructions.html");
    })
    let hrdBtn = document.getElementById('hrdBtn');
    hrdBtn.addEventListener('click', function (e) {
        difficulty=2;
        injectA("../instructions.html");
    })

}

function optionsLoad(info) {
    injectionArea.innerHTML = info;
    let backbtn = document.getElementById('backBtn');
    backbtn.addEventListener('click', function (e) {
        injectA("../Menu.html");
    });
    let musicOn = document.getElementById('musicOn');
    musicOn.addEventListener('click', function (e) {
        //console.log("it worked")
        audio.play();
    });
    let musicOff = document.getElementById('musicOff');
    musicOff.addEventListener('click', function (e) {
        audio.pause();
        audio.currentTime = 0;
    });

}
function intructionsLoad(info) {
    injectionArea.innerHTML = info;
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', function (e) {
        injectA("../game.html");
    })
    let menuBtn=document.getElementById('menuBtn');
    menuBtn.addEventListener('click',function(e){
        injectA("../Menu.html");
    })
}
function previousQuestion(){
    if(qNum>0){
        let specialF=document.getElementById('specialF');
        specialF.remove();
        qNum--;
        loadQuestions();
    }
}

function gameLoad(info, arr) {
    ranQues(arr);
    injectionArea.innerHTML = info;
    let specialF=document.getElementById('specialF');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    specialF.addEventListener('click',function(e){
        previousQuestion();
    })
    a1.addEventListener('click', function (e) {
        //console.log(e);
        checkAnswer(e.toElement.innerText);
    })
    a2.addEventListener('click', function (e) {
        checkAnswer(e.toElement.innerText);
    })
    a3.addEventListener('click', function (e) {
        checkAnswer(e.toElement.innerText);
    })
    a4.addEventListener('click', function (e) {
        checkAnswer(e.toElement.innerText);
    })
    loadQuestions();
}
function gameoverLoad(info) {
    injectionArea.innerHTML = info;
    let playAgain = document.getElementById('playAgain');
    let winL=document.getElementById('winL');
    winL.innerText=totalScore;
    playAgain.addEventListener('click', function (e) {
        totalScore = 0;
        Incorrect = 0;
        totalQuestions = 20;
        tQuestions = [];
        qNum = 0;
        timer = 20;
        interval;
        injectA("../Menu.html");

    });
}


loadJSon(diff);
