var fetch = require("node-fetch");

const url = "https://api.github.com/users";
const client_id = "a7ca7ff94cda14a76a3c";
const client_secret = "6b9f246b5f8bce6f0ea2d70a5622d7db4a0d72ce";

async function getUser(user) {
    const data = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`)
    
    const profile = data.json()

    return profile;
}

getUser('vitormrts').then(data => console.log(data))