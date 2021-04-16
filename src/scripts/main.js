
import { Menu } from './components/Menu.js'
import { DOM } from './utils/Render.js'
import { User } from './components/User.js'

document.querySelector("#search-button").addEventListener("click", (event) => {
    event.preventDefault()
    DOM.clearUser();
    User.get();
})

document.querySelector('.container__menu-section').addEventListener("click", Menu.toggle)