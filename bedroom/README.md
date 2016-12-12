#Bedroom

This tutorial shows how to assemble the following elements:

1. A lamp (simulated by a LED)
2. A luminance sensor
3. A presence sensor

First of all, make sure you have Node.js and NPM installed. Install the dependencies of the project with npm install.

The pinout used on the diagrams are for the Raspberry Pi B+. It should be equivalent for the Pi 2 and Pi 3.

### Lamp
The figure below shows the wiring diagram for the hall's lamp.
![alt text](https://github.com/HomeSkyLtd/demo/blob/master/bedroom/images/lamp.png "Schematics for bedroom's lamp")

To run the code, use the following command:
``` bash
sudo node nodepi lamp.json
```
