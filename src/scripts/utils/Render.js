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
                html = 
                    `
                    <h3 class="content__name">${user.name}</h3>
                    `
            }

            html += 
                `
                <div class="content__avatar">
                    <img src="${user.picture}" alt="Avatar">
                `

            if (user.bio) {
                html += 
                `
                    <p class="content__bio">${user.bio}
                </div>
                `
            }


            html += 
            `
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
                html += 
                `                    
                <li class="content__info-item">
                    <img src="./src/images/assets/org.svg" alt="Organização">
                    <p><span>Organização:</span>${user.company}</p>
                </li>
                `
            }

            if (user.location) {
                html += 
                `            
                <li class="content__info-item">
                    <img src="./src/images/assets/city.svg" alt="Cidade">
                    <p><span>Localização:</span>${user.location}</p>
                </li> 
                `
            }


            html +=  
            `
                    <a href="${user.url}"><button class="content__view-profile">Ver Perfil</button></a>
                </ul>
            </div>
            ` 
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

export { DOM }