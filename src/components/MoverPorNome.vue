<template>
    <v-container class='container'>
        <v-form class="col in-line">
            <v-text-field @change="readFolder" v-model="search" append-icon="mdi-magnify" label="Search" single-line
                hide-details />
            <v-select class="inputType" :items="items" v-model="option" label="Opões" />

            <div class="row">
                <v-file-input v-if="this.search.length > 0" v-model="path" @change="readFolder" type="file"
                    label="Diretorio" name="file" webkitdirectory required />
                <v-checkbox v-model="dirOrganize" label="Manter Arquitetura de pastas"></v-checkbox>
            </div>
            <v-btn @click="mover" class="mr-4 btn">
                {{option }}
            </v-btn>
        </v-form>
        <hr>
        <ul>
            <li v-for="element in arrayEncontrados" :key="element">
                {{element}}
            </li>
        </ul>
    </v-container>
</template>
<script>
    export default {
        created: {

        },
        data: () => ({
                dirOrganize: true,
                items: ['Copiar - Move uma copia (Fortemente recomendado!)', 'Mover - Move o arquivo original'],
                search: '',
                path: [],
                option: 'Copiar - Move uma copia (Fortemente recomendado!)',
                arrayEncontrados: [],
            }

        ),
        methods: {
            readFolder() {
                this.arrayEncontrados = [];
                const fs = require('fs');
                if (this.path != '' && this.search != '' && this.search != ' ') {
                    let arrayElements = fs.readdirSync(this.path.path)
                    if (this.dirOrganize == true && this.path != '' && arrayElements.length > 0 && this.search != '') {
                        arrayElements.forEach(element => {
                            if (fs.lstatSync(this.path.path + '/' + element).isDirectory()) {
                                fs.readdirSync(this.path.path + '/' + element).forEach(item => {
                                    if (String(item).includes(this.search) && this.search != '') {
                                        this.arrayEncontrados.push(String((this.path.path).split('\\')
                                            .join(
                                                '/') + '/' + element + '/' + item));
                                    }
                                });
                            } else {
                                if (this.path.path != '' && this.search != '') {
                                    if (String(element).includes(this.search)) {
                                        this.arrayEncontrados.push(String(this.path.path).split('\\')
                                            .join('/') + '/' + element);
                                    }
                                }
                            }
                        });
                    } else {
                        if (this.path.path != '' && this.path != '' && this.search != '' && this.dirOrganize == false) {
                            arrayElements.forEach(element => {
                                if (String(element).includes(this.search)) {
                                    this.arrayEncontrados.push(String(this.path.path).split('\\')
                                        .join('/') + '/' + element);
                                }
                            });
                        }
                    }
                } else {
                    return;
                }
                if (this.arrayEncontrados.length == 0) {
                    alert('Nenhum Resultado Encontrado')
                }
            },
            mover() {
                const fs = require('fs');
                if (this.arrayEncontrados.length > 0) {
                    if (!fs.existsSync((this.path.path).split('\\').join('/') + '/movidos')) {
                        fs.mkdirSync((this.path.path).split('\\').join('/') + '/movidos');
                    }
                    if (this.option == 'Copiar - Move uma copia (Fortemente recomendado!)') {
                        this.arrayEncontrados.forEach(element => {
                            let folder = element.split('/');
                            if (!fs.existsSync((this.path.path).split('\\').join('/') + '/movidos/' + folder[
                                    folder.length - 2]) && fs.lstatSync(element.substring(0, element
                                    .lastIndexOf('/'))).isDirectory()) {
                                fs.mkdirSync((this.path.path).split('\\').join('/') + '/movidos/' + folder[
                                    folder.length - 2]);
                            }
                            if (fs.lstatSync(element.substring(0, element.lastIndexOf('/'))).isDirectory()) {
                                fs.copyFile(element, (this.path.path).split('\\').join('/') + '/movidos/' +
                                    folder[folder.length - 2] + '/' + folder[folder.length - 1], (err) => {
                                        if (err != null) {
                                            alert(err);
                                        }
                                    }
                                )
                            } else {
                                fs.copyFile(element, (this.path.path).split('\\').join('/') + '/movidos/' +
                                    folder[folder.length - 1], (err) => {
                                        if (err != null) {
                                            alert(err);
                                        }
                                    })
                            }

                        });
                        alert('Documentos movidos com sucesso');
                        this.arrayEncontrados = [];
                    } else {
                        this.arrayEncontrados.forEach(element => {
                            let folder = element.split('/');
                            if (!fs.existsSync((this.path.path).split('\\').join('/') + '/movidos/' + folder[
                                    folder.length - 2]) && fs.lstatSync(element.substring(0, element
                                    .lastIndexOf('/'))).isDirectory()) {
                                fs.mkdirSync((this.path.path).split('\\').join('/') + '/movidos/' + folder[
                                    folder.length - 2]);
                            }
                            if (fs.lstatSync(element.substring(0, element.lastIndexOf('/'))).isDirectory()) {
                                fs.rename(element, (this.path.path).split('\\').join('/') + '/movidos/' +
                                    folder[folder.length - 2] + '/' + folder[folder.length - 1], (err) => {
                                        if (err != null) {
                                            alert(err);
                                        }
                                    }
                                )
                            } else {
                                fs.rename(element, (this.path.path).split('\\').join('/') + '/movidos/' +
                                    folder[folder.length - 1], (err) => {
                                        if (err != null) {
                                            alert(err);
                                        }
                                    })
                            }

                        });
                        alert('Documentos copiados com sucesso')
                        this.arrayEncontrados = [];
                    }
                } else {
                    alert('Nada para mover')
                }

            }
        }
    }
</script>
<style>

</style>