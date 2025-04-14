<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ho so nguoi dung</title>

    <!-- CSS (main) -->
    <link rel="stylesheet" href="../css/main.css">
    <!-- CSS (font) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- CSS (icon) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

</head>

<body>

    <div id="header">

    </div>
    <div class="main">
        <div class="container">
            <button class="mobile-menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <div class="user-main user-main--Address">
                <aside class="user-main__sidebar">
                    <div class="mobile-overlay" id="mobileOverlay"></div>
                    <img src="" alt="Avatar" class="user-main__avatar">


                    <nav class="user-main__nav">
                        <ul class="user-main__nav-list">
                            <li>
                                <h2 class="user-main__nav-title">Sửa hồ sơ</h2>
                            </li>
                            <li><a class="user-main__nav-link" href="../pages/Giaodiennguoidung.php">Hồ sơ</a></li>
                            <li><a class="user-main__nav-link" href="../pages/DiachiUse.php">Địa chỉ</a></li>
                            <li><a class="user-main__nav-link Select-screen-function" href="../pages/doimatkhau.php">Đổi mật khẩu</a></li>
                            <li><a class="user-main__nav-link" href="../pages/Donmua.php">Đơn mua</a></li>

                        </ul>
                    </nav>
                </aside>

                <main class="user-main__content">
                    <div class="user-main__form-wrapper">
                        <form class="profile__form" id="passwordChangeForm">
                            <h2 class="profile__heading">Đổi mật khẩu</h2>
                            <label class="profile__label">Mật khẩu cũ</label>
                            <input class="profile__input" type="password" id="oldPassword">

                            <label class="profile__label">Mật khẩu mới</label>
                            <input class="profile__input" type="password" id="newPassword">

                            <label class="profile__label">Nhập lại mật khẩu</label>
                            <input class="profile__input" type="password" id="confirmPassword">

                            <div class="profile__button-save">
                                <button class="profile__submit" type="submit" id="changePasswordBtn">Chấp nhận thay đổi</button>
                            </div>
                        </form>
                        <div id="toast" class="toast"></div>

                    </div>
                </main>
            </div>
        </div>
    </div>
    </div>

    <div id="footer"></div>
    <script type="module" src="../js/utils/components-loader-pages.js"></script>
    <script src="../js/components/Giaodiennguoidung.js"></script>
    <script src="../js/components/Doimatkhau.js"></script>
</body>

</html>