const {
    ipcMain
} = require('electron')
const fs = require('fs');
ipcMain.on('converterImage', (event, file, save) => {
    fs.writeFile(save,fs.readFileSync(file),'base64',(err)=>{if(err){
        console.log(err);  
    }});
    event.reply('converterImageResposta', 'Sucesso')
})