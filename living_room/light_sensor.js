/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const BH1750 = require('bh1750');

var light = new BH1750({
    address: 0x23,
    device: '/dev/i2c-1',
    command: 0x10,
    length: 2
});

Driver.createDriver({}, function(err, driver) {
    if (err) console.log(err);
    else {
        Leaf.createLeaf(
            driver,
            {
                dataType: [
                    {
                        id: 1,
                        type: "int",
                        range: [0,65535],
                        measureStrategy: "periodic",
                        dataCategory: "luminance",
                        unit: "lx"
                    },
                ],
                commandType: [],
                path: false
            },
            (err, leaf) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var read = function() {
                        light.readLight(function(luminance) {
                            console.log('luminance: ' + luminance + 'lx');
                            leaf.sendData([ {id: 1, value: luminance }], 
                                function (err) {
                                    if (err) console.log(err);
                                    else console.log("[DATA SENT] Sent reading successfuly");
                                    setTimeout(read, 3000);
                            });
                        });
                    };
                    console.log("[Initialized] light sensor initialized");
                    read();
                }
            }
        );
    }
});
