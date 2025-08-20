function pasBukaInfoFavorite(idProduct) {
  document.getElementById("popup-favorite").style.display = "flex";
  console.log("ID yang dikirim:", idProduct); // debug
  // nah sekarang kita akn kirim data idnya ke file favorite lagi
  fetch("../view/favorite.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + encodeURIComponent(idProduct),
  })
    // nah jaid pas kita ngirim, kita tetap akan dapet responsenya
    // disini kita ambil resopnsenya
    .then((res) => res.text())
    .then((data) => {
      document.querySelector(".popup-box-favorite").innerHTML =
        data + "<br><button onclick='pasTutupInfo()'>Tutup</button>";
    })
    .catch((error) => console.error("Error:", error));
}

function pasTutupInfo() {
  document.getElementById("popup-favorite").style.display = "none";
}

function buatOrderFavorite(productId) {
  // nah yang ini kita kirim ke file orders.php
  document.getElementById("popup-order-favorite").style.display = "flex";
  document.querySelector(".popup-box-order-favorite").innerHTML = `
            <form action="orders.php" method="POST">
                <label for="amount-order">Jumlah:</label>
                <input type="number" name="amount-order" placeholder='masukan jumlah beli' required>
                <input type="hidden" name="product_id" value="${productId}">
                <button type="submit" name="order-now" class="btn order">Order</button>
                <button type="button" onclick="tutupOrderFavorite()">Cancel</button>
                </form>    
                `;
  console.log("ini order");
}

function tutupOrderFavorite() {
  document.getElementById("popup-order-favorite").style.display = "none";
}

// pas update

function updateFavorite(productId, amount, waktuProduct) {
  console.log("inidari favorite update");
  let date = format();
  document.getElementById("popup-update-favorite").style.display = "flex";
  console.log(waktuProduct);
  document.querySelector(".popup-box-update-favorite").innerHTML = `
        <form action="favorite.php" method="POST">
            <label for="product_id_baru">Id Product:</label><br>
            <input type="number" name="product_id_baru" id="product_id_baru" value="${productId}"><br><br>
            <label for="amount-order">Jumlah:</label><br>
            <input type="number" id="amount-order" name="amount-order" value="${amount}" required><br><br>
            <input type="hidden" name="format-date" value="${date}">
            <input type="hidden" name="waktu-product" value="${waktuProduct}">
            <input type="hidden" name="product_id_lama" value="${productId}">
            <button type="submit" name="favorite-update" class="btn order">Update</button>
            <button type="button" onclick="tutupUpdateFavorite()">Cancel</button>
        </form>    
        `;

  console.log("ini update");
}

function tutupUpdateFavorite() {
  document.getElementById("popup-update-favorite").style.display = "none";
}

function format() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const format = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return format;
}


// sekarang untuk masukin ke wishlistnya
function buatWishlist(productId) {
  // disini pas si user klik buttno add wihslist, kita tampilkan popup box
  // untuk wishlistnya
  console.log("ini wishlist");
  document.getElementById("popup-wishlist-favorite").style.display = "flex";
  document.querySelector(".popup-box-wishlist-favorite").innerHTML = `
    <form action="wishlist.php" method="POST">
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
   const popup = document.getElementById("popup-wishlist-favorite");
  console.log("Inner HTML:", popup.innerHTML);
}

function tutupWishlist() {
  document.getElementById("popup-wishlist-favorite").style.display = "none";
}