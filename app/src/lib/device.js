var Device = function () {

  var self = this;

  self.ports = [];
  self.baudrates = [9600, 115200, 230400, 1024000];
  self.curr = null;
  self.onData = null;
  self.getSerialportList = function (filter) {
    self.ports = [];

    SerialPort.list((err, serialports) => {
      for (var index in serialports) {
        var port = serialports[index];
        if (port.vendorId === undefined && port.productId === undefined) {
          continue;
        }

        //logger.debug(port);
        self.ports.push({
          value: port.comName,
          label: port.comName,
        });
      }
    })

  };

  self.open = function (cfg) {
    self.curr = new SerialPort(
      cfg.serialport, {
        baudrate: cfg.baudrate,
        autoOpen: false
      });

    self.curr.open(function (err) {
      if (err) {
        logger.error(err.message);
        return;
      }

      // receive binary data
      self.curr.on('data', function (buf) {
        if (self.onData) self.onData(buf);
      })

    });
  };

  self.close = function () {
    if (self.curr && self.curr.isOpen()) {
      self.curr.close(function (err) {
        if (err) logger.error(err.message);
      });
    }
  }

  self.send = function (buf) {
    if (!self.curr) return;

    self.curr.write(buf, function (err) {
      if (err) {
        logger.error(err.message);
      }
    });
  };

  self.ab2str = function (buf) {
    var bufView = new Uint8Array(buf);
    var encodedString = String.fromCharCode.apply(null, bufView);
    //return decodeURIComponent(escape(encodedString));
    return encodedString;
  };

  self.str2ab = function (str) {
    var encodedString = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(encodedString.length);
    for (var i = 0; i < encodedString.length; ++i) {
      bytes[i] = encodedString.charCodeAt(i);
    }
    return bytes.buffer;
  };
};

module.exports = {
  Device,
}
