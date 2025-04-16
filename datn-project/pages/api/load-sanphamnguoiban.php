<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("<tr><td colspan='8'>Lỗi kết nối CSDL</td></tr>");
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
$sqlGetSeller = "SELECT ID_Nguoi_Ban FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ?";
$stmt = $conn->prepare($sqlGetSeller);
$stmt->bind_param("i", $idNguoiMua);
$stmt->execute();
$idNguoiBan = $stmt->get_result()->fetch_assoc()['ID_Nguoi_Ban'] ?? 0;

$sql = "SELECT * FROM San_Pham WHERE ID_Nguoi_Ban = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idNguoiBan);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()):
    $ten = htmlspecialchars($row['Ten_San_Pham']);
    $soLuong = $row['So_Luong'];
    $gia = number_format($row['Gia_Ban'], 0, ',', '.') . "đ";
    $daBan = $row['Da_Ban'] ?? 0;
    $trangThai = $row['Trang_Thai'] ?? "Đang bán";
    $classTrangThai = match ($trangThai) {
        "Đang bán" => "status-selling",
        "Ngừng bán" => "status-Stop_selling",
        "Ăn gậy" => "status-ban",
        default => "status-other"
    };
    $srcAnh = !empty($row['Anh_San_Pham1'])
        ? "data:image/jpeg;base64," . base64_encode($row['Anh_San_Pham1'])
        : "../assets/images/logo/default-product.png";
?>
    <tr class="product-row" data-status="<?= $trangThai ?>">
        <td><input type="checkbox" class="product-checkbox"></td>
        <td class="btn-chi-tiet-san-pham">
            <img src="<?= $srcAnh ?>" class="product-list_img" alt="Hình ảnh" width="80px">
        </td>
        <td class="btn-chi-tiet-san-pham"><?= $ten ?></td>
        <td class="btn-chi-tiet-san-pham"><?= $soLuong ?></td>
        <td class="btn-chi-tiet-san-pham"><?= $gia ?></td>
        <td class="btn-chi-tiet-san-pham"><?= $daBan ?></td>
        <td class="btn-chi-tiet-san-pham">
            <span class="<?= $classTrangThai ?>"><?= $trangThai ?></span>
        </td>
        <td>
            <span class="icon btn-delete-product">🗑</span>
            <span class="icon btn-edit-product">🛠</span>
        </td>
    </tr>
<?php endwhile; ?>