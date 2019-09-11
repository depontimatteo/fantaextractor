const button = document.querySelector("button")
const teams = document.querySelector("#teams")
const players = document.querySelector("#players")
const draft_element = document.querySelector("#draft")
const draws_no_element = document.querySelector("#draws_no")

let teams_list = ["AC Picchia", "Ped One", "Sganasson", "Bigfoot", "United Kinds", "Westeros", "Herta Vernello", "Zelo Junior", "Thori e Lozzi", "Cusponzio United"]
let players_list = ["Olsen", "Dragowski", "Audero", "Skorupski", "Musso", "Sepe", "Joronen", "Berisha", "Silvestri", "Gabriel"]

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

const inject_draws_no = () => {
    
    draws_no = localStorage.getItem('draws_no')
    if(draws_no == undefined){
        draws_no = 0
        localStorage.setItem('draws_no', 0)
    }

    draws_no_element.innerHTML = '<span>Number of extractions today: ' + draws_no
    localStorage.setItem('draws_no', parseInt(draws_no) + 1)
}

const injectHTML = (element, obj) => {
    html = ""
    for(let key in obj){
        html += '<div>For <span class="team">' + key + '</span> is drawn <span class="player">' + obj[key] + '</div>'
    }
    element.innerHTML = html
}

const loading_teams = () => {
    return new Promise(resolve => {
        teams.textContent = 'Loading teams...';
        //here fetch or XHR to get array from remote source
        setTimeout(() => {
            return resolve(teams_list)
        },4000)
    })
}

const loading_players = teams_list => {
    return new Promise(resolve => {
        players.textContent = 'Loading players...';
        setTimeout(() => {
            let draft = {}
            let k = 0
            for(let i = players_list.length-1;i>=0;i--){
                let drafted = players_list.splice(Math.floor(Math.random()*players_list.length), 1);
                draft[teams_list[k]] = drafted[0]
                k++
            }
            return resolve(draft)
        },6000)
    })
}

showTime()
inject_draws_no()

document.addEventListener('click', event => {
    loading_teams().then(teams_list => {
        return loading_players(teams_list)
    }).then(draft_obj => {
        console.log(draft_obj)
        injectHTML(draft_element, draft_obj) 
    })
})