# IOT
This is the course deliverable for "A developer's guide to the Internet of Things (IoT)" by IBM

Description: this repository is a basic IOT application which involves Raspberry Pi and IBM Bluemix IOTF plaform. 
The application includes the Raspberry Pi acting as a gateway which sends temperature and humidity data from the Sensehat sensor(device)
to the application server on Bluemix. The server then decides what commands to send to the Pi to display wanring messages. 

This use IOT api to implement both the client and the server. It replicates the setup done by NodeRed which is a nodejs based gui. 

Files:
server.js: is the implementation for the application that should run on the bluemix platform. 
service.js: is the file that connects to the server, where the responses to the data are defined. It sends back the commands to the raspberry pi.
