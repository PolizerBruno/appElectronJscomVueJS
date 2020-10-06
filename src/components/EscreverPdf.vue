<template>
  <v-container fluid>
    <v-form>
      <h3>Pdf Escrito</h3>
      <v-textarea v-model="pdfName" label="Nome do Arquivo" auto-grow outlined rows="1" row-height="15"></v-textarea>
      <v-textarea clearable clear-icon="x" label="Texto" v-model="pdfText" autocomplete="email"></v-textarea>
      <v-file-input v-model="path" clearable clear-icon="x" label="Save as" webkitdirectory outlined dense />
      <v-btn @click="generatePdf" class="mr-4">Criar Pdf</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    props: {

    },
    data: () => ({
      pathSavePdfImage: [],
      pdfCreatePath: [],
      pdfName: '',
      pdfText: '',
      path: [],
      arrayImages: [],
    }),
    methods: {
      generatePdf() {
        const fs = require('fs');
        const PDFDocument = require('pdfkit/js/pdfkit.standalone.js');
        const pdf = new PDFDocument({
          size: 'LEGAL',
          info: {
            Title: this.pdfName,
          }
        });
        pdf.text(this.pdfText);
        pdf.pipe(
            fs.createWriteStream(String((this.path.path).split('\\').join('/') + '/' + this.pdfName + '.pdf'))
          )
          .on('finish', () => {

            alert('Pdf created with success!')
          });

        pdf.end();
      },
      readFolder() {
        const fs = require('fs');
        fs.readdirSync(this.pdfCreatePath.path).forEach(element => {
          this.arrayImages.push(this.pdfCreatePath.path.split('\\').join('/') + '/' + element)
        });
      },
     
    }
  }
</script>

<style>

</style>