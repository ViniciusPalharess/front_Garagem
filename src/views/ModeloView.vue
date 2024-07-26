<script setup>
import { ref, reactive, onMounted } from 'vue'
import ModelosApi from '@/api/modelos'
import MarcasApi from '@/api/marcas'
import CategoriaApi from '@/api/categorias'

const modelosApi = new ModelosApi()
const marcasApi = new MarcasApi()
const categoriasApi = new CategoriaApi()

const marcas = ref([])
const categorias = ref([])

const defaultModelo = {
  id: null,
  nome: '',
  marca: null,
  categoria: null
}
const modelos = ref([])
const modelo = reactive({ ...defaultModelo })

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos()
  marcas.value = await marcasApi.buscarTodasAsMarcas()
  categorias.value = await categoriasApi.buscarTodasAsCategorias()
})

function limpar() {
  Object.assign(modelo, { ...defaultModelo })
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo)
  } else {
    await modelosApi.adicionarModelo(modelo)
  }
  modelos.value = await modelosApi.buscarTodosOsModelos()
  limpar()
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar)
}

async function excluir(id) {
  await modelosApi.excluirModelo(id)
  modelos.value = await modelosApi.buscarTodosOsModelos()
  limpar()
}
</script>

<template>
  <main class="main-container">
    <h1>Modelo</h1>
    <div class="form-container">
      <div class="form">
        <input
          type="text"
          v-model="modelo.nome"
          placeholder="Nome"
          class="input"
        />
        <label for="marca">Marca:</label>
        <select
          name="marca"
          id="marca"
          v-model="modelo.marca"
          class="select"
        >
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nome }}
          </option>
        </select>
        <label for="categoria">Categoria:</label>
        <select
          name="categoria"
          id="categoria"
          v-model="modelo.categoria"
          class="select"
        >
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.descricao }}
          </option>
        </select>
        <div class="button-group">
          <button class="button-rounded" @click="salvar">Salvar</button>
          <button class="button-rounded" @click="limpar">Limpar</button>
        </div>
      </div>

      <div v-if="modelos.length" class="modelos-list">
        <ul>
          <li v-for="modelo in modelos" :key="modelo.id">
            <span @click="editar(modelo)">
              ({{ modelo.id }}) - {{ modelo.nome }} -
            </span>
            <button class="button-rounded" @click="excluir(modelo.id)">X</button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
}

.input,
.select {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus,
.select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  outline: none;
}

.button-group {
  display: flex;
  gap: 10px;
}

.button-rounded {
  padding: 10px 20px;
  border: 1px solid #007bff;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-size: 16px;
}

.button-rounded:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.modelos-list {
  width: 100%;
  max-width: 800px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modelos-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.modelos-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.modelos-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .button-rounded {
    padding: 8px 16px;
    font-size: 14px;
  }

  .input,
  .select {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 10px;
  }

  .button-rounded {
    padding: 8px 12px;
    font-size: 12px;
  }

  .form {
    gap: 10px;
  }

  .modelos-list li {
    flex-direction: column;
    text-align: center;
  }

  .modelos-list li span {
    margin-bottom: 5px;
  }
}
</style>
