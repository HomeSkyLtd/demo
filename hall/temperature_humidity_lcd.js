/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const DHT_sensor = require('node-dht-sensor');
const LCD = require('lcdi2c');

const I2C_BUS = 1;
const I2C_ADDRESS = 0x27;
const LCD_COLUMNS = 20;
const LCD_LINES = 2;

var initDisplay = function() {
    var lcd = new LCD(I2C_BUS, I2C_ADDRESS, LCD_COLUMNS, LCD_LINES);
    lcd.clear();
    return lcd;
};

var updateDisplay = function(lcd, state) {
    lcd.clear();
    lcd.println("Temp: " + state.temperature + " C", 1);
    lcd.println("Humidity: " + state.humidity + "%", 2);
};

var lcd = initDisplay();
Driver.createDriver({}, function(err, driver) {
    if (err) console.log(err);
    else {
        Leaf.createLeaf(
            driver,
            {
                dataType: [
                    {
                        id: 1,
                        type: "real",
                        range: [0,50],
                        measureStrategy: "periodic",
                        dataCategory: "temperature",
                        unit: "°C"
                    },
                    {
                        id: 2,
                        type: "real",
                        range: [0,100],
                        measureStrategy: "periodic",
                        dataCategory: "humidity",
                        unit: "%"
                    }
                ],
                commandType: [],
                path: false
            },
            (err, leaf) => {
                if (err) console.log(err);
                else {
                    var read = function() {
                        DHT_sensor.read(22, 5, function(err, temperature, humidity) {
                            if (err) {
                                console.log(err);
                                setTimeout(read, 10000);
                            }

                            else {
                                console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
                                    'humidity: ' + humidity.toFixed(1) + '%');
                                updateDisplay(lcd, {temperature: temperature.toFixed(1), humidity: humidity.toFixed(1)});
                                leaf.sendData(
                                    [
                                        {id: 1, value: temperature.toFixed(1)},
                                        {id: 2, value: humidity.toFixed(1)}
                                    ], function (err) {
                                    if (err) console.log(err);
                                    else console.log("[DATA SENT] Sent reading successfuly");
                                    setTimeout(read, 3000);
                                });
                            }
                        });
                        
                    };
                    console.log("[Initialized] light sensor initialized");
                    read();
                }
            }
        );
    }
});
