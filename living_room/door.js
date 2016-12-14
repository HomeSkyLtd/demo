/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const raspi = require('raspi');
const PWM = require('raspi-pwm').PWM;
var pwm = new PWM();

var duty_cycle = 40;

raspi.init(function() {
  pwm.write(duty_cycle); // Center a servo
});

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
	if (duty_cycle == 40) duty_cycle = 90;
	else duty_cycle = 40;
	pwm.write(value);
}