const productsContainer = document.getElementsByClassName('products-container')[0]
let cartContainer = document.getElementsByClassName('cart-list')[0]
const finalBtn = document.getElementById('final-button')

const productsList = [
    {
        id: 1,
        name: 'Adidas Ozweego Preto',
        price: 0.0018,
        pic: '../img/products/ozweego-pb.jpg',
    },
    {
        id: 2,
        name: 'Adidas Ozweego Branco',
        price: 0.0018,
        pic: '../img/products/ozweego-b.jpg',
    },
    {
        id: 3,
        name: 'Adidas Ozweego Flipshield',
        price: 0.0016,
        pic: '../img/products/flipshield.png',
    },
    {
        id: 4,
        name: 'Oakley Flak 365 Preto',
        price: 0.0022,
        pic: '../img/products/flak-365.jpg',
    },
    {
        id: 5,
        name: 'Nike Air Max 97 Branco',
        price: 0.0027,
        pic: '../img/products/airmax-97.jpg',
    },
]

productsList.map((el, i) => {
    let price = String(el.price).replace('.', ',')

    productsContainer.innerHTML += `
    <div class="product-box">
        <div style="background-image: url(${el.pic});" class="product-image"></div>
        <div class="product-info">
            <div class="info">
                <p>${el.name}</p>
                <p>BTC ${price}</p>
            </div>
            <div class="add-button" onclick="addCart(${el.id})"></div>
        </div>
    </div>
    `
})

const totalAmount = document.getElementById('total-amount')

function updateAmount() {
    // console.table(cart)
    let total = 0
    for (var x = 0;x < cart.length;x++) {
        total += cart[x].price * cart[x].quantity
    }

    totalAmount.innerText = total.toFixed(5)
}

let cart = []

function addCart(id) {
    cartContainer.style.display = 'block'
    if (cart.filter(el => el.id == id).length == 0) { // Se nao tiver no carrinho
        let productInfo = productsList.filter(el => el.id == id)
        cart.push({...productInfo[0], quantity: 1})
        updateCart()
        updateAmount()
    } else { // Se tiver no carrinho
        let x = cart.findIndex(el => el.id == id)
        cart[x].quantity++
        updateCart()
        updateAmount()
    }
    // console.table(cart)
}

function updateCart() {
    let cartList = document.getElementsByClassName('cart-list')[0]

    let structure = ''

    for (var x = 0;x < cart.length;x++) {
        let price = String(cart[x].price).replace('.', ',')

        structure += `
        <div class="cart-item">
            <p>${cart[x].name}</p>
            <p>Quantidade: ${cart[x].quantity}</p>
            <p>Valor unitário: BTC ${price}</p>
            <img onclick="deleteProduct(${cart[x].id})" alt="delete" src="./img/delete.png" />
        </div>
        `
    }

    cartList.innerHTML = structure
}

function deleteProduct(id) {
    let x = cart.findIndex(el => el.id == id)
    cart.splice(x, 1)
    updateCart()
    updateAmount()
    if (cart.length == 0) {
        cartContainer.style.display = 'none'
    }
}

// SNACKBAR -----------------------------------------------
let snack = document.getElementById('snackbar')
let snackText = document.getElementById('snackbar-text')

function openSnack(type) {
    if (type == "error"){
        snack.style.visibility = 'visible'
        snack.style.animation = 'fadein 1s, fadeout 1s 2s'
        snack.style.background = 'var(--error-color)'
        snackText.innerText = 'Escolha pelo menos um item!'
        // setTimeout(() => {snack.style.visibility = 'hidden'}, 2700)
    } else if (type == "success") {
        snack.style.visibility = 'visible'
        snack.style.animation = 'fadein 1s, fadeout 1s 2s'
        snack.style.background = 'var(--success-color)'
        snackText.innerText = 'Compra efetuada com sucesso!'
    }
}

// FINALIZAR COMPRA ---------------------------------------
finalBtn.addEventListener('click', () => {
    openSnack()
    if (cart.length == 0) {
        openSnack("error")
    } else {
        openSnack("success")
    }
})