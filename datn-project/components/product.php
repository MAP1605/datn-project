<!-- Start product (Gợi ý hôm nay) -->
<section class="products">
    <div class="container container__product">
        <h2 class="product__title">GỢI Ý HÔM NAY</h2>

        <div class="product__list" id="product-list">
            <!-- Product item -->
            <?php
            include 'db.php';

            // Lấy tối đa 30 sản phẩm
            $sql = "SELECT * FROM San_Pham ORDER BY RAND() LIMIT 30";
            $result = $conn->query($sql);
            ?>

            <div class="product__list" id="product-list">
                <?php while ($row = $result->fetch_assoc()) { ?>
                    <div class="product__item">
                        <div class="product__img-wrap">
                            <img src="<?php echo $row['Anh_San_Pham']; ?>" alt="<?php echo $row['Ten_San_Pham']; ?>" class="product__img" />
                            <span class="product__discount-tag">
                                <?php
                                $discount = 0;
                                if ($row['Gia_Goc'] > 0) {
                                    $discount = round((($row['Gia_Goc'] - $row['Gia_Ban']) / $row['Gia_Goc']) * 100);
                                }
                                echo $discount > 0 ? "-{$discount}%" : "";
                                ?>
                            </span>
                        </div>
                        <h3 class="product__name"><?php echo $row['Ten_San_Pham']; ?></h3>
                        <div class="product__price-wrap">
                            <span class="product__price"><?php echo number_format($row['Gia_Ban'], 0, ',', '.') . 'đ'; ?></span>
                            <span class="product__price-old"><?php echo number_format($row['Gia_Goc'], 0, ',', '.') . 'đ'; ?></span>
                        </div>
                        <div class="product__meta">
                            <span class="product__stars">⭐ <?php echo $row['So_Sao_Danh_Gia']; ?></span>
                            <span class="product__sold">Đã bán <?php echo $row['So_Luong_Da_Ban']; ?></span>
                        </div>
                    </div>
                <?php } ?>
            </div>

            <!-- Product item--hidden -->
            <div class="product__item product__item--hidden">
                <div class="product__img-wrap">
                    <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m5286rhwgkza9b.webp"
                        alt="Tên sản phẩm" class="product__img" />
                    <span class="product__discount-tag">-20%</span>
                </div>
                <h3 class="product__name">Xe Điện XBull - Phiên Bản 2025 Công Nghệ Hiện Đại</h3>
                <div class="product__price-wrap">
                    <span class="product__price">9.200.000đ</span>
                    <span class="product__price-old">11.500.000đ</span>
                </div>
                <div class="product__meta">
                    <span><i class="fa-solid fa-star"></i> 4.5</span>
                    <span class="product__sold">Đã bán 2.5k</span>
                </div>
            </div>
        </div>

    </div>
    <!-- Button xem thêm -->
    <div class="product__see-more-wrap">
        <!-- <a href="" class="product__see-more-btn">Xem thêm</a> -->
        <button class="product__see-more-btn" id="show-more-product">Xem thêm</button>
    </div>
    </div>
</section>
<!-- End product -->