const button = document.querySelector("button")
const teams = document.querySelector("#teams")
const players = document.querySelector("#players")
const draft_element = document.querySelector("#draft")

let teams_list = ["milan", "inter", "roma", "lazio", "juve", "torino"]
let players_list = ["shevchenko", "ronaldo", "totti", "di canio", "del piero", "asta"]

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

document.addEventListener('click', event => {
    loading_teams().then(teams_list => {
        return loading_players(teams_list)
    }).then(draft_obj => {
        console.log(draft_obj)
        injectHTML(draft_element, draft_obj) 
    })
})