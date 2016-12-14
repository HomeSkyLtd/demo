/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const raspi = require('raspi-llio');

var pwm = new raspi.PWM();
raspi.PWM.setMode(0);
raspi.PWM.setClockDivisor(400);
raspi.PWM.setRange(1000);

var door_value = 40;

Driver.createDriver({}, function(err, driver) {
		if (err) throw err;
		else {
			Leaf.createLeaf(
				driver,
				{
					dataType: [],
					commandType: [{
						id: 0,
						type: "bool",
						range:[0, 1],
						unit: "",
						commandCategory: "custom"
					}],
					path: false
				},
				(err, leaf) => {
					if (err) throw err;
					else {
						leaf.listenCommand(function(obj) {
							onCommand(obj.command[0].value);
						}, function(err) {
							if (err) throw err;
							else {
								var initialState = [{id: 0, value: value}];
								leaf.sendExternalCommand(initialState);
								console.log("[initialized] Door ON");
							}
						});
					}
				}
			);
		}
	});

var onCommand = function(value) {
	if (value == 40) value = 90;
	else value = 40;
	pwm.write(value);
}