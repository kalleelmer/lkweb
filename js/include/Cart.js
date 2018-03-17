var module = angular.module("lkticket.webb");

var CartFactory = function($http, Core) {
	var Cart = {};

  var tickets = [];
  var order = {};

  var updateTickets = function() {
    Core.get("/order/" + order.id + "/tickets").then(function(response) {
      tickets = response.data;
    }, function(error) {
      console.log(error);
    });
  }

  if(sessionStorage.orderId){
    Core.get("/order/" + sessionStorage.orderId).then(function(response) {
      order = response.data;
      updateTickets();
    }, function(error) {
      console.log(error);
    });
  } else {
    Core.get("/order/create").then(function(response) {
      order = response.data;
      sessionStorage.orderId = response.data.id;
      updateTickets();
    }, function(error) {
      console.log(error);
    });
  }

  Cart.addTicket = function(ticket) {

    // var ticket = {
    //   category_id : ticket.category_id,
    //   performance_id : ticket.performance.id,
    //   rate_id : ticket.rate_id,
    //   count : parseInt(ticket.count),
    //   profile_id : User.profileID()
    // }

    Core.post("/order/" + order.id + "/tickets", ticket).then(function(response) {
      tickets.push(response.data);
    }, function(error) {
      console.log(error);
    });

    tickets.push(ticket);
  }

  Cart.removeTicket = function() {
    // TODO: kunna ta bort biljetter
  }

  Cart.getTickets = function() {
    return tickets;
  }

	return Cart;
}

console.log("Registering Cart");

module.factory("Cart", CartFactory);
