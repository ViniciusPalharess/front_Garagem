<template>
  <div class="container">
    <h1>Marcas</h1>

    <div class="form">
      <input type="text" v-model="marca.nome" placeholder="Nome" />
      <button class="button-rounded" @click="salvar">Salvar</button>
      <button class="button-rounded" @click="limpar">Limpar</button>
    </div>

    <div v-if="marcas.length" class="marcas-list">
      <ul>
        <li v-for="marca in marcas" :key="marca.id">
          <span @click="editar(marca)" class="input">
            ({{ marca.id }}) - {{ marca.nome }} -
          </span>
          <button class="button-rounded" @click="excluir(marca.id)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcasApi from "@/api/marcas";
const marcasApi = new MarcasApi();

const defaultMarca = { id: null, nome: "" };
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcasApi.atualizarMarca(marca);
  } else {
    await marcasApi.adicionarMarca(marca);
  }
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcasApi.excluirMarca(id);
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}
</script>

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

.marcas-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.marcas-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.marcas-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.marcas-list li:last-child {
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

  .marcas-list li {
    flex-direction: column;
    text-align: center;
  }

  .marcas-list li span {
    margin-bottom: 5px;
  }
}
</style>
