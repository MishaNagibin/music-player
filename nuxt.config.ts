// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: "Music Player",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no" },
                { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" },
                { name: "title", content: "Music Player" },
            ],
        },
    },
    // devtools: { enabled: true },
    telemetry: false,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "./assets/scss/index.scss" as *;',
                },
            },
        },
    },
})
