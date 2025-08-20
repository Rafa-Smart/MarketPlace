function updateOrder(productId, amount, waktuProduct) {
    let date = format();
    document.getElementById("popup-order-update").style.display = "flex";
    console.log(waktuProduct);
    document.querySelector(".popup-box-order-update").innerHTML = `
      <form action="orders.php" method="POST">
        <label for="product_id_baru">Id Product:</label><br>
        <input type="number" name="product_id_baru" id="product_id_baru" value="${productId}"><br><br>
        <label for="amount-order">Jumlah:</label><br>
        <input type="number" id="amount-order" name="amount-order" value="${amount}" required><br><br>
        <input type="hidden" name="format-date" value="${date}">
        <input type="hidden" name="waktu-product" value="${waktuProduct}">
        <input type="hidden" name="product_id_lama" value="${productId}">
        <button type="submit" name="order-update" class="btn order">Update</button>
        <button type="button" onclick="tutupUpdate()">Cancel</button>
      </form>    
    `;

    console.log('ini update');
}

function tutupUpdate(){
    document.getElementById("popup-order-update").style.display = "none";
}


// disini kita buat untuk formatnyah

function format() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const format = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return format;
}


