import axios from "axios";
export default class ModelosApi {
  async buscarTodosOsModelos() {
    const { data } = await axios.get("/modelo/");
    return data.results;
  }
  async adicionarModelo(Modelo) {
    const { data } = await axios.post("/modelo/", Modelo);
    return data.results;
  }
  async atualizarModelo(Modelo) {
    const { data } = await axios.put(`/modelo/${Modelo.id}/`, Modelo);
    return data.results;
  }
  async excluirModelo(id) {
    const { data } = await axios.delete(`/modelo/${id}/`);
    return data.results;
  }
}