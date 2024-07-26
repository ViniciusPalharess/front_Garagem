<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore()
const mostrarEmail = ref(false)

const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Categorias',
    path: '/categorias'
  },
  {
    name: 'acessorios',
    path: '/acessorios'
  },
  {
    name: 'cores',
    path: '/cores'
  },
  {
    name: 'marcas',
    path: '/marcas'
  },
  {
    name: 'modelos',
    path: '/modelos'
  },
  {
    name: 'veiculos',
    path: '/veiculos'
  }
]
</script>

<template>
  <header class="header">
    <img src="/logo.png" alt="" width="40px">
      <p v-for="link in links" class="links" :class="router.currentRoute.value.path == link.path ? 'active-link' : ''">
        <router-link :to="link.path">{{ link.name }}</router-link>
      </p>
      <div v-if="authStore.loggedIn">
        <p @mouseenter="mostrarEmail = true" @mouseleave="mostrarEmail = false" class="links">
          <router-link to="/logout">Logout</router-link>
          <span v-if="mostrarEmail" class="email-separado">{{ authStore.user.email }}</span>
        </p>
      </div>
      <div v-else>
        <p class="links"><router-link to="/login">Login</router-link></p>
      </div>
  </header>
</template>

<style scoped>

.header {
    position: relative;
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.links {
  border-radius: 10px;
  text-align: center;
  padding: 5px 20px;
}

.links a {
  text-transform: uppercase;
  text-decoration: none;
  color: #000000;
}

.links:hover {
  background-color: #bbb;
}

.active-link {
  background-color: #bbb;
}

.email-separado {
  position: absolute;
  right: 0;
  top: 40px;
  max-width: 200px;
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
