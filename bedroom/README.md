#Bedroom

This tutorial shows how to assemble the following elements:

1. A lamp (simulated by a LED)
2. A luminance sensor
3. A presence sensor

First of all, make sure you have Node.js and NPM installed. Install the dependencies of the project with npm install.

The pinout used on the diagrams are for the Raspberry Pi B+. It should be equivalent for the Pi 2 and Pi 3.

### Lamp
The figure below shows the wiring diagram for the bedroom's lamp.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/bedroom/images/lamp.png "Schematics for bedroom's lamp")

To run the code, use the following command:
``` bash
sudo node nodepi lamp.json
```

### Luminance sensor
The figure below shows the wiring diagram for the bedroom's luminance sensor.

![alt text](https://github.com/HomeSkyLtd/demo/blob/master/bedroom/images/light_sensor_i2c.png "Schematics for bedroom's luminance sensor")

To run the code, use the following command:
``` bash
sudo node light_sensor.js
```

### Presence sensor
The presence sensor is actually a PIR sensor and it senses motion.
The figure below shows the wiring diagram for the bedroom's presence sensor.

![alt text](https://github.com/HomeSkyLtd/demo/blob/master/bedroom/images/presence_sensor.png "Schematics for bedroom's presence sensor")

To run the code, use the following command:
``` bash
sudo node presence_sensor.js
```


### Info about devices used in this tutorial
* The luminance sensor's model is Gy-30/Bh1750fvi. You can find it easily on [Mercado Livre](http://produto.mercadolivre.com.br/MLB-707047987-gy-30-modulo-sensor-de-luminosidade-digital-otico-bh1750fvi-_JM).