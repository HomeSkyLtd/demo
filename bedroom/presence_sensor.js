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
                    wpi.pinMode(17, wpi.INPUT);
                    wpi.pullUpDnControl(17, wpi.PUD_DOWN);
                    var state = wpi.digitalRead(17);
                    wpi.wiringPiISR(17, wpi.INT_EDGE_RISING, function(delta) {
                        state = 1;
                        leaf.sendData([{ id: 1 , value: state }], function (err) {
                            if (err) console.log(err);
                            else console.log('[data sent] State: ' + state);
                        });
                    });
                    wpi.wiringPiISR(17, wpi.INT_EDGE_FALLING, function(delta) {
                        state = 0;
                        leaf.sendData([{ id: 1 , value: state }], function (err) {
                            if (err) console.log(err);
                            else console.log('[data sent] State: ' + state);
                        });
                    });
                    leaf.sendData([{id: 1 , value: state }], function (err) {
                        if (err) console.log(err);
                        else console.log('[data sent] State: ' + state);
                        console.log("[initialized] Presence sensor initialized");
                    });
                }
            });
    }
});
