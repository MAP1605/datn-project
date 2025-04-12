<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// ✅ Debug xem client có truyền đúng không
$debug = [
    'raw_data' => $data,
    'id_chi_tiet_gio_hang' => $data['id_chi_tiet_gio_hang'] ?? 'KHÔNG CÓ',
    'so_luong' => $data['so_luong'] ?? 'KHÔNG CÓ'
];

$id_ctgh = intval($data['id_chi_tiet_gio_hang'] ?? 0);
$so_luong = intval($data['so_luong'] ?? 1);
if ($so_luong <= 0) $so_luong = 1;

$stmt = $conn->prepare("UPDATE Chi_Tiet_Gio_Hang SET So_Luong = ? WHERE ID_Chi_Tiet_Gio_Hang = ?");
$stmt->bind_param("ii", $so_luong, $id_ctgh);
$success = $stmt->execute();

// ✅ Gửi lại cả log debug về client luôn
echo json_encode([
    'success' => $success,
    'message' => $success ? 'Cập nhật thành công' : 'Cập nhật thất bại',
    'debug' => $debug
]);
