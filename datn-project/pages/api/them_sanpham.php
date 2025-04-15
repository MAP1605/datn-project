<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "DATN");
if ($conn->connect_error) {
    die("Lỗi kết nối CSDL");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy ID_Nguoi_Ban từ session => truy vấn ra ID thật
    $idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
    if ($idNguoiMua === 0) {
        die("<script>alert('Vui lòng đăng nhập!'); window.location.href='../../dangnhap.php';</script>");
    }

    $stmtCheck = $conn->prepare("SELECT ID_Nguoi_Ban FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ?");
    $stmtCheck->bind_param("i", $idNguoiMua);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    if ($resultCheck->num_rows === 0) {
        die("<script>alert('Không tìm thấy kênh người bán.'); window.location.href='../../Dangkykenh.php';</script>");
    }
    $idNguoiBan = $resultCheck->fetch_assoc()['ID_Nguoi_Ban'];
    $stmtCheck->close();

    // Lấy dữ liệu từ form
    $ten = $_POST['Ten_San_Pham'];
    $giaGoc = $_POST['Gia_Goc'];
    $giaBan = $_POST['Gia_Ban'];
    $soLuong = $_POST['So_Luong_Ton'];
    $moTa = $_POST['Mo_Ta'];
    $thuongHieu = $_POST['Thuong_Hieu'] ?? 'No brand';
    $xuatXu = $_POST['Xuat_Xu'] ?? 'Việt Nam';
    $tinhTrang = $_POST['Tinh_Trang'] ?? '';
    $hanBaoHanh = $_POST['Han_Bao_Hanh'] ?? '';
    $loaiBaoHanh = $_POST['Loai_Bao_Hanh'] ?? '';
    $idDanhMuc = intval($_POST['ID_Danh_Muc']);

    // Xử lý hình ảnh
    $anh1 = addslashes(file_get_contents($_FILES['Anh_San_Pham1']['tmp_name']));
    $anh2 = addslashes(file_get_contents($_FILES['Anh_San_Pham2']['tmp_name']));
    $anh3 = addslashes(file_get_contents($_FILES['Anh_San_Pham3']['tmp_name']));
    $anhBia = addslashes(file_get_contents($_FILES['Anh_Bia']['tmp_name']));

    // Bước 1: Thêm sản phẩm
    $stmt1 = $conn->prepare("INSERT INTO San_Pham (Ten_San_Pham, Gia_Goc, Gia_Ban, So_Luong_Ton, ID_Danh_Muc, ID_Nguoi_Ban, Anh_San_Pham1, Anh_San_Pham2, Anh_San_Pham3, Anh_Bia)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt1->bind_param("sddiiissss", $ten, $giaGoc, $giaBan, $soLuong, $idDanhMuc, $idNguoiBan, $anh1, $anh2, $anh3, $anhBia);

    if ($stmt1->execute()) {
        $idSanPham = $conn->insert_id;

        // Bước 2: Thêm chi tiết sản phẩm
        $stmt2 = $conn->prepare("INSERT INTO Chi_Tiet_San_Pham (ID_San_Pham, Mo_Ta_Chi_Tiet, Tinh_Trang, Han_Bao_Hanh, Loai_Bao_Hanh, Thuong_Hieu, Xuat_Xu)
        VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt2->bind_param("issssss", $idSanPham, $moTa, $tinhTrang, $hanBaoHanh, $loaiBaoHanh, $thuongHieu, $xuatXu);

        if ($stmt2->execute()) {
            echo "<script>alert('\u2705 Thêm sản phẩm thành công!'); window.location.href='../../KenhNguoiBan.php';</script>";
        } else {
            echo "<script>alert('\u274c Thêm chi tiết sản phẩm thất bại: {$stmt2->error}');</script>";
        }
        $stmt2->close();
    } else {
        echo "<script>alert('\u274c Thêm sản phẩm thất bại: {$stmt1->error}');</script>";
    }
    $stmt1->close();
}
$conn->close();
