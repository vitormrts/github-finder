const Url = {
    link: "https://api.github.com/users",
}

const API = {
    client_id: "",
    client_secret: ""
}

const fetchUser = async (user) => {
    const api_call = await fetch(`${Url.link}/${user}?client_id=${API.client_id}&client_secret=${API.client_secret}`)
    
    const data = api_call.json()

    return data;
}

const showUser = () => {
    const user = Form.validateUser()

    fetchUser(user).then((res) => console.log(res)).catch(e => console.log(e));
}

const Form = {
    user: document.querySelector("#user"),

    validateUser() {
        let user = Form.getUser();

        if (user.trim() === '') {
            throw new Error("Por favor, insira um usuário.")
        }

        return user    
    },

    getUser() {
        return Form.user.value
    }
}

document.querySelector("#search-button").addEventListener("click", (event) => {
    event.preventDefault()
    showUser();
})