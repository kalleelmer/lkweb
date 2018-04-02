var module = angular.module("lkticket.webb");

var CartFactory = function($http, Core, $window, $interval, Notification, $routeParams, $location) {
  var Cart = {};

  var tickets = [];

  var countDown;
  var order;

  var startCountdown = function(ms) {

    if (!order.paid) {
      countDown = Math.floor(ms/1000);
      var timer = $interval(function() {
        countDown--;
        if (countDown == 0) {
            $interval.cancel(timer);
        }
      }, 1000, 0);
    }
  }

  Cart.timeLeft = function() {
    return countDown;
  }

  var updateTickets = function() {
    Core.get("/order/" + order.id + "/tickets?identifier=" + order.identifier).then(function(response) {
      tickets = response.data;
    }, function(error) {
      console.log(error);
    });
  }

  Cart.newOrder = function(callback) {
    Core.get("/newOrder").then(function(response) {
      order = response.data;
      sessionStorage.orderId = order.id;
      sessionStorage.orderIdentifier = order.identifier;
      startCountdown(order.expires - Date.now());
      callback(response.data);
    }, function(error) {
      console.log(error);
    });
  }

  Cart.setOrder = function(id, identifier) {
    console.log("Set order");
    if (id != sessionStorage.orderId && identifier != sessionStorage.identifier) {
      console.log("Ny order hämtas");
      sessionStorage.orderId = id;
      sessionStorage.orderIdentifier = identifier;

      Core.get("/order/" + sessionStorage.orderId + "?identifier=" + sessionStorage.orderIdentifier).then(function(response) {
        order = response.data;
        updateTickets();
        startCountdown(order.expires - Date.now());
      }, function(error) {
        console.log(error);
      });
    } else {
      console.log("Ny order hämtas ej");
    }
  }

  var urlPath = $location.path().split('/');

  if (urlPath[1] == "cart") {
    sessionStorage.orderId = urlPath[2];
    sessionStorage.orderIdentifier = urlPath[3];
  }

  if (sessionStorage.orderId) {
    Core.get("/order/" + sessionStorage.orderId + "?identifier=" + sessionStorage.orderIdentifier).then(function(response) {
      order = response.data;
      updateTickets();
      startCountdown(order.expires - Date.now());
    }, function(error) {
      sessionStorage.orderid = null;
      sessionStorage.orderIdentifier = null;
    });
  }

  Cart.addTicket = function(ticket) {

    if (!sessionStorage.orderId) {
      Cart.newOrder(function(order){
        console.log(order);
        Core.post("/order/" + order.id + "/tickets?identifier=" + order.identifier, ticket).then(function(response) {
          Notification.success("Biljett tillagd i kundvagnen");
          tickets.push(response.data[0]);
        }, function(error) {
          Notification.error("Biljetterna är slut till den valda föreställningen");
          console.log(error);
        });
      });
    } else {
      Core.post("/order/" + order.id + "/tickets?identifier=" + order.identifier, ticket).then(function(response) {
        tickets.push(response.data[0]);
        Notification.success("Biljett tillagd i kundvagnen");
      }, function(error) {
        Notification.error("Biljetterna är slut till den valda föreställningen");
        console.log(error);
      });
    }
  }

  Cart.removeTicket = function(ticket) {
    Core.delete("/order/" + order.id + "/tickets/" + ticket + "?identifier=" + order.identifier).then(function(response) {
      tickets.splice(_.indexOf(tickets, _.find(tickets, function (obj) { return obj.id == ticket; })), 1);
    }, function(error) {
      alert("Biljetterna är slut");
      console.log(error);
    });
  }

  Cart.getTickets = function() {
    return tickets;
  }

  Cart.getOrder = function() {
    return order;
  }

  Cart.getPrice = function() {

    if (!sessionStorage.orderId) {
      return 0;
    }

    var totalPrice = 0;

    for (var i = 0; i < tickets.length; i++) {
      totalPrice += tickets[i].price;
    }

    return totalPrice;

  }

  Cart.getOrder = function() {
    return order;
  }

  Cart.pay = function() {

    var body = {
      amount: Cart.getPrice()
    };

    Core.post("/order/" + order.id + "/pay/bambora", body).then(function(response) {
      console.log(response.data);
      $window.location.href = response.data.url;
    }, function(error) {
      console.log(error);
    });
  }

  Cart.reset = function() {
    sessionStorage.orderId = undefined;
    tickets = null;
    order = null;
  }

  return Cart;
}

console.log("Registering Cart");

module.factory("Cart", CartFactory);
