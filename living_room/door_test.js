/*jshint esversion: 6 */

var wpi = require('wiring-pi');
wpi.setup('gpio');

const OUT_PIN = 26;
wpi.pinMode(OUT_PIN, wpi.OUTPUT);

var value = 0;
var duty = [9, 21];
wpi.softPwmCreate(OUT_PIN, duty[value], 100);

setInterval(function() {
	value = (value + 1) % 2;
	wpi.softPwmWrite(OUT_PIN, duty[value]);
}, 2000);
