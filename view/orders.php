<?php
require_once("../connect/connection.php");
global $connection;
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Product Page</title>
  <link rel="stylesheet" href="../styles/orders.css?v=5">
  <link rel="stylesheet" href="../styles/navbar.css?v=5">
</head>

<body>
  <nav class="navbar">
    <div class="logo">Khadafi Shop</div>
    <ul class="nav-links">
      <li><a href="../index.php">Products</a></li>
      <li><a href="">Orders</a></li>
      <li><a href="favorite.php">Favorites</a></li>
      <li><a href="wishlist.php">Wishlist</a></li>
    </ul>
  </nav>
  <br><br>


  <div class="table-container">
    <form action="export_orders.php" method="POST" style="text-align:right; margin-bottom:10px;">
      <button type="submit" name="export-excel" class="export-btn">Export to Excel</button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th>ID Product</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Amount</th>
          <th>Total Price</th>
          <th>Stock Product Now</th>
          <th>Category Product</th>
          <th>Created_at</th>
          <th>Update_at</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <?php
        if (isset($_POST["order-now"])) {
          createdata();
        }
        if (isset($_POST["order-update"])) {
          updatedata();
        }
        if (isset($_POST["order-delete"])) {
          deletedata();
        }
        readData();
        ?>
      </tbody>
    </table>
  </div>

  <!-- untuk si update boxnyah -->
  <div class="overlay-order-update" id="popup-order-update">
    <div class="popup-box-order-update"></div>
  </div>


</body>

</html>
<script src="../scripts/orders.js"></script>

<?php

function deleteData()
{
  global $connection;
  if (isset($_POST["order-delete"])) {
    $idProduct = $_POST["idProduct"];
    $created_at = $_POST["created_at"];
  }

  $sql = "DELETE FROM tabel_orders WHERE id_product = '$idProduct' AND created_at = '$created_at'";
  $hasil = mysqli_query($connection, $sql);

}

function updateData()
{
  global $connection;
  if (isset($_POST["order-update"])) {
    $id_baru_product = $_POST["product_id_baru"];
    $id_lama_product = $_POST["product_id_lama"];
    $amout_baru = $_POST["amount-order"];
    $date = $_POST["waktu-product"];
    $update_at_baru = $_POST["format-date"];

    // disini saya pake waktu produk sebagai uniknya
    // karena pasti tidka akan ad orna gyg update 2 sekaligus dalam satu waktu

    // dan disini saya extrak dulu jadi hanya tahun,bulan,dan tanggalnya saja
    // karena kalo kita ceknya itu sampe bener bener detik, maka itu ga akan sama, jadi pasti ada milidetiknya
    // yang beda

    $sql = "
                UPDATE tabel_orders
                SET id_product = '$id_baru_product', amount = '$amout_baru', update_at = '$update_at_baru'
                WHERE created_at = '$date'
                AND id_product = '$id_lama_product';
            ";


    $hasil = mysqli_query($connection, $sql);
  }
}

function readData()
{
  global $connection;
  $sql = "
                SELECT 
                p.id as idProduct,
                p.name as namaproduct,
                p.price as priceProduct,
                p.stock as stockProduct,
                o.amount as amountProducts,
                (p.price * o.amount) as totalPrice,
                (p.stock - o.amount) as NowStock,
                p.category as categoryProduct,
                o.created_at as created_at,
                o.update_at as update_at
                FROM tabel_products AS p 
                INNER JOIN tabel_orders as o
                ON p.id = o.id_product
                ORDER BY o.created_at DESC;
            ";

  $hasil = mysqli_query($connection, $sql);
  if (mysqli_num_rows($hasil) > 0) {
    while ($row = mysqli_fetch_assoc($hasil)) {
      echo "<tr>";
      echo "<td>" . $row["idProduct"] . "</td>";
      echo "<td>" . $row["namaproduct"] . "</td>";
      echo "<td>Rp " . number_format($row['priceProduct'], 0, ',', '.') . "</td>";
      echo "<td>" . $row["stockProduct"] . "</td>";
      echo "<td>" . $row["amountProducts"] . "</td>";
      echo "<td>Rp " . number_format($row['totalPrice'], 0, ',', '.') . "</td>";
      echo "<td>" . $row["NowStock"] . "</td>";
      echo "<td>" . $row["categoryProduct"] . "</td>";
      echo "<td>" . $row["created_at"] . "</td>";
      echo "<td>" . ($row["update_at"] ? $row["update_at"] : "belum diupdate") . "</td>";
      echo "<td><button id='button-order-update' onclick='updateOrder(" . $row["idProduct"] . "," . $row["amountProducts"] . ", \"" . $row["created_at"] . "\")'>Update</button></td>";

      echo "<td>
                        <form action='' method='POST'>
                          <input type='hidden' value='" . $row["created_at"] . "' name='created_at'>
                          <input type='hidden' value='" . $row["idProduct"] . "' name='idProduct'>
                          <button type='submit' id='button-order-delete' name='order-delete' >Delete</button>
                        </form>
                      </td>";
      echo "<tr>";
    }
  } else {
    echo "<tr><td colspan='12'>Tidak ada data customer</td></tr>";
  }

}

function createdata()
{
  global $connection;
  if (isset($_POST["order-now"])) {
    $id_barang = $_POST["product_id"];
    $amount = $_POST["amount-order"];
  }
  $sql = "
            INSERT INTO tabel_orders (id_product, amount)
            VALUES ('$id_barang', '$amount')
        ";
  $result = mysqli_query($connection, $sql);
}
?>