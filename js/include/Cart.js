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
				countDown = Math.floor(ms / 1000);
				var timer = $interval(function() {
					countDown--;
					if (countDown == 0) {
						$interval.cancel(timer);
						Notification.error("Tiden för din order har gått ut. En ny order skapas nu åt dig.");
						Cart.newOrder(function() {
							$location.path("/");
						});
					}
				}, 1000, 0);
			} else {
				Cart.newOrder(function() {
					$location.path("/");
				});
				Notification.error("Tiden för din order har gått ut. En ny order skapas nu åt dig.");
			}
		}
	}

	function setLocalStorage(id, identifier) {
    var obj = {
			orderId: id,
			orderIdentifier: identifier
		};
		localStorage.setItem("lkticket", JSON.stringify(obj));
	}

	function getLocalStorage() {
		return JSON.parse(localStorage.getItem("lkticket"));
	}

	function clearLocalStorage()  {
		localStorage.removeItem("lkticket");
	}

	function orderExist() {
		if (localStorage.getItem("lkticket") != null) {
			return true;
		} else {
			return false;
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

  function setOrder(ord) {
    console.log("setOrder: ");
    order = ord;
    setLocalStorage(order.id, order.identifier);
    tickets = [];
    startCountdown((order.expires + EXPIRE_DELAY) - Date.now());
  }

	Cart.newOrder = function(callback) {
    console.log("New order");
		Core.get("/newOrder").then(function(response) {

      setOrder(response.data);
			callback();

		}, function(error) {
			console.log(error);
		});
	}

	Cart.loadOrder = function(id, identifier) {
    console.log("loadOrder: " + id);
		Core.get("/order/" + id + "?identifier=" + identifier).then(function(response) {

      setOrder(response.data);

			if (response.data.paid) {
        if (urlPath[1] != "cart") {
          $location.path("/cart/" + id + "/" + identifier);
        }
				clearLocalStorage();
			}

      updateTickets();

		}, function(error) {
			console.log(error);
		});
	}

	var urlPath = $location.path().split('/');

	if (urlPath[1] == "cart") {

    console.log("URL är CART");

		// if (urlPath[2] != getLocalStorage().orderId) {
		// 	Cart.loadOrder(urlPath[2], urlPath[3]);
		// }

	} else if (orderExist()) {
		Cart.loadOrder(getLocalStorage().orderId, getLocalStorage().orderIdentifier);
	}

  function postTicket(ticket) {
    Core.post("/order/" + order.id + "/tickets?identifier=" + order.identifier, ticket).then(function(response) {
      Notification.success("Biljett tillagd i kundvagnen");
      tickets.push(response.data[0]);
    }, function(error) {
      Notification.error("Biljetterna är slut till den valda föreställningen");
      console.log(error);
    });
  }

	Cart.addTicket = function(ticket) {
		if (order) {
      postTicket(ticket);
		} else {
      Cart.newOrder(function() {
        postTicket(ticket);
      });
		}
	}

	Cart.removeTicket = function(ticket) {
		Core.delete("/order/" + order.id + "/tickets/" + ticket + "?identifier=" + order.identifier).then(function(response) {
			tickets.splice(_.indexOf(tickets, _.find(tickets, function(obj) {
				return obj.id == ticket;
			})), 1);
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

	return Cart;
}

console.log("Registering Cart");

module.factory("Cart", CartFactory);
