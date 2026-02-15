$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    var Price = parseFloat($(ele).children('.price').children('input').val());
    var Quantity = parseFloat($(ele).children('.quantity').children('input').val());

    var totalPrice = Price * Quantity;
  });
});

var sum = function (acc, x) { return acc + x; };

//update subtotal
var updatesubTotal = function (ele) {
  var Price = parseFloat($(ele).find('.price input').val()) || 0;
  var Quantity = parseFloat($(ele).find('.quantity input').val()) || 0;

  var subtotal = Price * Quantity;
  $(ele).find('.subtotal').html(subtotal);

  return subtotal;
};

var updateQuantity = function (ele) {
  var Quantity = parseFloat($(ele).find('.quantity input').val()) || 0;
  return Quantity;
};

$(document).ready(function () {
  $('tbody tr').each(function (i, ele) {
    var subtotal = updatesubTotal(ele);
    var totalQuantity = updateQuantity(ele);
  });
});

var updateTotalPrice = function () {
  var cartPrice = [];

  $('tbody tr').each(function (i, ele) {
    var Price = parseFloat($(ele).find('.price input').val()) || 0;
    cartPrice.push(Price);
  });

  var totalPrice = cartPrice.reduce(sum, 0);
  $('#updatetotalPrice').html(totalPrice);
};

var updateCart = function () {
  var totalPrice = [];
  var totalQty = [];

  $('tbody tr').each(function (i, ele) {
    totalPrice.push(updatesubTotal(ele));
    totalQty.push(updateQuantity(ele));
  });

  var shoppingTotalPrice = totalPrice.reduce(sum, 0);
  var shoppingTotalQty = totalQty.reduce(sum, 0);

  $('#totalPrice').html(shoppingTotalPrice);
  $('#totalQty').html(shoppingTotalQty);

  updateTotalPrice();
};

$(document).ready(function () {
  updateCart();

  $(document).on('input', 'tbody .price input, tbody .quantity input', function () {
    updateCart();
  });

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateCart();
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();

    var name = $(this).children('[name=name]').val();
    var quantity = $(this).children('[name=quantity]').val();
    var price = $(this).children('[name=price]').val();

    $('tbody').append(
      '<tr>' +
        '<td class="name">' + name + '</td>' +
        '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
        '<td class="price"><input type="number" value="' + price + '" /></td>' +
        '<td class="subtotal"></td>' +
        '<td><button class="btn remove">Remove</button></td>' +
      '</tr>'
    );

    updateCart();
  });
});
