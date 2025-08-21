<template>
    <div class="layout">
        <main class="main-content">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<style scoped lang="scss">
.layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--n-color-surface);
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
