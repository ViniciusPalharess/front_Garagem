    <script setup>
    import { ref, reactive, onMounted } from "vue";
    import CoresApi from "@/api/cores";
    const coresApi = new CoresApi();

    const defaultCor = { id: null, nome: "" };
    const cores = ref([]);
    const cor = reactive({ ...defaultCor });

    onMounted(async () => {
      cores.value = await coresApi.buscarTodasAsCores();
    });

    function limpar() {
      Object.assign(cor, { ...defaultCor });
    }

    async function salvar() {
      if (cor.id) {
        await coresApi.atualizarCor(cor);
      } else {
        await coresApi.adicionarCor(cor);
      }
      cores.value = await coresApi.buscarTodasAsCores();
      limpar();
    }

    function editar(cor_para_editar) {
      Object.assign(cor, cor_para_editar);
    }

    async function excluir(id) {
      await coresApi.excluirCor(id);
      cores.value = await coresApi.buscarTodasAsCores();
      limpar();
    }
</script>
<template>
  <div class="container">
    <h1>Cores</h1>

    <div class="form">
      <input type="text" v-model="cor.nome" placeholder="Nome" />
      <button class="button-rounded" @click="salvar">Salvar</button>
      <button class="button-rounded" @click="limpar">Limpar</button>
    </div>

    <div v-if="cores.length" class="cores-list">
      <ul>
        <li v-for="cor in cores" :key="cor.id">
          <span @click="editar(cor)" class="input">
            ({{ cor.id }}) - {{ cor.nome }} -
          </span>
          <button class="button-rounded" @click="excluir(cor.id)">X</button>
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

.cores-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cores-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.cores-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.cores-list li:last-child {
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

  .cores-list li {
    flex-direction: column;
    text-align: center;
  }

  .cores-list li span {
    margin-bottom: 5px;
  }
}
</style>
