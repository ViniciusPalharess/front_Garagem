    <script setup>
    import { ref, reactive, onMounted } from "vue";
    import CategoriasApi from "@/api/categorias";
    const categoriasApi = new CategoriasApi();
    
    const defaultCategoria = { id: null, descricao: "" };
    const categorias = ref([]);
    const categoria = reactive({ ...defaultCategoria });
    
    onMounted(async () => {
      categorias.value = await categoriasApi.buscarTodasAsCategorias();
    });
    
    function limpar() {
      Object.assign(categoria, { ...defaultCategoria });
    }
    
    async function salvar() {
      if (categoria.id) {
        await categoriasApi.atualizarCategoria(categoria);
      } else {
        await categoriasApi.adicionarCategoria(categoria);
      }
      categorias.value = await categoriasApi.buscarTodasAsCategorias();
      limpar();
    }
    
    function editar(categoria_para_editar) {
      Object.assign(categoria, categoria_para_editar);
    }
    
    async function excluir(id) {
      await categoriasApi.excluirCategoria(id);
      categorias.value = await categoriasApi.buscarTodasAsCategorias();
      limpar();
    }
    </script>
<template>
  <div class="container">
    <h1>Categorias</h1>

    <div class="form">
      <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
      <button class="button-rounded" @click="salvar">Salvar</button>
      <button class="button-rounded" @click="limpar">Limpar</button>
    </div>

    <div v-if="categorias.length" class="categorias-list">
      <ul>
        <li v-for="categoria in categorias" :key="categoria.id">
          <span @click="editar(categoria)" class="input">
            ({{ categoria.id }}) - {{ categoria.descricao }} -
          </span>
          <button class="button-rounded" @click="excluir(categoria.id)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  cursor: pointer;
  display: block;
}

.categorias-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.categorias-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.categorias-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.categorias-list li:last-child {
  border-bottom: none;
}

.button-rounded {
  padding: 8px 20px;
  border: 1px solid #007bff;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.button-rounded:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .form {
    flex-direction: column;
  }

  .button-rounded {
    padding: 10px 18px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    width: 95%;
    padding: 10px;
  }

  .button-rounded {
    padding: 10px 15px;
    font-size: 12px;
  }

  .categorias-list li {
    flex-direction: column;
    text-align: center;
  }

  .categorias-list li span {
    margin-bottom: 5px;
  }
}
</style>
