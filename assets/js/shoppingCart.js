let shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count, image, days, max) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.image = image;
    this.days = days;
    this.max = max;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  let obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, image, count, days, max) {
    for(let item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count, image, days, max);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
    saveCart();
  };
  // Set days from item
  obj.setDaysForItem = function(name, days) {
    for(let i in cart) {
      if (cart[i].name === name) {
        cart[i].days = days;
        break;
      }
    }
    saveCart();
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(let item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    let totalCount = 0;
    for(let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    let totalCart = 0;
    for(let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  obj.totalCartDays = function() {
    let totalCartDays = 0;
    for(let item in cart) {
      let totalDaysCalc = Number(cart[item].price * cart[item].count * cart[item].days);
      if (cart[item].days < 3 || item.name != "Coffee and Water Pack (Full Day)") {      
        totalDaysCalc = totalDaysCalc
      }           
      else if (cart[item].days >= 3 && cart[item].days < 7 && item.name != "Coffee and Water Pack (Full Day)") {
          if (item.name == "Coffee and Water Pack (Full Day)" || item.name == "Coffee and Water Pack (Half Day)") {
            discountPrice = 0;
          } else {
            discountPrice = .25;
          }
          totalDaysCalc = totalDaysCalc - (totalDaysCalc * discountPrice);
      }
      else if (cart[item].days >= 7 && item.name != "Coffee and Water Pack (Full Day)") {
        if (item.name == "Coffee and Water Pack (Full Day)" || item.name == "Coffee and Water Pack (Half Day)") {
          discountPrice = 0;
        } else {
          discountPrice = .35;
        }
          totalDaysCalc = totalDaysCalc - (totalDaysCalc * discountPrice); 
      }
      totalCartDays += totalDaysCalc
    }
    return Number(totalCartDays.toFixed(2));
  }


  // List cart
  obj.listCart = function() {
    let cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      let totalDaysCalc = Number(item.price * item.count * item.days);
      if (item.days < 3) {      
        itemCopy.totalDays = Number(totalDaysCalc.toFixed(2));
      }           
      else if (item.days >= 3 && item.days < 7) {
          if (item.name == "Coffee and Water Pack (Full Day)" || item.name == "Coffee and Water Pack (Half Day)") {
            discountPrice = 0;
          } else {
            discountPrice = .25;
          }
          
          totalDaysCalc = totalDaysCalc - (totalDaysCalc * discountPrice);
          itemCopy.totalDays = Number(totalDaysCalc.toFixed(2));
      }
      else if (item.days >= 7) {
        if (item.name == "Coffee and Water Pack (Full Day)" || item.name == "Coffee and Water Pack (Half Day)") {
          discountPrice = 0;
        } else {
          discountPrice = .35;
        }
          totalDaysCalc = totalDaysCalc - (totalDaysCalc * discountPrice); 
          itemCopy.totalDays = Number(totalDaysCalc.toFixed(2)); 
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Functio
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  let name = $(this).data('name');
  let price = Number($(this).data('price'));
  let image = $(this).data('image');
  let count = Number($(this).data('count'));
  let max = Number($(this).data('max')); 
  shoppingCart.addItemToCart(name, price, image, count, 1, max);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});



function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  for(let i in cartArray) {
    output += "<div class='d-flex align-items-center py-3 border-bottom border-dark'>"
      + "<img class='cart-img pe-3' src='" + cartArray[i].image + "'>"
      + "<div class='w-100'>"
      + "<div class='d-flex justify-content-between align-items-start'>"
      + "<div class='mb-2'>" + cartArray[i].name + "</div>" 
      + "<div><button class='delete-item' data-name='" + cartArray[i].name + "'><i class='ri-delete-bin-2-fill'></i></button></div>"
      + "</div>"
      + "<div class='cart-grid justify-content-between align-items-baseline'>"
      if (cartArray[i].price > 0) {
      + "<div>" + cartArray[i].price + "€/<span class='eng'>DAY</span><span class='pt'>DIA</span></div>"
      } else {
      + "<div><span class='eng'>TBD</span><span class='pt'>TBD</span></div>"
      }
      + "<div>QTY: <input type='number' class='item-count qty-input' data-name='" + cartArray[i].name + "' min='1' max='" + cartArray[i].max + "' value='" + cartArray[i].count + "'></div>"
      + "<div><span class='eng'>DAYS:</span><span class='pt'>DIAS: </span><input type='number' class='days-count qty-input' min='1' data-name='" + cartArray[i].name + "' value='" + cartArray[i].days + "'></div>"
      + "<div class='days-total-price'>"+ cartArray[i].totalDays +" €</span></div>" 
      + "</div>"
      + "</div>"
      + "</div>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCartDays() + "  €");
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})

// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
  let name = $(this).data('name');
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  if ($(this).val() < 1) {
    shoppingCart.removeItemFromCart(name);
  }
  displayCart();
});

$('.show-cart').on("change", ".days-count", function(event) {
  let name = $(this).data('name');
  let days = Number($(this).val());
  shoppingCart.setDaysForItem(name, days);
  displayCart();
});


displayCart();
