// document.getElementById("cart-info").addEventListener("click", function() {
//   const cart = document.getElementById("cart");
//   cart.classList.toggle("show-cart");
//   console.log(cart);
// });


// show cart
// declaration of immidiatly invoked function expression

(function() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');


  cartInfo.addEventListener('click', function() {
    cart.classList.toggle('show-cart');
  })
})();


// add items to the cart
(function() {
  const cartBtn = document.querySelectorAll('.store-item-icon');

  // looping through all the cart icons on the images
  cartBtn.forEach(function(btn){
    btn.addEventListener('click', function(event){
      // console.log(event.target);
      if(event.target.parentElement.classList.contains('store-item-icon')){
        // below console.log is used to get to the source of the image
        // console.log(event.target.parentElement.previousElementSibling.src);

        let fullPath = event.target.parentElement.previousElementSibling.src;
        // the method indexOf will help find the position of the image
        let pos = fullPath.indexOf('img') + 3;
        // console.log(pos);
        // if we use fullPath.indexOf('img'); we obtain img/cake-2.jpeg
        // if we use fullPath.indexOf('img') + 3; we obtain /cake-2.jpeg
        // we want the second because we are trying to get to the index of the image
        

        let partialPath = fullPath.slice(pos);
        console.log(partialPath);


        const item = {};
        item.img = `img-cart${partialPath}`;


        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;
        // console.log(name);
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        // item.price = price;
        // console.log(price);
        let finalPrice = price.slice(1).trim();
        // console.log(finalPrice);
        item.price = finalPrice;

        // console.log(item);


        const cartItem = document.createElement('div');
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3');

        cartItem.innerHTML = `
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
          </div>
          <a href="#" id="cart-item-remove" class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        </div>        
        `;

        // select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');

        cart.insertBefore(cartItem, total);
        alert('item added to the cart');
        showTotal();
      }
    });   
  })


// show totals
function showTotal(){

  const total = [];
  const items = document.querySelectorAll('.cart-item-price');

  items.forEach(function(item) {
    // we need to deal with numbers only to add to the total
    // and if we use "total.push(item.textContent);" 
    // the result will be strings "Array(5) [ "10.99", "10.99", "5", "5", "10" ]"
    // total.push(item.textContent);

    // THEREFORE we only want number and the correct function is:
    total.push(parseFloat(item.textContent)); 
  });
  // console.log(total);

  const totalMoney = total.reduce(function(total, item) {
    total = total + item;
    return total;
  }, 0) 

  // the methos toFixed : need to establish how many digits after the decimal point
  const finalMoney = totalMoney.toFixed(0);
  // console.log(finalMoney);

  document.getElementById('cart-total').textContent = finalMoney;
  document.querySelector('.item-total').textContent = finalMoney;
  document.getElementById('item-count').textContent = total.length;
}

})();