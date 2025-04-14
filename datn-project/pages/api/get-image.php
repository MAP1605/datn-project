<?php
$id = intval($_GET['id'] ?? 0);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) die("DB lỗi");

$stmt = $conn->prepare("SELECT Anh_San_Pham1 FROM San_Pham WHERE ID_San_Pham = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    header("Content-Type: image/jpeg");
    echo $row['Anh_San_Pham1'];
    exit;
} else {
    http_response_code(404);
    exit("Không tìm thấy ảnh");
}
