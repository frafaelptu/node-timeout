const express = require('express')
const app = express()

app.use(express.json())

app.post('/process', async (req, res) => {

    let requestClosed = false;
    let responseData = null;

    req.on('aborted', () => {
        requestClosed = true;
        console.error('Conexão do cliente foi fechada antes do processamento');
    });

    try{
        
        await new Promise(resolve => setTimeout(resolve, 5000));

        responseData = {
            statusCode: 200,
            bilheteId: 1562,
            mensagem: 'Processaamento finalizado com sucesso!'
        };

        if (!requestClosed){
            res.json(responseData)
        }else{
            console.log('processamento foi concluído mas cliente já desconectou!');
        }

    }catch(error){
        console.error('Erro no processamento', error);
        responseData = {error: 'Erro interno' };
        if (!requestClosed){
            res.status(500).json(responseData);
        }
    }finally{
        if (requestClosed){
            console.log('Cliente desconectado. mas a resposta foi processada', responseData);
        }    
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

