export default {
    state: {
        user: null
    },
    initialize() {
        this.state.user = JSON.parse(localStorage.getItem('user'));
    },
    set(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.initialize();
    },
    remove() {
        localStorage.removeItem('user');
        this.initialize();
    }
}