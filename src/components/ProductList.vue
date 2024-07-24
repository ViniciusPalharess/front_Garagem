<script setup>
  import { ref } from 'vue';
  
  const products = ref([
    { id: 1, name: 'Product A', price: 19.99 },
    { id: 2, name: 'Product B', price: 29.99 },
    { id: 3, name: 'Product C', price: 39.99 },
  ]);
  
  </script>


<template>
    <div class="product-list">
      <h2>Lista de produtos</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - ${{ product.price }}
        </li>
      </ul>
    </div>
  </template>
  
  
  <style scoped>
  .product-list {
    margin-top: 20px;
  }
  
  .product-list h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .product-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .product-list li {
    margin-bottom: 8px;
    font-size: 1.2rem;
  }
  </style>
  