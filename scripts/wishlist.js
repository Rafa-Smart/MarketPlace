function pasBukaInfoWishlist(idProduct) {
  document.getElementById("popup-wishlist").style.display = "flex";
  console.log("ID yang dikirim:", idProduct); // debug
  // nah sekarang kita akn kirim data idnya ke file wislist lagi
  fetch("../view/wishlist.php", {
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
      document.querySelector(".popup-box-wishlist").innerHTML =
        data + "<button class='btn-close-popup' onclick='pasTutupInfo()'>Tutup</button>";
    })
    .catch((error) => console.error("Error:", error));
}

function pasTutupInfo() {
  document.getElementById("popup-wishlist").style.display = "none";
}

function buatOrderWishlist(productId) {
  // nah yang ini kita kirim ke file orders.php
  document.getElementById("popup-order-wishlist").style.display = "flex";
  document.querySelector(".popup-box-order-wishlist").innerHTML = `
            <form action="orders.php" method="POST">
                <label for="amount-order">Jumlah:</label>
                <input type="number" name="amount-order" placeholder='masukan jumlah beli' required>
                <input type="hidden" name="product_id" value="${productId}">
                <button type="submit" name="order-now" class="btn order">Order</button>
                <button type="button" onclick="tutupOrderWishlist()">Cancel</button>
                </form>    
                `;
  console.log("ini order");
}

function tutupOrderWishlist() {
  document.getElementById("popup-order-wishlist").style.display = "none";
}

// pas update

function updateWishlist(productId, priority, notes, amount, waktuProduct) {
  console.log("inidari wihlist update");
  let date = format();
  document.getElementById("popup-update-wishlist").style.display = "flex";
  console.log(waktuProduct);
  document.querySelector(".popup-box-update-wishlist").innerHTML = `
        <form action="wishlist.php" method="POST">
            <label for="product_id_baru">Id Product:</label>
            <input type="number" name="product_id_baru" id="product_id_baru" value="${productId}">
            <label for="amount-order">Jumlah:</label>
            <input type="number" id="amount-order" name="amount-order" value="${amount}" required>
            <label for="priority-wishlist">priority:</label>
            <input type="number" id="priority-wishlist" name="priority" value="${priority}" required>
            <label for="note">Notes:</label>
            <input type="text" id="note" name="note" value="${notes}" required>
            <input type="hidden" name="format-date" value="${date}">
            <input type="hidden" name="waktu-product" value="${waktuProduct}">
            <input type="hidden" name="product_id_lama" value="${productId}">
            <button type="submit" name="wishlist-update" class="btn order">Update</button>
            <button type="button" onclick="tutupUpdateWishlist()">Cancel</button>
        </form>    
        `;

  console.log("ini update");
}

function tutupUpdateWishlist() {
  document.getElementById("popup-update-wishlist").style.display = "none";
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

// untuk favorite

function buatFavorite(produkId) {
  document.getElementById("popup-favorite").style.display = "flex";

  document.querySelector(".popup-box-favorite").innerHTML = `
    <form action="favorite.php" method="POST">
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
