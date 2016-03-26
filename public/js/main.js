var currentProject;
var AppRouter = Backbone.Router.extend({
  routes: {
    // Order matters:
    "posts/:id": "getPost",
    "exnh": "exnh",
    "*actions": "defaultRoute"
  },
  execute: function(callback, args, name) {
    // ToDo: Implement a "teardown" for these projects canvas elements...
    // This should probably be a fade to black so it's smooth in VR
    console.log("Checking for teardown: " + currentProject);
    if (typeof currentProject !== 'undefined') {
      console.log("Tearing down the last project...");
      window[currentProject].destroy();
    }
    console.log("Loading next project... " + name);
  }
});

var App = (function() {
  return {
    app_router: null,
    config: {},
    initComplete: false,
    initFailed: false,
    init: function() {
      // this.bootRouter();
    },
    bootRouter: function() {
      var that = this;

      // Instantiate the router
      this.app_router = new AppRouter();

      // Routes:
      this.app_router.on('route:exnh', function (actions) {
        console.log('starting man exnh backbone route');

        console.log('exnh stuff goes here.');

        $('.btn').on('click', function() {
          $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/leases.json',
            success: function(data) {
              var parsedData = JSON.parse(data);
              console.log(' lease response: ', parsedData);
            }
          });
        });



      });// end exnh route

      this.app_router.on('route:getPost', function (id) {
        // Note the variable in the route definition being passed in here
        console.log( "Hit the posts/:id endpoint and the id was: " + id );
      });

      this.app_router.on('route:defaultRoute', function (actions) {
        console.log( actions );
        that.app_router.navigate("exnh", {trigger: true, replace: true});
      });

      // Start Backbone history a necessary step for bookmarkable URL's
      Backbone.history.start();
    },
    load: function() {
      Socket.load();
      App.bootRouter();
    }
  };
})();

$(document).ready(function () {
  console.log("Ready...");
  App.init();
});


// ToDo: Rethink setting up this ALL of the time.
// Really, it should only be needed when the CSS needs to be rendered
// before some code runs.
//
// Honestly, it might be fine here... I should probably add a fade in to
// most projects... *shrug*
$(window).load(function () {
  //console.log("and loaded!");
  App.load();
});
