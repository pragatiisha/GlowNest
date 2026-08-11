/*
                    GLOWNEST
                    MAIN JAVASCRIPT
===================================================== */


/* =====================================================
                    CART
===================================================== */

let cart = [];


/* Elements */

const cartCount =
    document.getElementById("cartCount");

const cartIcon =
    document.getElementById("cartIcon");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");



/* =====================================================
                ADD TO CART BUTTONS
===================================================== */

const cartButtons =
    document.querySelectorAll(".cart-btn");


cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard =
            button.closest(".product-card");


        if (!productCard) {
            return;
        }


        const productName =
            productCard.getAttribute("data-product");


        const productPrice =
            Number(
                productCard.getAttribute("data-price")
            );


        /*
            Check if product already exists
        */

        const existingProduct =
            cart.find(function(item) {

                return item.name === productName;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                quantity: 1

            });

        }


        updateCart();


        /*
            Button feedback
        */

        const originalText =
            button.innerHTML;


        button.innerHTML =
            '<i class="bi bi-check-lg"></i> Added!';


        button.classList.add("added");


        setTimeout(function() {

            button.innerHTML =
                originalText;

            button.classList.remove("added");

        }, 1000);


        /*
            Automatically open cart
        */

        openCart();

    });

});



/* =====================================================
                    UPDATE CART
===================================================== */

function updateCart() {

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    /*
        Update cart count
    */

    cartCount.textContent =
        totalItems;


    /*
        Update total
    */

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    /*
        Empty cart
    */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-bag"></i>

                <p>
                    Your cart is empty.
                </p>

                <span>
                    Add something beautiful!
                </span>

            </div>

        `;

        return;

    }


    /*
        Display products
    */

    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {

        let image =
            getProductImage(item.name);


        const itemHTML = `

            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${image}"
                        alt="${item.name}">

                </div>


                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>


                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;


        cartItems.innerHTML += itemHTML;

    });

}



/* =====================================================
                    PRODUCT IMAGE
===================================================== */

function getProductImage(productName) {

    if (
        productName === "Glow Boost Serum"
    ) {

        return "serum.png";

    }


    if (
        productName === "Rosy Glow Lip Tint"
    ) {

        return "blush.png";

    }


    if (
        productName === "P.G. Rosé Eau de Parfum"
    ) {

        return "perfume.png";

    }


    if (
        productName === "Vanilla Crème Mousse"
    ) {

        return "lotion.png";

    }


    /*
        Hydra Glow Cream has no separate
        image, so use serum image as fallback.
    */

    return "serum.png";

}



/* =====================================================
                INCREASE QUANTITY
===================================================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}



/* =====================================================
                DECREASE QUANTITY
===================================================== */

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}



/* =====================================================
                    REMOVE ITEM
===================================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}



/* =====================================================
                    OPEN CART
===================================================== */

function openCart() {

    cartOverlay.classList.add("active");

}



/* =====================================================
                    CLOSE CART
===================================================== */

function closeCartModal() {

    cartOverlay.classList.remove("active");

}


cartIcon.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartModal
);


/*
    Click outside cart
*/

cartOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === cartOverlay
        ) {

            closeCartModal();

        }

    }
);



/* =====================================================
                    CHECKOUT
===================================================== */

checkoutBtn.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        let total = 0;


        cart.forEach(function(item) {

            total +=
                item.price * item.quantity;

        });


        alert(

            "Thank you for shopping with GlowNest! 💗\n\n" +

            "Your total is ₹" +

            total.toLocaleString("en-IN") +

            "\n\nCheckout feature coming soon!"

        );

    }
);



/* =====================================================
                    WISHLIST
===================================================== */

const heartButtons =
    document.querySelectorAll(".heart-btn");


heartButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            button.classList.toggle("liked");


            if (
                button.classList.contains("liked")
            ) {

                button.innerHTML = "♥";

            } else {

                button.innerHTML = "♡";

            }

        }
    );

});



