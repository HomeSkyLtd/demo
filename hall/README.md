#Hall

This tutorial shows how to assemble the following elements:

1. A lamp (simulated by a LED)
2. A switch (simulated by a button)
3. A fan (simulated by a computer fan)
4. A temperature and humidity sensor, with an LCD display showing the readings

First of all, make sure you have Node.js and NPM installed. Install the dependencies of the project with `npm install`.

The pinout used on the diagrams are for the Raspberry Pi B+. It should be equivalent for the Pi 2 and Pi 3.

### Lamp
The figure below shows the wiring diagram for the hall's lamp.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/lamp.png "Schematics for hall's lamp")

To run the code, use the following command:
``` bash
sudo node nodepi lamp.json
```

### Switch
The figure below shows the wiring diagram for the hall's switch. Note how the button's pins are configured in the diagram.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/switch.png "Schematics for the hall's switch")

To run the code, use the following command:
``` bash
sudo node button/button
```
### Fan
The figure below shows the wiring diagram for the hall's fan. The diagram below uses a relay board to drive the fan, since it requires 12V to operate (most of them do, check you fan's requirements before assembling!). The code provided assumes the board's input pins are active low.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/fan.png "Schematics for the hall's fan")

For reference, the schematics of the relay board is provided below. Note that the proposed diagram above use a separate 5V power supply to power the relays (using the JD-VCC pin). It's also possible to drive the relays with the raspberry, but it will probably drain too much current from it.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/relay_schematics.jpg "Schematics for the relay board")

To run the code, use the following command:
``` bash
sudo node nodepi fan.json
```

### Temperature and humidity sensor
The figure below shows the wiring diagram for the hall's temperature/humidity sensor.

![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/dht22.png "Schematics for the hall's temperature/humidity sensor")

To run the code, use the following command:
``` bash
sudo node temperature_humidity
```

#### Adding an LCD display
We have also made a version of the temperature/humidity sensor with an LCD display to show its readings. In this example, we'll use an LCD display with an I2C module, so as to save some pins on the Raspberry Pi. The wiring diagram is show below.

>**Warning**: Note that the display requires 5V to be powered, whereas the GPIO pins work with 3.3V. For simplicity, the wiring diagram below connects the SDA and SCL pins of the Raspberry Pi directly to the display, but it is recommended to use an I2C level converter like [this one](https://www.adafruit.com/product/757) to avoid any problems.

![alt text](https://github.com/HomeSkyLtd/demo/blob/master/hall/images/lcd_i2c.png "Schematics for the LCD display with I2C module")

For this version of the sensor, run the following command:
``` bash
sudo node temperature_humidity_lcd
```

### Info about devices used in this tutorial
* The relay board shown in the wiring diagram consist of four relays protected by opto-isolators. You can find them easily on [Mercado Livre](http://produto.mercadolivre.com.br/MLB-791089935-placa-4-reles-optoacoplados-arduino-pic-controle-automaco-_JM).
* The temperature/humidity sensor's model is DHT22/AM2302. More information can be found [here](https://cdn-shop.adafruit.com/datasheets/Digital+humidity+and+temperature+sensor+AM2302.pdf)
* The LCD display used was controlled by a standard HD44780 controller, and the I2C module shown in the wiring diagram is a PCF8574.
