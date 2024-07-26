<script setup>
import { ref, reactive, onMounted } from 'vue'
import VeiculosApi from '@/api/veiculos'
import CoresApi from '@/api/cores'
import ModelosApi from '@/api/modelos'
import AcessoriosApi from '@/api/acessorios'

const veiculosApi = new VeiculosApi()
const defaultVeiculo = {
  id: null,
  modelo: '',
  cor: '',
  acessorio: '',
  ano: '',
  nome: '',
  preco: ''
}
const veiculos = ref([])
const veiculo = reactive({ ...defaultVeiculo })
const coresApi = new CoresApi()
const cores = ref([])
const modelosApi = new ModelosApi()
const modelos = ref([])
const acessoriosApi = new AcessoriosApi()
const acessorios = ref([])

onMounted(async () => {
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  cores.value = await coresApi.buscarTodasAsCores()
  modelos.value = await modelosApi.buscarTodosOsModelos()
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios()
})

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo })
}

async function salvar() {
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo)
  } else {
    await veiculosApi.adicionarVeiculo(veiculo)
  }
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  limpar()
}

function editar(veiculo_para_editar) {
  Object.assign(veiculo, veiculo_para_editar)
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id)
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  limpar()
}
</script>

<template>
  <main>
    <h1>Veiculo</h1>
    <div class="form">
      <input
        type="number"
        placeholder="
      preço"
        v-model="veiculo.preco"
        class="input"
      />
      <input type="text" placeholder="nome" v-model="veiculo.nome" class="input" />

      <input type="number" placeholder="ano" v-model="veiculo.ano" class="input" />
      acessorios
      <select name="acessorio" id="acessorio" v-model="veiculo.acessorio" class="input">
        <option v-for="acessorio in acessorios" :value="acessorio.id">
          {{ acessorio.descricao }}
        </option>
      </select>
      modelo
      <select name="modelo" id="modelo" v-model="veiculo.modelo" class="input">
        <option v-for="modelo in modelos" :value="modelo.id">{{ modelo.nome }}</option>
      </select>
      cor
      <select name="cor" id="cor" v-model="veiculo.cor" class="input">
        <option v-for="cor in cores" :value="cor.id">{{ cor.nome }}</option>
      </select>
      <button @click="salvar">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
    <ul>
      <li v-for="veiculo in veiculos" :key="veiculo.id">
        <span @click="editar(veiculo)">
          ({{ veiculo.id }}) - {{ veiculo.modelo }} - {{ veiculo.nome }} - {{ veiculo.ano }} -
          {{ veiculo.preco }}
        </span>
        <button @click="excluir(veiculo.id)">X</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  gap: 10px;
  margin:  0 auto;
}

.input {
  width: 150px;
}
</style>
