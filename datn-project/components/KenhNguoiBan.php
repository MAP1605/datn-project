<?php
// Kết nối database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DATN";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy dữ liệu từ bảng products
$sql = "SELECT * FROM San_Pham";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Doanh thu</title>
  <link rel="stylesheet" href="KenhNguoiBan.css">

</head>

<body>
  <div class="header">
    <div class="header-vin">
      <img src="img/logo XÀI TẠM-03.png" alt="Logo" width="200px">
      <h2>Kênh người bán</h2>
      <div class="header-ben">
        <img src="img/brn.jpg" alt="img user name" width="100px">
        <span>User name</span>
      </div>
    </div>
  </div>

  <div class="Container">
    <ul class="container-ken">
      <li class="container-quen">Quản lý đơn hàng</li>
      <li class="container-quen">
        <a href="#" id="all-orders-btn" style="color: slategray;">Tất cả đơn hàng</a>
      </li>
      <li class="container-quen">Quản lý sản phẩm</li>
      <li class="container-quen">
        <a href="#" id="all-products-btn" style="color: slategray;">Tất cả sản phẩm</a>
      </li>
      <li class="container-quen">
        <a href="#" id="add-product-btn" style="color: slategray;">Thêm sản phẩm</a>
      </li>
    </ul>
  </div>

  <div class="main-content">
    <!-- Khu vực hiển thị sản phẩm -->
    <div id="products">
      <div class="main">
        <div class="tables">
          <div class="tables">Tất cả sản phẩm</div>
          <div class="tables">Sản phẩm ngừng bán</div>
          <div class="tables">Ăn gậy</div>
          <button class="button-new">Thêm mới</button>
        </div>
        <div class="search-container">
          <input type="text" class="main-search" placeholder="Tìm kiếm sản phẩm...">
        </div>
        <table class="table">
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá bán</th>
              <th>Đã bán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <?php
            if ($result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td><input type='checkbox'></td>";
                echo "<td>" . $row["Ten_San_Pham"] . "</td>";
                echo "<td>" . $row["So_Luong_Ton"] . "</td>";
                echo "<td>" . number_format($row["Gia_Ban"], 0, ',', '.') . "đ</td>";
                echo "<td>" . $row["Da_Ban"] . "</td>";
                echo "<td><span class='" . ($row["Trang_Thai_San_Pham"] == 'Đang bán' ? "status-active" : "status-inactive") . "'>" . $row["Trang_Thai_San_Pham"] . "</span></td>";
                echo "<td>
                <span class='icon'>🗑</span>
                <span class='icon'>🛠</span>
              </td>";
                echo "</tr>";
              }
            } else {
              echo "<tr><td colspan='7'>Không có sản phẩm nào</td></tr>";
            }

            ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Khu vực hiển thị đơn hàng -->
    <div id="orders" class="hidden">
      <div class="main">
        <div class="tables">
          <div class="tables">Tất cả</div>
          <div class="tables">Chờ xác nhận</div>
          <div class="tables">Đang giao</div>
          <div class="tables">Hoàn thành</div>
          <div class="tables">Trả hàng</div>
          <div class="tables">Hủy</div>
        </div>
        <table border="1" width="100%" cellspacing="0" cellpadding="5">
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>Mã đơn hàng</th>
              <th>Trạng thái</th>
              <th>Thời gian đặt hàng</th>
              <th>Tổng hóa đơn</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <?php
            // Truy vấn dữ liệu đơn hàng
            $sql = "SELECT dhs.ID_Don_Hang_Seller, dhs.Trang_Thai_Don_Hang, hd.Ngay_Dat_Hang, hd.Tong_Tien_Hoa_Don FROM `Don_Hang_Seller` dhs INNER JOIN Hoa_Don hd ON dhs.ID_Hoa_Don = hd.ID_Hoa_Don";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                $ma_don = "#DH" . str_pad($row["ID_Don_Hang_Seller"], 8, "0", STR_PAD_LEFT);
                $trang_thai = $row["Trang_Thai_Don_Hang"];
                $thoi_gian = date("H:i d/m/Y", strtotime($row["Ngay_Dat_Hang"]));
                $tong_tien = number_format($row["Tong_Tien_Hoa_Don"], 0, ',', '.');

                echo "<tr>";
                echo "<td><input type='checkbox'></td>";
                echo "<td>$ma_don</td>";
                echo "<td><span class='status-" . strtolower(str_replace(' ', '-', $trang_thai)) . "'>$trang_thai</span></td>";
                echo "<td>$thoi_gian</td>";
                echo "<td>₫$tong_tien</td>";
                echo "<td><button class='detail-btnss'>Chi tiết</button></td>";
                echo "</tr>";
              }
            } else {
              echo "<tr><td colspan='6'>Không có đơn hàng nào</td></tr>";
            }
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Đây là code thêm sản phẩm -->
  <div class="Container-ka product-form-ka"> <!-- Thêm class để áp dụng đúng CSS -->
    <div class="Content-ka">
      <section class="product-form-ka">
        <h2>Thông tin cơ bản</h2>
        <form>
          <div class="from-group-ka">
            <label>Hình ảnh sản phẩm:</label>
            <div class="img-box-ka">Hình ảnh sản phẩm</div>
          </div>
          <div class="from-group-ka">
            <label>Ảnh bìa:</label>
            <div class="img-box-ka">Ảnh bìa</div>
          </div>
          <div class="from-group-ka">
            <label>Video sản phẩm:</label>
            <div class="img-box-ka">Video</div>
          </div>
          <div class="from-group-ka">
            <label>Tên sản phẩm:</label>
            <input type="text">
          </div>
          <div class="from-group-ka">
            <label>Danh mục:</label>
            <input type="text">
          </div>
          <div class="from-group-ka">
            <label>Mô tả sản phẩm:</label>
            <textarea class="textareas"></textarea>
          </div>
        </form>

        <h2>Thông tin chi tiết</h2>
        <form>
          <div class="from-group-ka">
            <label>Thương hiệu:</label>
            <input type="text" value="No brand">
          </div>
          <div class="from-group-ka">
            <label>Xuất xứ:</label>
            <input type="text" value="Việt Nam">
          </div>
        </form>

        <h2>Thông tin bán hàng</h2>
        <form>
          <div class="from-group-ka">
            <label>Phân loại hàng:</label>
            <button>+ Thêm nhóm phân loại</button>
          </div>
          <div class="from-group-ka">
            <label>Giá:</label> <!-- Sửa lỗi dư chữ "Giá" -->
            <input type="text">
          </div>
          <div class="from-group-ka">
            <label>Kho hàng:</label>
            <input type="text">
          </div>
        </form>

        <!-- Căn chỉnh đúng nút Hủy và Thêm sản phẩm -->
        <div class="buttons-ka">
          <button class="Cancel">Hủy</button>
          <button class="Submit">Thêm sản phẩm</button>
        </div>
      </section>
    </div>
  </div>

  <script src="KenhNguoiBan.js"></script>
</body>

</html>

<?php $conn->close(); ?>