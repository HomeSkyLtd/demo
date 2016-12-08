/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const wpi = require('wiring-pi');

const RED_PIN = 4;
const GREEN_PIN = 17;
const BLUE_PIN = 27;

Driver.createDriver({}, function(err, driver) {
		if (err) throw err;
		else {
			Leaf.createLeaf(
				driver,
				{
					dataType: [],
					commandType: [{
						id: 0,
						type: "int",
						range:[0, 7],
						unit: "color",
						commandCategory: "lightcolor"
					}],
					path: false
				},
				(err, leaf) => {
					if (err) throw err;
					else {
						wpi.setup('gpio');
						wpi.pinMode(RED_PIN, wpi.OUTPUT);
						wpi.pinMode(GREEN_PIN, wpi.OUTPUT);
						wpi.pinMode(BLUE_PIN, wpi.OUTPUT);

						leaf.listenCommand(function(obj) {
							onCommand(obj.command[0].value);
						}, function(err) {
							if (err) throw err;
							else {
								var initialState = [{id: 0, value: 0}];
								leaf.sendExternalCommand(initialState);
								console.log("[initialized] Colored lamp ON");
							}
						});
					}
				}
			);
		}
	});

var onCommand = function(value) {
	var bit_0 = value & 1;
	var bit_1 = (value & 2) >> 1;
	var bit_2 = (value & 4) >> 2;

	console.log(value + " = " + bit_0 + " " + bit_1 + " " + bit_2);

	wpi.digitalWrite(RED_PIN, bit_0);
	wpi.digitalWrite(GREEN_PIN, bit_1);
	wpi.digitalWrite(BLUE_PIN, bit_2);
}
