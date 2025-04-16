<?php
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối CSDL
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Kết nối CSDL thất bại']);
    exit;
}

// ✅ Kiểm tra đăng nhập
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    echo json_encode(['success' => false, 'error' => 'Chưa đăng nhập']);
    exit;
}

// ✅ Nhận JSON từ fetch
$data = json_decode(file_get_contents('php://input'), true);
$idSanPham = intval($data['id_san_pham'] ?? 0);
$soLuong = intval($data['so_luong'] ?? 1);
$idNguoiMua = $_SESSION['ID_Nguoi_Mua'];

// ✅ Kiểm tra đầu vào
if ($idSanPham <= 0 || $soLuong <= 0) {
    echo json_encode(['success' => false, 'error' => 'Dữ liệu không hợp lệ']);
    exit;
}

// ✅ Lấy ID_Chi_Tiet_San_Pham
$stmt = $conn->prepare("SELECT ID_Chi_Tiet_San_Pham FROM Chi_Tiet_San_Pham WHERE ID_San_Pham = ?");
$stmt->bind_param("i", $idSanPham);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
$idChiTiet = $row['ID_Chi_Tiet_San_Pham'] ?? 0;

if (!$idChiTiet) {
    echo json_encode(['success' => false, 'error' => 'Không tìm thấy chi tiết sản phẩm']);
    exit;
}

// ✅ Kiểm tra có trong giỏ chưa
$stmt = $conn->prepare("
    SELECT gh.ID_Gio_Hang FROM Gio_Hang gh
    JOIN Chi_Tiet_Gio_Hang ctgh ON gh.ID_Gio_Hang = ctgh.ID_Gio_Hang
    WHERE gh.ID_Nguoi_Mua = ? AND gh.ID_San_Pham = ? AND ctgh.ID_Chi_Tiet_San_Pham = ?
");
$stmt->bind_param("iii", $idNguoiMua, $idSanPham, $idChiTiet);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    // ✅ Có rồi → cập nhật số lượng
    $idGioHang = $row['ID_Gio_Hang'];
    $stmt = $conn->prepare("
        UPDATE Chi_Tiet_Gio_Hang SET So_Luong = So_Luong + ?
        WHERE ID_Gio_Hang = ? AND ID_Chi_Tiet_San_Pham = ?
    ");
    $stmt->bind_param("iii", $soLuong, $idGioHang, $idChiTiet);
    $stmt->execute();
} else {
    // ✅ Chưa có → thêm mới
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
exit;
