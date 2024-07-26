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
    <h1>Veículo</h1>
    <div class="form-container">
      <div class="form">
        <input
          type="text"
          placeholder="Preço"
          v-model="veiculo.preco"
          class="input"
        />
        <input
          type="text"
          placeholder="Nome"
          v-model="veiculo.nome"
          class="input"
        />
        <input
          type="number"
          placeholder="Ano"
          v-model="veiculo.ano"
          class="input"
        />
        <label for="acessorio">Acessório:</label>
        <select
          name="acessorio"
          id="acessorio"
          v-model="veiculo.acessorio"
          class="select"
        >
          <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">
            {{ acessorio.descricao }}
          </option>
        </select>
        <label for="modelo">Modelo:</label>
        <select
          name="modelo"
          id="modelo"
          v-model="veiculo.modelo"
          class="select"
        >
          <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
            {{ modelo.nome }}
          </option>
        </select>
        <label for="cor">Cor:</label>
        <select
          name="cor"
          id="cor"
          v-model="veiculo.cor"
          class="select"
        >
          <option v-for="cor in cores" :key="cor.id" :value="cor.id">
            {{ cor.nome }}
          </option>
        </select>
        <div class="button-group">
          <button class="button-rounded" @click="salvar">Salvar</button>
          <button class="button-rounded" @click="limpar">Limpar</button>
        </div>
      </div>
      <div v-if="veiculos.length" class="veiculos-list">
        <ul>
          <li v-for="veiculo in veiculos" :key="veiculo.id">
            <span @click="editar(veiculo)">
              ({{ veiculo.id }}) - {{ veiculo.modelo }} - {{ veiculo.nome }} - {{ veiculo.ano }} - {{ veiculo.preco }}
            </span>
            <button class="button-rounded" @click="excluir(veiculo.id)">X</button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.input,
.select {
  width: 100%;
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

.select {
  height: 40px;
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

.veiculos-list {
  max-width: 600px;
  width: 100%;
  margin-top: 20px;
}

.veiculos-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.veiculos-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.veiculos-list li:last-child {
  border-bottom: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .form {
    gap: 10px;
  }

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
  main {
    padding: 10px;
  }

  .button-rounded {
    padding: 8px 12px;
    font-size: 12px;
  }

  .form {
    gap: 8px;
  }

  .veiculos-list li {
    flex-direction: column;
    text-align: center;
  }

  .veiculos-list li span {
    margin-bottom: 5px;
  }
}
</style>
