const express = require('express');
const check_rekening = require('./database/model/check_rekening');
const seon_phone = require('./database/model/seon_phone');
const seon_email = require('./database/model/seon_email');
const axios = require("axios");
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

index.get('/api/check-email-seon-app', async (req, res) => {
    try {
        if (!req.query.email) {
            return res.status(400).json({
                status: "failed",
                message: "Email is required"
            });
        }

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-API-KEY': 'c56baca5-a748-4b1f-bcc6-a456d47510bb',
        };

        const result = await axios({
            method: 'get',
            url: 'https://api.us-east-1-main.seon.io/SeonRestService/email-api/v2.2/' + req.query.email,
            headers: headers,
        });

        return res.status(200).json({
            status: 'success',
            data: result.data,
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
            detail: err.response.data.message
        });
    }
});

index.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
