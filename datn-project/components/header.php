<!-- Start header (components) -->
<header class="header">
    <div class="container">

        <!-- Header top -->
        <div class="header__top">

            <div class="header__top-left">
                <a href="../pages/Dangkykenh.html" class="header__link">
                    <a href="/datn-project/datn-project/pages/Dangkykenh.php" class="header__link">
                        Kênh Người Bán
                    </a>
            </div>
            <div class="header__top-right">
                <!-- <a href="/datn-project/datn-project/pages/dangnhap.html" class="header__link">

                <a href="/datn-project/datn-project/pages/dangnhap.php" class="header__link">
                    Đăng nhập
                </a>
                <a href="/datn-project/datn-project/pages/dangky.php" class="header__link">
                    Đăng ký
                </a> -->
                <div class="header__user">

                    <img src="/datn-project/datn-project/assets/images/logo/CuongDao__Logo-PEARNK.png" alt="user_Avatar"
                        class="header__user-avatar">
                    <span class="header__user-name">DŨNG đb</span>
                    <div class="header__user-dropdown">
                        <ul>
                            <a href="/datn-project/datn-project/pages/Giaodiennguoidung.php">
                                <li>Tài Khoản Của Tôi</li>
                            </a>
                            <a href="/datn-project/datn-project/pages/Donmua.php">
                                <li>Đơn Mua</li>
                            </a>
                            <a href="/datn-project/datn-project/pages/dangnhap.php">
                                <li>Đăng Xuất</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <!-- Header main -->
        <div class="header__main">
            <div class="header__logo">


                <a href="/datn-project/datn-project/index.php" class="header__logo-link">
                    <img src="/datn-project/assets/images/logo/CuongDao__Logo-PEARNK.png" alt="">


                </a>
            </div>

            <!-- Tìm kiếm  -->
            <form action="/datn-project/datn-project/pages/search.php" method="GET" class="header__search">
                <input type="text" name="q" placeholder="Tìm sản phẩm..." class="header__search-input"
                    value="<?= htmlspecialchars($_GET['q'] ?? '') ?>" />
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
                        <a href="../pages/cart.php" class="header__cart-btn">Xem giỏ hàng</a>
                    </div>
                </div>
            </div>


        </div>
    </div>
</header>
<!-- End header (components) -->

<script type="module" src="/datn-project/js/pages/cart-items.js"></script>