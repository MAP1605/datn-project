<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Gán tạm người dùng nếu chưa đăng nhập (test)
if (!isset($_SESSION['ID_Nguoi_Mua'])) {
    $_SESSION['ID_Nguoi_Mua'] = 1;
}
$id_nguoi_mua = $_SESSION['ID_Nguoi_Mua'];

// Kết nối DB
$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
    die("Lỗi kết nối: " . $conn->connect_error);
}

// Xử lý xoá
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['xoa_sp'])) {
    $id_gio_hang = $_POST['xoa_id_gio_hang'];
    $conn->query("DELETE FROM Chi_Tiet_Gio_Hang WHERE ID_Gio_Hang = $id_gio_hang");
    $conn->query("DELETE FROM Gio_Hang WHERE ID_Gio_Hang = $id_gio_hang");
    header("Location: cart.php");
    exit;
}

// Lấy giỏ hàng theo người dùng
$sql = "SELECT gh.ID_Gio_Hang, sp.ID_San_Pham, sp.Ten_San_Pham, sp.Gia_Ban, sp.Anh_San_Pham1, ctgh.So_Luong
        FROM Gio_Hang gh
        JOIN Chi_Tiet_Gio_Hang ctgh ON gh.ID_Gio_Hang = ctgh.ID_Gio_Hang
        JOIN Chi_Tiet_San_Pham ctsp ON ctgh.ID_Chi_Tiet_San_Pham = ctsp.ID_Chi_Tiet_San_Pham
        JOIN San_Pham sp ON ctsp.ID_San_Pham = sp.ID_San_Pham
        WHERE gh.ID_Nguoi_Mua = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_nguoi_mua);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    $row['Anh_San_Pham1'] = base64_encode($row['Anh_San_Pham1']);
    $items[] = $row;
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PearNK - Giỏ hàng</title>

    <!-- CSS chính -->
    <link rel="stylesheet" href="/datn-project/datn-project/css/main.css" />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <!-- logo ở tên miền -->
    <link rel="icon" type="image/png" href="/datn-project/assets/images/CuongDao__Logo-PEARNK.png" sizes="16x16">
</head>

<body>
    <!-- Header dùng chung -->
    <div id="header"></div>

    <main>
        <div class="container">
            <div class="cart container">

                <div class="cart__table">
                    <div class="cart__header">
                        <div class="cart__col cart__col--checkbox">
                            <input type="checkbox" id="selectAll" />
                        </div>
                        <div class="cart__col cart__col--product">Sản phẩm</div>
                        <div class="cart__col cart__col--price">Đơn giá</div>
                        <div class="cart__col cart__col--quantity">Số lượng</div>
                        <div class="cart__col cart__col--total">Số tiền</div>
                        <div class="cart__col cart__col--action">Thao tác</div>
                    </div>

                    <div class="cart__body" id="cartBody">
                        <?php foreach ($items as $item): ?>
                            <div class="cart__row">
                                <div class="cart__col cart__col--checkbox">
                                    <input type="checkbox" />
                                </div>

                                <div class="cart__col cart__col--product">
                                    <div class="cart__product-wrapper">
                                        <img src="get-image.php?id=<?= $item['ID_San_Pham'] ?>" class="cart__img" alt="<?= $item['Ten_San_Pham'] ?>">
                                        <span class="cart__product-name"><?= $item['Ten_San_Pham'] ?></span>
                                    </div>
                                </div>

                                <div class="cart__col cart__col--price">₫<?= number_format($item['Gia_Ban']) ?></div>

                                <div class="cart__col cart__col--quantity"><?= $item['So_Luong'] ?></div>

                                <div class="cart__col cart__col--total">
                                    ₫<?= number_format($item['Gia_Ban'] * $item['So_Luong']) ?>
                                </div>

                                <div class="cart__col cart__col--action">
                                    <form method="POST">
                                        <input type="hidden" name="xoa_id_gio_hang" value="<?= $item['ID_Gio_Hang'] ?>">
                                        <button type="submit" name="xoa_sp" class="cart__btn cart__btn--delete">Xoá</button>
                                    </form>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="cart__footer">
                    <div class="cart__footer-left">
                        <input type="checkbox" id="selectAllBottom" />
                        <label for="selectAllBottom">Chọn tất cả</label>
                        <button class="cart__btn cart__btn--delete">Xoá</button>
                    </div>
                    <div class="cart__footer-right">
                        <span class="cart__total-label">Tổng cộng:</span>
                        <span class="cart__total-price" id="cartTotal">0₫</span>
                        <button class="cart__btn cart__btn--checkout">Mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer dùng chung -->
    <div id="footer"></div>

    <script>
        let cartItems = <?= json_encode($items, JSON_UNESCAPED_UNICODE) ?>;
    </script>

    <!-- JS: load component header/footer  -->
    <script type="module" src="/datn-project/datn-project/js/utils/components-loader-pages.js"></script>
    <script type="module" src="../js/pages/cart.js"></script>

    <script type="module" src="../js/pages/cart-items.js"></script>
</body>

</html>