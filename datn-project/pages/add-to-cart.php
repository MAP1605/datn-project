<?php
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối CSDL
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'DATN';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("❌ Kết nối thất bại: " . $conn->connect_error);
}

if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    $_SESSION['ID_Nguoi_Mua'] = 1; // Gán tạm người dùng ID = 1
}

// Khi làm form đăng nhập thì tìm hiểu sau
// if (!isset($_SESSION['ID_Nguoi_Mua'])) {
//     echo json_encode(['error' => 'Bạn chưa đăng nhập']);
//     exit;
// }

$data = json_decode(file_get_contents('php://input'), true);
$id_san_pham = intval($data['id_san_pham']);
$so_luong = intval($data['so_luong']);

if ($id_san_pham <= 0 || $so_luong <= 0) {
    echo json_encode(['error' => 'Dữ liệu không hợp lệ']);
    exit;
}

$id_nguoi_mua = $_SESSION['ID_Nguoi_Mua'];

// ❗Lấy ID_Chi_Tiet_San_Pham nếu cần
$stmt = $conn->prepare("SELECT ID_Chi_Tiet_San_Pham FROM Chi_Tiet_San_Pham WHERE ID_San_Pham = ?");
$stmt->bind_param("i", $id_san_pham);
$stmt->execute();
$res = $stmt->get_result();
if (!$row = $res->fetch_assoc()) {
    echo json_encode(['error' => 'Không tìm thấy chi tiết sản phẩm']);
    exit;
}
$id_chi_tiet = $row['ID_Chi_Tiet_San_Pham'];

// 🔍 Kiểm tra giỏ đã có sản phẩm chưa
$stmt = $conn->prepare("
    SELECT gh.ID_Gio_Hang FROM Gio_Hang gh
    JOIN Chi_Tiet_Gio_Hang ctgh ON gh.ID_Gio_Hang = ctgh.ID_Gio_Hang
    WHERE gh.ID_Nguoi_Mua = ? AND gh.ID_San_Pham = ? AND ctgh.ID_Chi_Tiet_San_Pham = ?
");
$stmt->bind_param("iii", $id_nguoi_mua, $id_san_pham, $id_chi_tiet);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // ✅ Có rồi → update
    $id_gio_hang = $row['ID_Gio_Hang'];
    $stmt = $conn->prepare("
        UPDATE Chi_Tiet_Gio_Hang SET So_Luong = So_Luong + ? 
        WHERE ID_Gio_Hang = ? AND ID_Chi_Tiet_San_Pham = ?
    ");
    $stmt->bind_param("iii", $so_luong, $id_gio_hang, $id_chi_tiet);
    $stmt->execute();
} else {
    // ✅ Chưa có → tạo mới
    $stmt = $conn->prepare("INSERT INTO Gio_Hang (ID_Nguoi_Mua, ID_San_Pham) VALUES (?, ?)");
    $stmt->bind_param("ii", $id_nguoi_mua, $id_san_pham);
    $stmt->execute();
    $id_gio_hang = $conn->insert_id;

    $stmt = $conn->prepare("
        INSERT INTO Chi_Tiet_Gio_Hang (ID_Gio_Hang, ID_Chi_Tiet_San_Pham, So_Luong) 
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param("iii", $id_gio_hang, $id_chi_tiet, $so_luong);
    $stmt->execute();
}

echo json_encode(['success' => true]);
