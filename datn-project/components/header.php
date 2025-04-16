<!-- Start header (components) -->
<?php

session_start();

if (session_status() === PHP_SESSION_NONE) session_start();

?>

<?php if (!isset($_SESSION['ID_Nguoi_Mua'])): ?>
    <!-- Hiện login/register -->
<?php else: ?>
    <!-- Hiện avatar -->
  
<?php endif; ?>

<header class="header">
    <div class="container">

        <!-- Header top -->
        <div class="header__top">

            <div class="header__top-left">
                <a href="../pages/Dangkykenh.html" class="header__link">
                    <a href="/datn-project/datn-project/pages/Dangkykenh.php" class="header__link">

                      Kênh người bán
                    </a>
            </div>
            <div class="header__top-right">
                <?php if (!isset($_SESSION['ID_Nguoi_Mua'])): ?>
                    <div class="headerAuth">
                        <a href="/datn-project/datn-project/pages/dangnhap.php" class="header__link">Đăng nhập</a>
                        <a href="/datn-project/datn-project/pages/dangky.php" class="header__link">Đăng ký</a>
                    </div>
                <?php else: ?>
                    <div class="header__user" style="display: inline-flex;">
                        <img src="/datn-project/assets/images/logo/CuongDao__Logo-PEARNK.png" class="header__user-avatar">
                        <span class="header__user-name">
                            <!-- Tên người dùng đăng nhập xong dang sai -->
                            <span class="header__user-name">Khách hàng <?= htmlspecialchars($_SESSION['ID_Nguoi_Mua'] )  ?></span>
                        <div class="header__user-dropdown">
                            <ul>
                            <a href="/datn-project/datn-project/pages/Giaodiennguoidung.php">
                                    <li>Tài Khoản Của Tôi</li>
                                </a>
                                <a href="/datn-project/datn-project/pages/Donmua.php">
                                    <li>Đơn Mua</li>
                                </a>
                                <a href="/datn-project/datn-project/pages/dangxuat.php">
                                    <li>Đăng Xuất</li>
                                </a>
                                
                            </ul>
                        </div>
                    </div>
                <?php endif; ?>

            </div>


        </div>
        <!-- Header main -->
        <div class="header__main">
            <div class="header__logo">

                <a href="../index.php" class="header__logo-link">
                    <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-c600-5230-ab7e-417edaa36d6a/raw?se=2025-04-16T15%3A45%3A33Z&sp=r&sv=2024-08-04&sr=b&scid=498bd152-a697-516f-9d2b-c2d7eaab1e6b&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-16T05%3A10%3A02Z&ske=2025-04-17T05%3A10%3A02Z&sks=b&skv=2024-08-04&sig=RAW0gdA6bWlh/fmBu3W2M80S1tBZsiSiOCo/CcAf2OY%3D" alt="">
                </a>
            </div>

            <!-- Tìm kiếm  -->
            <form action="/datn-project/datn-project/pages/search.php" method="GET" class="header__search">

                <input type="text" name="q" placeholder="Tìm sản phẩm..." class="header__search-input" required />
                <button type="submit" class="header__search-btn">
                    <i class="fa-solid fa-magnifying-glass header__search-icon"></i>
                </button>
            </form>


            <!-- Giỏ hàng -->
            <div class="header__cart">
                <i class="fa-solid fa-cart-shopping header__cart-icon"></i>
                <span class="header__cart-count">0</span>
                <div class="header__cart-dropdown">
                    <h4 class="header__cart-title">Sản phẩm mới thêm</h4>

                    <ul class="header__cart-list">
                    </ul>
                    <div class="header__cart-total">Tổng: <b>₫0</b></div>
                    <div class="header__cart-footer">
                        <a href="/datn-project/datn-project/pages/cart.php" class="header__cart-btn">Xem giỏ hàng</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</header>
<!-- End header (components) -->