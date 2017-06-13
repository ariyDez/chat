<template>
    <div class="chat__log">
        <chat-message v-for="message in messages" :message="message" :key="message.user"></chat-message>
        <div class="empty" v-if="messages.length === 0">
            Nothing here yet!
        </div>
    </div>
</template>

<script>
    export default {
        props: ['messages']
    }
</script>