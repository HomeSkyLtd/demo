/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const wpi = require('wiring-pi');

// This driver represents a sensor that listens controller messages.
Driver.createDriver({}, function(err, driver) {
    if (err) console.log(err);
    else {
        Leaf.createLeaf(
            driver,
            {
                dataType: [
                    {
                        id: 1,
                        type: "bool",
                        range: [0,1],
                        measureStrategy: "event",
                        dataCategory: "presence",
                        unit: ""
                    }
                ],
                commandType: [],
                path: false
            },
            (err, leaf) => {
                if (err) console.log(err);
                else {
                    wpi.setup('gpio');
                    wpi.pinMode(2, wpi.INPUT);
                    wpi.pullUpDnControl(22, wpi.PUD_DOWN);
                    
                    wpi.wiringPiISR(22, wpi.INT_EDGE_RISING, function(delta) {
                        leaf.sendData([{id: 1 , value: 1 }], function (err) {
                            if (err) console.log(err);
                            else console.log('[data sent] State: ' + 1);
                        });
                    });

                    wpi.wiringPiISR(22, wpi.INT_EDGE_FALLING, function(delta) {
                        leaf.sendData([{id: 1 , value: 0 }], function (err) {
                            if (err) console.log(err);
                            else console.log('[data sent] State: ' + 0);
                        });
                    });

                    var state = wpi.digitalRead(22);
                    leaf.sendData([{id: 1 , value: state }], function (err) {
                        if (err) console.log(err);
                        else console.log('[data sent] State: ' + state);
                    });

                }
            });
    }
});
