    <?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Lỗi CSDL: " . $conn->connect_error);
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
$idSanPham = $_POST['ID_San_Pham'] ?? 0;
$soSao = $_POST['So_Sao'] ?? 0;
$binhLuan = $_POST['Binh_Luan'] ?? '';

$images = [null, null, null];
for ($i = 1; $i <= 3; $i++) {
    if (!empty($_FILES["Anh_Danh_Gia$i"]['tmp_name'])) {
        $images[$i - 1] = file_get_contents($_FILES["Anh_Danh_Gia$i"]['tmp_name']);
    }
}

$stmt = $conn->prepare("INSERT INTO Danh_Gia_San_Pham (
    ID_Nguoi_Mua, ID_San_Pham, So_Sao, Binh_Luan, Ngay_Danh_Gia, 
    Anh_Danh_Gia1, Anh_Danh_Gia2, Anh_Danh_Gia3
) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)");

if (!$stmt) {
    error_log("Lỗi prepare: " . $conn->error);
    echo "fail";
    exit;
}

$stmt->bind_param(
    "iiissss",
    $idNguoiMua,
    $idSanPham,
    $soSao,
    $binhLuan,
    $images[0],
    $images[1],
    $images[2]
);

if ($stmt->execute()) {
    echo "success";
} else {
    error_log("❌ Lỗi SQL: " . $stmt->error);
    echo "fail";
}
