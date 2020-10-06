<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link v-on:click="currentPage.value = 'Dashboard'">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="currentPage.value = 'Renomear Tiff'">
          <v-list-item-action>
            <v-icon>mdi-rename-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Renomear Tiff</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="currentPage.value = 'Converter formato da imagem'">
          <v-list-item-action>
            <v-icon>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Converter formato</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="currentPage.value = 'Escrever Pdf'">
          <v-list-item-action>
            <v-icon>mdi-file-pdf</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Escrever PDF</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="currentPage.value = 'Gerar Lista dos arquivos'">
          <v-list-item-action>
            <v-icon>mdi-file-excel</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gerar Lista dos arquivos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="currentPage.value = 'Mover por nome'">
          <v-list-item-action>
            <v-icon>mdi-file-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mover por nome</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <div class='appBar'>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{currentPage.value}}</v-toolbar-title>
        <v-switch class="themeSwich" v-on:change="changeTheme()"></v-switch>
      </div>
    </v-app-bar>

    <v-main class="contentContainer">
      <Dashboard v-if="this.currentPage.value == 'Dashboard'" />
      <RenomearTiff v-if="this.currentPage.value == 'Renomear Tiff'" />
      <EscreverPdf v-if="this.currentPage.value == 'Escrever Pdf'" />
      <ConverterFormatoDaImagem v-if="this.currentPage.value == 'Converter formato da imagem'" />
      <GerarListaDosArquivos v-if="this.currentPage.value == 'Gerar Lista dos arquivos'" />
      <MoverPorNome v-if="this.currentPage.value == 'Mover por nome'" />
    </v-main>

    <v-footer app>
      <input class="reloginhoMaroto" type="hour" disabled v-bind:value="date.value">
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      currentPage: {
        value: 'Dashboard'
      },
      date: {
        value: new Date().toString().substring(16, 24)
      },
      theme: {
        value: false,
      },
    }),
    created() {
      this.$vuetify.theme.themes.dark.primary = '#4caf50'
      this.$vuetify.theme.dark = this.theme.value;
      this.date.value = setInterval(() => {
        this.date.value = new Date().toString().substring(16, 24)
      }, 1000)
    },
    methods: {
      changeTheme() {
        this.$vuetify.theme.dark = !this.theme.value;
        this.theme.value = !this.theme.value;
      }
    },
    components: {
      'Dashboard': () => import('./components/Dashboard'),
      'RenomearTiff': () => import('./components/RenomearTiff'),
      'EscreverPdf': () => import('./components/EscreverPdf'),
      'ConverterFormatoDaImagem': () => import('./components/ConverterFormatoDaImagem'),
      'GerarListaDosArquivos': () => import('./components/GerarListaDosArquivos'),
      'MoverPorNome' : () => import('./components/MoverPorNome'),
    },
    computed: {

    }
  }
</script>


<style>
  .appBar {
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .reloginhoMaroto {
    justify-content: space-between;
    width: 100%;
    text-align: right;
    justify-content: right;
    display: flex;
    position: right;
  }

  .container {
    height: auto;
    width: auto;
    border: 1px solid;
    border-radius: 4px;
    align-items: center;
  }

  .contentContainer{
    margin: 10px;
    width: auto;
  }
</style>