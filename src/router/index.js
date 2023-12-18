import { CreateRouter } from 'vue-router'

export default CreateRouter({
    history: true,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        }
    ]
});