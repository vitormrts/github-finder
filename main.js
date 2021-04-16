const Url = {
    link: "https://api.github.com/users",
}

const API = {
    client_id: "",
    client_secret: ""
}

const User = {
    async fetchUserData(user) {
        const profileResponse = await fetch(`${Url.link}/${user}?client_id=${API.client_id}&client_secret=${API.client_secret}`)
        const reposResponse = await fetch(`${Url.link}/${user}/repos?per_page=30&client_id=${API.client_id}&client_secret=${API.client_secret}`)
    
        const profile = await profileResponse.json()
        const repos = await reposResponse.json()
    
        return { 
            profile,
            repos
         };
    },

    get() {
        const target = Form.validateUser()

        User.fetchUserData(target).then((res) => {
            const filteredUser = User.filterUser(res.profile);
            DOM.showProfile(filteredUser);

            const repos = res.repos;

            repos.forEach(repo => {
                const filteredRepo = User.filterRepo(repo);
                DOM.showRepo(filteredRepo);
            })
        }).catch(e => console.log(e));
    },

    filterUser(user) {
        return {
            url: user.html_url,
            login: user.login,
            picture: user.avatar_url,
            name: user.name,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            company: user.company,
            repos_url: user.repos_url,
            location: user.location,
            public_repos: user.public_repos
        }
    },

    filterRepo(repo) {
        return {
            name: repo.name,
            stars: repo.stargazers_count,
            issues: repo.open_issues_count,
            forks: repo.forks_count,
            description: repo.description,
            html_url: repo.html_url
        }
    }
}

const DOM = {
    profileContainer: document.querySelector('.content__profile'),
    reposContainer: document.querySelector('.content__repositories-list'),

    showProfile(user) {
        const profile = document.createElement('div');
        profile.innerHTML = DOM.innerHTMLUser(user);

        DOM.profileContainer.appendChild(profile)
        
    },

    showRepo(repo) {
        const newRepo = document.createElement('a');
        newRepo.href = repo.html_url;
        newRepo.setAttribute('target', '_blank')
        newRepo.innerHTML = DOM.innerHTMLRepo(repo);

        DOM.reposContainer.appendChild(newRepo);
    },

    innerHTMLRepo(repo) {
        const html = `
            <li class="content__repositories-item">
                <div class="content__repositories-top">
                    <div>
                        <img src="./src/images/assets/folder.svg" alt="Repositorio">
                        <h4 class="content__repositories-title">${repo.name}</h4>
                    </div>
                    <div>
                        <div id="div-stars">
                            Estrelas: ${repo.stars}
                        </div>
                        <div id="div-issues">
                            Issues: ${repo.issues}
                        </div>
                        <div id="div-forks">
                            Forks: ${repo.forks}
                        </div>
                    </div>
                </div>
                <p class="content__repositories-description">${repo.description}</p>
            </li>
        `

        return html;
    },

    innerHTMLUser(user) {
        let html = ``

        if (user.login) {
            if (user.name) {
                html = `<h3 class="content__name">${user.name}</h3>`
            }

            html += `
            <div class="content__avatar">
                <img src="${user.picture}" alt="Avatar">`

            if (user.bio) {
                html += `<p class="content__bio">${user.bio}</div>
                </div>`
            }


            html += `
            
            <div class="content__info">
                <ul class="content__info-list">
                    <li class="content__info-item">
                        <img src="./src/images/assets/following.svg" alt="Seguindo">
                        <p><span>Seguindo:</span>${user.following}</p>
                    </li>
    
                    <li class="content__info-item">
                        <img src="./src/images/assets/followers.svg" alt="Seguidores">
                        <p><span>Seguidores:</span>${user.followers}</p>
                    </li>
    
                    <li class="content__info-item">
                        <img src="./src/images/assets/folder-blue.svg" alt="Repositorios">
                        <p><span>Repositórios públicos:</span>${user.public_repos}</p>
                    </li>`
            
            if (user.company) {
                html += `                    
                <li class="content__info-item">
                    <img src="./src/images/assets/org.svg" alt="Organização">
                    <p><span>Organização:</span>${user.company}</p>
                </li>
                `
            }

            if (user.location) {
                html += `            <li class="content__info-item">
                <img src="./src/images/assets/city.svg" alt="Cidade">
                <p><span>Localização:</span>${user.location}</p>
            </li> `
            }


            html +=  `<a href="${user.url}"><button class="content__view-profile">Ver Perfil</button></a>
            </ul>
        </div>` 
    

        } else {
            html = `<small class="content__error">Este usuário não existe.</small>`
        }

        
        return html;
    },

    clearUser() {
        DOM.profileContainer.innerHTML = '';
        DOM.reposContainer.innerHTML = '';
    }
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

const Menu = {
    toggle() {
        let menu = document.querySelector('.container__menu-section');
        const status = menu.classList.contains('active')

        if (status) {
            menu.classList.remove('active')
            document.body.style.overflow = 'initial'
        } else {
            menu.classList.add('active')
            document.body.style.overflow = 'hidden'
        }
    }
}

document.querySelector("#search-button").addEventListener("click", (event) => {
    event.preventDefault()
    DOM.clearUser();
    User.get();
})

document.querySelector('.container__menu-section').addEventListener("click", Menu.toggle)