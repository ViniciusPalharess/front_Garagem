<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import Menu from '../Menu.vue'

const authStore = useAuthStore()
const menu = ref(false)
const mostrarEmail = ref(false)
</script>

<template>
  <Menu v-if="menu" @close-menu="menu = false"></Menu>
  <header class="header">
    <div class="btn-menu" @click="menu = !menu">
      <i class="mdi mdi-menu"></i>
    </div>
    <img src="/logo.png" alt="" width="40px" />

    <div v-if="authStore.loggedIn">
      <p @mouseenter="mostrarEmail = true" @mouseleave="mostrarEmail = false">
        <router-link to="/logout">Logout</router-link>
        <span v-if="mostrarEmail" class="email-separado">{{ authStore.user.email }}</span>
      </p>
    </div>
    <div v-else>
      <p><router-link to="/login">Login</router-link></p>
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
  justify-content: space-between;
  align-items: center;
}

p a {
  text-transform: uppercase;
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: #000000;
}

.menu li a:hover {
  background: #fdfdfd34;
}

.btn-menu {
  cursor: pointer;
}

.email-separado {
  position: absolute;
  right: 0;
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
