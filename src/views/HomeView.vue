<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';
import ProductList from '@/components/ProductList.vue';

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passageUser = new PassageUser(authToken);
    const user = await passageUser.userInfo(authToken);
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Lista de Produtos</h1>
    </header>
    <main>
      <ProductList />
    </main>
    <footer>
  <div class="footer-container">
    <div class="footer-left">
      <h3>Entre em Contato</h3>
      <p>Telefone: (XX) XXXX-XXXX</p>
      <p>Email: contato@sualojadecarros.com</p>
      <p>Endereço: Av. Principal, 123 - Cidade, Estado</p>
    </div>
    <div class="footer-center">
      <h3>Horário de Funcionamento</h3>
      <p>Segunda a Sexta: 8:00 - 18:00</p>
      <p>Sábado: 9:00 - 15:00</p>
      <p>Domingo: Fechado</p>
    </div>
    <div class="footer-right">
      <h3>Siga-nos nas Redes Sociais</h3>
      <div class="social-icons">
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="copyright">
    <p>&copy; 2024 Sua Loja de Carros. Todos os direitos reservados.</p>
  </div>
</footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2rem;
}

footer {
  background-color: #f8f8f8;
  padding: 20px 60px;
  text-align: center;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 960px;
  margin: 0 auto;
}

.footer-left, .footer-center, .footer-right {
  flex: 1;
  margin-bottom: 20px;
  text-align: left;
}

.footer-left h3, .footer-center h3, .footer-right h3 {
  color: #333;
  font-size: 1.2rem;
}

.footer-left p, .footer-center p, .footer-right p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  text-align: center;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  transition: background-color 0.3s ease;
}

.social-icons a:hover {
  background-color: #555;
}

.copyright {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }

  .footer-left, .footer-center, .footer-right {
    margin-bottom: 10px;
  }

  .social-icons {
    margin-top: 15px;
  }
}

</style>
