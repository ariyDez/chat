
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Auth from './store/auth'
import { post, get } from './helpers/api'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-message', require('./components/ChatMessage.vue'));
Vue.component('chat-log', require('./components/ChatLog.vue'));
Vue.component('chat-composer', require('./components/ChatComposer.vue'));

const app = new Vue({
    el: '#app',
    data() {
        return {
            messages: []
        }
    },
    methods: {
        addMessage(message) {
            post('/api/postMessage', message)
                .then((res) => {
                    if(res.data.posted) {
                        this.messages.push(message);
                    }
                })
                .catch((err) => {
                    debugger;
                })
        }
    },
    created() {
        get('/api/messages')
            .then((res) => {
                this.messages = res.data.messages;
                Auth.set(res.data.user);
            });
        Echo.private('chat')
            .listen('MessagePosted', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                })
            });
    }
});
