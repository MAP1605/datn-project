<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PearNK - Trang chủ</title>
    <!-- CSS (main) -->
    <link rel="stylesheet" href="/datn-project/datn-project/css/main.css">
    <!-- CSS (font) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <!-- CSS (icon) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- logo ở tên miền -->

    <link rel="icon" type="image/png" href="../datn-project/assets/images/logo/CuongDao__Logo-PEARNK.png" sizes="16x16">


</head>

<body>
    <!-- Start header -->
    <header id="header">

    </header>
    <!-- End header -->

    <main>
        <!-- Start banner -->
        <div id="banner">

        </div>
        <!-- End banner -->

        <!-- Start category (danh mục) -->
        <div id="category2">
            <?php include 'category.php'; ?>
        </div>
        <!-- End category (danh mục) -->

        <!-- Start prodcut -->
        <div id="products">
            <?php include 'product.php'; ?>
        </div>
        <!-- End prodcut -->
    </main>

    <!-- Start footer -->
    <footer id="footer">
    </footer>
    <!-- End footer -->

    <!-- JS: load component (header/banner/category/product/footer) -->
    <script type="module" src="/datn-project/datn-project/js/utils/components-loader.js"></script>
    <script type="module" src="/datn-project/datn-project/js/pages/product.js"></script>
</body>

</html>