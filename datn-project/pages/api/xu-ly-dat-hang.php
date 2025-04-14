<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) die('DB connection failed');

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
$sanPham = json_decode($_POST['sanPham'] ?? '[]', true);
$diaChiID = intval($_POST['diaChiID'] ?? 0);
$phuongThuc = $_POST['phuongThuc'] ?? 'Thanh toán khi nhận hàng';

if (!$idNguoiMua || empty($sanPham)) {
    echo 'Thiếu dữ liệu';
    exit;
}

// Nhóm theo ID_Nguoi_Ban
$grouped = []; // [ID_Nguoi_Ban => list sản phẩm]

foreach ($sanPham as $sp) {
    $idCTGH = intval($sp['idCTGH']);
    $sl = intval($sp['soLuong']);

    $qr = $conn->query("
        SELECT ctsp.ID_San_Pham, sp.ID_Nguoi_Ban, sp.Gia_Ban
        FROM Chi_Tiet_Gio_Hang ctgh
        JOIN Chi_Tiet_San_Pham ctsp ON ctgh.ID_Chi_Tiet_San_Pham = ctsp.ID_Chi_Tiet_San_Pham
        JOIN San_Pham sp ON ctsp.ID_San_Pham = sp.ID_San_Pham
        WHERE ctgh.ID_Chi_Tiet_Gio_Hang = $idCTGH
        LIMIT 1
    ");

    if ($qr && $qr->num_rows > 0) {
        $row = $qr->fetch_assoc();
        $idNB = $row['ID_Nguoi_Ban'];
        $grouped[$idNB][] = [
            'idCTGH'     => $idCTGH,
            'idSanPham'  => $row['ID_San_Pham'],
            'soLuong'    => $sl,
            'giaBan'     => intval($row['Gia_Ban'])
        ];
    }
}

// Xử lý từng nhóm theo shop
foreach ($grouped as $idNB => $dsSP) {
    $tongTien = 0;

    foreach ($dsSP as $sp) {
        $tongTien += $sp['soLuong'] * $sp['giaBan'];
    }

    $phiSanGiuLai = round($tongTien * 0.03);
    $soTienNhanDuoc = $tongTien - $phiSanGiuLai;

    // Tạo hóa đơn
    $conn->query("INSERT INTO Hoa_Don (
        ID_Nguoi_Mua,
        Ngay_Dat_Hang,
        Tong_Tien_Hoa_Don,
        Phuong_Thuc_Thanh_Toan,
        ID_Dia_Chi_Nhan_Hang
    ) VALUES (
        $idNguoiMua,
        NOW(),
        $tongTien,
        '$phuongThuc',
        $diaChiID
    )");

    $idHoaDon = $conn->insert_id;

    // Tạo chi tiết hóa đơn
    foreach ($dsSP as $sp) {
        $idSP = $sp['idSanPham'];
        $sl = $sp['soLuong'];
        $conn->query("INSERT INTO Chi_Tiet_Hoa_Don (ID_Hoa_Don, ID_San_Pham, So_Luong)
                      VALUES ($idHoaDon, $idSP, $sl)");
    }

    // Tạo đơn hàng seller
    $conn->query("INSERT INTO Don_Hang_Seller (
        Trang_Thai_Don_Hang,
        Phi_Van_Chuyen,
        Phi_San_Giu_Lai,
        So_Tien_Nhan_Duoc,
        Thoi_Gian_Dat_Hang,
        ID_Nguoi_Ban,
        ID_Hoa_Don
    ) VALUES (
        'Chờ xác nhận',
        0,
        $phiSanGiuLai,
        $soTienNhanDuoc,
        NOW(),
        $idNB,
        $idHoaDon
    )");

    $idDH = $conn->insert_id;

    // Tạo thanh toán seller
    $conn->query("INSERT INTO Thanh_Toan_Seller (
        Trang_Thai_Thanh_Toan,
        Ngay_Thanh_Toan,
        ID_Don_Hang_Seller
    ) VALUES (
        'Chưa thanh toán',
        NOW(),
        $idDH
    )");
}

// Xóa khỏi giỏ hàng
$allID = array_map(fn($sp) => intval($sp['idCTGH']), $sanPham);
$idStr = implode(',', $allID);
$conn->query("DELETE FROM Chi_Tiet_Gio_Hang WHERE ID_Chi_Tiet_Gio_Hang IN ($idStr)");

echo 'success';
