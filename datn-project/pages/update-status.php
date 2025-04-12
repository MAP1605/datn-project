<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    $conn = new mysqli('localhost', 'root', '', 'DATN');
    if ($conn->connect_error) {
        http_response_code(500);
        echo "Lỗi kết nối CSDL";
        exit;
    }

    $sql = "UPDATE Don_Hang_Seller SET Trang_Thai_Don_Hang = 'Hoàn thành' WHERE ID_Hoa_Don = $id";
    if ($conn->query($sql)) {
        echo "success";
    } else {
        http_response_code(500);
        echo "Cập nhật thất bại";
    }
}