/* =====================================================
                    WISHLIST ICON
===================================================== */

const wishlistIcon =
    document.getElementById("wishlistIcon");


wishlistIcon.addEventListener(
    "click",
    function() {

        const likedProducts =
            document.querySelectorAll(
                ".heart-btn.liked"
            ).length;


        if (likedProducts === 0) {

            alert(
                "Your wishlist is empty."
            );

        } else {

            alert(
                "You have " +
                likedProducts +
                " favourite product(s)! 💗"
            );

        }

    }
);



/* =====================================================
                    SEARCH
===================================================== */

const searchIcon =
    document.getElementById("searchIcon");


searchIcon.addEventListener(
    "click",
    function() {

        const searchTerm =
            prompt(
                "What are you looking for?"
            );


        if (!searchTerm) {
            return;
        }


        const term =
            searchTerm.toLowerCase().trim();


        const productCards =
            document.querySelectorAll(
                ".product-card"
            );


        let found = false;


        productCards.forEach(
            function(card) {

                const text =
                    card.innerText.toLowerCase();


                if (
                    text.includes(term)
                ) {

                    card.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });


                    found = true;

                }

            }
        );


        if (!found) {

            alert(
                "Sorry! We couldn't find that product."
            );

        }

    }
);



/* =====================================================
                CATEGORY LINKS
===================================================== */

const categoryLinks =
    document.querySelectorAll(
        ".category-card a"
    );


categoryLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const productsSection =
                document.getElementById(
                    "products"
                );


            productsSection.scrollIntoView({

                behavior: "smooth"

            });

        }
    );

});



/* =====================================================
                    NAVBAR
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const href =
                link.getAttribute("href");


            if (
                href &&
                href.startsWith("#")
            ) {

                event.preventDefault();


                const section =
                    document.querySelector(
                        href
                    );


                if (section) {

                    section.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            }

        }
    );

});



/* =====================================================
                    GLOWBOT
===================================================== */

const chatbotButton =
    document.getElementById(
        "chatbotButton"
    );


const chatbot =
    document.getElementById(
        "chatbot"
    );


const closeChat =
    document.getElementById(
        "closeChat"
    );


const chatMessages =
    document.getElementById(
        "chatMessages"
    );


const chatInput =
    document.getElementById(
        "chatInput"
    );


const sendMessage =
    document.getElementById(
        "sendMessage"
    );



/* =====================================================
                    OPEN GLOWBOT
===================================================== */

chatbotButton.addEventListener(
    "click",
    function() {

        chatbot.classList.add(
            "active"
        );

        chatInput.focus();

    }
);



/* =====================================================
                    CLOSE GLOWBOT
===================================================== */

closeChat.addEventListener(
    "click",
    function() {

        chatbot.classList.remove(
            "active"
        );

    }
);



/* =====================================================
                ADD USER MESSAGE
===================================================== */

function addUserMessage(message) {

    const div =
        document.createElement("div");


    div.className =
        "user-message";


    div.innerHTML =
        message;


    chatMessages.appendChild(div);


    scrollChat();

}



/* =====================================================
                ADD BOT MESSAGE
===================================================== */

function addBotMessage(message) {

    const div =
        document.createElement("div");


    div.className =
        "bot-message";


    div.innerHTML =
        message;


    chatMessages.appendChild(div);


    scrollChat();

}



/* =====================================================
                    CHAT SCROLL
===================================================== */

function scrollChat() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



/* =====================================================
                    PRODUCTS
===================================================== */

const botProducts = {

    serum: {

        name:
            "Glow Boost Serum",

        price:
            799,

        image:
            "serum.png"

    },


    cream: {

        name:
            "Hydra Glow Cream",

        price:
            649,

        image:
            "serum.png"

    },


    blush: {

        name:
            "Rosy Glow Lip Tint",

        price:
            499,

        image:
            "blush.png"

    },


    perfume: {

        name:
            "P.G. Rosé Eau de Parfum",

        price:
            1199,

        image:
            "perfume.png"

    },


    body: {

        name:
            "Vanilla Crème Mousse",

        price:
            649,

        image:
            "lotion.png"

    }

};



