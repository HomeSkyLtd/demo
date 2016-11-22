/*jshint esversion: 6 */

const Leaf = require("rainfall-leaf");
const Driver = require("rainfall-tcp");
const Lcd = require('lcd'),
	lcd = new Lcd({rs: 18, e: 23, data: [12, 16, 20, 21], cols: 16, rows: 2});

const channels = ["Globo", "SBT", "Band", "DiscoveryChannel", "HBO"];

n_channel = 0;

lcd.on('ready', function() {

	setInterval(function() {
		lcd.setCursor(0, 0);
		lcd.clear();
		var str = "Canal " + n_channel;
		lcd.print(str, function (err) {
			if (err) throw err;
			lcd.setCursor(0, 1);
			lcd.print(channels[n_channel], function(err) {
				if (err) throw err;
			});
			n_channel = (n_channel + 1) % 5;
		});

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
						type: "int",
						range:[0, 4],
						unit: "canal",
						commandCategory: "channel"
					}],
					path: false
				},
				(err, leaf) => {
					if (err) throw err;
					else {
						leaf.listenCommand(function(obj) {
							n_channel = obj.command[0].value;
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
});
 
// If ctrl+c is hit, free resources and exit. 
process.on('SIGINT', function () {
	lcd.close();
	process.exit();
});
