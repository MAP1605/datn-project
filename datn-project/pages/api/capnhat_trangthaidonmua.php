<?php
header("Content-Type: text/plain");
session_start();

// 1. Kiểm tra phương thức
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Phương thức không hợp lệ";
    exit;
}

// 2. Lấy dữ liệu từ POST
$id = intval($_POST['id'] ?? 0);
$trangthai = $_POST['trangthai'] ?? '';

// 3. Validate đơn giản
if ($id === 0 || empty($trangthai)) {
    http_response_code(400);
    echo "Thiếu thông tin";
    exit;
}

// 4. Kết nối CSDL
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    http_response_code(500);
    echo "Lỗi kết nối CSDL";
    exit;
}

// 5. Cập nhật trạng thái đơn hàng
$sql = "UPDATE Don_Hang_Seller SET Trang_Thai_Don_Hang = ? WHERE ID_Hoa_Don = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $trangthai, $id);

if ($stmt->execute()) {
    echo "success";
} else {
    http_response_code(500);
    echo "fail";
}

$stmt->close();
$conn->close();
