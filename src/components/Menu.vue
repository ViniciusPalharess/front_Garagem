<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <div class="menu">
    
    <nav>
        <ul>
    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
    <li><router-link to="/categorias">Categorias</router-link></li>
    <li><router-link to="/acessorios">Acessórios</router-link></li> 
    <li><router-link to="/cores">Cores</router-link></li> 
    <li><router-link to="/marcas">Marcas</router-link></li> 
    <li><router-link to="/modelos">Modelos</router-link></li> 
    <li><router-link to="/veiculos">Veículos</router-link></li> 
    <div v-if="authStore.loggedIn">
        <li><router-link to="/logout">Logout</router-link></li> 
        {{ authStore.user.email }}
      </div>
    </ul>
    </nav>
    </div>
  </template>

  <style scoped>
  header {
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 0.2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  </style>
  