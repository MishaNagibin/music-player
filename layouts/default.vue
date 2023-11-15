<template>
    <NuxtPage />
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

html {
    height: 100%;
}

*::-webkit-scrollbar-thumb {
    background: #0000003d;
    border-radius: 100px;
}

*::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

*::-webkit-scrollbar-thumb:active,
*::-webkit-scrollbar-thumb:hover {
    background: #0000007a;
}

#__nuxt {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100%;
}
</style>
