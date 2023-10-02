const fs = require('fs');
const path = require('path');

const vehiclesFilePath = path.join(__dirname, 'data', 'vehicles.json');
const brandsFilePath = path.join(__dirname, 'data', 'brands.json');

let vehicles = [];
let brands = [];

function readDataFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            }
        });
    });
}

function initialize() {
    return new Promise((resolve, reject) => {
        readDataFile(vehiclesFilePath)
            .then((data) => {
                vehicles = data;
                return readDataFile(brandsFilePath);
            })
            .then((data) => {
                brands = data;
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getAllVehicles() {
    return new Promise((resolve, reject) => {
        if (vehicles.length === 0) {
            reject("No results returned");
        } else {
            resolve(vehicles);
        }
    });
}

function get2023Vehicles() {
    return new Promise((resolve, reject) => {
        const filteredVehicles = vehicles.filter((vehicle) => vehicle.year === 2023);
        if (filteredVehicles.length === 0) {
            reject("No results returned");
        } else {
            resolve(filteredVehicles);
        }
    });
}

function getBrands() {
    return new Promise((resolve, reject) => {
        if (brands.length === 0) {
            reject("No results returned");
        } else {
            resolve(brands);
        }
    });
}

module.exports = {
    initialize,
    getAllVehicles,
    get2023Vehicles,
    getBrands,
};
