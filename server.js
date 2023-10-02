/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Rangani jeny  Student ID: 116266222 Date: 2023-10-01
*
*  Online (Cyclic) Link: 
*
********************************************************************************/ 


const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

const dataService = require('./data-service'); 


dataService.initialize()
    .then(() => {
      

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/views/home.html');
        });

        app.get('/about', (req, res) => {
            res.sendFile(__dirname + '/views/about.html');
        });

        app.get('/vehicles', (req, res) => {
            dataService.getAllVehicles()
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });

        app.get('/vehicles2023', (req, res) => {
            dataService.get2023Vehicles()
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });

        app.get('/brands', (req, res) => {
            dataService.getBrands()
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });

       
        app.use((req, res, next) => {
            res.status(404).sendFile(__dirname + '/404.html');
        });

      
        app.listen(port, () => {
            console.log(`Express http server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error); 
    });
