const express = require('express');
const MyModel = require('./database/model/check_rekening');
require('./database/index');
const index = express();
const port = 3000;

index.use(express.json());
index.post('/api/data', async (req, res) => {
    const data = req.body
    const log = new MyModel(data)
    log.save()

    return res.status(200).json({
        message: "Data added successfully",
    })
});

index.get('/api/data', async (req, res) => {
    const allinfo = await MyModel.find({deletedAt: null})
    res.status(200).json(allinfo);
});

index.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
