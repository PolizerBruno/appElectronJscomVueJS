<template>
    <v-container class='container'>
        <v-form>
            <v-file-input label="Diretorio" v-model="path" webkitdirectory @change="readFolder" required />
            <div class="select">
            </div>
            <v-btn class="mr-4" @click="converterFormato">Converter</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    const {
        ipcRenderer
    } = require('electron')
    export default {
        props: {

        },
        data: () => ({
            files: [],
            path: [],
        }),
        methods: {
            readFolder() {
                const fs = require('fs');
                this.files = fs.readdirSync(this.path.path)
            },
            converterFormato() {
                const fs = require('fs');
                let path = String(this.path.path).split('\\').join('/')
                if (this.files.length > 0) {
                    if (!fs.existsSync(path + '/convertidos')) {
                        fs.mkdirSync(path + '/convertidos');
                    } else {
                        alert('Ja existe um diretorio com arquivos convertidos')
                        return;
                    }
                    this.files.forEach(element => {
                        ipcRenderer.send('converterImage', path + '/' + element, path + '/convertidos/' +
                            String(
                                String(element).substring(0, String(element).lastIndexOf('.')) +
                                '.jpg'));
                        ipcRenderer.on('converterImageResposta', (event, arg) => {
                            console.log(arg);
                        })
                    });
                }
                alert('Terminado');
                this.files = [];
            },
        }
    }
</script>

<style>
    .select {
        display: flex;
        justify-content: space-around;
    }

    .inputType {
        margin-right: 10px;
    }
</style>