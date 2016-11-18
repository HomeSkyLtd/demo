#Hall

This tutorial shows how to assemble the following elements:

1. A lamp (simulated by a LED)
2. A switch (simulated by a button)
3. A fan (simulated by a computer fan)
4. A temperature and umidity sensor, with an LCD display showing the readings

The pinout used on the diagrams are for the Raspberry Pi B+. It should be equivalent for the Pi 2 and Pi 3.

### Lamp
The figure below shows the schematic for the hall's lamp.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/lamp.png "Schematics for hall's lamp")

To run the code, use the following command:
``` bash
sudo node nodepi lamp.json
```

### Switch
The figure below shows the schematic for the hall's switch. Note how the button's pins are configured in the schematic.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/switch.png "Schematics for hall's switch")

To run the code, use the following command:
``` bash
sudo node button/button
```
### Fan
The figure below shows the schematic for the hall's fan. The schematic below uses a relay board to drive the fan, since it requires 12V to operate (most of them do, check you fan's requirements before assembling!). The code provided assumes the board's input pins are active low.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/fan.png "Schematics for hall's fan")

For reference, the schematics of the relay board is provided below. Note that the proposed schematics use a separate 5V power supply to power the relays (using the JD-VCC pin). It's also possible to drive the relays with the raspberry, but it will probably drain too much current from it.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/relay_schematics.jpg "Schematics for the relay board")

To run the code, use the following command:
``` bash
sudo node nodepi fan.json
```


### Info about devices used in this tutorial
* The relay board shown in the schematic consist of four relays protected by opto-isolators. You can find them easily on [Mercado Livre](http://produto.mercadolivre.com.br/MLB-791089935-placa-4-reles-optoacoplados-arduino-pic-controle-automaco-_JM).
 