/* =====================================================
                CHAT PRODUCT CARD
===================================================== */

function recommendProduct(type) {

    const product =
        botProducts[type];


    if (!product) {
        return;
    }


    const productHTML = `

        <div class="chat-product">

            <div class="chat-product-icon">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>


            <div>

                <strong>
                    ${product.name}
                </strong>

                <br>

                <span>
                    ₹${product.price}
                </span>

            </div>

        </div>


        <button
            class="chat-add-btn"
            onclick="chatAddProduct('${product.name}', ${product.price})">

            <i class="bi bi-bag-plus"></i>

            Add to Cart

        </button>

    `;


    addBotMessage(productHTML);

}



/* =====================================================
                ADD CHAT PRODUCT TO CART
===================================================== */

function chatAddProduct(
    productName,
    productPrice
) {

    const existingProduct =
        cart.find(function(item) {

            return item.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name:
                productName,

            price:
                productPrice,

            quantity:
                1

        });

    }


    updateCart();


    addBotMessage(

        "Yayy! 💗 <strong>" +
        productName +
        "</strong> has been added to your cart!"

    );


    /*
        Open cart
    */

    setTimeout(function() {

        openCart();

    }, 300);

}



/* =====================================================
                GLOWBOT RESPONSE
===================================================== */

function getBotResponse(message) {

    const text =
        message.toLowerCase().trim();


    /* GREETING */

    if (
        text.includes("hi") ||
        text.includes("hello") ||
        text.includes("hey")
    ) {

        return {

            text: `
                Hey beauty! 💗

                <br><br>

                I'm <strong>GlowBot</strong>,
                your GlowNest skincare assistant.

                <br><br>

                Ask me about
                <strong>dry skin, oily skin,
                acne, glowing skin,
                serums or routines.</strong>
            `,

            product: null

        };

    }



    /* DRY SKIN */

    if (
        text.includes("dry skin") ||
        text.includes("dry") ||
        text.includes("flaky") ||
        text.includes("dehydrated")
    ) {

        return {

            text: `
                For dry or dehydrated skin,
                focus on gentle hydration.

                <br><br>

                A hydrating serum followed by
                moisturizer can be a simple
                addition to your routine. 💧
            `,

            product: "cream"

        };

    }



    /* OILY SKIN */

    if (
        text.includes("oily skin") ||
        text.includes("oily")
    ) {

        return {

            text: `
                For oily skin, keep your routine
                lightweight and simple.

                <br><br>

                Avoid using too many heavy products
                and choose lightweight textures.
            `,

            product: "serum"

        };

    }



    /* ACNE */

    if (
        text.includes("acne") ||
        text.includes("pimple") ||
        text.includes("pimples") ||
        text.includes("breakout")
    ) {

        return {

            text: `
                For acne-prone skin, keep your routine
                gentle and avoid picking at breakouts.

                <br><br>

                Introduce new products gradually.

                <br><br>

                If acne is persistent or severe,
                consider speaking with a dermatologist.
            `,

            product: null

        };

    }



    /* DULL SKIN */

    if (
        text.includes("dull") ||
        text.includes("glow") ||
        text.includes("glowing")
    ) {

        return {

            text: `
                For dull-looking skin, focus on
                hydration and a consistent routine. ✨

                <br><br>

                Our Glow Boost Serum is a
                GlowNest favourite for a
                fresh radiant-looking glow.
            `,

            product: "serum"

        };

    }



    /* SERUM */

    if (
        text.includes("serum")
    ) {

        return {

            text: `
                If you're looking for a simple
                glow-focused product, our
                Glow Boost Serum is a lovely
                GlowNest pick. ✨
            `,

            product: "serum"

        };

    }



    /* MOISTURIZER */

    if (
        text.includes("moisturizer") ||
        text.includes("moisturiser") ||
        text.includes("cream")
    ) {

        return {

            text: `
                Moisturizer helps support your
                skin's hydration and comfort.

                <br><br>

                For a hydrating option,
                try our Hydra Glow Cream. 💧
            `,

            product: "cream"

        };

    }



    /* BODY CARE */

    if (
        text.includes("body") ||
        text.includes("lotion") ||
        text.includes("vanilla")
    ) {

        return {

            text: `
                Looking for a soft, sweet
                body-care treat? 🍦

                <br><br>

                Our Vanilla Crème Mousse
                is a GlowNest body-care favourite.
            `,

            product: "body"

        };

    }



    /* PERFUME */

    if (
        text.includes("perfume") ||
        text.includes("fragrance") ||
        text.includes("scent")
    ) {

        return {

            text: `
                Want a signature scent? 🌸

                <br><br>

                Try our P.G. Rosé Eau de Parfum
                for a feminine fragrance pick.
            `,

            product: "perfume"

        };

    }



    /* MORNING ROUTINE */

    if (
        text.includes("morning") ||
        text.includes("morning routine")
    ) {

        return {

            text: `
                ☀️ <strong>Simple Morning Routine</strong>

                <br><br>

                1. Gentle cleanser
                <br>
                2. Serum
                <br>
                3. Moisturizer
                <br>
                4. Sunscreen

                <br><br>

                Keep it simple and consistent.
            `,

            product: null

        };

    }



    /* NIGHT ROUTINE */

    if (
        text.includes("night") ||
        text.includes("night routine")
    ) {

        return {

            text: `
                🌙 <strong>Simple Night Routine</strong>

                <br><br>

                1. Cleanser
                <br>
                2. Serum
                <br>
                3. Moisturizer

                <br><br>

                Keep your routine gentle
                and consistent.
            `,

            product: null

        };

    }



    /* DEFAULT */

    return {

        text: `
            I'm still learning! 💗

            <br><br>

            Try asking me about:

            <br>

            • Dry skin
            <br>
            • Oily skin
            <br>
            • Acne
            <br>
            • Glowing skin
            <br>
            • Serum
            <br>
            • Moisturizer
            <br>
            • Morning routine
            <br>
            • Night routine
            <br>
            • Body care
            <br>
            • Fragrance
        `,

        product: null

    };

}



