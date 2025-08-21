export default defineNuxtRouteMiddleware((to, from) => {
    // Check if user is authenticated
    const authStore = useAuthStore()

    if (!authStore.isSignedUp || !authStore.user) {
        return navigateTo('/')
    }
})