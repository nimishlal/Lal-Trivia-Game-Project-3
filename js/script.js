//Intit Variables
let diff = "easy";//can be medium or hard
let triviaQ=[];
let totalQuestions = 20;
let play = document.getElementById('play');
let injectionArea = document.getElementById('injectionArea');

play.addEventListener('click',function(e){
    loadJSON("../Menu.html");
})

function loadJSON(url){
    let xmlhttp = new XMLHttpRequest();
    //let url = "../Menu.html";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);
            console.log(myArr);
            //injectHTML(myArr);
            //inject.innerHTML=myArr;
            //add our conditional statements
            if(url=="../Menu.html"){
                console.log("It works")
                page1Load(myArr);
            }
            else if(url=="../Options.html"){
                page2Load(myArr);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}

function page1Load(info){
    //Going to load page 1 HTML Elements and click events
    injectionArea.innerHTML=info;
    
    let options=document.getElementById('options');
    options.addEventListener('click',function(e){
        loadJSON("../Options.html");
    })
    
}

function page2Load(info){
    injectionArea.innerHTML=info;
    let backbtn = document.getElementById('backBtn');
    backbtn.addEventListener('click',function(e){
        loadJSON("../Menu.html");
    })

}

// function loadQuestions() {

//     let xmlhttp = new XMLHttpRequest();
//     let url = "";//"../data/easyQ.json";
    
//     if (diff == "easy") {
//          url = "../data/easyQ.json";
//     }
//     //fail safe
//     if (diff == "") {
//          url = "../data/easyQ.json";
//     }
    
//     //------------------------
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             let myArr = JSON.parse(this.responseText);
//             allQuestions(myArr);
//         }
//     };

//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();

// }

// function allQuestions(q) {
//     //q is triviaQFull
//     console.log(q.ezQ[49]);
//     let qNum=0;
//     for (let i = 0;i<totalQuestions;i++)
//     {
//         //we are going to shuffle
//         qNum = Math.floor(Math.random()*q.ezQ.length);
//         //console.log(qNum)
//         //add from exQ json array to triviaQ 
//         triviaQ.push(q.ezQ[qNum]);
//         //remove the item from ezQ
//         q.ezQ.splice(qNum,1);
        
//     }
//     console.log(triviaQ)
// }

//kicks of our request
//loadQuestions();