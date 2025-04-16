<?php
session_start();

$conn = new mysqli('localhost', 'root', '', 'DATN');
if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}

if (!isset($_SESSION['ID_Nguoi_Mua'])) {
  die("<tr><td colspan='6'>Vui lòng đăng nhập!</td></tr>");
}

$idNguoiMua = $_SESSION['ID_Nguoi_Mua'];

$sqlGetSeller = "SELECT ID_Nguoi_Ban FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ?";
$stmt = $conn->prepare($sqlGetSeller);
$stmt->bind_param("i", $idNguoiMua);
$stmt->execute();
$resultSeller = $stmt->get_result();

if ($resultSeller->num_rows === 0) {
  die("<tr><td colspan='6'>Bạn chưa đăng ký kênh người bán.</td></tr>");
}

$idNguoiBan = $resultSeller->fetch_assoc()['ID_Nguoi_Ban'];

// Lấy đơn hàng
$sqldonhang = "SELECT * FROM Don_Hang_Seller 
INNER JOIN Hoa_Don hd ON Don_Hang_Seller.ID_Hoa_Don = hd.ID_Hoa_Don
WHERE ID_Nguoi_Ban = ? ORDER BY Don_Hang_Seller.ID_Hoa_Don DESC";
$stmt = $conn->prepare($sqldonhang);
$stmt->bind_param("i", $idNguoiBan);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kênh người bán</title>
  <!-- CSS (main) -->
  <link rel="stylesheet" href="../css/main.css" />
  <!-- CSS (font) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

  <!-- CSS (icon) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>

