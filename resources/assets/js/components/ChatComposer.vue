<template>
    <div class="chat__composer">
        <input type="text" placeholder="Start typing your message..." v-model="messageText" @keyup.enter="sendMessage">
        <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
</template>

<script>
    import Auth from '../store/auth'
    export default {
        data() {
            return {
                messageText: '',
                auth: Auth.state
            }
        },
        methods: {
            sendMessage() {
                this.$emit('messagesent', {
                    message: this.messageText,
                    user: this.auth.user
                });
                this.messageText = '';
            }
        },
        created() {
            Auth.initialize();
        }
    }
</script>
