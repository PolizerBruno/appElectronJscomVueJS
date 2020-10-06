<template>
    <v-container class='container'>
        <v-form class="in-line">
            <v-file-input type="file" label="Diretorio" v-model="path" name="file" webkitdirectory @change="readFolder" required/>
            <div class="numbers">
                <v-text-field class="inputNumber" ref="startNumber" v-model="startNumber" label="Start Number"
                    type="number" required>
                </v-text-field>
                <v-text-field class="inputNumber" ref="incrNumber" v-model="incrNumber" label="Incrementation Number"
                    type="number" required>
                </v-text-field>
            </div>
            <v-btn @click="rename" class="mr-4">Renomear</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        props: {

        },
        data: () => ({
            files: [],
            path: [],
            startNumber: 0,
            incrNumber: 0,
        }),
        methods: {
            readFolder() {
                const fs = require('fs');
                this.files = fs.readdirSync(this.path.path)
            },
            rename() {
                const fs = require('fs');
                let path = String(this.path.path).split('\\').join('/')
                let currentNumber = this.startNumber;
                if (this.files.length > 0 && this.incrNumber > 0) {
                    if (!fs.existsSync(path + '/renomeados')) {
                        fs.mkdirSync(path + '/renomeados');
                    }else{
                        alert('Ja existe um diretorio com arquivos renomeados')
                        return;
                    }
                    this.files.sort().forEach(element => {
                        if (element.toString().endsWith('.tif') || element.toString().endsWith('.tiff')) {
                            currentNumber = parseInt(currentNumber) + parseInt(this.incrNumber)
                            let newName = currentNumber;
                            fs.copyFile(path + '/' + element, path + '/renomeados/' + newName + '.tif', (err) => {
                               if(err != null){
                                   alert(err);
                               }
                            });
                        }
                    });
                     alert('Terminado');
                }else{
                    alert('O numero de incrementação deve ser superior a 1')
                }
               
                this.files = [];
            },
        }
    }
</script>

<style>
    .numbers {
        display: flex;
        justify-content: space-around;
    }

    .inputNumber {
        margin-right: 10px;
    }
</style>