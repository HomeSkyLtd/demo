/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");

var wpi = require('wiring-pi');
wpi.setup('gpio');

const OUT_PIN = 26;
wpi.pinMode(OUT_PIN, wpi.OUTPUT);

var value = 0;
var duty = [9, 21];
wpi.softPwmCreate(OUT_PIN, duty[value], 100);
setTimeout(function() {
	wpi.softPwmStop(OUT_PIN);
}, 1000);

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
						commandCategory: "toggle"
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

var onCommand = function() {
	console.log('Called: ' + value);

	value = (value + 1) % 2;
	wpi.softPwmCreate(OUT_PIN, duty[value], 100);
	setTimeout(function() {
		wpi.softPwmStop(OUT_PIN);
	}, 1000);
}