<body>
  <div id="header">
  </div>

  <div class="container">

    <div class="seller-layout">
      <div class="hamburger-icon" id="menu-toggle">
        <i class="fas fa-bars"></i>
      </div>

      <!-- Sidebar bên trái -->
      <aside class="seller-sidebar">
        <ul class="seller-sidebar__menu">
          <li class="seller-sidebar__section">
            <p class="seller-sidebar__title">Quản lý đơn hàng</p>
            <a href="#" id="link-all-orders" class="seller-sidebar__link">Tất cả đơn hàng</a>
          </li>
          <li class="seller-sidebar__section">
            <p class="seller-sidebar__title">Quản lý sản phẩm</p>
            <a href="#" id="link-all-products" class="seller-sidebar__link">Tất cả sản phẩm</a>
            <a href="#" id="link-add-product" class="seller-sidebar__link">Thêm sản phẩm</a>
          </li>
          <li class="seller-sidebar__section">
            <p class="seller-sidebar__title">Thống kê</p>
            <a href="#" id="link-all-vin" class="seller-sidebar__link">Doanh thu</a>
            <a href="#" id="link-add-vin" class="seller-sidebar__link">Ví</a>
          </li>
        </ul>
      </aside>

      <main class="seller-main">

        <div class="container-content">
          <!-- MODAL CHI TIẾT ĐƠN HÀNG -->
          <div id="order-detail-modal" class="modal">
            <div class="modal-content">
              <span class="close close-order-modal">&times;</span>
              <h2>Chi tiết đơn hàng</h2>
              <hr>

              <div class="order-detail-info">
                <p><strong>Mã đơn hàng:</strong> <span class="order-id">#0000</span></p>
                <p><strong>Người nhận:</strong> <span class="order-recipient">---</span></p>
                <p><strong>Địa chỉ:</strong> <span class="order-address">---</span></p>
                <p><strong>Trạng thái đơn hàng:</strong> <span class="order-status label-cancelled">---</span></p>
                <p><strong>Ngày tạo:</strong> <span class="order-date">---</span></p>
              </div>

              <hr>

              <!-- ✅ Chỉ giữ 1 container để JS render sản phẩm -->
              <div class="order-detail-products">
                <div class="order-product-row template" style="display: none;">
                  <div class="order-product-img"><img src="" alt="Hình ảnh" width="50px"></div>
                  <div class="order-product-name"><strong>Tên sản phẩm:</strong> <span>---</span></div>
                  <div class="order-product-qty"><strong>Số lượng:</strong> <span>--</span></div>
                  <div class="order-product-price"><strong>Giá:</strong> <span>---</span></div>
                </div>
              </div>

              <hr>
              <div class="order-detail-summary">
                <p><strong>Số tiền nhận được:</strong> <span class="order-total">---</span></p>
              </div>

              <!-- class="Submit close-order-modal" thay đổi class button Xác nhận -->
              <div class="buttons-ka">
                <button class="Submit btn-xac-nhan">Xác nhận</button>
              </div>
            </div>
          </div>


          <!-- PHẦN DANH SÁCH TẤT CẢ ĐƠN HÀNG -->
          <div id="order-section" class="order-table-container">
            <div class="order-tabs">
              <div class="tab active" data-filter="Tất cả">Tất cả</div>
              <div class="tab" data-filter="Chờ xác nhận">Chờ xác nhận</div>
              <div class="tab" data-filter="Đang giao">Đang giao</div>
              <div class="tab" data-filter="Hoàn thành">Hoàn thành</div>
              <div class="tab" data-filter="Trả hàng">Trả hàng</div>
              <div class="tab" data-filter="Hủy">Hủy</div>
            </div>
            <table class="order-table" cellspacing="0" cellpadding="5">
              <thead>
                <tr>
                  <th><input type="checkbox" id="select-all-orders" /></th>
                  <th>Mã đơn hàng</th>
                  <th>Trạng thái</th>
                  <th>Thời gian đặt hàng</th>
                  <th>Tổng hóa đơn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody id="order-list">
                <?php


                while ($row = $result->fetch_assoc()) {
                  $maDon = $row['ID_Don_Hang_Seller'];
                  $trangThai = $row['Trang_Thai_Don_Hang'];
                  $thoiGian = date("H:i d/m/Y", strtotime($row['Thoi_Gian_Dat_Hang']));
                  $tongTien = number_format($row['Tong_Tien_Hoa_Don'], 0, ',', '.') . '₫';

                  // Tự động gán class màu theo trạng thái
                  $statusClass = match ($trangThai) {
                    'Hoàn thành' => 'status-completed',
                    'Chờ xác nhận' => 'status-pending',
                    'Đã hủy' => 'status-cancel',
                    default => 'status-other'
                  };

                  echo '
    <tr data-status="' . $trangThai . '">
      <td data-label="Chọn"><input type="checkbox" class="order-checkbox" /></td>
      <td data-label="Mã đơn hàng">' . $maDon . '</td>
      <td data-label="Trạng thái"><span class="' . $statusClass . '">' . $trangThai . '</span></td>
      <td data-label="Thời gian đặt hàng">' . $thoiGian . '</td>
      <td data-label="Tổng hóa đơn">' . $tongTien . '</td>
      <td data-label="Hành động">
        <button class="btn btn-outline-primary btn-view-order-detail" data-id="' . $row['ID_Hoa_Don'] . '">Chi tiết</button>
      </td>
    </tr>';
                }

                $conn->close();
                ?>
              </tbody>
            </table>
          </div>
        </div>


        <!-- PHẦN TẤT CẢ SẢN PHẨM -->
        <div id="product-section" class="hidden">
          <div class="section">
            <div class="product-tabs">
              <div class="tab active" data-filter="Tất cả sản phẩm">Tất cả sản phẩm</div>
              <div class="tab" data-filter="Đang bán">Đang bán</div>
              <div class="tab" data-filter="Ăn gậy">Ăn gậy</div>
              <div class="tab" data-filter="Ngừng bán">Ngừng bán</div>
              <button class="btn-add-product"> Thêm mới</button>
            </div>
            <div class="search-bar">
              <input type="text" class="input-search" id="product-search" placeholder="Tìm kiếm sản phẩm...">
            </div>

            <table class="product-table">
              <thead>
                <tr>
                  <th><input type="checkbox" id="select-all-products"></th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Đã bán</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbo<tbody id="product-list">
                <?php
                $conn = new mysqli('localhost', 'root', '', 'DATN');
                if ($conn->connect_error) {
                  die("<tr><td colspan='8'>Kết nối CSDL thất bại</td></tr>");
                }

                session_start();
                $idNguoiMua = $_SESSION['ID_Nguoi_Mua'] ?? 0;

                // Lấy ID_Nguoi_Ban từ ID_Nguoi_Mua
                $sqlGetSeller = "SELECT ID_Nguoi_Ban FROM Nguoi_Ban WHERE ID_Nguoi_Mua = ?";
                $stmt = $conn->prepare($sqlGetSeller);
                $stmt->bind_param("i", $idNguoiMua);
                $stmt->execute();
                $idNguoiBan = $stmt->get_result()->fetch_assoc()['ID_Nguoi_Ban'] ?? 0;

                // Lấy sản phẩm
                $sql = "SELECT * FROM San_Pham WHERE ID_Nguoi_Ban = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("i", $idNguoiBan);
                $stmt->execute();
                $result = $stmt->get_result();

                while ($sp = $result->fetch_assoc()):
                  $ten = htmlspecialchars($sp['Ten_San_Pham']);
                  $soLuong = $sp['So_Luong_Ton'];
                  $gia = number_format($sp['Gia_Ban'], 0, ',', '.') . "đ";
                  $daBan = $sp['Da_Ban'] ?? 0;
                  $trangThai = $sp['Trang_Thai_San_Pham'] ?? "Đang bán";

                  $classTrangThai = match ($trangThai) {
                    "Đang bán" => "status-selling",
                    "Ăn gậy" => "status-blocked",
                    "Ngừng bán" => "status-Stop_selling",
                    default => "status-other"
                  };

                  $srcAnh = !empty($sp['Anh_San_Pham1'])
                    ? "data:image/jpeg;base64," . base64_encode($sp['Anh_San_Pham1'])
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
                </tbody>
            </table>
          </div>
        </div>

        <!-- Thêm sản phẩm  -->
        <div class="Container-ka product-form-ka hidden">
          <div class="Content-ka">
            <section class="product-form-ka">
              <h2>Thông tin cơ bản</h2>
              <form action="/datn-project/datn-project/pages/api/them_sanpham.php" method="POST" enctype="multipart/form-data">
                <!-- Ảnh sản phẩm -->
                <?php
                // Giả sử $sp là dòng dữ liệu lấy từ bảng San_Pham
                $finfo = new finfo(FILEINFO_MIME_TYPE);

                $srcAnh1 = !empty($sp['Anh_San_Pham1']) ? 'data:' . $finfo->buffer($sp['Anh_San_Pham1']) . ';base64,' . base64_encode($sp['Anh_San_Pham1']) : '';
                $srcAnh2 = !empty($sp['Anh_San_Pham2']) ? 'data:' . $finfo->buffer($sp['Anh_San_Pham2']) . ';base64,' . base64_encode($sp['Anh_San_Pham2']) : '';
                $srcAnh3 = !empty($sp['Anh_San_Pham3']) ? 'data:' . $finfo->buffer($sp['Anh_San_Pham3']) . ';base64,' . base64_encode($sp['Anh_San_Pham3']) : '';
                $srcAnhBia = !empty($sp['Anh_Bia']) ? 'data:' . $finfo->buffer($sp['Anh_Bia']) . ';base64,' . base64_encode($sp['Anh_Bia']) : '';
                ?>

                <div class="from-group-ka">
                  <label>Hình ảnh bìa:</label>
                  <div class="img-box-ka" id="product-image-box">
                    <input type="file" accept="image/*" name="Anh_San_Pham1" id="product-image-input" style="display: none;">
                    <img id="product-image-preview" style="max-width: 100%; display: none;" />
                    <span class="img-text">Hình ảnh sản phẩm</span>
                  </div>
                </div>

                <div class="from-group-ka">
                  <label>Hình ảnh sản phẩm:</label>
                  <div class="img-box-ka product-image-box">
                    <input type="file" accept="image/*" name="Anh_San_Pham2" class="product-image-input" style="display: none;">
                    <img class="product-image-preview" style="max-width: 100%; display: none;" />
                    <span class="img-text">Hình ảnh sản phẩm</span>
                  </div>
                </div>

                <div class="from-group-ka">
                  <label>Hình ảnh sản phẩm:</label>
                  <div class="img-box-ka product-image-box">
                    <input type="file" accept="image/*" name="Anh_San_Pham3" class="product-image-input" style="display: none;">
                    <img class="product-image-preview" style="max-width: 100%; display: none;" />
                    <span class="img-text">Hình ảnh sản phẩm</span>
                  </div>
                </div>

                <!-- Ảnh bìa -->
                <div class="from-group-ka">
                  <label>Ảnh ảnh sản phẩm:</label>
                  <div class="img-box-ka" id="cover-image-box">
                    <input type="file" accept="image/*" name="Anh_Bia" id="cover-image-input" style="display: none;">
                    <img id="cover-image-preview" style="max-width: 100%; display: none;" />
                    <span class="img-text">Ảnh bìa</span>
                  </div>
                </div>

                <!-- Thông tin sản phẩm -->
                <div class="from-group-ka">
                  <label>Tên sản phẩm:</label>
                  <input type="text" id="product-name" name="Ten_San_Pham" required>
                </div>

                <div class="from-group-ka">
                  <label>Giá gốc:</label>
                  <input type="number" name="Gia_Goc" required>
                </div>

                <div class="from-group-ka">
                  <label>Giá bán:</label>
                  <input type="number" name="Gia_Ban" required>
                </div>

                <div class="from-group-ka">
                  <label>Số lượng tồn:</label>
                  <input type="number" name="So_Luong_Ton" required>
                </div>

                <div class="from-group-ka">
                  <label for="product-status">Tình trạng:</label>
                  <select id="product-status" class="product-form__select" name="Tinh_Trang" required>
                    <option value="">-- Chọn tình trạng --</option>
                    <option value="Mới">Mới</option>
                    <option value="Đã qua sử dụng">Đã qua sử dụng</option>
                  </select>
                </div>

                <div class="from-group-ka">
                  <label>Hạn bảo hành:</label>
                  <input type="text" name="Han_Bao_Hanh">
                </div>

                <div class="from-group-ka">
                  <label>Loại bảo hành:</label>
                  <input type="text" name="Loai_Bao_Hanh">
                </div>

                <?php
                $conn = new mysqli("localhost", "root", "", "DATN");
                if ($conn->connect_error) {
                  die("Lỗi kết nối CSDL");
                }

                $sql = "SELECT ID_Danh_Muc, Ten_Danh_Muc FROM Danh_Muc WHERE Trang_Thai = 'Hoạt động'";
                $result = $conn->query($sql);
                ?>
                <div class="from-group-ka">
                  <label for="product-category">Danh mục:</label>
                  <select id="product-category" class="product-form__select" name="ID_Danh_Muc" required>
                    <option value="">-- Chọn danh mục --</option>
                    <?php while ($row = $result->fetch_assoc()): ?>
                      <option value="<?= $row['ID_Danh_Muc'] ?>">
                        <?= htmlspecialchars($row['Ten_Danh_Muc']) ?>
                      </option>
                    <?php endwhile; ?>
                  </select>
                </div>

                <div class="from-group-ka">
                  <label>Mô tả sản phẩm:</label>
                  <textarea class="textareas" name="Mo_Ta"></textarea>
                </div>

                <!-- Thông tin chi tiết -->
                <h2>Thông tin chi tiết</h2>
                <div class="from-group-ka">
                  <label>Thương hiệu:</label>
                  <input type="text" value="No brand" id="product-brand" name="Thuong_Hieu">
                </div>

                <div class="from-group-ka">
                  <label>Xuất xứ:</label>
                  <input type="text" value="Việt Nam" id="product-origin" name="Xuat_Xu">
                </div>

                <!-- Buttons -->
                <div class="buttons-ka">
                  <button type="button" class="Cancel">Hủy</button>
                  <button type="submit" class="Submit">Thêm sản phẩm</button>
                </div>
              </form>
            </section>
          </div>
        </div>


        <!-- khu vực sửa sản phẩm -->
        <div class="Container-sua hidden">
          <h2>Sửa sản phẩm</h2>
          <form>
            <div class="from-group-ka">
              <label>Tên sản phẩm:</label>
              <input type="text" id="edit-name">
            </div>
            <div class="from-group-ka">
              <label>Giá:</label>
              <input type="text" id="edit-price">
            </div>
            <div class="from-group-ka">
              <label>Thương hiệu:</label>
              <input type="text" id="edit-name">
            </div>
            <div class="from-group-ka">
              <label>Xuất xứ:</label>
              <input type="text" id="edit-name">
            </div>
            <div class="from-group-ka">
              <label>Kho hàng:</label>
              <input type="text" id="edit-stock">
            </div>
            <div class="buttons-ka">
              <button type="button" class="Cancel">Hủy</button>
              <button type="button" class="Update">Cập nhật</button>
            </div>
          </form>
        </div>

        <!-- MODAL chi tiết sản phẩm  -->
        <!-- Sẽ fix bug thông tin chi tiết sản phẩm sau -->
        <?php
        session_start();
        $conn = new mysqli('localhost', 'root', '', 'DATN');
        if ($conn->connect_error) {
          die("Kết nối CSDL thất bại");
        }

        $idSanPham = $_GET['id'] ?? 0;
        $sql = "SELECT * FROM San_Pham WHERE ID_San_Pham = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idSanPham);
        $stmt->execute();
        $result = $stmt->get_result();
        $sp = $result->fetch_assoc();

        $anh1 = !empty($sp['Anh_San_Pham1']) ? 'data:image/jpeg;base64,' . base64_encode($sp['Anh_San_Pham1']) : '';
        $anh2 = !empty($sp['Anh_San_Pham2']) ? 'data:image/jpeg;base64,' . base64_encode($sp['Anh_San_Pham2']) : '';
        $anh3 = !empty($sp['Anh_San_Pham3']) ? 'data:image/jpeg;base64,' . base64_encode($sp['Anh_San_Pham3']) : '';
        ?>
        <div id="product-detail-modal" class="product-detail-modal modal">
          <div class="product-detail-modal__content modal-content">
            <span class="product-detail-modal__close">&times;</span>
            <h2 class="product-detail-modal__title">Chi tiết sản phẩm</h2>
            <br>
            <hr>
            <br>
            <div class="product-detail-modal__info">
              <p><strong>Mã sản phẩm:</strong> <span class="product-detail-modal__id">SP001</span></p>
              <br>
              <p><strong>Tên sản phẩm:</strong> <span class="product-detail-modal__name">Điện thoại XYZ</span></p>
              <br>
              <p><strong>Giá gốc:</strong> <span class="product-detail-modal__name">3M</span></p>
              <br>
              <p><strong>Số lượng tồn:</strong> <span class="product-detail-modal__name">100</span></p>
              <br>
              <p><strong>Thương hiệu:</strong> <span class="product-detail-modal__brand">No brand</span></p>
              <br>
              <p><strong>Xuất xứ:</strong> <span class="product-detail-modal__origin">Việt Nam</span></p>
              <br>
              <p><strong>Tình trạng:</strong> <span class="product-detail-modal__origin">Việt Nam</span></p>
              <br>
              <p><strong>Hạn bảo hàng:</strong> <span class="product-detail-modal__origin">Việt Nam</span></p>
              <br>
              <p><strong>Loại bảo hành:</strong> <span class="product-detail-modal__origin">Việt Nam</span></p>
              <br>
              <p><strong>Tổng kho:</strong> <span class="product-detail-modal__stock">100</span></p>
              <br>
              <p><strong>Giá bán:</strong> <span class="product-detail-modal__price">5.000.000đ</span></p>
              <br>
            </div>

            <hr>
            <br>
            <div class="product-detail-modal__description">
              <h3>Mô tả sản phẩm</h3>
              <br>
              <p>Đây là sản phẩm test mô tả, rất chất lượng và hot trend hiện nay...</p>
            </div>
            <br>
            <hr>
            <br>

            <div class="product-detail-modal__images">
              <h3>Hình ảnh</h3>
              <img src="../assets/images/CuongDao__Logo-PEARNK.png" alt="Ảnh sản phẩm" width="100px" />
              <img src="../assets/images/CuongDao__Logo-PEARNK.png" alt="Ảnh sản phẩm" width="100px" />
              <img src="../assets/images/CuongDao__Logo-PEARNK.png" alt="Ảnh sản phẩm" width="100px" />
            </div>

            <div class="product-detail-modal__actions">
              <button class="product-detail-modal__button product-detail-modal__button--close">Đóng</button>
            </div>
          </div>
        </div>

        <!-- MODAL RÚT TIỀN -->
        <div id="withdraw-modal" class="modal">
          <div class="modal-content withdraw-modal-content">
            <span class="close-modal">&times;</span>
            <h2>Rút tiền về tài khoản</h2>

            <div class="form-group">
              <label for="withdraw-amount">Số tiền muốn rút</label>
              <input type="number" id="withdraw-amount" placeholder="Nhập số tiền..." />
            </div>

            <div class="form-group">
              <label for="bank-name">Ngân hàng</label>
              <select id="bank-name">
                <option value="">-- Chọn ngân hàng --</option>
                <option value="vcb">Vietcombank</option>
                <option value="mb">MB Bank</option>
                <option value="tpb">TPBank</option>
                <option value="acb">ACB</option>
              </select>
            </div>

            <div class="form-group">
              <label for="account-number">Số tài khoản</label>
              <input type="text" id="account-number" placeholder="Nhập số tài khoản..." />
            </div>

            <div class="form-group">
              <label for="withdraw-password">Mật khẩu xác nhận</label>
              <input type="password" id="withdraw-password" placeholder="Nhập mật khẩu..." />
            </div>

            <div class="withdraw-actions">
              <button class="btn-cancel">Hủy</button>
              <button class="btn-confirm">Xác nhận rút</button>
            </div>
          </div>
        </div>



        <!-- Tổng quan doanh thu -->
        <div class="doanhthu-section hidden">
          <div class="overview-box">
            <div class="overview-item">
              <h4><strong>Chưa thanh toán</strong></h4>
              <div>
                <span id="total-unpaid-amount">0đ</span>
              </div>
            </div>
            <div class="overview-item">
              <h4>Đã thanh toán</h4>
              <span id="paid-this-week">0đ</span>
            </div>
            <div class="overview-item">
              <h4>Tổng cộng</h4>
              <span id="total-all-amount">0₫</span>
            </div>

          </div>
          <!-- Chi tiết doanh thu -->
          <div class="statistic-detail">
            <div class="statistic-header">
              <div class="tab active">Tất cả</div>
              <div class="tab">Chưa thanh toán</div>
              <div class="tab">Đã thanh toán</div>
              <input type="text" class="search-input" placeholder="Tìm kiếm đơn hàng">
            </div>

            <div class="statistic-table-container">
              <table class="statistic-table">
                <thead>
                  <tr>
                    <th>Đơn hàng</th>
                    <th>Trạng thái</th>
                    <th>Phương thức thanh toán</th>
                    <th>Số tiền</th>
                  </tr>
                </thead>
                <?php
                $conn = new mysqli('localhost', 'root', '', 'DATN');
                if ($conn->connect_error) {
                  die("Lỗi kết nối CSDL");
                }


                $sql = "
  SELECT 
    dhs.ID_Don_Hang_Seller,
    dc.Ho_Va_Ten,
    sp.Anh_San_Pham1,
    tts.Trang_Thai_Thanh_Toan,
    hd.Phuong_Thuc_Thanh_Toan,
    hd.Tong_Tien_Hoa_Don
  FROM Don_Hang_Seller dhs
  JOIN Hoa_Don hd ON dhs.ID_Hoa_Don = hd.ID_Hoa_Don
  JOIN Dia_Chi_Nhan_Hang dc ON hd.ID_Dia_Chi_Nhan_Hang = dc.ID_Dia_Chi_Nhan_Hang
  JOIN Thanh_Toan_Seller tts ON tts.ID_Don_Hang_Seller = dhs.ID_Don_Hang_Seller
  JOIN Chi_Tiet_Hoa_Don cthd ON cthd.ID_Hoa_Don = dhs.ID_Hoa_Don
  JOIN San_Pham sp ON sp.ID_San_Pham = cthd.ID_San_Pham
  WHERE dhs.ID_Nguoi_Ban = ?
  GROUP BY dhs.ID_Don_Hang_Seller
