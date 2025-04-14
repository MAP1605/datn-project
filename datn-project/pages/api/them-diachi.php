<?php

session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "🟢 File đã chạy nhưng chưa nhận POST!";
    exit();
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
if (!$idNguoiMua) {
    echo "⚠ Không có ID người mua trong session";
    exit();
}

$province = $_POST['province'] ?? '';
$district = $_POST['district'] ?? '';
$ward = $_POST['ward'] ?? '';
$diachi = $_POST['diachicuthe'] ?? '';
$ten = $_POST['Ten'] ?? '';
$email = $_POST['Email'] ?? '';
$sdt = $_POST['SDT'] ?? '';

if (!$province || !$district || !$ward || !$diachi || !$ten || !$email || !$sdt) {
    echo "⚠ Thiếu dữ liệu đầu vào";
    exit();
}

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    http_response_code(500);
    echo '❌ Lỗi kết nối DB: ' . $conn->connect_error;
    exit();
}

$stmt = $conn->prepare("INSERT INTO Dia_Chi_Nhan_Hang 
  (ID_Nguoi_Mua, Dia_Chi, Phuong_Xa, Quan_Huyen, Tinh_Thanh_Pho, Ho_Va_Ten, Email, So_Dien_Thoai)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo "❌ Lỗi prepare: " . $conn->error;
    exit();
}

$stmt->bind_param("isssssss", $idNguoiMua, $diachi, $ward, $district, $province, $ten, $email, $sdt);
if ($stmt->execute()) {
    echo "✅ success";
} else {
    echo "❌ Lỗi execute: " . $stmt->error;
}

$stmt->close();
$conn->close();
