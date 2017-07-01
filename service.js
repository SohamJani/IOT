function Service(appClient) {
  this.appClient = appClient;
  this.command_state = 0; 
}

Service.prototype.connect = function() {
  // TODO connect to iotf here with this.appClient
  this.appClient.connect();

  this.appClient.on('connect', function() {
    // TODO hook up device events here with this.appClient
    this.appClient.subscribeToDeviceEvents();
  }.bind(this));

  this.appClient.on('deviceEvent', function (deviceType, deviceId, eventType, format, payload) {
    // TODO act on device events and call handleTempEvent when the right type of event arrives
    if(deviceType === 'SenseHAT' && deviceId === 'senb827eb7ddd6d'){
      var temp = JSON.parse(payload);
      temp = parseInt(temp.d.temperature);
      this.handleTempEvent(temp);  
    }
  }.bind(this));
};

Service.prototype.handleTempEvent = function(temp) {
  // TODO handle temperature changes here and call this.warningOn/this.warningOff accordingly.
  if(temp>29 && this.command_state !== 2){
    this.command_state = 2;
    this.warningOn();
  }
  else if (temp<29 && this.command_state !== 1){
    this.command_state = 1;
    this.warningOff();
  }
};

Service.prototype.warningOn = function() {
  // TODO send a device commmand here
  // warningOn should only be called when the warning isn't already on
  var myData = {"screen": "on" };
  myData = JSON.stringify(myData);
  this.appClient.publishDeviceCommand("SenseHAT","senb827eb7ddd6d", "display", "json", myData);
};

Service.prototype.warningOff = function() {
  // TODO send a device commmand here
  // warningOff should only be called when the warning isn't already off
  var myData = {"screen": "off" };
  myData = JSON.stringify(myData);
  this.appClient.publishDeviceCommand("SenseHAT","senb827eb7ddd6d", "display", "json", myData); 
};

module.exports = Service;
