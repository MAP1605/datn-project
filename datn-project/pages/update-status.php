<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($id <= 0) {
        http_response_code(400);
        echo "ID không hợp lệ";
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'DATN');
    if ($conn->connect_error) {
        http_response_code(500);
        echo "Lỗi kết nối CSDL: " . $conn->connect_error;
        exit;
    }

    // Sử dụng prepare statement để an toàn hơn
    $sql1 = $conn->prepare("UPDATE Don_Hang_Seller SET Trang_Thai_Don_Hang = 'Hoàn thành' WHERE ID_Hoa_Don = ?");
    $sql1->bind_param("i", $id);

    $sql2 = $conn->prepare("
        UPDATE Thanh_Toan_Seller
        INNER JOIN Don_Hang_Seller 
        ON Thanh_Toan_Seller.ID_Don_Hang_Seller = Don_Hang_Seller.ID_Don_Hang_Seller
        SET
         Thanh_Toan_Seller.Trang_Thai_Thanh_Toan = 'Hoàn thành',
         Thanh_Toan_Seller.Ngay_Thanh_Toan = NOW()
        WHERE Don_Hang_Seller.ID_Hoa_Don = ?
    ");
    $sql2->bind_param("i", $id);

    $ok1 = $sql1->execute();
    $ok2 = $sql2->execute();

    if ($ok1 && $ok2) {
        echo "success";
    } else {
        http_response_code(500);
        echo "Cập nhật thất bại: " . $conn->error;
    }

    $sql1->close();
    $sql2->close();
    $conn->close();
}
