const button = document.querySelector("button");
const teams = document.querySelector("#teams");
const players = document.querySelector("#players")
let teams_list = ["milan", "inter", "roma", "lazio", "juve", "torino"]
let players_list = ["shevchenko", "ronaldo", "totti", "di canio", "del piero", "asta"]

const injectHTML = (element, list) => {
    html = ""
    list.map(value => {
        html += '<div>' + value + '</div>'
    })
    element.innerHTML = html
}

const loading_teams = () => {
    return new Promise(resolve => {
        teams.textContent = 'Loading teams...';
        setTimeout(() => {
            return resolve(teams_list)
        },4000)
    })
}

const loading_players = () => {
    return new Promise(resolve => {
        players.textContent = 'Loading players...';
        setTimeout(() => {
            return resolve(players_list)
        },6000)
    })
}

document.addEventListener('click', event => {
    loading_teams().then(teams_list => {
        injectHTML(teams, teams_list)
        return loading_players()
    }).then(players_list => {
        injectHTML(players, players_list) 
    })
})