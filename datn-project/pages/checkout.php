<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Kết nối DB
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;
$selectedIds = $_GET['ids'] ?? [];
echo "<pre>";
print_r($selectedIds);
echo "</pre>";
$items = [];

if (!is_array($selectedIds) || empty($selectedIds)) {
    echo "<script>alert('Không có sản phẩm nào được chọn!');</script>";
} else {
    $idStr = implode(',', array_map('intval', $selectedIds));
    $sql = "SELECT ctgh.ID_Chi_Tiet_Gio_Hang,
    sp.Ten_San_Pham AS name,
    sp.Gia_Ban AS price,
    sp.Anh_San_Pham1 AS image,
    ctgh.So_Luong AS quantity
FROM Chi_Tiet_Gio_Hang ctgh
JOIN Chi_Tiet_San_Pham ctsp ON ctgh.ID_Chi_Tiet_San_Pham = ctsp.ID_Chi_Tiet_San_Pham
JOIN San_Pham sp ON ctsp.ID_San_Pham = sp.ID_San_Pham
WHERE ctgh.ID_Chi_Tiet_Gio_Hang IN ($idStr)
AND ctgh.ID_Gio_Hang IN (
   SELECT ID_Gio_Hang FROM Gio_Hang WHERE ID_Nguoi_Mua = $idNguoiMua
)";

    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        // ✅ Chuyển ảnh sang base64 để hiển thị
        $row['image'] = 'data:image/jpeg;base64,' . base64_encode($row['image']);
        $items[] = $row;
    }
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PearNK - Thanh toán</title>
    <link rel="stylesheet" href="/datn-project/datn-project/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="icon" type="image/png" href="/datn-project/assets/images/CuongDao__Logo-PEARNK.png" sizes="16x16">
</head>

<body>

    <header id="header"></header>

    <main>
        <div class="checkout-container">
        <section class="checkout-address">
                <div class="checkout-address__header">
                    <div class="checkout-address__title">Địa chỉ nhận hàng</div>
                    <button class="checkout-Select-Address">Chọn địa chỉ</button>
                </div>

                <div class="checkout-address__info">
                    <strong>Đào Việt Cường</strong> &nbsp; (+84) 868897782 <br />
                    Số nhà 9 liên kề 23 khu đô thị La Khê Hà Đông, Phường La Khê, Hà Đông, Hà Nội
                </div>
            </section>

            <section class="checkout-products">
                <div class="checkout-products__header">
                    <div class="col col--product">Sản phẩm</div>
                    <div class="col col--price">Đơn giá</div>
                    <div class="col col--qty">Số lượng</div>
                    <div class="col col--total">Thành tiền</div>
                </div>
            </section>

            <section class="checkout-summary">
                <div class="checkout-summary__row">
                    <span>Tổng tiền hàng:</span>
                    <strong id="checkoutTotal">0đ</strong>
                </div>
                <div class="checkout-summary__row">
                    <span>Phí vận chuyển:</span>
                    <strong>25.000đ</strong>
                </div>
                <div class="checkout-summary__row checkout-summary__total">
                    <span>Tổng thanh toán:</span>
                    <strong id="checkoutFinal">25.000đ</strong>
                </div>
            </section>

            <section class="checkout-method">
                <h3>Phương thức thanh toán</h3>
                <label><input type="radio" name="payment" checked /> Thanh toán khi nhận hàng</label><br />
            </section>

            <section class="checkout-action">
                <button class="checkout-action__btn" > <a href="/datn-project/datn-project/pages/Donmua.html">Đặt hàng</a></button>
            </section>
        </div>
    </main>

    <footer id="footer"></footer>

    <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>

    <!-- Biến cart từ PHP -->
    <script>
        const cart = <?= json_encode($items, JSON_UNESCAPED_UNICODE) ?>;
    </script>

<script type="module" src="/datn-project/datn-project/js/pages/checkout.js"></script>

    <script>
        // ✅ Lấy ID từ URL (dù là ?ids=1&ids=2 hay ?ids[]=1&ids[]=2 đều được)
        const urlParams = new URLSearchParams(window.location.search);
        const ids = urlParams.getAll('ids[]').length > 0 ?
            urlParams.getAll('ids[]') :
            urlParams.getAll('ids'); // fallback nếu browser đổi cú pháp

        const parsedIds = ids.map(id => parseInt(id));
        localStorage.setItem('selectedCartIds', JSON.stringify(parsedIds));
    </script>
 
</body>

</html>