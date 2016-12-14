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
                    var state;
                    wpi.setup('gpio');
                    wpi.pinMode(22, wpi.INPUT);
                    wpi.pullUpDnControl(22, wpi.PUD_DOWN);
                    

                    var read = () => {
                        var newRead = wpi.digitalRead(22);
                        if (newRead != state) {
                                state = newRead;
                                leaf.sendData([{id: 1 , value: state }], function (err) {
                                if (err) console.log(err);
                                else console.log('[data sent] State: ' + state);
                                setTimeout(read, 1000);
                            });
                        }
                        else
                            setTimeout(read, 1000);
                    };

                    state = wpi.digitalRead(22);
                    leaf.sendData([{id: 1 , value: state }], function (err) {
                        if (err) console.log(err);
                        else console.log('[data sent] State: ' + state);
                        read();
                    });

                }
            });
    }
});