/* =====================================================
                PROCESS BOT RESPONSE
===================================================== */

function processBotResponse(message) {

    const response =
        getBotResponse(message);


    addBotMessage(
        response.text
    );


    if (
        response.product
    ) {

        setTimeout(function() {

            recommendProduct(
                response.product
            );

        }, 300);

    }

}



/* =====================================================
                    SEND MESSAGE
===================================================== */

function sendChatMessage() {

    const message =
        chatInput.value.trim();


    if (!message) {
        return;
    }


    addUserMessage(
        message
    );


    chatInput.value = "";


    setTimeout(function() {

        processBotResponse(
            message
        );

    }, 500);

}



/* =====================================================
                    SEND BUTTON
===================================================== */

sendMessage.addEventListener(
    "click",
    sendChatMessage
);



/* =====================================================
                    ENTER KEY
===================================================== */

chatInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            sendChatMessage();

        }

    }
);



/* =====================================================
                    QUICK BUTTONS
===================================================== */

const quickButtons =
    document.querySelectorAll(
        ".quick-buttons button"
    );


quickButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const question =
                button.getAttribute(
                    "data-question"
                );


            addUserMessage(
                question
            );


            setTimeout(function() {

                processBotResponse(
                    question
                );

            }, 400);

        }
    );

});



/* =====================================================
                    START
===================================================== */

updateCart();


console.log(
    "GlowNest loaded successfully!"
);

console.log(
    "Cart system ready!"
);

console.log(
    "GlowBot ready!"
);
