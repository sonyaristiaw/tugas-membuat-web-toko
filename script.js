let cart = [];

    // tambah ke keranjang
   function addToCart(name, price, level = null){
    let found = cart.find(item => item.name === name && item.level === level);

    if(found){
        found.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            level: level,
            qty: 1
        });
        
    }
    
    
    updateCart();
    }

    function addProductWithLevel(button){
    const product = button.closest('.product');

    const name  = product.getAttribute('data-name');
    const price = parseInt(product.getAttribute('data-price'));

    const levelSelect = product.querySelector('.level-select');
    const level = levelSelect ? levelSelect.value : null;

    addToCart(name, price, level);
    }




    // update tampilan keranjang
    function updateCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";

    let total = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {

        const li = document.createElement("li");

        if(item.level){

    let label = "";

    // kalau ES / HANGAT / dll → bukan level pedas
    if(isNaN(item.level)){
        label = item.level;
    } else {
        label = "Level " + item.level;
    }

    li.innerHTML = `
        ${item.name} (${label})
        <br>
        Rp ${item.price} x ${item.qty} = Rp ${item.price * item.qty}
        <br>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
    `;
    }

    else {
    li.innerHTML = `
        ${item.name}
        <br>
        Rp ${item.price} x ${item.qty} = Rp ${item.price * item.qty}
        <br>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
    `;
    }   


        list.appendChild(li);

        total += item.price * item.qty;
        totalQty += item.qty;
        });
    document.getElementById("totalPrice").innerText = total;

    //  Update badge keranjang
    document.getElementById("cartCount").innerText = totalQty;
    }

    function changeQty(index, change){
    cart[index].qty += change;

    if(cart[index].qty <= 0){
        cart.splice(index, 1);
    }

    updateCart();
    }


    // hapus item
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // order via WhatsApp
    function orderWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let no_wa = "6282377058089";

    let message = "Halo, saya mau order:%0A";

    cart.forEach(item => {
    if(item.level){
        message += `- ${item.name} (Level ${item.level}) x ${item.qty} = Rp${item.price * item.qty}%0A`;
    } else {
        message += `- ${item.name} x ${item.qty} = Rp${item.price * item.qty}%0A`;
        }
    });


    let total = document.getElementById("totalPrice").innerText;
    message += `%0ATotal: Rp${total}`;

    let link = `https://wa.me/${no_wa}?text=${message}`;
    window.open(link, "_blank");
    }

    function openCart() {
        document.getElementById("cartSidebar").classList.add("open");
        document.getElementById("overlay").style.display = "block";
    }

    function closeCart() {
        document.getElementById("cartSidebar").classList.remove("open");
        document.getElementById("overlay").style.display = "none";
    }

    function scrollReviews(direction) {
        const slider = document.getElementById("reviewSlider");
        const scrollAmount = 300; // jarak scroll per klik
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }

    // Script untuk tombol "Lihat Lebih Banyak Review"
    const moreBtn = document.querySelector('.more-reviews');
    const reviewsContainer = document.querySelector('.reviews');

    // Review tambahan
    const extraReviews = [
        { text: "Ayamnya enak, sambalnya juara!", name: "Fajar, Semarang" },
        { text: "Cobain deh, puas banget rasanya!", name: "Mira, Malang" },
        { text: "Harganya terjangkau, rasanya top!", name: "Andi, Yogyakarta" },
        { text: "Rasanya bikin nagih, selalu order lagi!", name: "Lina, Bali" },
        { text: "Sambalnya pedas tapi pas, mantap pokoknya!", name: "Rudi, Medan" },
    ];

    let extraReviewDivs = [];
    let expanded = false;

    moreBtn.addEventListener('click', () => {
        if (!expanded) {
            // Tambahkan review tambahan
            extraReviews.forEach(r => {
                const div = document.createElement('div');
                div.classList.add('review');
                div.innerHTML = `<p>"${r.text}"</p><span>- ${r.name}</span>`;
                reviewsContainer.insertBefore(div, moreBtn);
                extraReviewDivs.push(div);
            });
            moreBtn.textContent = "Tutup Review"; // ganti teks tombol
            expanded = true;
        } else {
            // Hapus review tambahan
            extraReviewDivs.forEach(div => div.remove());
            extraReviewDivs = [];
            moreBtn.textContent = "Lihat Lebih Banyak Review"; // kembalikan teks
            expanded = false;
        }
    });

