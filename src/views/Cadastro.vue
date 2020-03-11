<template>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4" >
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Dados Cadastrais</v-toolbar-title>
                    </v-toolbar>
                    <v-form  @submit.prevent="onSubmit" ref="form"  lazy-validation v-model="valid" >
                        <v-card-text>
                            <p class="error--text text-center">{{error}}</p>
                            <v-text-field label="Nome" name="nome" prepend-icon="person" type="text" v-model="nome" required :rules="requiredRule"/>
                            <v-text-field v-model="email"  prepend-icon="email"  :rules="emailRules" label="E-mail" required> </v-text-field>
                            <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password" v-model="password" required :rules="requiredRule"/>
                            <v-checkbox
                                v-model="checkbox"
                                :label="'Habilitado: ' + labelCheck"
                                required
                            ></v-checkbox>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />                            
                            <v-btn color="secondary" @click="cancelar" >Cancelar</v-btn>
                            <v-btn color="primary"  type="submit" :loading="loading" large>Salvar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { RepositoryFactory } from "@/repositories/RepositoryFactory"
    const usuarioRepository = RepositoryFactory.get("usuario")

    export default {
        props: ["to", "invalidToken"],
        data: () => ({
            valid: true,
            checkbox: true,
            nome:'',
            loading: false,
            password: '',
            error: '',
            requiredRule: [
                v => !!v || 'Campo obrigatório'
            ],
            email: '',
            emailRules: [
            v => !!v || 'Campo obrigatório',
            v => /.+@.+/.test(v) || 'E-mail não é válido',
            ]
        }),
        created() {
            if (this.invalidToken) {
                this.error = 'Sua sessão expirou. Faça login novamente'
            }
        },
        methods: {
            onSubmit () {
                this.loading = true
                if (this.$refs.form.validate()) {
                    usuarioRepository
                    .createUser({
                        nome: this.nome,
                        email: this.email,
                        password: this.password,
                        habilitado: this.checkbox
                    })
                }
                this.loading = false
            },
            cancelar(){
                this.$router.push('/')
            }
        },
        computed: {
            ...mapState({
                token: state => state.auth.token
            }),
            
            //mostrar sim ou nao
            labelCheck(){
                if(this.checkbox){
                    return  'Sim'
                } else {
                    return 'Não'
                }
            }
        }
    };
</script>

<style scoped lang="css">

</style>
