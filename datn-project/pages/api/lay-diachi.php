<?php
session_start();
header('Content-Type: application/json');

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
if (!$idNguoiMua) {
    echo json_encode([]);
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT * FROM Dia_Chi_Nhan_Hang WHERE ID_Nguoi_Mua = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idNguoiMua);
$stmt->execute();
$result = $stmt->get_result();

$addresses = [];
while ($row = $result->fetch_assoc()) {
    $addresses[] = [
        'ten' => $row['Ho_Va_Ten'] ?? '', // nếu không có cột thì bỏ
        'email' => $row['Email'],
        'sdt' => $row['So_Dien_Thoai'],
        'province' => $row['Tinh_Thanh_Pho'],
        'district' => $row['Quan_Huyen'],
        'ward' => $row['Phuong_Xa'],
        'diachi' => $row['Dia_Chi'],
    ];
}

echo json_encode($addresses);
