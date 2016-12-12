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
                commandType: []
            },
            (err, leaf) => {
                if (err) console.log(err);
                else {
                    var state = 0;
                    wpi.setup('gpio');
                    wpi.pinMode(17, wpi.INPUT);
                    wpi.pullUpDnControl(17, wpi.PUD_DOWN);
                    var debounceCallback = function(pin, value) {
                        return ()=>{
                            if(wpi.digitalRead(pin) === value){
                                state = (state+1)%2;
                                leaf.sendData({id: 1 , value: state}, function (err) {
                                    if (err) console.log(err);
                                    else console.log(`[data sent] State: ${state}`);
                                });
                            }
                        };
                    };

                    wpi.wiringPiISR(17, wpi.INT_EDGE_RISING, function(delta) {
                        setTimeout(debounceCallback(17,1), 100);
                    });

                    leaf.sendData({id: 1 , value: state}, function (err) {
                        if (err) console.log(err);
                        else console.log(`[data sent] State: ${state}`);
                        console.log("[initialized] Presence sensor initialized");
                    });
                }
            });
    }
});
