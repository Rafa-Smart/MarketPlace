console.log("ini dari index.js");

// membuat fungsi ketika tombo button add product di klik

const imgInput = document.getElementById("img");
const previewImg = document.getElementById("preview-image");

imgInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block"; // tampilkan gambar
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.style.display = "none"; // kalau batal pilih gambar
  }
});
function bukaAddProduct() {
  document.getElementById("popup-add-product").style.display = "flex";
}

function tutupAddProduct() {
  document.getElementById("popup-add-product").style.display = "none";
}

function buatOrder(productId) {
  // nah yang ini kita kirim ke file orders.php
  document.getElementById("popup-order").style.display = "flex";
  document.querySelector(".popup-box-order").innerHTML = `
        <form action="./view/orders.php" method="POST">
            <label for="amount-order">Jumlah:</label>
            <input type="number" name="amount-order" placeholder='masukan jumlah beli' required>
            <input type="hidden" name="product_id" value="${productId}">
            <button type="submit" name="order-now" class="btn order">Order</button>
            <button type="button" onclick="tutupOrder()">Cancel</button>
            </form>    
            `;
  console.log("ini order");
}

function tutupOrder() {
  document.getElementById("popup-order").style.display = "none";
}

// untuk di wishlist

function buatWishlist(productId) {
  // disini pas si user klik buttno add wihslist, kita tampilkan popup box
  // untuk wishlistnya
  console.log("ini wishlist");
  document.getElementById("popup-wishlist").style.display = "flex";
  document.querySelector(".popup-box-wishlist").innerHTML = `
    <form action="./view/wishlist.php" method="POST">
    <label for="amount-wishlist">Jumlah:</label>
    <input id="amount-wishlist" type="number" name="amount-wishlist" placeholder='masukan jumlah beli' required>
    <label for="note-wishlist">Note:</label>
    <input id="note-wishlist" type="text" name="note-wishlist" placeholder='masukan note anda' required>
    <label for="priority-wishlist">Priority:</label>
            <input type="number" id="priority-wishlist" name="priority-wishlist" placeholder='masukan nilai priority %' required>
            <input type="hidden" name="product_id" value="${productId}">
            <button type="submit" name="wishlist-now" class="btn order">Add to Wishlist</button>
            <button type="button" onclick="tutupWishlist()">Cancel</button>
            </form>
    `;
  console.log("ini add to wishlist");
  const popup = document.getElementById("popup-wishlist");
  console.log("Inner HTML:", popup.innerHTML);
}

function tutupWishlist() {
  document.getElementById("popup-wishlist").style.display = "none";
}

function pasTutupInfo() {
  document.getElementById("popup").style.display = "none";
}

function pasBukaInfo(idDariButton) {
  document.getElementById("popup").style.display = "flex";
  // nah jadi ketika ada yg klik button, maka akan kita ambil disini
  // si valuenya
  if (window.navigator.vibrate) {
    window.navigator.vibrate(50);
  }

  // lalu kita kirim post ulang ke file index.phpnya
  const id = idDariButton;
  fetch("./index.php", {
    method: "POST",
    headers: {
      // jadi ini tuh, buat ngasih tau kalo saya kirim query param
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + encodeURIComponent(id),
    // nah jadi kita kirim kan query param id=iddariButton
  })
    // nah lalu data yang kita kirim dari sini, kita akn kirim lagi ke file index.php lalu
    // kita olah idnya
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      // jdai data ini isinya adlah seluruh yang ada di blok if yang di atas di file index.php
      document.querySelector(".popup-box").innerHTML = data;
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// ini untuk favorite

function buatFavorite(produkId) {
  document.getElementById("popup-favorite").style.display = "flex";

  document.querySelector(".popup-box-favorite").innerHTML = `
    <form action="./view/favorite.php" method="POST">
    <label for="amount-favorite">Jumlah:</label>
    <input id="amount-favorite" type="number" name="amount-favorite" placeholder='masukan jumlah beli' required>
    <input type="hidden" name="product_id" value="${produkId}">
    <button type="submit" name="favorite-now" class="btn order">Add to Favorite</button>
    <button type="button" onclick="tutupFavorite()">Cancel</button>
    </form>
    `;
}

function tutupFavorite() {
  document.getElementById("popup-favorite").style.display = "none";
}
