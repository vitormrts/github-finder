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

export { Form }