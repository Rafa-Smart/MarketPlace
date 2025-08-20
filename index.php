<?php
require_once("connect/connection.php");
global $connection;
// nah disini kita butuh cek dulu, jadi kalo ada yang request ke file ini pake js
// maka kita ambi
// jadi sebenarnya ketika kita melaukan request post ke file index.php ini
// sebenarnya kita sedang melakukan request meskipun kita methodnya itu post
// tapi tetep kita melakukan request
// makanya disini kita itu di taruh exit, jadi pas di reuest itu html yg dibawahnya ga keikutan ke ambil
// dan disini juga ditarus di paling atas, jadi html sebelum ini ga keabil juga
// gitu

// nahh lalu si if ini akan diambil oleh si index.js, lalu di eksekusi disana, gituu
// jadi data yang ad di then itu isinya adlah ini

// makanya kita ubah menjadi res.text dulu
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["id"])) {
  $id = intval($_POST["id"]);
  $query = "SELECT * FROM tabel_products WHERE id = $id";
  $result = mysqli_query($connection, $query);

  if ($result && mysqli_num_rows($result) > 0) {
    $product = mysqli_fetch_assoc($result);
    echo '<div class="info-container vertical">';
    echo '<img src="' . htmlspecialchars($product["img"]) . '" class="info-image" alt="Product">';
    echo '<div class="info-details">';
    echo "<h3>" . htmlspecialchars($product["name"]) . "</h3>";
    echo "<p><strong>Harga:</strong> Rp " . number_format($product["price"], 0, ',', '.') . "</p>";
    echo "<p><strong>Stok:</strong> " . $product["stock"] . "</p>";
    echo "<p><strong>Kategori:</strong> " . htmlspecialchars($product["category"]) . "</p>";
    echo '</div>';
    echo '<button class="close-btn" onclick="pasTutupInfo()">Tutup</button>';
    echo '</div>';
  } else {
    echo "<p>Produk tidak ditemukan.</p>";
  }
  exit;
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Product Page</title>
  <link rel="stylesheet" href="styles/index.css?v=2">
  <link rel="stylesheet" href="styles/navbar.css">

</head>

<body>


  <nav class="navbar">
    <div class="logo">MyDarkShop</div>
    <ul class="nav-links">
      <li><a href="#">Products</a></li>
      <li><a href="view/orders.php">Orders</a></li>
      <li><a href="view/favorite.php">Favorites</a></li>
      <li><a href="view/wishlist.php">Wishlist</a></li>
    </ul>
  </nav>

  <div class="container">
    <?php
    tampilProducts();
    ?>
  </div>
  <!-- ini buat si info -->
  <div class="overlay" id="popup">
    <div class="popup-box">

    </div>
  </div>

  <!-- ini buat si order -->
  <div class="overlay-order" id="popup-order">
    <div class="popup-box-order"></div>
  </div>



  <!-- ini buat si wihslist -->
  <div class="overlay-wishlist" id="popup-wishlist">
    <div class="popup-box-wishlist"></div>
  </div>


  <!-- ini buat si favorite -->
  <div class="overlay-favorite" id="popup-favorite">
    <div class="popup-box-favorite"></div>
  </div>


  <script src="scripts/index.js?v=2" defer></script>

</body>

</html>

<?php
function tampilProducts()
{
  global $connection;
  $query = "SELECT * FROM tabel_products;";
  $hasil = mysqli_query($connection, $query);
  if (!$hasil) {
    echo "Query gagal: " . mysqli_error($connection);
    return;
  }
  while ($row = mysqli_fetch_assoc($hasil)) {
    $product_id = $row["id"];
    $product_name = $row["name"];
    $product_price = $row["price"];
    $product_stock = $row["stock"];
    $product_category = $row["category"];
    $product_img = $row["img"];

    echo '<div class="product-card">';
    echo '<img src="' . $product_img . '" alt="Product">';
    echo '<h3>' . htmlspecialchars($product_name) . '</h3>';
    echo '<p>Rp ' . number_format($product_price, 0, ',', '.') . '</p>';
    echo '<div class="btn-group">';
    echo '<button type="submit" name="order-now" class="btn order" onclick="buatOrder(' . $product_id . ')">Order Now</button>';
    echo '<button type="submit" name="add-to-favorites" class="btn order" onclick="buatFavorite(' . $product_id . ')" >Add to Favorites</button>';
    echo '<button type="button" name="add-to-wishlist" class="btn order" onclick="buatWishlist(' . $product_id . ')">Add to Wishlist</button>';
    echo '<button onclick="pasBukaInfo(' . $product_id . ')" class="btn order">Info Product</button>';

    echo '</div>';
    echo '</div>';
  }
}
?>