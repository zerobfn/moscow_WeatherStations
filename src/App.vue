<template>
    <v-app>
        <v-main>
            <transition
                name="fade"
                mode="out-in">
                <router-view />
            </transition>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {

}
</script>

<style lang="scss">
html {
    overflow: hidden !important;
}
body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
input:focus {
    outline-style: solid;
    outline-color: #4B970F;
}
</style>
