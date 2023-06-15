const express = require('express');
const check_rekening = require('./database/model/check_rekening');
const seon_phone = require('./database/model/seon_phone-101-200');
const seon_email = require('./database/model/seon_email-101-200');
require('./database/index');
const index = express();
const port = 3000;

index.use(express.json());
index.post('/api/data', async (req, res) => {
    const data = req.body
    const log = new check_rekening(data)
    log.save()

    return res.status(200).json({
        message: "Data added successfully",
    })
});

index.get('/api/data', async (req, res) => {
    const allinfo = await check_rekening.find({deletedAt: null})
    res.status(200).json(allinfo);
});

index.post('/api/data/seon-phone', async (req, res) => {
   try {
        const data = req.body
        const log = new seon_phone(data)
        await log.save()

        return res.status(200).json({
            message: "Data added successfully",
            data: data
        })
   }  catch (err) {
         res.status(400).json({
              status: "failed",
             message: err.message
         });
   }
});

index.post('/api/data/seon-email', async (req, res) => {
    try {
        const data = req.body
        const log = new seon_email(data)
        await log.save()

        return res.status(200).json({
            message: "Data added successfully",
            data: data
        })
    }  catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
});

index.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
