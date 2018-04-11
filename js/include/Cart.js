var module = angular.module("lkticket.webb");

var CartFactory = function($http, Core, $window, $interval, Notification, $routeParams, $location) {
  var Cart = {};

  var tickets = [];

  var countDown;
  var order;

  const EXPIRE_DELAY = 1200000;

  var startCountdown = function(ms) {

    if (timer) {
      $interval.cancel(timer);
    }

    if (!order.paid) {
      if (ms > 0) {
        countDown = Math.floor(ms/1000);
        var timer = $interval(function() {
          countDown--;
          if (countDown == 0) {
              $interval.cancel(timer);
              Notification.error("Tiden för din order har gått ut. En ny order skapas nu åt dig.");
              Cart.newOrder(function(){
                $location.path("/");
              });
          }
        }, 1000, 0);
      } else {
        Cart.newOrder(function(){
          $location.path("/");
        });
        Notification.error("Tiden för din order har gått ut. En ny order skapas nu åt dig.");
      }
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
      localStorage.orderId = order.id;
      localStorage.orderIdentifier = order.identifier;
      tickets = [];
      startCountdown((order.expires + EXPIRE_DELAY) - Date.now());
      callback(response.data);
    }, function(error) {
      console.log(error);
    });
  }

  Cart.setOrder = function(id, identifier) {
    console.log("Set order");
    if (id != localStorage.orderId && identifier != localStorage.identifier) {
      console.log("Ny order hämtas");
      localStorage.orderId = id;
      localStorage.orderIdentifier = identifier;

      Core.get("/order/" + localStorage.orderId + "?identifier=" + localStorage.orderIdentifier).then(function(response) {
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
    localStorage.orderId = urlPath[2];
    localStorage.orderIdentifier = urlPath[3];
  }

  if (localStorage.orderId) {
    console.log("Det finns en order");
    Core.get("/order/" + localStorage.orderId + "?identifier=" + localStorage.orderIdentifier).then(function(response) {
      order = response.data;
      updateTickets();
      startCountdown((order.expires + EXPIRE_DELAY) - Date.now());

      if (order.paid) {
        $location.path("/cart/" + order.id + "/" + order.identifier);
        localStorage.removeItem("orderId");
        localStorage.removeItem("orderIdentifier");
      }

    }, function(error) {
      localStorage.removeItem("orderId");
      localStorage.removeItem("orderIdentifier");
    });
  }

  Cart.addTicket = function(ticket) {

    console.log(localStorage.orderId);

    if (!localStorage.orderId) {
      Cart.newOrder(function(response){
        Core.post("/order/" + response.id + "/tickets?identifier=" + response.identifier, ticket).then(function(response) {
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
      Notification.success("Biljett borttagen");
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

    console.log("HEJHEJ");

    var totalPrice = 0;

    for (var i = 0; i < tickets.length; i++) {
      totalPrice += tickets[i].price;
    }

    return totalPrice;

  }

  Cart.getOrder = function() {
    return order;
  }

  Cart.pay = function(customer) {

    var body = {
      amount: Cart.getPrice(),
      customer: customer,
    };

    Core.post("/order/" + order.id + "/pay/bambora", body).then(function(response) {
      console.log(response.data);
      $window.location.href = response.data.url;
    }, function(error) {
      console.log(error);
    });
  }

  Cart.reset = function() {
    localStorage.orderId = undefined;
    tickets = [];
    order = null;
  }

  return Cart;
}

console.log("Registering Cart");

module.factory("Cart", CartFactory);
