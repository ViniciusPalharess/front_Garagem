<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

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

onMounted(() => {
  console.log(router.currentRoute.value.path)
})
</script>

<template>
  <aside>
    <div v-for="link in links" class="links" :class="router.currentRoute.value.path == link.path? 'active-link' : ''" @click="$emit('closeMenu')">
      <router-link :to="link.path">{{ link.name }}</router-link>
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: absolute;
  left: 0;
  top: 60px;
  width: 300px;
  height: calc(100% - 60px);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.links {
  width: 150px;
  border-radius: 10px;
  text-align: center;
  padding: 10px 20px;
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
</style>
