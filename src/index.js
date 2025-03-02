const express = require('express');
const trackRequestAbort = require('./middleware/trackRequestAbort');
const app = express();

app.use(express.json());

app.post('/process', trackRequestAbort, async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response  = { bilheteId: 234, message: 'Processing completed successfully!' };                        
        res.json(response);                
    } catch (error) {
        console.error('Error during processing', error);
        response = { error: 'Internal error' };        
        res.status(500).json(response);        
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
