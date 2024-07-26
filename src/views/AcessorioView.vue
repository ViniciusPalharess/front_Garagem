    <script setup>
    import { ref, reactive, onMounted } from "vue";
    import AcessoriosApi from "@/api/acessorios";
    const acessoriosApi = new AcessoriosApi();
    
    const defaultAcessorio = { id: null, descricao: "" };
    const acessorios = ref([]);
    const acessorio = reactive({ ...defaultAcessorio });
    
    onMounted(async () => {
      acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
    });
    
    function limpar() {
      Object.assign(acessorio, { ...defaultAcessorio });
    }
    
    async function salvar() {
      if (acessorio.id) {
        await acessoriosApi.atualizarAcessorio(acessorio);
      } else {
        await acessoriosApi.adicionarAcessorio(acessorio);
      }
      acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
      limpar();
    }
    
    function editar(acessorio_para_editar) {
      Object.assign(acessorio, acessorio_para_editar);
    }
    
    async function excluir(id) {
      await acessoriosApi.excluirAcessorio(id);
      acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
      limpar();
    }
    </script>
<template>
  <div class="container">
    <h1>Acessórios</h1>

    <div class="form">
      <input type="text" v-model="acessorio.descricao" placeholder="Descrição" />
      <button class="button-rounded" @click="salvar">Salvar</button>
      <button class="button-rounded" @click="limpar">Limpar</button>
    </div>

    <div v-if="acessorios.length" class="acessorios-list">
      <ul>
        <li v-for="acessorio in acessorios" :key="acessorio.id">
          <span @click="editar(acessorio)" class="input">
            ({{ acessorio.id }}) - {{ acessorio.descricao }} -
          </span>
          <button class="button-rounded" @click="excluir(acessorio.id)">X</button>
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

.acessorios-list {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.acessorios-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.acessorios-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.acessorios-list li:last-child {
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

/* Responsive styles */
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

  .acessorios-list li {
    flex-direction: column;
    text-align: center;
  }

  .acessorios-list li span {
    margin-bottom: 5px;
  }
}
</style>
