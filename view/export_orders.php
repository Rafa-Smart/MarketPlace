<?php
require_once("../connect/connection.php");

// Load PhpSpreadsheet
require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if (isset($_POST['export-excel'])) {
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Header Excel
    $sheet->setCellValue('A1', 'ID Product');
    $sheet->setCellValue('B1', 'Product Name');
    $sheet->setCellValue('C1', 'Price');
    $sheet->setCellValue('D1', 'Stock');
    $sheet->setCellValue('E1', 'Amount');
    $sheet->setCellValue('F1', 'Total Price');
    $sheet->setCellValue('G1', 'Stock Product Now');
    $sheet->setCellValue('H1', 'Category Product');
    $sheet->setCellValue('I1', 'Created_at');
    $sheet->setCellValue('J1', 'Update_at');

    // Ambil data dari database
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

    $result = mysqli_query($connection, $sql);
    $rowIndex = 2; // mulai dari baris ke-2

    while ($row = mysqli_fetch_assoc($result)) {
        $sheet->setCellValue('A' . $rowIndex, $row['idProduct']);
        $sheet->setCellValue('B' . $rowIndex, $row['namaproduct']);
        $sheet->setCellValue('C' . $rowIndex, $row['priceProduct']);
        $sheet->setCellValue('D' . $rowIndex, $row['stockProduct']);
        $sheet->setCellValue('E' . $rowIndex, $row['amountProducts']);
        $sheet->setCellValue('F' . $rowIndex, $row['totalPrice']);
        $sheet->setCellValue('G' . $rowIndex, $row['NowStock']);
        $sheet->setCellValue('H' . $rowIndex, $row['categoryProduct']);
        $sheet->setCellValue('I' . $rowIndex, $row['created_at']);
        $sheet->setCellValue('J' . $rowIndex, $row['update_at'] ?: "Belum diupdate");

        $rowIndex++;
    }

    // Nama file
    $fileName = "Orders_Export_" . date("Y-m-d_H-i-s") . ".xlsx";

    // Output ke browser
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header("Content-Disposition: attachment;filename=\"$fileName\"");
    header('Cache-Control: max-age=0');

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit;
}
?>
