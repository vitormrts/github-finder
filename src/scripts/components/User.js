import { ENV } from '../../config/Env.js'

import { Form } from './Form.js'
import { DOM } from '../utils/Render.js';

const User = {
    async fetchUserData(user) {
        const profileResponse = await fetch(`${ENV.base_url}/${user}?client_id=${ENV.client_id}&client_secret=${ENV.client_secret}`)
        const reposResponse = await fetch(`${ENV.base_url}/${user}/repos?per_page=30&client_id=${ENV.client_id}&client_secret=${ENV.client_secret}`)
    
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

export { User }