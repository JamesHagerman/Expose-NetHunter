var Socket = (function () {
  return {
    socket: null,
    init: function () {
      console.log('Socket.init reached. port:' + App.config.port);
      var that = this;
      this.socket = io();
      this.socket.on('news', function (data) {
        console.log(data);
        that.socket.emit('my other event', {my: 'data'});
      });
      this.socket.on('sun', function (data) {
        console.log("sun: ");
        console.dir(data);
        //socket.emit('my other event', {my: 'data'});
      });
      this.socket.on('moon', function (data) {
        console.log("moon: ");
        console.dir(data);
        //socket.emit('my other event', {my: 'data'});
      });
    },
    load: function () {

    }
  };
})();
