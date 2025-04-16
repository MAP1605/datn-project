<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Lỗi kết nối"]);
  exit;
}

$id = intval($_GET['id'] ?? 0);
if ($id === 0) {
  echo json_encode(["error" => "Thiếu ID đơn hàng"]);
  exit;
}

// 3. Query chi tiết đơn hàng + sản phẩm + người nhận
$sql = "
  SELECT 
    dh.ID_Hoa_Don, 
    dh.Thoi_Gian_Dat_Hang, 
    dh.Trang_Thai_Don_Hang, 
    dcnh.Ho_Va_Ten AS Ten_Nguoi_Nhan,
    CONCAT_WS(', ', dcnh.Dia_Chi, dcnh.Phuong_Xa, dcnh.Quan_Huyen, dcnh.Tinh_Thanh_Pho) AS Dia_Chi,
    dh.So_Tien_Nhan_Duoc,
    sp.Ten_San_Pham, 
    sp.Anh_San_Pham1, 
    sp.Gia_Ban, 
    cthd.So_Luong,
    hd.Tong_Tien_Hoa_Don
  FROM Don_Hang_Seller dh
  JOIN Hoa_Don hd ON dh.ID_Hoa_Don = hd.ID_Hoa_Don
  JOIN Dia_Chi_Nhan_Hang dcnh ON hd.ID_Dia_Chi_Nhan_Hang = dcnh.ID_Dia_Chi_Nhan_Hang
  JOIN Chi_Tiet_Hoa_Don cthd ON dh.ID_Hoa_Don = cthd.ID_Hoa_Don
  JOIN San_Pham sp ON cthd.ID_San_Pham = sp.ID_San_Pham
  WHERE dh.ID_Hoa_Don = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
  $row['Anh_San_Pham1'] = base64_encode($row['Anh_San_Pham1']); // nếu ảnh là BLOB
  $data[] = $row;
}

echo json_encode($data);
