/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const Lcd = require('lcd'),
	lcd = new Lcd({rs: 18, e: 23, data: [12, 16, 20, 21], cols: 16, rows: 2});
 

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
					range:[1, 5],
					unit: "canal",
					commandCategory: "channel"
				}],
				path: false
			},
			(err, leaf) => {
				if (err) throw err;
				else {
					leaf.listenCommand(function(obj) {
						onCommand(obj.command[0]);
					}, function(err) {
						if (err) throw err;
						else {
							var initialState = [{id: 0, value: 0}];
							leaf.sendExternalCommand(initialState);
							console.log("[initialized] TV initialized");
						}
					});
				}
			}
		);
	}
});

const channels = ["Globo", "SBT", "Band", "Discovery", "HBO"];

function onCommand(cmd) {
	lcd.on('ready', function () {
		lcd.setCursor(0, 0);
		var str = cmd.value + ": " + channels[cmd.value];
		lcd.print(str, function (err) {
			if (err) throw err;
		});
	});
};
 
// If ctrl+c is hit, free resources and exit. 
process.on('SIGINT', function () {
	lcd.close();
	process.exit();
});