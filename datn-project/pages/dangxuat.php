<?php
session_start();
session_destroy(); // Xoá toàn bộ session

// Quay về trang đăng nhập
header("Location: /datn-project/datn-project/pages/dangnhap.php");
exit;