";

                $stmt = $conn->prepare($sql);
                $stmt->bind_param("i", $idNguoiBan);
                $stmt->execute();
                $result = $stmt->get_result();
                ?>

                <tbody>
                  <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                      <?php
                      $imgData = base64_encode($row['Anh_San_Pham1']);
                      $imgSrc = "data:image/jpeg;base64,{$imgData}";
                      ?>
                      <tr>
                        <td>
                          <div class="order-info">
                            <img src="<?= $imgSrc ?>" alt="Ảnh đơn hàng" class="order-img">
                            <div>
                              <div>Mã đơn hàng <?= $row['ID_Don_Hang_Seller'] ?> <button class="btn-copy">copy</button></div>
                              <div><?= htmlspecialchars($row['Ho_Va_Ten']) ?></div>
                            </div>
                          </div>
                        </td>
                        <td><?= htmlspecialchars($row['Trang_Thai_Thanh_Toan']) ?></td>
                        <td><?= htmlspecialchars($row['Phuong_Thuc_Thanh_Toan']) ?></td>
                        <td class="amount-cell">₫<?= number_format($row['Tong_Tien_Hoa_Don'], 0, ',', '.') ?></td>
                      </tr>
                    <?php endwhile; ?>
                  <?php else: ?>
                    <tr>
                      <td colspan="4">Không có đơn hàng nào</td>
                    </tr>
                  <?php endif; ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Bắt đầu phần container ví -->
        <div class="wallet-container hidden">
          <!-- Tổng quan số dư -->
          <div class="wallet-overview">
            <h3>Tổng quan</h3>
            <div class="wallet-header">
              <div class="wallet-balance">
                <p>Số dư</p>
                <h2 id="wallet-balance">đ</h2>
                <button class="btn-withdraw">Rút tiền</button>
              </div>
              <div class="wallet-bank">
                <p>Tài khoản ngân hàng</p>
                <button class="btn-add-bank">Thêm tài khoản ngân hàng</button>
              </div>
            </div>
          </div>

          <!-- Các giao dịch -->
          <div class="wallet-transactions">
            <div class="wallet-transactions-header">
              <h3>Các giao dịch</h3>
              <p>Số lượng giao dịch (Tổng số tiền +)</p>
            </div>

            <!-- Tabs chuyển trạng thái -->
            <div class="wallet-tabs">
              <button class="wallet-tab" data-tab="hoanthanh">Hoàn thành</button>
            </div>

            <!-- Tìm kiếm -->
            <div class="wallet-search">
              <input type="text" placeholder="Tìm kiếm theo mã đơn..." />
            </div>

            <!-- Bảng dữ liệu -->
            <div class="wallet-table" id="wallet-data">
              <table>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Loại giao dịch</th>
                    <th>Mã đơn hàng</th>
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>21/12/2025</td>
                    <td>#21122007</td>
                    <td>#21122007</td>
                    <td>500.000đ</td>
                    <td>Hoàn thành</td>
                  </tr>

                  <tr>
                    <td>21/12/2025</td>
                    <td>#21122007</td>
                    <td>#21122007</td>
                    <td>11111</td>
                    <td>Hoàn thành</td>
                  </tr>

                  <tr>
                    <td>21/12/2025</td>
                    <td>#21122007</td>
                    <td>#21122007</td>
                    <td>60.000đ</td>
                    <td>Hoàn thành</td>
                  </tr>

                  <tr>
                    <td>21/12/2025</td>
                    <td>#21122007</td>
                    <td>#21122007</td>
                    <td>500.000đ</td>
                    <td>Hoàn thành</td>
                  </tr>
                  <!-- Có thể thêm nhiều dòng giao dịch -->
                </tbody>
              </table>

            </div>
          </div>
        </div>
    </div>
  </div>
  </main>
  <script type="module" src="../js/utils/components-loader-pages.js"></script>
  <script type="module" src="../js/components/KenhNguoiBan.js?v=<?= time() ?>"></script>
</body>

</html>