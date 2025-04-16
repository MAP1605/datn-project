<?php
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối CSDL
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Kết nối CSDL thất bại']));
}

// ✅ Kiểm tra đăng nhập
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    echo json_encode(['success' => false, 'error' => 'Bạn chưa đăng nhập']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id_san_pham = intval($data['id_san_pham']);
$so_luong = intval($data['so_luong']);
$ton_kho = intval($data['ton_kho'] ?? 0); // ✅ Lấy tồn kho từ JS

if ($id_san_pham <= 0 || $so_luong <= 0) {
    echo json_encode(['success' => false, 'error' => 'Dữ liệu không hợp lệ']);

    exit;
}

// ✅ Kiểm tra đăng nhập
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    echo json_encode(['success' => false, 'error' => 'Chưa đăng nhập']);
    exit;
}

// ✅ Lấy ID_Chi_Tiet_San_Pham
$stmt = $conn->prepare("SELECT ID_Chi_Tiet_San_Pham FROM Chi_Tiet_San_Pham WHERE ID_San_Pham = ?");
$stmt->bind_param("i", $idSanPham);
$stmt->execute();
$res = $stmt->get_result();
if (!$row = $res->fetch_assoc()) {

    echo json_encode(['success' => false, 'error' => 'Không tìm thấy chi tiết sản phẩm']);
    exit;
}

// ✅ Kiểm tra số lượng hiện tại đã có trong giỏ

$stmt = $conn->prepare("
  SELECT gh.ID_Gio_Hang, ctgh.So_Luong
  FROM Gio_Hang gh
  JOIN Chi_Tiet_Gio_Hang ctgh ON gh.ID_Gio_Hang = ctgh.ID_Gio_Hang
  WHERE gh.ID_Nguoi_Mua = ? AND gh.ID_San_Pham = ? AND ctgh.ID_Chi_Tiet_San_Pham = ?
");
$stmt->bind_param("iii", $idNguoiMua, $idSanPham, $idChiTiet);
$stmt->execute();
$res = $stmt->get_result();

$so_luong_hien_tai = 0;
$id_gio_hang = null;

if ($row = $result->fetch_assoc()) {
    $id_gio_hang = $row['ID_Gio_Hang'];
    $so_luong_hien_tai = intval($row['So_Luong']);
}

// ✅ Kiểm tra nếu vượt tồn kho
if ($so_luong + $so_luong_hien_tai > $ton_kho) {
    echo json_encode(['success' => false, 'error' => 'Vượt quá tồn kho']);
    exit;
}

// ✅ Nếu đã có sản phẩm → update
if ($id_gio_hang) {

    $stmt = $conn->prepare("
        UPDATE Chi_Tiet_Gio_Hang SET So_Luong = So_Luong + ?
        WHERE ID_Gio_Hang = ? AND ID_Chi_Tiet_San_Pham = ?
    ");
    $stmt->bind_param("iii", $soLuong, $idGioHang, $idChiTiet);
    $stmt->execute();
} else {
    // ✅ Nếu chưa có → tạo mới

    $stmt = $conn->prepare("INSERT INTO Gio_Hang (ID_Nguoi_Mua, ID_San_Pham) VALUES (?, ?)");
    $stmt->bind_param("ii", $idNguoiMua, $idSanPham);
    $stmt->execute();
    $idGioHang = $conn->insert_id;

    $stmt = $conn->prepare("INSERT INTO Chi_Tiet_Gio_Hang (ID_Gio_Hang, ID_Chi_Tiet_San_Pham, So_Luong)
        VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $idGioHang, $idChiTiet, $soLuong);
    $stmt->execute();
}

// ✅ Trả về JSON đúng
echo json_encode(['success' => true]);
$conn->close();

exit;
