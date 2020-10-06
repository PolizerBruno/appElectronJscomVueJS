<template>
    <v-container>
        <v-form>
            <v-file-input label="Diretorio" v-model="path" webkitdirectory required />
            <v-btn @click="readFolder" v-if="this.path != ''" class="mr-4 btn">Processar</v-btn>
        </v-form>
        <v-row>
            <v-col>
                <v-card>
                    <v-container fluid>
                        <v-row>
                            <v-col v-for="n in array" :key="n" class="d-flex child-flex" cols="4">
                                <v-card flat tile class="d-flex">
                                    <v-img :src="n" 
                                        :lazy-src="n" aspect-ratio="1"
                                        class="grey border lighten-2" 
                                        alt="logo" >
                                        <template v-slot:placeholder>
                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                <v-progress-circular indeterminate color="grey lighten-5">
                                                </v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            path: [],
            array: [],
            imageUrl: '',
        }),
        methods: {
            readFolder() {
                const fs = require('fs');
                const img = new Image()
                console.log(img)
                let files = fs.readdirSync(this.path.path)
                for (let i = 0; i < files.length; i++) {
                    this.array.push(String(this.path.path).split('\\').join('/') + '/' + files[i]);
                }
            },
        }
    }
</script>

<style>
    .border{
        border: 10px solid black;
    }
</style>