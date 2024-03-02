window.onload = function() {
    console.log('page loaded');
    fetch('/getProducts')
    .then (res => res.json())
            .then(data => {
                console.log(data);
                let productsFromDb = ``;
                data.forEach(product => {

                    productsFromDb += `<div id="${product.name}" onclick="addProduct(${product.productPrice})" style="height: 20px; width: 100px; border: 1.5px solid black;"> ${product.productName} ${product.productPrice}</div>`
                   
                });

                let div = document.getElementById('products')
            
                div.innerHTML = productsFromDb

});

}
let totalProducts = 0
let totalPrice = 0

const addProduct = (productPrice) => {
 
    totalProducts +=1
    totalPrice += productPrice
 console.log(totalPrice);
 console.log(totalProducts);
}

const buy = () => {
    localStorage.setItem('totalProducts', totalProducts)
    localStorage.setItem('totalPrice', totalPrice)
    window.location.href = '/buy';
}
