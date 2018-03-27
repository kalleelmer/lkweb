var module = angular.module("lkticket.webb");

var CartFactory = function($http, Core, $window) {
  var Cart = {};

  var tickets = [];
  var order;

  var updateTickets = function() {
    Core.get("/order/" + order.id + "/tickets").then(function(response) {
      tickets = response.data;

    }, function(error) {
      console.log(error);
    });
  }

  Cart.newOrder = function() {
    Core.get("/order/create").then(function(response) {
      order = response.data;
      sessionStorage.orderId = response.data.id;
    }, function(error) {
      console.log(error);
    });
  }

  if (sessionStorage.orderId) {
    Core.get("/order/" + sessionStorage.orderId).then(function(response) {
      order = response.data;
      updateTickets();
    }, function(error) {
      console.log(error);
    });
  }

  Cart.addTicket = function(ticket) {

    if (!sessionStorage.orderId) {
      Core.get("/order/create").then(function(response) {
        order = response.data;
        sessionStorage.orderId = response.data.id;
        Cart.addTicket(ticket);
      }, function(error) {
        console.log(error);
      });
    }

    Core.post("/order/" + order.id + "/tickets", ticket).then(function(response) {
      tickets.push(response.data[0]);
    }, function(error) {
      alert("Biljetterna är slut");
      console.log(error);
    });
  }

  Cart.removeTicket = function() {
    // TODO: kunna ta bort biljetter
  }

  Cart.getTickets = function() {
    return tickets;
  }

  Cart.getPrice = function() {

    if (!order) {
      return 500;
    }

    var totalPrice = 0;

    for (var i = 0; i < tickets.length; i++) {
      totalPrice+= tickets[i].price;
    }

    return totalPrice;

  }

  Cart.pay = function() {

    var body = {amount: Cart.getPrice()};

    Core.post("/order/" + sessionStorage.orderId + "/pay/bambora", body).then(function(response) {
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
