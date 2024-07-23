<script setup>
import { ref, reactive, onMounted } from "vue";
import ModelosApi from "@/api/modelos";
import MarcasApi from "@/api/marcas"
import CategoriaApi from "@/api/categorias"
const modelosApi = new ModelosApi();
const marcasApi = new MarcasApi();
const categoriasApi = new CategoriaApi();

const marcas = ref()
const categorias = ref()

const defaultModelo = { id: null, nome: "", marca: null, categoria: null };
const modelos = ref([]);
const modelo = reactive({ ...defaultModelo });

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos();
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(modelo, { ...defaultModelo });
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo);
  } else {
    await modelosApi.adicionarModelo(modelo);
  }
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar);
}

async function excluir(id) {
  await modelosApi.excluirModelo(id);
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}
</script>

<template>
  <h1>Modelo</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="modelo.nome" placeholder="Nome" />
    Marca:
    <select name="marca" id="marca" v-model="modelo.marca">
      <option v-for="marca in marcas" :value="marca.id">{{ marca.nome }}</option>
    </select>
    Categoria:
    <select name="categoria" id="categoria" v-model="modelo.categoria">
      <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.descricao }}</option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="modelo in modelos" :key="modelo.id">
      <span @click="editar(modelo)">
        ({{ modelo.id }}) - {{ modelo.nome }} -
      </span>
      <button @click="excluir(modelo.id)">X</button>
    </li>
  </ul>
</template>

<style></style>