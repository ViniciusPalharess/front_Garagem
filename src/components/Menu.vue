<template>
  <header class="header">
    <div class="menu-toggle" @click="menuAberto = !menuAberto">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path v-if="!menuAberto" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        <path v-else d="M21 12l-9 9-1.41-1.41L18.17 12l-7.58-7.59L12 3z"/>
      </svg>
    </div>

    <div class="menu" :class="{ 'dropdown-active': menuAberto }">
      <nav>
        <ul class="nav-menu">
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li><router-link to="/categorias">Categorias</router-link></li>
          <li><router-link to="/acessorios">Acessórios</router-link></li>
          <li><router-link to="/cores">Cores</router-link></li>
          <li><router-link to="/marcas">Marcas</router-link></li>
          <li><router-link to="/modelos">Modelos</router-link></li>
          <li><router-link to="/veiculos">Veículos</router-link></li>
          <template v-if="authStore.loggedIn">
            <li @mouseenter="mostrarEmail = true" @mouseleave="mostrarEmail = false">
              <router-link to="/logout">Logout</router-link>
              <span v-if="mostrarEmail" class="email-separado">{{ authStore.user.email }}</span>
            </li>
          </template>
          <template v-else>
            <li><router-link to="/login">Login</router-link></li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const menuAberto = ref(false);
const mostrarEmail = ref(false);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.menu-toggle {
  display: none; 
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
}

.menu {
  position: relative;
}

.nav-menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; 
}

.menu li {
  flex: 1; 
  text-align: center; 
}

.menu li a {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: #000000;
}

.menu li a:hover {
  background: #eeeeee; 
}

.email-separado {
  position: absolute;
  display: block;
  max-width: 200px;
  margin-top: 5px;
  padding: 5px 10px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column; 
    align-items: stretch; 
  }

  .menu-toggle {
    display: block; 
  }

  .menu.dropdown-active .nav-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    background-color: #e3f5e3; 
    box-shadow: 0 10px 90px rgba(255, 227, 227, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border-radius: 10px;
    padding: 10px 0;
    z-index: 1000;
  }

  .menu .nav-menu {
    display: none;
  }

  .menu.dropdown-active .nav-menu {
    display: flex;
  }

  .menu li {
    border: none; 
    width: 100%; 
    text-align: center; 
  }

  .menu li a {
    padding: 1rem 0; 
    display: block; 
  }

  .menu li a:hover {
    background: #45a049; 
  }
}
</style>
