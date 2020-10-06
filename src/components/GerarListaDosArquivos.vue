<template>
    <v-container fluid>
        <v-form>
            <v-text-field label="Separar por" v-model="regex" value="_"></v-text-field>
            <v-file-input v-model="path" v-on:change="readFolder" clearable clear-icon="x" label="Planilhar essa pasta"
                webkitdirectory outlined dense />

            <v-col class="row inline d-flex justify-content-between pd-5">
                <v-text-field placeholder="Nome" v-model="name"></v-text-field>
                <v-file-input clearable clear-icon="x" v-model="pathToSave" label="Save here" webkitdirectory outlined
                    dense />
            </v-col>
            <div class="row">
                <v-btn @click="gerarPlanilhaExcel" class="mr-4 btn">Gerar Planilha</v-btn>
                <h1>{{name}}</h1>
            </div>
        </v-form>
        <div>
            <v-simple-table :fixed-header="fixedHeader" :height="height">
                <thead @keydown="false" id="tableHeader" class="tableCol">
                    <tr>
                        <th v-for=" n in keys" :key="n">
                            <div class="d-flex justify-content-between col-sm">
                                <textarea :value="n" :placeholder="n" style="resize: none" :id='"header["+n+"]"'/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody id="tableLines">
                    <tr v-for="item in arrayElements" :key="item.id" :id="'line['+item['Id']+']'">
                        <td v-for="i in item" :key="i" class="myExcelTable">
                            <textarea style="resize: none" :placeholder="i" :value="i" />
                            </td>
                        </tr>
                    </tbody>
            </v-simple-table>
            <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="height" class="mx-4" label="Height - px" max="500" min="100" step="1" style="width: 125px" type="number" @keydown="false"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
      </v-col>
      <v-col cols="6" md="3">
        <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
      </v-col>
    </v-row>
        </div>
    </v-container>
</template>

<script>
    export default {
        props: {

        },
        data: () => ({
            name:'',
            fixedHeader: true,
            height: 400,
            keys: [],
            path: [],
            pathToSave:[],
            arrayElements: [],
            search: '',
            value:'',
            regex:'_'
        }),
        methods: {
            readFolder() {
                let wordId = "Id"
                let wordTime = "time";
                let id = 0;
                let irregular = 'Irregular'
                const fs = require('fs');
                let i = 0
                fs.readdirSync(this.path.path).forEach(element => {
                    let toPush = '';
                    let tempArray = [];
                    element.substring(0, element.lastIndexOf('.')).split(this.regex).forEach(item => {

                        if (item != '' && item != ' ' && item != ',') {
                            i++
                            toPush = '"' + i + '"' + ':' + '"' + item + '"'
                            tempArray.push(toPush);
                        } else {
                            i++;
                            toPush = '"' + i + '"' + ':' + '"' + irregular + '"'
                            tempArray.push(toPush);
                        }
                        
                    });
                    let time =  fs.statSync(String(this.path.path).split('\\').join('/') + '/' + element).mtime.getTime();
                    id++;
                    tempArray.push('"' + wordId + '"' + ':' + '"' + id + '"')
                    tempArray.push('"' + wordTime + '"' + ':' + '"' + time + '"')
                    i = 0;
                    let stringArray = '{' + tempArray.join(',') + '}'
                    this.arrayElements.push(JSON.parse(stringArray));
                });
                this.arrayElements = this.arrayElements.sort((a,b)=>{return a.time - b.time})
                this.keys = Object.keys(this.arrayElements[0])
            },
            gerarPlanilhaExcel() {
                let excel = require('excel4node');
                let workbook = new excel.Workbook();
                let worksheet = workbook.addWorksheet('Sheet 1');
                let styleLine = workbook.createStyle({
                    font: {
                        size: 11,
                        horizontal:'center',
                    },
                    numberFormat: '$#,##0.00; ($#,##0.00); -'
                });
                let styleHeader = workbook.createStyle({
                    font: {
                        color:'F69900',
                        font:'bold',
                        size: 16,
                    },
                    numberFormat: '$#,##0.00; ($#,##0.00); -'
                });
                //escreve o header
                for(let i = 0; i < this.keys.length;i++){
                    worksheet.cell(1,i+1).string((document.getElementById('header['+ this.keys[i] +']').value)).style(styleHeader);
                }
                // gerar array com todas as linhas atualizadas
                let lines = [];
                for(let b = 1; b <= this.arrayElements.length ;b++){
                    lines.push(document.getElementById('line['+b+']').getElementsByTagName('textarea'));
                }
                //escrever na planilha
                for(let l = 0; l < lines.length;l++){
                    for(let c = 0; c < this.keys.length; c++){
                       worksheet.cell(l+2,c+1).string(String(lines[l][c].value)).style(styleLine);
                    }
                    
                } 
                workbook.write(String(this.pathToSave.path.split('\\').join('/')+'/'+ this.name + '.xls'));
                alert('Planilha gerada com sucesso')
            }
        }
    }
</script>

<style>
    .tableFormat {
        width: auto;
        text-align: left;
    }
    .tableCol{
        width: fit-content;
    }
    .inputTable {
        display: flex;
        width: fit-content;
        text-align: left;
    }

    .myExcelTable {
        text-align: left;
    }
    .btn{
        display: flex;
        position: relative;
        margin: 5px;
        color: rgb(0, 0, 0);
    }
</style>