import axios from "axios";
export default class ModelosApi {
  async buscarTodosOsVeiculos() {
    const { data } = await axios.get("/veiculo/");
    return data.results;
  }
  async adicionarVeiculo(veiculo) {
    const { data } = await axios.post("/veiculo/", veiculo);
    return data.results;
  }
  async atualizarVeiculo(veiculo) {
    const { data } = await axios.put(`/veiculo/${veiculo.id}/`, veiculo);
    return data.results;
  }
  async excluirVeiculo(id) {
    const { data } = await axios.delete(`/veiculo/${id}/`);
    return data.results;
  }
}