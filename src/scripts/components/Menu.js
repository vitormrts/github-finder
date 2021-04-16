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

export { Menu }