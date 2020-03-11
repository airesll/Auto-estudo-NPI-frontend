<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-btn color="primary" @click="cadastro">Cadastre-se</v-btn>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="usuarios"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.action="{item}">
                <v-btn small class="mr-2" tile outlined color="success" @click="editItem(item)">
                  <v-icon small left>mdi-pencil</v-icon>Edit
                </v-btn>
                <v-btn small class="mr-2" tile outlined color="red" @click="deleteItem(item)">
                  <v-icon left>mdi-delete</v-icon>Delete
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </v-card-widget>
  </div>
</template>

<script>
// @ is an alias to /src
import VCardWidget from "@/components/VWidget";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const usuarioRepository = RepositoryFactory.get("usuario");

export default {
  name: "home",
  components: {
    VCardWidget
  },

  data: () => ({
    headers: [
      {
        text: "Nome",
        align: "left",
        value: "nome"
      },
      { text: "Email", value: "email" },
      { text: "Habilitado", value: "habilitado" },
      { text: "Opções", value: "action" }
    ],
    usuarios: []
  }),

  created() {
    usuarioRepository
      .getAll()
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(console.error);
  },

  computed: {
  },

  methods: {
    cadastro() {
      this.$router.push("/usuarios/cadastro");
    },
    deleteItem(item) {
      //const index = this.usuarios.indexOf(item);
      var test = confirm("Tem certeza que deseja deletar o usuario?");
      if (test) {
        usuarioRepository
          .deleteUser(item.id)
          .then(res => {
            console.log(res.data);
            this.usuarios = res.data;
          })
          .catch(console.error);
      }
    },
    editItem(item) {
      alert(item.nome);
      //usuarioRepository.updateUser(usuario)({})
    }
  }
};
</script>
