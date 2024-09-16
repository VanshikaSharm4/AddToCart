let ArrProducts = [
    {
        id:1,
        name:"adidas",
        image:"1.PNG",
        price:1000,
        rating: 5
    },
    {
        id:2,
        name:"nike",
        image:"2.PNG",
        price:1500,
        rating: 4
    },
    {
        id:3,
        name:"Bacca Bucci",
        image:"3.PNG",
        price:3000,
        rating: 5
    },
    {
        id:4,
        name:"Loafers",
        image:"4.PNG",
        price:1200,
        rating: 3
    },
    {
        id:5,
        name:"sports Shoes",
        image:"5.PNG",
        price:4000,
        rating: 4.3
    },
    {
        id:6,
        name:"running Shoes",
        image:"6.PNG",
        price:4000,
        rating: 3.4
    },
    

]

const body = document.querySelector("body")
const products = document.querySelector(".products")
const shoppingBasket = document.querySelector(".shoppingBasket")
const closeCart = document.querySelector(".close")
const productList = document.querySelector(".productList")
const quantity = document.querySelector(".quantity")
const total = document.querySelector(".total")
const checkOutList = [];

shoppingBasket.onclick = () => {
    body.classList.add("active")
}
closeCart.onclick = () => {
    body.classList.remove("active")
}

function onInIt(){
    ArrProducts.forEach((item,key) => {
        let div = document.createElement("div");
        div.classList.add("item");

        let star = "";
        for(i=0; i<item.rating; i++){
            star += `<i class="fa fa-star"></i>`
        }

        div.innerHTML = 
        `
            <img src="img/${item.image}" />
            <div class="name">${item.name}</div>
            <div>${star}</div>
            <div class="price"><small>₹<small>${item.price}</div>
            <button onclick="addToCart(${key})"><i class="fa fa-cart-plus"></i>Add to Cart</button>
        `;
        products.appendChild(div);
    })
}
onInIt();

function addToCart(Id){

    if(checkOutList[Id] == null ){
        checkOutList[Id] = ArrProducts[Id]
        checkOutList[Id].quantity = 1;
    }else {
        checkOutList[Id].quantity +=1;
    }
    reloadCart()
}

function reloadCart(){
    productList.innerHTML = "";

    let count = 0
    let totalPrice = 0

    checkOutList.forEach((item,key)=>{

        totalPrice+=parseInt(item.price*item.quantity)
        count += item.quantity

        let li = document.createElement("li")
        li.innerHTML = `
            <img src="img/${item.image}">
            <div>${item.name}</div>
            <div >${item.price}</div>
            <div>
            <button onclick="changeQuantity(${key}, ${item.quantity-1})">-</button>
            <div class="count">${item.quantity}</div>
            <button onclick="changeQuantity(${key}, ${item.quantity+1})">+</button>
            </div>
        `

        productList.appendChild(li);
    })

    total.innerHTML = `
         <small>Subtotal (${count}items) ₹</small>` + totalPrice;
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete checkOutList[key]
    }
    else{
        checkOutList[key].quantity = quantity
    }
    reloadCart();
}