

const data = {
  //Hà Nội
  "Hà Nội": {
    "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Cống Vị", "Điện Biên", "Đội Cấn", "Giảng Võ", "Kim Mã", "Liễu Giai", "Ngọc Hà", "Ngọc Khánh", "Nguyễn Trung Trực", "Phúc Xá", "Quán Thánh", "Thành Công", "Trúc Bạch", "Vĩnh Phúc"],
    "Hoàn Kiếm": ["Chương Dương Độ", "Cửa Đông", "Cửa Nam", "Đồng Xuân", "Hàng Bạc", "Hàng Bài", "Hàng Bồ", "Hàng Bông", "Hàng Buồm", "Hàng Đào", "Hàng Gai", "Hàng Mã", "Hàng Trống", "Lý Thái Tổ", "Phan Chu Trinh", "Phúc Tân", "Tràng Tiền", "Trần Hưng Đạo"],
    "Đống Đa": ["Cát Linh", "Hàng Bột", "Khâm Thiên", "Khương Thượng", "Kim Liên", "Láng Hạ", "Láng Thượng", "Nam Đồng", "Ngã Tư Sở", "Ô Chợ Dừa", "Phương Liên", "Phương Mai", "Quang Trung", "Quốc Tử Giám", "Thịnh Quang", "Thổ Quan", "Trung Liệt", "Trung Phụng", "Trung Tự", "Văn Chương", "Văn Miếu"],
    "Cầu Giấy": ["Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Đô", "Nghĩa Tân", "Quan Hoa", "Trung Hòa", "Yên Hòa"],
    "Hai Bà Trưng": ["Bạch Đằng", "Bạch Mai", "Bách Khoa", "Cầu Dền", "Đồng Nhân", "Đồng Tâm", "Lê Đại Hành", "Minh Khai", "Nguyễn Du", "Ngô Thì Nhậm", "Phạm Đình Hổ", "Phố Huế", "Quỳnh Lôi", "Quỳnh Mai", "Thanh Lương", "Thanh Nhàn", "Trương Định", "Vĩnh Tuy"],
    "Hoàng Mai": ["Đại Kim", "Định Công", "Giáp Bát", "Hoàng Liệt", "Hoàng Văn Thụ", "Lĩnh Nam", "Mai Động", "Tân Mai", "Thanh Trì", "Thịnh Liệt", "Trần Phú", "Tương Mai", "Vĩnh Hưng", "Yên Sở"],
    "Thanh Xuân": ["Hạ Đình", "Khương Đình", "Khương Mai", "Khương Trung", "Nhân Chính", "Phương Liệt", "Thanh Xuân Bắc", "Thanh Xuân Nam", "Thanh Xuân Trung", "Thượng Đình"],
    "Thanh trì": ["Tân triều"],
    "Long Biên": ["Bồ Đề", "Cự Khối", "Đức Giang", "Gia Thụy", "Giang Biên", "Long Biên", "Ngọc Lâm", "Ngọc Thụy", "Phúc Đồng", "Phúc Lợi", "Sài Đồng", "Thạch Bàn", "Thượng Thanh", "Việt Hưng"],
    "Tây Hồ": ["Bưởi", "Nhật Tân", "Phú Thượng", "Quảng An", "Thụy Khuê", "Tứ Liên", "Xuân La", "Yên Phụ"],
    "Hà Đông": ["Biên Giang", "Đồng Mai", "Dương Nội", "Hà Cầu", "Kiến Hưng", "La Khê", "Mộ Lao", "Nguyễn Trãi", "Phú La", "Phú Lãm", "Phú Lương", "Phúc La", "Quang Trung", "Vạn Phúc", "Văn Quán", "Yên Nghĩa", "Yết Kiêu"],
    "Bắc Từ Liêm": ["Cổ Nhuế 1", "Cổ Nhuế 2", "Đông Ngạc", "Đức Thắng", "Liên Mạc", "Minh Khai", "Phú Diễn", "Phúc Diễn", "Tây Tựu", "Thụy Phương", "Thượng Cát", "Xuân Đỉnh", "Xuân Tảo"],
    "Nam Từ Liêm": ["Cầu Diễn", "Đại Mỗ", "Mễ Trì", "Mỹ Đình 1", "Mỹ Đình 2", "Phú Đô", "Phương Canh", "Tây Mỗ", "Trung Văn", "Xuân Phương"],
    "Sơn Tây": ["Lê Lợi", "Ngô Quyền", "Phú Thịnh", "Quang Trung", "Sơn Lộc", "Trung Hưng", "Trung Sơn Trầm", "Viên Sơn", "Xuân Khanh", "Cổ Đông", "Đường Lâm", "Kim Sơn", "Sơn Đông", "Thanh Mỹ", "Xuân Sơn"],
    "Ba Vì": ["Ba Trại", "Ba Vì", "Cẩm Lĩnh", "Cam Thượng", "Châu Sơn", "Chu Minh", "Cổ Đô", "Đồng Thái", "Đông Quang", "Khánh Thượng", "Minh Châu", "Minh Quang", "Phú Cường", "Phú Đông", "Phú Phương", "Phú Sơn", "Sơn Đà", "Tản Hồng", "Tản Lĩnh", "Thuần Mỹ", "Thụy An", "Tiên Phong", "Tòng Bạt", "Vạn Thắng", "Vật Lại", "Vân Hòa", "Vân Thắng", "Vật Lại", "Yên Bài"],
    "Chương Mỹ": ["Chúc Sơn", "Xuân Mai", "Đại Yên", "Đông Phương Yên", "Đồng Lạc", "Đồng Phú", "Hoàng Diệu", "Hoàng Văn Thụ", "Hòa Chính", "Hồng Phong", "Hợp Đồng", "Hữu Văn", "Lam Điền", "Mỹ Lương", "Nam Phương Tiến", "Ngọc Hòa", "Phú Nam An", "Phụng Châu", "Quảng Bị", "Tân Tiến", "Thanh Bình", "Thụy Hương"],

  },
  //Thành Phố Hồ Chí Minh
  "TP. Hồ Chí Minh": {
    "TP. Thủ Đức": [
      "Linh Xuân", "Bình Chiểu", "Linh Trung", "Tam Bình", "Tam Phú",
      "Hiệp Bình Phước", "Hiệp Bình Chánh", "Linh Chiểu", "Linh Tây", "Linh Đông",
      "Bình Thọ", "Trường Thọ", "Long Bình", "Long Thạnh Mỹ", "Tân Phú", "Hiệp Phú",
      "Tăng Nhơn Phú A", "Tăng Nhơn Phú B", "Phước Long B", "Phước Long A",
      "Trường Thạnh", "Long Phước", "Long Trường", "Phước Bình", "Phú Hữu",
      "Thảo Điền", "An Phú", "Bình An", "Bình Trưng Đông", "Bình Trưng Tây",
      "Bình Khánh", "An Khánh", "Cát Lái", "Thạnh Mỹ Lợi", "An Lợi Đông", "Thủ Thiêm"
    ],
    "Quận 1": [
      "Tân Định", "Đa Kao", "Bến Nghé", "Bến Thành", "Nguyễn Thái Bình",
      "Phạm Ngũ Lão", "Cầu Ông Lãnh", "Cô Giang", "Nguyễn Cư Trinh", "Cầu Kho"
    ],
    "Quận 3": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14"
    ],
    "Quận 4": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 12",
      "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 18"
    ],
    "Quận 5": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"
    ],
    "Quận 6": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14"
    ],
    "Quận 7": [
      "Tân Thuận Đông", "Tân Thuận Tây", "Tân Kiểng", "Tân Hưng", "Bình Thuận",
      "Tân Quy", "Phú Thuận", "Tân Phú", "Tân Phong", "Phú Mỹ"
    ],
    "Quận 8": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15",
      "Phường 16"
    ],
    "Quận 10": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"
    ],
    "Quận 11": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
      "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
      "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15",
      "Phường 16"
    ],
    "Quận 12": [
      "Thạnh Xuân", "Thạnh Lộc", "Thới An", "Tân Chánh Hiệp", "An Phú Đông",
      "Tân Thới Hiệp", "Trung Mỹ Tây", "Tân Hưng Thuận", "Đông Hưng Thuận",
      "Tân Thới Nhất"
    ],
    "Quận Bình Tân": [
      "Bình Hưng Hòa", "Bình Hưng Hòa A", "Bình Hưng Hòa B", "Bình Trị Đông",
      "Bình Trị Đông A", "Bình Trị Đông B", "Tân Tạo", "Tân Tạo A",
      "An Lạc", "An Lạc A"
    ],
    "Quận Bình Thạnh": [
      "Phường 1", "Phường 2", "Phường 3", "Phường 5", "Phường 6",
      "Phường 7", "Phường 11", "Phường 12", "Phường 13", "Phường 14",
      "Phường 15", "Phường 17", "Phường 19", "Phường 21", "Phường 22",
      "Phường 24", "Phường 25", "Phường 26", "Phường 27", "Phường 28"
    ],
    "Quận Gò Vấp": [
      "Phường 1", "Phường 3", "Phường 4", "Phường 5", "Phường 6",
      "Phường 7", "Phường 8", "Phường 9", "Phường 10"]
  },
  //An Giang//
  "An Giang": {
    "Thành phố Long Xuyên": ["Mỹ Bình", "Mỹ Hòa", "Mỹ Long", "Mỹ Phước", "Mỹ Quý", "Mỹ Thạnh", "Đông Xuyên", "Bình Đức", "Bình Khánh", "Mỹ Thới", "Mỹ Thạnh", "Mỹ Hòa Hưng"],
    "Thành phố Châu Đốc": ["Châu Phú A", "Châu Phú B", "Núi Sam", "Vĩnh Mỹ", "Vĩnh Ngươn", "Vĩnh Tế"],
    "Thị xã Tân Châu": ["Long Thạnh", "Long Hưng", "Long Châu", "Long Phú", "Long Sơn", "Long An", "Long Thành", "Long Phước", "Tân An", "Tân Thạnh", "Vĩnh Hòa", "Vĩnh Xương", "Phú Vĩnh", "Châu Phong"],
    "Huyện An Phú": ["An Phú", "Khánh An", "Khánh Bình", "Nhơn Hội", "Phú Hội", "Phú Hữu", "Phước Hưng", "Quốc Thái", "Vĩnh Hậu", "Vĩnh Hội Đông", "Vĩnh Lộc", "Vĩnh Trường"],
    "Huyện Châu Phú": ["Cái Dầu", "Bình Chánh", "Bình Long", "Bình Mỹ", "Bình Phú", "Bình Thủy", "Đào Hữu Cảnh", "Khánh Hòa", "Mỹ Đức", "Ô Long Vỹ", "Thạnh Mỹ Tây", "Vĩnh Thạnh Trung"],
    "Huyện Châu Thành": ["An Châu", "An Hòa", "Bình Hòa", "Bình Thạnh", "Cần Đăng", "Hòa Bình Thạnh", "Tân Phú", "Vĩnh An", "Vĩnh Bình", "Vĩnh Hanh", "Vĩnh Lợi", "Vĩnh Nhuận", "Vĩnh Thành"],
    "Huyện Chợ Mới": ["Chợ Mới", "Mỹ Luông", "An Thạnh Trung", "Bình Phước Xuân", "Hòa An", "Hòa Bình", "Hội An", "Kiến An", "Kiến Thành", "Long Điền A", "Long Điền B", "Long Giang", "Long Kiến", "Mỹ An", "Mỹ Hiệp", "Mỹ Hội Đông", "Nhơn Mỹ", "Tấn Mỹ"],
    "Huyện Phú Tân": ["Phú Mỹ", "Chợ Vàm", "Bình Thạnh Đông", "Hiệp Xương", "Hòa Lạc", "Long Hòa", "Phú An", "Phú Bình", "Phú Hiệp", "Phú Hưng", "Phú Lâm", "Phú Long", "Phú Thành", "Phú Thạnh", "Phú Thọ", "Phú Xuân", "Tân Hòa", "Tân Trung"],
    "Huyện Thoại Sơn": ["Núi Sập", "Óc Eo", "Phú Hòa", "An Bình", "Bình Thành", "Định Mỹ", "Định Thành", "Mỹ Phú Đông", "Phú Thuận", "Tây Phú", "Thạnh An", "Vĩnh Chánh", "Vĩnh Khánh", "Vĩnh Phú", "Vĩnh Trạch", "Vọng Đông", "Vọng Thê"],
    "Huyện Tịnh Biên": ["Nhà Bàng", "Tịnh Biên", "An Cư", "An Hảo", "An Nông", "Núi Voi", "Tân Lợi", "Tân Lập", "Thới Sơn", "Văn Giáo", "Vĩnh Trung", "Xuân Tô"],
    "Huyện Tri Tôn": ["Tri Tôn", "Ba Chúc", "An Tức", "Châu Lăng", "Lạc Quới", "Lê Trì", "Lương An Trà", "Lương Phi", "Núi Tô", "Ô Lâm", "Tà Đảnh", "Tân Tuyến", "Vĩnh Gia", "Vĩnh Phước"]
  },
  "Bà Rịa - Vũng Tàu": {
    "Thành phố Vũng Tàu": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Nguyễn An Ninh", "Rạch Dừa", "Thắng Nhất", "Thắng Nhì", "Thắng Tam", "Long Sơn"],
    "Thành phố Bà Rịa": ["Phước Hưng", "Phước Hiệp", "Phước Nguyên", "Long Toàn", "Long Tâm", "Long Hương", "Kim Dinh", "Tân Hưng", "Long Phước", "Hòa Long"],
    "Thị xã Phú Mỹ": ["Phú Mỹ", "Hắc Dịch", "Mỹ Xuân", "Tân Phước", "Tân Hòa", "Tân Hải", "Phước Hòa", "Châu Pha", "Tóc Tiên", "Sông Xoài"],
    "Huyện Châu Đức": ["Ngãi Giao", "Bàu Chinh", "Bình Ba", "Bình Giã", "Bình Trung", "Cù Bị", "Đá Bạc", "Kim Long", "Láng Lớn", "Nghĩa Thành", "Quảng Thành", "Suối Nghệ", "Suối Rao", "Xà Bang", "Xuân Sơn"],
    "Huyện Côn Đảo": ["Côn Đảo"],
    "Huyện Đất Đỏ": ["Đất Đỏ", "Phước Hải", "Láng Dài", "Lộc An", "Long Mỹ", "Long Tân", "Phước Hội", "Phước Long Thọ"],
    "Huyện Long Điền": ["Long Điền", "Long Hải", "An Ngãi", "An Nhứt", "Phước Hưng", "Phước Tỉnh", "Tam Phước"],
    "Huyện Xuyên Mộc": ["Phước Bửu", "Bàu Lâm", "Bình Châu", "Bông Trang"],
  },


  "Bắc Giang": {
    "TP Bắc Giang": ["Hoàng Văn Thụ", "Ngô Quyền", "Thọ Xương", "Xương Giang", "Trần Phú", "Lê Lợi", "Nguyễn Văn Cừ", "Dĩnh Kế", "Dĩnh Trì", "Song Mai", "Song Khê", "Tân Mỹ", "Đồng Sơn", "Tân Tiến", "Mỹ Độ"],
    "Hiệp Hòa": ["Thắng", "Đoan Bái", "Đại Thành", "Hoàng Vân", "Hoàng An", "Hoàng Lương", "Mai Đình", "Đông Lỗ", "Xuân Cẩm", "Hòa Sơn", "Hùng Sơn", "Ngọc Sơn", "Hương Lâm", "Châu Minh", "Hợp Thịnh", "Mai Trung", "Bắc Lý", "Danh Thắng", "Đồng Tân"],
    "Lạng Giang": ["Vôi", "Kép", "Mỹ Thái", "Tân Dĩnh", "Tân Hưng", "Tiên Lục", "Yên Mỹ", "Đồng Sơn", "Nghĩa Hòa", "Nghĩa Hưng", "Quang Thịnh", "Xương Lâm", "Xuân Hương", "Hương Lạc", "Đại Lâm", "Đào Mỹ", "Dương Đức", "An Hà", "Tân Thanh", "Thái Đào"],
    "Lục Nam": ["Đồi Ngô", "Bảo Đài", "Bảo Sơn", "Bình Sơn", "Chu Điện", "Cương Sơn", "Đan Hội", "Đông Hưng", "Đông Phú", "Huyền Sơn", "Khám Lạng", "Lan Mẫu", "Lục Sơn", "Nghĩa Phương", "Phương Sơn", "Tam Dị", "Thanh Lâm", "Tiên Nha", "Trường Giang", "Trường Sơn", "Vô Tranh", "Vũ Xá", "Yên Sơn", "Cẩm Lý"],
    "Lục Ngạn": ["Chũ", "Biên Sơn", "Biển Động", "Cấm Sơn", "Đèo Gia", "Đồng Cốc", "Giáp Sơn", "Hộ Đáp", "Hồng Giang", "Kiên Lao", "Kiên Thành", "Kim Sơn", "Mỹ An", "Nam Dương", "Nghĩa Hồ", "Phì Điền", "Phong Minh", "Phong Vân", "Phú Nhuận", "Phượng Sơn", "Quý Sơn", "Sa Lý", "Sơn Hải", "Tân Hoa", "Tân Lập", "Tân Mộc", "Tân Quang", "Tân Sơn", "Thanh Hải", "Trù Hựu", "Xa Lý"],
    "Sơn Động": ["An Châu", "An Bá", "An Lạc", "Cẩm Đàn", "Dương Hưu", "Giáo Liêm", "Hữu Sản", "Lệ Viễn", "Long Sơn", "Phúc Sơn", "Quế Sơn", "Thanh Luận", "Tuấn Đạo", "Vân Sơn", "Vĩnh An", "Yên Định"],
    "Tân Yên": ["Cao Thượng", "Nhã Nam", "An Dương", "Cao Xá", "Đại Hóa", "Hợp Đức", "Lam Cốt", "Lan Giới", "Liên Chung", "Liên Sơn", "Ngọc Châu", "Ngọc Lý", "Ngọc Thiện", "Ngọc Vân", "Phúc Hòa", "Phúc Sơn", "Quang Tiến", "Quế Nham", "Song Vân", "Tân Trung", "Việt Lập", "Việt Ngọc"],
    "Việt Yên": ["Bích Động", "Nếnh", "Hồng Thái", "Quang Châu", "Tăng Tiến", "Vân Trung", "Thượng Lan", "Trung Sơn", "Tiên Sơn", "Tự Lạn", "Hương Mai", "Minh Đức", "Nghĩa Trung", "Quảng Minh", "Vân Hà", "Việt Tiến"],
    "Yên Dũng": ["Nham Biền", "Tân An", "Cảnh Thụy", "Đồng Phúc", "Đồng Việt", "Đức Giang", "Hương Gián", "Lãng Sơn", "Lão Hộ", "Nội Hoàng", "Quỳnh Sơn", "Tân Liễu", "Tân Mỹ", "Tân Tiến", "Tiến Dũng", "Tiền Phong", "Trí Yên", "Tư Mại", "Xuân Phú", "Yên Lư"],
    "Yên Thế": ["Phồn Xương", "Bố Hạ", "An Thượng", "Canh Nậu", "Đồng Hưu", "Đồng Kỳ", "Đồng Lạc", "Đồng Tâm", "Đồng Tiến", "Đồng Vương", "Đông Sơn", "Hồng Kỳ", "Hương Vĩ", "Tam Hiệp", "Tam Tiến", "Tân Hiệp", "Tân Sỏi", "Tiến Thắng", "Xuân Lương"]
  },
  "Bắc Kạn": {
    "Thành phố Bắc Kạn": ["Đức Xuân", "Nguyễn Thị Minh Khai", "Phùng Chí Kiên", "Sông Cầu", "Huyền Tụng"],
    "Huyện Ba Bể": ["Chợ Rã", "Bành Trạch", "Cao Thượng", "Chu Hương", "Địa Linh"],
    "Huyện Bạch Thông": ["Phủ Thông", "Cẩm Giàng", "Cao Sơn", "Đôn Phong", "Dương Phong"],
    "Huyện Chợ Đồn": ["Bằng Lũng", "Bản Thi", "Bằng Lãng", "Bình Trung", "Bằng Phúc"],
    "Huyện Chợ Mới": ["Đồng Tâm", "Cao Kỳ", "Mai Lạp", "Hòa Mục", "Thanh Bình"],
    "Huyện Na Rì": ["Yến Lạc", "Côn Minh", "Cư Lễ", "Cường Lợi", "Dương Sơn"],
    "Huyện Ngân Sơn": ["Nà Phặc", "Bằng Vân", "Cốc Đán", "Đức Vân", "Hiệp Lực"],
    "Huyện Pác Nặm": ["Bộc Bố", "Bằng Thành", "Nhạn Môn", "Giáo Hiệu", "Công Bằng"]
  },

  "Bạc Liêu": {
    "Thành phố Bạc Liêu": [
      "Phường 1",
      "Phường 2",
      "Phường 5",
      "Phường Nhà Mát",
      "Xã Vĩnh Trạch"
    ],
    "Thị xã Giá Rai": [
      "Phường Hộ Phòng",
      "Phường Láng Tròn",
      "Xã Phong Thạnh",
      "Xã Phong Thạnh A",
      "Xã Tân Thạnh"
    ],
    "Huyện Đông Hải": [
      "Thị trấn Gành Hào",
      "Xã An Trạch",
      "Xã Long Điền",
      "Xã Long Điền Đông",
      "Xã Điền Hải"
    ],
    "Huyện Hòa Bình": [
      "Thị trấn Hòa Bình",
      "Xã Vĩnh Hậu",
      "Xã Vĩnh Hậu A",
      "Xã Vĩnh Mỹ A",
      "Xã Minh Diệu"
    ],
    "Huyện Hồng Dân": [
      "Thị trấn Ngan Dừa",
      "Xã Ninh Quới",
      "Xã Ninh Thạnh Lợi",
      "Xã Lộc Ninh",
      "Xã Vĩnh Lộc"
    ],
    "Huyện Phước Long": [
      "Thị trấn Phước Long",
      "Xã Phước Long",
      "Xã Vĩnh Thanh",
      "Xã Vĩnh Phú Đông",
      "Xã Hưng Phú"
    ],
    "Huyện Vĩnh Lợi": [
      "Thị trấn Châu Hưng",
      "Xã Châu Hưng A",
      "Xã Hưng Hội",
      "Xã Long Thạnh",
      "Xã Vĩnh Hưng"
    ]
  },
  "Bắc Ninh": {
    "TP Bắc Ninh": ["Phường Đại Phúc", "Phường Kinh Bắc", "Phường Tiền An", "Phường Ninh Xá", "Phường Vũ Ninh", "Phường Suối Hoa", "Phường Võ Cường", "Phường Thị Cầu"],
    "TP Từ Sơn": ["Phường Đình Bảng", "Phường Đồng Kỵ", "Phường Trang Hạ", "Phường Tân Hồng", "Phường Phù Khê", "Phường Châu Khê", "Phường Đông Ngàn", "Phường Hương Mạc"],
    "Huyện Yên Phong": ["Thị trấn Chờ", "Xã Đông Thọ", "Xã Hòa Tiến", "Xã Long Châu", "Xã Trung Nghĩa", "Xã Tam Đa", "Xã Văn Môn", "Xã Yên Trung"],
    "Huyện Quế Võ": ["Thị trấn Phố Mới", "Xã Bằng An", "Xã Phù Lãng", "Xã Phù Lương", "Xã Việt Thống", "Xã Cách Bi", "Xã Đại Xuân", "Xã Nhân Hòa"],
    "Huyện Tiên Du": ["Thị trấn Lim", "Xã Hoàn Sơn", "Xã Phú Lâm", "Xã Minh Đạo", "Xã Lạc Vệ", "Xã Nội Duệ", "Xã Hiên Vân", "Xã Tri Phương"],
    "Huyện Gia Bình": ["Thị trấn Gia Bình", "Xã Xuân Lai", "Xã Quỳnh Phú", "Xã Cao Đức", "Xã Đại Bái", "Xã Đông Cứu", "Xã Hòa Bình", "Xã Vạn Ninh"],
    "Huyện Lương Tài": ["Thị trấn Thứa", "Xã Trung Kênh", "Xã Phú Lương", "Xã Quảng Phú", "Xã Bình Định", "Xã Tân Lãng", "Xã Lâm Thao", "Xã Trừng Xá"]
  },
  "Bến Tre": {
    "TP Bến Tre": ["Phú Tân", "Phú Khương", "Phường 6", "Phường 8", "Sơn Đông"],
    "Huyện Châu Thành": ["Tân Thạch", "Phú Đức", "An Hiệp", "An Khánh", "Tân Phú"],
    "Huyện Giồng Trôm": ["Giồng Trôm", "Bình Thành", "Châu Hòa", "Hưng Lễ", "Phước Long"],
    "Huyện Mỏ Cày Bắc": ["Phước Mỹ Trung", "Thanh Tân", "Tân Phú Tây", "Hưng Khánh Trung A", "Tân Thành Bình"],
    "Huyện Mỏ Cày Nam": ["Mỏ Cày", "Định Thủy", "Ngãi Đăng", "Cẩm Sơn", "Tân Hội"],
    "Huyện Ba Tri": ["Ba Tri", "An Ngãi Trung", "Tân Hưng", "Tân Mỹ", "Phú Lễ"],
    "Huyện Bình Đại": ["Bình Đại", "Thới Lai", "Châu Hưng", "Lộc Thuận", "Phú Vang"],
    "Huyện Thạnh Phú": ["Thạnh Phú", "An Thuận", "An Quy", "Giao Thạnh", "Mỹ Hưng"]
  },
  "Bình Định": {
    "TP Quy Nhơn": ["Hải Cảng", "Lê Hồng Phong", "Ngô Mây", "Trần Quang Diệu", "Trần Hưng Đạo"],
    "Thị xã An Nhơn": ["Bình Định", "Đập Đá", "Nhơn Hậu", "Nhơn Hưng", "Nhơn Khánh"],
    "Thị xã Hoài Nhơn": ["Bồng Sơn", "Hoài Thanh", "Hoài Mỹ", "Hoài Hảo", "Hoài Hương"],
    "Huyện An Lão": ["An Lão", "An Hòa", "An Quang", "An Tân", "An Toàn"],
    "Huyện Hoài Ân": ["Tăng Bạt Hổ", "Ân Hảo Đông", "Ân Hảo Tây", "Ân Đức", "Ân Tường Tây"],
    "Huyện Phù Cát": ["Ngô Mây", "Cát Tường", "Cát Hanh", "Cát Trinh", "Cát Minh"],
    "Huyện Phù Mỹ": ["Phù Mỹ", "Mỹ Chánh", "Mỹ Quang", "Mỹ Tài", "Mỹ Lộc"],
    "Huyện Tây Sơn": ["Phú Phong", "Bình Nghi", "Bình Tường", "Bình Hòa", "Tây Giang"],
    "Huyện Tuy Phước": ["Diêu Trì", "Phước An", "Phước Hiệp", "Phước Hưng", "Phước Nghĩa"],
    "Huyện Vân Canh": ["Vân Canh", "Canh Liên", "Canh Hiển", "Canh Hòa", "Canh Thuận"]
  },
  "Bình Dương": {
    "Thành phố Thủ Dầu Một": ["Phú Cường", "Hiệp Thành", "Phú Lợi", "Phú Hòa", "Phú Thọ"],
    "Thành phố Dĩ An": ["An Bình", "Bình An", "Bình Thắng", "Dĩ An", "Đông Hòa"],
    "Thành phố Thuận An": ["An Phú", "An Thạnh", "Bình Chuẩn", "Bình Hòa", "Bình Nhâm"],
    "Thành phố Tân Uyên": ["Hội Nghĩa", "Khánh Bình", "Phú Chánh", "Tân Hiệp", "Tân Phước Khánh"],
    "Thành phố Bến Cát": ["Mỹ Phước", "Thới Hòa", "Hòa Lợi", "Tân Định", "Chánh Phú Hòa"],
    "Huyện Bàu Bàng": ["Lai Uyên", "Cây Trường II", "Hưng Hòa", "Lai Hưng", "Long Nguyên"],
    "Huyện Dầu Tiếng": ["Dầu Tiếng", "An Lập", "Định An", "Định Hiệp", "Định Thành"],
    "Huyện Phú Giáo": ["Phước Vĩnh", "An Bình", "An Linh", "An Long", "An Thái"],
    "Huyện Bắc Tân Uyên": ["Tân Thành", "Bình Mỹ", "Đất Cuốc", "Hiếu Liêm", "Lạc An"]
  },
  "Bình Phước": {
    "Thành phố Đồng Xoài": ["Phường Tân Phú", "Phường Tân Đồng", "Phường Tân Bình", "Phường Tân Xuân", "Xã Tiến Thành", "Xã Tiến Hưng", "Xã Tân Thành"],
    "Thị xã Bình Long": ["Phường An Lộc", "Phường Phú Thịnh", "Phường Hưng Chiến", "Xã Thanh Lương", "Xã Thanh Phú"],
    "Thị xã Phước Long": ["Phường Long Phước", "Phường Long Thủy", "Phường Phước Bình", "Xã Long Giang", "Xã Sơn Giang", "Phường Thác Mơ"],
    "Thị xã Chơn Thành": ["Phường Hưng Long", "Xã Minh Hưng", "Xã Minh Long", "Xã Minh Thành", "Xã Thành Tâm", "Xã Nha Bích", "Xã Quang Minh"],
    "Huyện Bù Đăng": ["Thị trấn Đức Phong", "Xã Đồng Nai", "Xã Đoàn Kết", "Xã Thống Nhất", "Xã Thọ Sơn", "Xã Nghĩa Trung", "Xã Đắk Nhau", "Xã Phú Sơn"],
    "Huyện Bù Đốp": ["Xã Thanh Bình", "Xã Hưng Phước", "Xã Phước Thiện", "Xã Tân Tiến", "Xã Thiện Hưng", "Xã Tân Thành"],
    "Huyện Bù Gia Mập": ["Xã Phú Nghĩa", "Xã Đắk Ơ", "Xã Bù Gia Mập", "Xã Đa Kia", "Xã Phước Minh", "Xã Bình Thắng", "Xã Phú Văn"],
    "Huyện Đồng Phú": ["Xã Tân Phú", "Xã Tân Hòa", "Xã Tân Lập", "Xã Tân Tiến", "Xã Tân Hưng", "Xã Thuận Lợi", "Xã Đồng Tâm"],
    "Huyện Hớn Quản": ["Xã Tân Khai", "Xã An Khương", "Xã Minh Đức", "Xã Minh Tâm", "Xã Tân Hiệp", "Xã Đồng Nơ", "Xã Tân Quan"],
    "Huyện Lộc Ninh": ["Thị trấn Lộc Ninh", "Xã Lộc Hiệp", "Xã Lộc Hòa", "Xã Lộc Thái", "Xã Lộc Tấn", "Xã Lộc Thiện", "Xã Lộc An", "Xã Lộc Quang"],
    "Huyện Phú Riềng": ["Xã Phú Riềng", "Xã Bù Nho", "Xã Long Bình", "Xã Long Hưng", "Xã Phú Trung", "Xã Phú Thành", "Xã Bình Tân", "Xã Phú Tân"]
  },

  "Bình Thuận": {
    "Thành phố Phan Thiết": ["Phường Phú Thủy", "Phường Phú Tài", "Phường Thanh Hải", "Phường Đức Thắng", "Phường Lạc Đạo", "Phường Đức Long", "Xã Tiến Lợi", "Xã Tiến Thành", "Xã Phong Nẫm"],
    "Thị xã La Gi": ["Phường Tân An", "Phường Tân Thiện", "Phường Tân Phước", "Phường Bình Tân", "Phường Phước Hội", "Phường Phước Lộc", "Xã Tân Hải", "Xã Tân Tiến"],
    "Huyện Tuy Phong": ["Thị trấn Liên Hương", "Thị trấn Phan Rí Cửa", "Xã Chí Công", "Xã Bình Thạnh", "Xã Hòa Minh", "Xã Vĩnh Tân", "Xã Phước Thể"],
    "Huyện Bắc Bình": ["Thị trấn Lương Sơn", "Thị trấn Chợ Lầu", "Xã Phan Sơn", "Xã Phan Lâm", "Xã Phan Điền", "Xã Sông Lũy", "Xã Hòa Thắng"],
    "Huyện Hàm Thuận Bắc": ["Thị trấn Ma Lâm", "Xã Phú Long", "Xã Hàm Đức", "Xã Hàm Liêm", "Xã Hàm Chính", "Xã Hàm Trí", "Xã Hàm Thắng"],
    "Huyện Hàm Thuận Nam": ["Xã Thuận Nam", "Xã Mương Mán", "Xã Hàm Cường", "Xã Hàm Kiệm", "Xã Hàm Minh", "Xã Hàm Thạnh", "Xã Tân Lập"],
    "Huyện Tánh Linh": ["Thị trấn Lạc Tánh", "Xã Gia An", "Xã Gia Huynh", "Xã Đức Bình", "Xã Đồng Kho", "Xã La Ngâu", "Xã Huy Khiêm"],
    "Huyện Đức Linh": ["Thị trấn Võ Xu", "Thị trấn Đức Tài", "Xã Đa Kai", "Xã Sùng Nhơn", "Xã Trà Tân", "Xã Mê Pu", "Xã Đông Hà"],
    "Huyện Hàm Tân": ["Thị trấn Tân Minh", "Thị trấn Tân Nghĩa", "Xã Sơn Mỹ", "Xã Tân Thắng", "Xã Thắng Hải", "Xã Tân Hà", "Xã Tân Xuân"],
    "Huyện Phú Quý": ["Xã Ngũ Phụng", "Xã Long Hải", "Xã Tam Thanh"]
  },
  "Cà Mau": {
    "Thành phố Cà Mau": ["Phường 1", "Phường 2", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường Tân Thành", "Xã Tắc Vân"],
    "Huyện Thới Bình": ["Thị trấn Thới Bình", "Xã Biển Bạch", "Xã Biển Bạch Đông", "Xã Hồ Thị Kỷ", "Xã Tân Bằng", "Xã Trí Phải", "Xã Trí Lực", "Xã Tân Lộc", "Xã Tân Lộc Bắc", "Xã Tân Phú"],
    "Huyện U Minh": ["Thị trấn U Minh", "Xã Khánh An", "Xã Khánh Hòa", "Xã Khánh Hội", "Xã Khánh Lâm", "Xã Khánh Thuận", "Xã Khánh Tiến", "Xã Nguyễn Phích"],
    "Huyện Trần Văn Thời": ["Thị trấn Trần Văn Thời", "Thị trấn Sông Đốc", "Xã Khánh Bình", "Xã Khánh Bình Đông", "Xã Khánh Bình Tây", "Xã Lợi An", "Xã Phong Điền", "Xã Trần Hợi", "Xã Phong Lạc"],
    "Huyện Cái Nước": ["Thị trấn Cái Nước", "Xã Lương Thế Trân", "Xã Tân Hưng", "Xã Tân Hưng Đông", "Xã Tân Hồng", "Xã Trần Thới", "Xã Đông Thới", "Xã Hưng Mỹ", "Xã Phú Hưng"],
    "Huyện Đầm Dơi": ["Thị trấn Đầm Dơi", "Xã Tạ An Khương", "Xã Tạ An Khương Đông", "Xã Tạ An Khương Nam", "Xã Tân Duyệt", "Xã Tân Đức", "Xã Ngọc Chánh", "Xã Tân Dân", "Xã Quách Phẩm Bắc"],
    "Huyện Năm Căn": ["Thị trấn Năm Căn", "Xã Hàng Vịnh", "Xã Hiệp Tùng", "Xã Lâm Hải", "Xã Tam Giang", "Xã Tam Giang Đông"],
    "Huyện Phú Tân": ["Thị trấn Cái Đôi Vàm", "Xã Nguyễn Việt Khái", "Xã Phú Mỹ", "Xã Phú Thuận", "Xã Tân Hải", "Xã Tân Hưng Tây", "Xã Việt Thắng"],
    "Huyện Ngọc Hiển": ["Xã Viên An", "Xã Viên An Đông", "Thị trấn Rạch Gốc", "Xã Tân Ân", "Xã Tân Ân Tây", "Xã Đất Mũi"]
  },
  "Cần Thơ": {
    "Quận Ninh Kiều": ["Tân An", "An Cư", "An Hòa", "An Khánh", "An Nghiệp"],
    "Quận Bình Thủy": ["Bình Thủy", "Trà An", "Trà Nóc", "Thới An Đông", "Long Hòa"],
    "Quận Cái Răng": ["Lê Bình", "Hưng Phú", "Hưng Thạnh", "Ba Láng", "Thường Thạnh"],
    "Quận Ô Môn": ["Châu Văn Liêm", "Thới Hòa", "Thới Long", "Thới An", "Phước Thới"],
    "Quận Thốt Nốt": ["Thốt Nốt", "Thới Thuận", "Thuận An", "Tân Lộc", "Trung Nhứt"],
    "Huyện Phong Điền": ["Phong Điền", "Nhơn Ái", "Giai Xuân", "Mỹ Khánh", "Trường Long"],
    "Huyện Cờ Đỏ": ["Thới Lai", "Đông Hiệp", "Đông Thắng", "Thới Tân", "Trung An"],
    "Huyện Vĩnh Thạnh": ["Vĩnh Thạnh", "Thạnh An", "Thạnh Lộc", "Thạnh Mỹ", "Thạnh Quới"],
    "Huyện Thới Lai": ["Thới Lai", "Đông Bình", "Đông Thuận", "Thới Thạnh", "Trường Thắng"]
  },
  "Cao Bằng": {
    "Thành phố Cao Bằng": ["Hợp Giang", "Sông Bằng", "Sông Hiến", "Tân Giang", "Ngọc Xuân"],
    "Huyện Bảo Lạc": ["Bảo Lạc", "Cô Ba", "Hồng An", "Hồng Trị", "Kim Cúc"],
    "Huyện Bảo Lâm": ["Pác Miầu", "Đức Hạnh", "Lý Bôn", "Mông Ân", "Nam Cao"],
    "Huyện Hạ Lang": ["Thanh Nhật", "An Lạc", "Cô Ngân", "Đồng Loan", "Kim Loan"],
    "Huyện Hà Quảng": ["Xuân Hòa", "Cải Viên", "Đào Ngạn", "Lũng Nặm", "Mã Ba"],
    "Huyện Hòa An": ["Nước Hai", "Bạch Đằng", "Bế Triều", "Dân Chủ", "Đại Tiến"],
    "Huyện Nguyên Bình": ["Nguyên Bình", "Tĩnh Túc", "Ca Thành", "Hoa Thám", "Hưng Đạo"],
    "Huyện Quảng Hòa": ["Quảng Uyên", "Phục Hòa", "Cai Bộ", "Cách Linh", "Chí Thảo"],
    "Huyện Thạch An": ["Đông Khê", "Canh Tân", "Đức Long", "Lê Lai", "Lê Lợi"],
    "Huyện Trùng Khánh": ["Trùng Khánh", "Trà Lĩnh", "Cao Chương", "Chí Viễn", "Đàm Thủy"]
  },
  "Đà Nẵng": {
    "Quận Hải Châu": ["Phường Hải Châu I", "Phường Hải Châu II", "Phường Thanh Bình", "Phường Thuận Phước", "Phường Hòa Thuận Tây"],
    "Quận Thanh Khê": ["Phường An Khê", "Phường Chính Gián", "Phường Thạc Gián", "Phường Thanh Khê Đông", "Phường Thanh Khê Tây"],
    "Quận Sơn Trà": ["Phường An Hải Bắc", "Phường An Hải Tây", "Phường Mân Thái", "Phường Nại Hiên Đông", "Phường Phước Mỹ"],
    "Quận Ngũ Hành Sơn": ["Phường Hòa Hải", "Phường Hòa Quý", "Phường Khuê Mỹ", "Phường Mỹ An"],
    "Quận Liên Chiểu": ["Phường Hòa Hiệp Bắc", "Phường Hòa Hiệp Nam", "Phường Hòa Khánh Bắc", "Phường Hòa Khánh Nam", "Phường Hòa Minh"],
    "Quận Cẩm Lệ": ["Phường Hòa An", "Phường Hòa Phát", "Phường Hòa Thọ Đông", "Phường Hòa Thọ Tây", "Phường Hòa Xuân"],
    "Huyện Hòa Vang": ["Xã Hòa Bắc", "Xã Hòa Châu", "Xã Hòa Khương", "Xã Hòa Liên", "Xã Hòa Nhơn"],
    "Huyện Hoàng Sa": []
  },
  "Đắk Lắk": {
    "Thành phố Buôn Ma Thuột": ["Phường Ea Tam", "Phường Khánh Xuân", "Phường Tân An", "Phường Tân Hòa", "Phường Tân Lập"],
    "Thị xã Buôn Hồ": ["Phường An Bình", "Phường An Lạc", "Phường An Phú", "Phường Đạt Hiếu", "Phường Đoàn Kết"],
    "Huyện Ea H'leo": ["Thị trấn Ea Drăng", "Xã Cư A Mung", "Xã Cư Mốt", "Xã Dliê Yang", "Xã Ea Hiao"],
    "Huyện Ea Súp": ["Thị trấn Ea Súp", "Xã Cư Kbang", "Xã Ea Bung", "Xã Ea Lê", "Xã Ea Rốk"],
    "Huyện Krông Năng": ["Thị trấn Krông Năng", "Xã Cư Klông", "Xã Ea Dah", "Xã Ea Hồ", "Xã Ea Puk"],
    "Huyện Krông Pắc": ["Thị trấn Phước An", "Xã Ea Kly", "Xã Ea Kuăng", "Xã Ea Phê", "Xã Ea Yông"],
    "Huyện Krông Búk": ["Xã Pơng Drang", "Xã Cư Né", "Xã Cư Pơng", "Xã Ea Sin", "Xã Ea Ngai"],
    "Huyện Krông Ana": ["Thị trấn Buôn Trấp", "Xã Băng Adrênh", "Xã Bình Hòa", "Xã Dray Sáp", "Xã Ea Bông"],
    "Huyện Krông Bông": ["Thị trấn Krông Kmar", "Xã Cư Đrăm", "Xã Cư Kty", "Xã Dang Kang", "Xã Hòa Lễ"],
    "Huyện Lắk": ["Thị trấn Liên Sơn", "Xã Bông Krang", "Xã Buôn Triết", "Xã Buôn Tría", "Xã Đắk Liêng"],
    "Huyện M'Đrắk": ["Thị trấn M'Đrắk", "Xã Cư K Róa", "Xã Cư M'ta", "Xã Ea H'Mlay", "Xã Ea Lai"],
    "Huyện Cư Kuin": ["Xã Ea Ning", "Xã Ea Ktur", "Xã Ea Tiêu", "Xã Ea Bhốk", "Xã Ea Hu"]
  },
  "Đắk Nông": {
    "Thành phố Gia Nghĩa": ["Phường Nghĩa Đức", "Phường Nghĩa Phú", "Phường Nghĩa Tân", "Phường Nghĩa Thành", "Phường Nghĩa Trung"],
    "Huyện Cư Jút": ["Thị trấn Ea T'Ling", "Xã Cư Knia", "Xã Đắk D'rông", "Xã Đắk Wil", "Xã Ea Pô"],
    "Huyện Đắk Glong": ["Xã Quảng Sơn", "Xã Đắk Ha", "Xã Đắk R'Măng", "Xã Quảng Hòa", "Xã Đắk Som"],
    "Huyện Đắk Mil": ["Thị trấn Đắk Mil", "Xã Đắk Lao", "Xã Đắk R'La", "Xã Đắk Sắk", "Xã Đức Mạnh"],
    "Huyện Đắk R'lấp": ["Thị trấn Kiến Đức", "Xã Đắk Ru", "Xã Đắk Sin", "Xã Hưng Bình", "Xã Kiến Thành"],
    "Huyện Đắk Song": ["Xã Đức An", "Xã Đắk Hòa", "Xã Đắk Môl", "Xã Đắk N'Drung", "Xã Nam Bình"],
    "Huyện Krông Nô": ["Thị trấn Đắk Mâm", "Xã Buôn Choah", "Xã Đắk Drô", "Xã Đắk Nang", "Xã Đắk Sôr"],
    "Huyện Tuy Đức": ["Xã Đắk Búk So", "Xã Đắk Ngo", "Xã Quảng Tâm", "Xã Quảng Tân", "Xã Quảng Trực"]
  },
  "Điện Biên": {
    "Thành phố Điện Biên Phủ": ["Noong Bua", "Him Lam", "Thanh Bình", "Tân Thanh", "Mường Thanh"],
    "Thị xã Mường Lay": ["Sông Đà", "Na Lay", "Lay Nưa"],
    "Huyện Điện Biên": ["Thanh Nưa", "Thanh Luông", "Thanh Hưng", "Thanh Chăn", "Thanh Xương"],
    "Huyện Điện Biên Đông": ["Điện Biên Đông", "Na Son", "Phì Nhừ", "Chiềng Sơ", "Mường Luân"],
    "Huyện Mường Ảng": ["Mường Ảng", "Ẳng Nưa", "Ẳng Tở", "Búng Lao", "Mường Đăng"],
    "Huyện Mường Chà": ["Mường Chà", "Huổi Lèng", "Huổi Mí", "Hừa Ngài", "Mường Mươn"],
    "Huyện Mường Nhé": ["Mường Nhé", "Chung Chải", "Leng Su Sìn", "Mường Toong", "Nậm Kè"],
    "Huyện Nậm Pồ": ["Nà Bủng", "Nậm Chua", "Nậm Nhừ", "Nà Khoa", "Chà Cang"],
    "Huyện Tủa Chùa": ["Tủa Chùa", "Huổi Só", "Lao Xả Phình", "Mường Báng", "Sính Phình"],
    "Huyện Tuần Giáo": ["Tuần Giáo", "Chiềng Đông", "Chiềng Sinh", "Mùn Chung", "Mường Khong"],
  },
  "Đồng Nai": {
    "Thành phố Biên Hòa": ["Phường Trảng Dài", "Phường Tân Phong", "Phường Tân Biên", "Phường Hố Nai", "Phường Tân Hòa"],
    "Thành phố Long Khánh": ["Phường Xuân Trung", "Phường Xuân Thanh", "Phường Xuân Bình", "Phường Xuân An", "Phường Xuân Hòa"],
    "Huyện Tân Phú": ["Thị trấn Tân Phú", "Xã Phú Bình", "Xã Phú Lâm", "Xã Phú Lập", "Xã Phú Sơn"],
    "Huyện Vĩnh Cửu": ["Thị trấn Vĩnh An", "Xã Bình Lợi", "Xã Mã Đà", "Xã Phú Lý", "Xã Tân An"],
    "Huyện Định Quán": ["Thị trấn Định Quán", "Xã Gia Canh", "Xã La Ngà", "Xã Ngọc Định", "Xã Phú Cường"],
    "Huyện Trảng Bom": ["Thị trấn Trảng Bom", "Xã An Viễn", "Xã Bắc Sơn", "Xã Bình Minh", "Xã Cây Gáo"],
    "Huyện Thống Nhất": ["Thị trấn Dầu Giây", "Xã Bàu Hàm 2", "Xã Gia Tân 1", "Xã Gia Tân 2", "Xã Gia Tân 3"],
    "Huyện Cẩm Mỹ": ["Thị trấn Long Giao", "Xã Bảo Bình", "Xã Lâm San", "Xã Nhân Nghĩa", "Xã Sông Nhạn"],
    "Huyện Long Thành": ["Thị trấn Long Thành", "Xã An Phước", "Xã Bàu Cạn", "Xã Bình An", "Xã Bình Sơn"],
    "Huyện Nhơn Trạch": ["Thị trấn Hiệp Phước", "Xã Đại Phước", "Xã Long Tân", "Xã Long Thọ", "Xã Phú Đông"],
    "Huyện Xuân Lộc": ["Thị trấn Gia Ray", "Xã Bảo Hòa", "Xã Lang Minh", "Xã Suối Cao", "Xã Suối Cát"]
  },
  "Đồng Tháp": {
    "Thành phố Cao Lãnh": ["Phường 1", "Phường 3", "Phường 4", "Phường 6", "Phường Hòa Thuận"],
    "Thành phố Sa Đéc": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường An Hòa"],
    "Thành phố Hồng Ngự": ["Phường An Lạc", "Phường An Thạnh", "Phường An Bình A", "Phường An Bình B", "Phường An Lộc"],
    "Huyện Cao Lãnh": ["Thị trấn Mỹ Thọ", "Xã Ba Sao", "Xã Bình Hàng Tây", "Xã Bình Hàng Trung", "Xã Bình Thạnh"],
    "Huyện Châu Thành": ["Thị trấn Cái Tàu Hạ", "Xã An Hiệp", "Xã An Khánh", "Xã An Nhơn", "Xã An Phú Thuận"],
    "Huyện Hồng Ngự": ["Thị trấn Thường Thới Tiền", "Xã Long Khánh A", "Xã Long Khánh B", "Xã Long Thuận", "Xã Phú Thuận A"],
    "Huyện Lai Vung": ["Thị trấn Lai Vung", "Xã Định Hòa", "Xã Hòa Long", "Xã Hòa Thành", "Xã Long Hậu"],
    "Huyện Lấp Vò": ["Thị trấn Lấp Vò", "Xã Bình Thành", "Xã Định An", "Xã Định Yên", "Xã Hội An Đông"],
    "Huyện Tam Nông": ["Thị trấn Tràm Chim", "Xã An Hòa", "Xã An Long", "Xã Hòa Bình", "Xã Phú Cường"],
    "Huyện Tân Hồng": ["Thị trấn Sa Rài", "Xã An Phước", "Xã Bình Phú", "Xã Tân Công Chí", "Xã Tân Hộ Cơ"],
    "Huyện Thanh Bình": ["Thị trấn Thanh Bình", "Xã An Phong", "Xã Bình Tấn", "Xã Tân Bình", "Xã Tân Hòa"],
    "Huyện Tháp Mười": ["Thị trấn Mỹ An", "Xã Đốc Binh Kiều", "Xã Hưng Thạnh", "Xã Láng Biển", "Xã Mỹ An"]
  },

  "Gia Lai": {
    "Thành phố Pleiku": ["Phường Diên Hồng", "Phường Hoa Lư", "Phường Tây Sơn", "Phường Thống Nhất", "Phường Yên Đỗ"],
    "Thị xã An Khê": ["Phường An Bình", "Phường An Phú", "Phường An Tân", "Phường Ngô Mây", "Phường Tây Sơn"],
    "Thị xã Ayun Pa": ["Phường Cheo Reo", "Phường Đoàn Kết", "Phường Hòa Bình", "Phường Sông Bờ"],
    "Huyện Chư Păh": ["Thị trấn Phú Hòa", "Xã Chư Đang Ya", "Xã Hà Tây", "Xã Hòa Phú", "Xã Ia Ka"],
    "Huyện Chư Prông": ["Thị trấn Chư Prông", "Xã Bàu Cạn", "Xã Bình Giáo", "Xã Ia Bang", "Xã Ia Băng"],
    "Huyện Chư Pưh": ["Thị trấn Nhơn Hòa", "Xã Chư Don", "Xã Ia Blứ", "Xã Ia Dreng", "Xã Ia Hla"],
    "Huyện Chư Sê": ["Thị trấn Chư Sê", "Xã Al Bá", "Xã Ayun", "Xã Bar Măih", "Xã Bờ Ngoong"],
    "Huyện Đắk Đoa": ["Thị trấn Đắk Đoa", "Xã A Dơk", "Xã Đắk Sơmei", "Xã Glar", "Xã Hà Bầu"],
    "Huyện Đắk Pơ": ["Thị trấn Đắk Pơ", "Xã An Thành", "Xã Cư An", "Xã Hà Tam", "Xã Phú An"],
    "Huyện Đức Cơ": ["Thị trấn Chư Ty", "Xã Ia Dơk", "Xã Ia Krêl", "Xã Ia Kriêng", "Xã Ia Lang"],
    "Huyện Ia Grai": ["Thị trấn Ia Kha", "Xã Ia Bă", "Xã Ia Chia", "Xã Ia Dêr", "Xã Ia Grăng"],
    "Huyện Ia Pa": ["Thị trấn Ia Pa", "Xã Chư Răng", "Xã Ia Broăi", "Xã Ia Kdăm", "Xã Ia Ma Rơn"],
    "Huyện Kbang": ["Thị trấn Kbang", "Xã Đăk Smar", "Xã Đông", "Xã Kông Bờ La", "Xã Kông Lơng Khơng"],
    "Huyện Kông Chro": ["Thị trấn Kông Chro", "Xã An Trung", "Xã Chơ Long", "Xã Đăk Kơ Ning", "Xã Đăk Song"],
    "Huyện Krông Pa": ["Thị trấn Phú Túc", "Xã Chư Drăng", "Xã Chư Ngọc", "Xã Ia HDreh", "Xã Ia Mlah"],
    "Huyện Mang Yang": ["Thị trấn Kon Dơng", "Xã Ayun", "Xã Đăk Djrăng", "Xã Đăk Jơ Ta", "Xã Đăk Ta Ley"],
    "Huyện Phú Thiện": ["Thị trấn Phú Thiện", "Xã Chrôh Pơnan", "Xã Ia Ake", "Xã Ia Hiao", "Xã Ia Peng"]
  },
  "Hà Giang": {
    "Thành phố Hà Giang": ["Phường Minh Khai", "Phường Ngọc Hà", "Phường Nguyễn Trãi", "Phường Quang Trung", "Phường Trần Phú"],
    "Huyện Bắc Mê": ["Thị trấn Yên Phú", "Xã Đường Âm", "Xã Đường Hồng", "Xã Giáp Trung", "Xã Lạc Nông"],
    "Huyện Bắc Quang": ["Thị trấn Việt Quang", "Thị trấn Vĩnh Tuy", "Xã Bằng Hành", "Xã Đồng Tâm", "Xã Đồng Tiến"],
    "Huyện Đồng Văn": ["Thị trấn Đồng Văn", "Thị trấn Phó Bảng", "Xã Hố Quáng Phìn", "Xã Lũng Cú", "Xã Lũng Phìn"],
    "Huyện Hoàng Su Phì": ["Thị trấn Vinh Quang", "Xã Bản Luốc", "Xã Bản Máy", "Xã Bản Nhùng", "Xã Bản Phùng"],
    "Huyện Mèo Vạc": ["Thị trấn Mèo Vạc", "Xã Cán Chu Phìn", "Xã Giàng Chu Phìn", "Xã Khâu Vai", "Xã Lũng Chinh"],
    "Huyện Quản Bạ": ["Thị trấn Tam Sơn", "Xã Bát Đại Sơn", "Xã Cán Tỷ", "Xã Cao Mã Pờ", "Xã Đông Hà"],
    "Huyện Quang Bình": ["Thị trấn Yên Bình", "Xã Bằng Lang", "Xã Hương Sơn", "Xã Nà Khương", "Xã Tân Bắc"],
    "Huyện Vị Xuyên": ["Thị trấn Vị Xuyên", "Thị trấn Việt Lâm", "Xã Bạch Ngọc", "Xã Cao Bồ", "Xã Đạo Đức"],
    "Huyện Xín Mần": ["Thị trấn Cốc Pài", "Xã Bản Díu", "Xã Chí Cà", "Xã Nàn Ma", "Xã Nàn Xỉn"],
    "Huyện Yên Minh": ["Thị trấn Yên Minh", "Xã Bạch Đích", "Xã Đông Minh", "Xã Du Già", "Xã Du Tiến"]
  },
  "Hà Nam": {
    "Thành phố Phủ Lý": ["Phường Châu Sơn", "Phường Hai Bà Trưng", "Phường Lê Hồng Phong", "Phường Minh Khai", "Phường Quang Trung"],
    "Thị xã Duy Tiên": ["Phường Bạch Thượng", "Phường Châu Giang", "Phường Duy Hải", "Phường Duy Minh", "Phường Đồng Văn"],
    "Thị xã Kim Bảng": ["Phường Ba Sao", "Phường Đại Cương", "Phường Đồng Hóa", "Phường Lê Hồ", "Phường Ngọc Sơn"],
    "Huyện Bình Lục": ["Thị trấn Bình Mỹ", "Xã An Đổ", "Xã An Lão", "Xã An Ninh", "Xã Bình An"],
    "Huyện Lý Nhân": ["Thị trấn Vĩnh Trụ", "Xã Bắc Lý", "Xã Chân Lý", "Xã Chính Lý", "Xã Công Lý"],
    "Huyện Thanh Liêm": ["Thị trấn Tân Thanh", "Thị trấn Kiện Khê", "Xã Liêm Cần", "Xã Liêm Phong", "Xã Liêm Sơn"]
  },
  "Hà Tĩnh": {
    "Thành phố Hà Tĩnh": ["Phường Bắc Hà", "Phường Nam Hà", "Phường Nguyễn Du", "Phường Tân Giang", "Phường Thạch Quý"],
    "Thị xã Hồng Lĩnh": ["Phường Bắc Hồng", "Phường Nam Hồng", "Phường Trung Lương", "Phường Đức Thuận", "Phường Đậu Liêu"],
    "Thị xã Kỳ Anh": ["Phường Kỳ Long", "Phường Kỳ Phương", "Phường Kỳ Thịnh", "Phường Kỳ Trinh", "Phường Sông Trí"],
    "Huyện Can Lộc": ["Thị trấn Nghèn", "Xã Thiên Lộc", "Xã Vượng Lộc", "Xã Yên Lộc", "Xã Khánh Lộc"],
    "Huyện Cẩm Xuyên": ["Thị trấn Cẩm Xuyên", "Xã Cẩm Bình", "Xã Cẩm Duệ", "Xã Cẩm Hà", "Xã Cẩm Hưng"],
    "Huyện Đức Thọ": ["Thị trấn Đức Thọ", "Xã Đức An", "Xã Đức Châu", "Xã Đức Dũng", "Xã Đức Hòa"],
    "Huyện Hương Khê": ["Thị trấn Hương Khê", "Xã Gia Phố", "Xã Hương Bình", "Xã Hương Giang", "Xã Hương Long"],
    "Huyện Hương Sơn": ["Thị trấn Phố Châu", "Xã Sơn An", "Xã Sơn Bằng", "Xã Sơn Bình", "Xã Sơn Châu"],
    "Huyện Kỳ Anh": ["Thị trấn Kỳ Anh", "Xã Kỳ Bắc", "Xã Kỳ Châu", "Xã Kỳ Đồng", "Xã Kỳ Giang"],
    "Huyện Lộc Hà": ["Thị trấn Lộc Hà", "Xã Bình An", "Xã Ích Hậu", "Xã Mai Phụ", "Xã Thạch Châu"],
    "Huyện Nghi Xuân": ["Thị trấn Nghi Xuân", "Xã Cổ Đạm", "Xã Cương Gián", "Xã Tiên Điền", "Xã Xuân An"],
    "Huyện Thạch Hà": ["Thị trấn Thạch Hà", "Xã Bắc Sơn", "Xã Lưu Vĩnh Sơn", "Xã Ngọc Sơn", "Xã Thạch Hải"],
    "Huyện Vũ Quang": ["Thị trấn Vũ Quang", "Xã Ân Phú", "Xã Đức Bồng", "Xã Đức Giang", "Xã Đức Hương"]
  },

  "Hải Dương": {
    "Thành phố Hải Dương": ["Phường Bình Hàn", "Phường Cẩm Thượng", "Phường Hải Tân", "Phường Lê Thanh Nghị", "Phường Nguyễn Trãi", "Phường Ngọc Châu", "Phường Tân Bình", "Phường Trần Hưng Đạo", "Phường Thanh Bình"],
    "Thành phố Chí Linh": ["Phường Bến Tắm", "Phường Chí Minh", "Phường Cộng Hòa", "Phường Hoàng Tân", "Phường Phả Lại", "Phường Văn An", "Phường Sao Đỏ", "Xã Lê Lợi", "Xã Cổ Thành"],
    "Thị xã Kinh Môn": ["Phường An Lưu", "Phường Duy Tân", "Phường Hiệp An", "Phường Hiệp Hòa", "Phường Hiệp Sơn", "Xã Long Xuyên", "Xã Lê Ninh", "Xã Thượng Quận", "Xã Quang Trung"],
    "Huyện Bình Giang": ["Thị trấn Kẻ Sặt", "Xã Bình Minh", "Xã Bình Xuyên", "Xã Cổ Bì", "Xã Hồng Khê", "Xã Hùng Thắng", "Xã Nhân Quyền", "Xã Tân Việt"],
    "Huyện Cẩm Giàng": ["Thị trấn Cẩm Giàng", "Xã Cẩm Điền", "Xã Cẩm Đông", "Xã Cẩm Hoàng", "Xã Cẩm Hưng", "Xã Định Sơn", "Xã Tân Trường", "Xã Cao An"],
    "Huyện Gia Lộc": ["Thị trấn Gia Lộc", "Xã Đoàn Thượng", "Xã Gia Hòa", "Xã Gia Khánh", "Xã Gia Lương", "Xã Đức Xương", "Xã Hồng Hưng"],
    "Huyện Kim Thành": ["Thị trấn Phú Thái", "Xã Bình Dân", "Xã Cẩm La", "Xã Cổ Dũng", "Xã Đồng Cẩm", "Xã Kim Tân", "Xã Kim Liên", "Xã Lai Vu"],
    "Huyện Nam Sách": ["Thị trấn Nam Sách", "Xã An Bình", "Xã An Lâm", "Xã An Sơn", "Xã Cộng Hòa", "Xã Hợp Tiến", "Xã Nam Chính"],
    "Huyện Ninh Giang": ["Thị trấn Ninh Giang", "Xã Ứng Hòe", "Xã An Đức", "Xã Hiệp Lực", "Xã Hồng Phong", "Xã Kiến Quốc", "Xã Tân Hương"],
    "Huyện Thanh Hà": ["Thị trấn Thanh Hà", "Xã An Phượng", "Xã Cẩm Chế", "Xã Hồng Lạc", "Xã Liên Mạc", "Xã Tân Việt", "Xã Vĩnh Lập"],
    "Huyện Thanh Miện": ["Thị trấn Thanh Miện", "Xã Cao Thắng", "Xã Chi Lăng Bắc", "Xã Chi Lăng Nam", "Xã Đoàn Kết", "Xã Hồng Quang", "Xã Lam Sơn"],
    "Huyện Tứ Kỳ": ["Thị trấn Tứ Kỳ", "Xã An Thanh", "Xã Bình Lãng", "Xã Chí Minh", "Xã Đại Hợp", "Xã Hà Kỳ", "Xã Hưng Đạo"]
  },

  "Hải Phòng": {
    "Quận Hồng Bàng": ["Phường Minh Khai", "Phường Hoàng Văn Thụ", "Phường Quán Toan", "Phường Sở Dầu", "Phường Thượng Lý"],
    "Quận Lê Chân": ["Phường An Biên", "Phường An Dương", "Phường Cát Dài", "Phường Dư Hàng", "Phường Trần Nguyên Hãn"],
    "Quận Ngô Quyền": ["Phường Lạc Viên", "Phường Máy Chai", "Phường Gia Viên", "Phường Cầu Tre", "Phường Vạn Mỹ"],
    "Quận Kiến An": ["Phường Bắc Sơn", "Phường Đồng Hòa", "Phường Lãm Hà", "Phường Nam Sơn", "Phường Ngọc Sơn"],
    "Quận Hải An": ["Phường Đằng Hải", "Phường Đằng Lâm", "Phường Đông Hải 1", "Phường Đông Hải 2", "Phường Nam Hải"],
    "Quận Đồ Sơn": ["Phường Ngọc Xuyên", "Phường Vạn Hương", "Phường Vạn Sơn", "Phường Hợp Đức", "Phường Bàng La"],
    "Quận Dương Kinh": ["Phường Anh Dũng", "Phường Hòa Nghĩa", "Phường Hải Thành", "Phường Tân Thành", "Phường Hưng Đạo"],
    "Huyện An Dương": ["Thị trấn An Dương", "Xã An Đồng", "Xã An Hòa", "Xã Bắc Sơn", "Xã Đặng Cương"],
    "Huyện An Lão": ["Thị trấn An Lão", "Xã An Thắng", "Xã Bát Trang", "Xã Chiến Thắng", "Xã Mỹ Đức"],
    "Huyện Kiến Thụy": ["Thị trấn Núi Đối", "Xã Đại Đồng", "Xã Du Lễ", "Xã Hữu Bằng", "Xã Ngũ Đoan"],
    "Huyện Tiên Lãng": ["Thị trấn Tiên Lãng", "Xã Bắc Hưng", "Xã Bạch Đằng", "Xã Cấp Tiến", "Xã Đoàn Lập"],
    "Huyện Vĩnh Bảo": ["Thị trấn Vĩnh Bảo", "Xã An Hòa", "Xã Cao Minh", "Xã Cổ Am", "Xã Dũng Tiến"],
    "Huyện Thủy Nguyên": ["Thị trấn Núi Đèo", "Xã An Lư", "Xã Chính Mỹ", "Xã Dương Quan", "Xã Gia Đức"],
    "Huyện Cát Hải": ["Thị trấn Cát Bà", "Thị trấn Cát Hải", "Xã Đồng Bài", "Xã Gia Luận", "Xã Hiền Hào"],
    "Huyện Bạch Long Vĩ": ["Xã Bạch Long Vĩ"]
  },
  "Hậu Giang": {
    "Thành phố Vị Thanh": ["Phường I", "Phường III", "Phường IV", "Phường V", "Phường VII"],
    "Thành phố Ngã Bảy": ["Phường Hiệp Thành", "Phường Hiệp Lợi", "Phường Ngã Bảy", "Phường Lái Hiếu", "Phường Đông Thuận"],
    "Thị xã Long Mỹ": ["Phường Thuận An", "Phường Trà Lồng", "Phường Vĩnh Tường", "Xã Long Bình", "Xã Long Trị"],
    "Huyện Châu Thành": ["Thị trấn Ngã Sáu", "Xã Đông Phước", "Xã Đông Phước A", "Xã Đông Thạnh", "Xã Phú Hữu"],
    "Huyện Châu Thành A": ["Thị trấn Một Ngàn", "Xã Nhơn Nghĩa A", "Xã Tân Hòa", "Xã Thạnh Xuân", "Xã Trường Long A"],
    "Huyện Phụng Hiệp": ["Thị trấn Cây Dương", "Xã Bình Thành", "Xã Hòa An", "Xã Hòa Mỹ", "Xã Long Thạnh"],
    "Huyện Vị Thủy": ["Thị trấn Nàng Mau", "Xã Vị Bình", "Xã Vị Đông", "Xã Vị Thanh", "Xã Vị Thắng"],
    "Huyện Long Mỹ": ["Thị trấn Long Mỹ", "Xã Long Phú", "Xã Long Trị A", "Xã Tân Phú", "Xã Thuận Hòa"]
  },
  "Hòa Bình": {
    "Thành phố Hòa Bình": ["Phường Phương Lâm", "Phường Đồng Tiến", "Phường Tân Hòa", "Phường Thịnh Lang", "Phường Thống Nhất"],
    "Huyện Đà Bắc": ["Thị trấn Đà Bắc", "Xã Mường Chiềng", "Xã Đồng Chum", "Xã Hiền Lương", "Xã Tiền Phong"],
    "Huyện Kim Bôi": ["Thị trấn Bo", "Xã Bình Sơn", "Xã Hợp Tiến", "Xã Kim Bôi", "Xã Vĩnh Đồng"],
    "Huyện Lạc Sơn": ["Thị trấn Vụ Bản", "Xã Ân Nghĩa", "Xã Bình Hẻm", "Xã Nhân Nghĩa", "Xã Yên Phú"],
    "Huyện Lạc Thủy": ["Thị trấn Chi Nê", "Xã An Bình", "Xã Đồng Tâm", "Xã Hưng Thi", "Xã Phú Thành"],
    "Huyện Lương Sơn": ["Thị trấn Lương Sơn", "Xã Cao Dương", "Xã Hòa Sơn", "Xã Nhuận Trạch", "Xã Tân Vinh"],
    "Huyện Mai Châu": ["Thị trấn Mai Châu", "Xã Chiềng Châu", "Xã Mai Hạ", "Xã Tân Sơn", "Xã Vạn Mai"],
    "Huyện Tân Lạc": ["Thị trấn Mãn Đức", "Xã Lỗ Sơn", "Xã Ngọc Mỹ", "Xã Phong Phú", "Xã Quyết Chiến"],
    "Huyện Yên Thủy": ["Thị trấn Hàng Trạm", "Xã Đa Phúc", "Xã Hữu Lợi", "Xã Lạc Hưng", "Xã Yên Trị"],
    "Huyện Cao Phong": ["Thị trấn Cao Phong", "Xã Bắc Phong", "Xã Bình Thanh", "Xã Dũng Phong", "Xã Thung Nai"]
  },
  "Hưng Yên": {
    "Thành phố Hưng Yên": ["Phường An Tảo", "Phường Hiến Nam", "Phường Lam Sơn", "Phường Lê Lợi", "Phường Minh Khai"],
    "Thị xã Mỹ Hào": ["Phường Bạch Sam", "Phường Bần Yên Nhân", "Phường Dị Sử", "Phường Minh Đức", "Phường Nhân Hòa"],
    "Huyện Ân Thi": ["Thị trấn Ân Thi", "Xã Bãi Sậy", "Xã Cẩm Ninh", "Xã Đa Lộc", "Xã Đặng Lễ"],
    "Huyện Khoái Châu": ["Thị trấn Khoái Châu", "Xã An Vĩ", "Xã Bình Minh", "Xã Chí Tân", "Xã Đại Hưng"],
    "Huyện Kim Động": ["Thị trấn Lương Bằng", "Xã Chính Nghĩa", "Xã Đồng Thanh", "Xã Đức Hợp", "Xã Hiệp Cường"],
    "Huyện Phù Cừ": ["Thị trấn Trần Cao", "Xã Đình Cao", "Xã Đoàn Đào", "Xã Minh Hoàng", "Xã Minh Tân"],
    "Huyện Tiên Lữ": ["Thị trấn Vương", "Xã An Viên", "Xã Cương Chính", "Xã Dị Chế", "Xã Đức Thắng"],
    "Huyện Văn Giang": ["Thị trấn Văn Giang", "Xã Cửu Cao", "Xã Liên Nghĩa", "Xã Long Hưng", "Xã Mễ Sở"],
    "Huyện Văn Lâm": ["Thị trấn Như Quỳnh", "Xã Chỉ Đạo", "Xã Đại Đồng", "Xã Đình Dù", "Xã Lạc Đạo"],
    "Huyện Yên Mỹ": ["Thị trấn Yên Mỹ", "Xã Đồng Than", "Xã Giai Phạm", "Xã Hoàn Long", "Xã Liêu Xá"]
  },
  "Khánh Hòa": {
    "Thành phố Nha Trang": ["Phường Lộc Thọ", "Phường Phước Tiến", "Phường Vĩnh Phước", "Phường Vĩnh Hải", "Phường Phước Hòa"],
    "Thành phố Cam Ranh": ["Phường Cam Phú", "Phường Cam Lợi", "Phường Ba Ngòi", "Phường Cam Nghĩa", "Phường Cam Thuận"],
    "Thị xã Ninh Hòa": ["Phường Ninh Hiệp", "Phường Ninh Giang", "Phường Ninh Hà", "Phường Ninh Diêm", "Phường Ninh Thủy"],
    "Huyện Cam Lâm": ["Xã Cam Hải Tây", "Xã Cam Hòa", "Xã Cam Hiệp Bắc", "Xã Cam Hiệp Nam", "Xã Cam Đức"],
    "Huyện Diên Khánh": ["Xã Diên An", "Xã Diên Điền", "Xã Diên Lạc", "Xã Diên Phú", "Xã Diên Tân"],
    "Huyện Khánh Sơn": ["Xã Ba Cụm Bắc", "Xã Ba Cụm Nam", "Xã Sơn Bình", "Xã Sơn Hiệp", "Xã Sơn Lâm"],
    "Huyện Khánh Vĩnh": ["Xã Khánh Bình", "Xã Khánh Đông", "Xã Khánh Hiệp", "Xã Khánh Nam", "Xã Khánh Phú"],
    "Huyện Trường Sa": ["Xã Song Tử Tây", "Xã Sinh Tồn", "Xã Trường Sa"]
  },

  "Kiên Giang": {
    "Thành phố Rạch Giá": ["Phường An Hòa", "Phường Vĩnh Bảo", "Phường Vĩnh Lạc", "Phường Vĩnh Quang", "Phường Vĩnh Thanh"],
    "Thành phố Hà Tiên": ["Phường Đông Hồ", "Phường Bình San", "Phường Tô Châu", "Phường Pháo Đài", "Phường Mỹ Đức"],
    "Thành phố Phú Quốc": ["Phường Dương Đông", "Phường An Thới", "Xã Gành Dầu", "Xã Hàm Ninh", "Xã Bãi Thơm"],
    "Huyện An Biên": ["Xã Tây Yên", "Xã Nam Yên", "Xã Nam Thái", "Xã Đông Yên", "Xã An Hòa"],
    "Huyện An Minh": ["Xã Đông Thạnh", "Xã Đông Hưng", "Xã Vân Khánh", "Xã Vân Khánh Đông", "Xã Thạnh Yên"],
    "Huyện Châu Thành": ["Xã Vĩnh Hòa Hiệp", "Xã Vĩnh Hòa Phú", "Xã Mong Thọ", "Xã Mong Thọ A", "Xã Mong Thọ B"],
    "Huyện Giồng Riềng": ["Thị trấn Giồng Riềng", "Xã Thạnh Hưng", "Xã Thạnh Lộc", "Xã Thạnh Phước", "Xã Thạnh Trị"],
    "Huyện Gò Quao": ["Thị trấn Gò Quao", "Xã Định An", "Xã Định Hòa", "Xã Thủy Liểu", "Xã Thới Quản"],
    "Huyện Hòn Đất": ["Thị trấn Hòn Đất", "Xã Bình Giang", "Xã Bình Sơn", "Xã Lình Huỳnh", "Xã Mỹ Hiệp Sơn"],
    "Huyện Kiên Hải": ["Xã An Sơn", "Xã Hòn Tre", "Xã Lại Sơn", "Xã Nam Du"],
    "Huyện Kiên Lương": ["Thị trấn Kiên Lương", "Xã Bình An", "Xã Dương Hòa", "Xã Hòa Điền", "Xã Kiên Bình"],
    "Huyện Tân Hiệp": ["Thị trấn Tân Hiệp", "Xã Tân An", "Xã Tân Hiệp A", "Xã Tân Hiệp B", "Xã Tân Hội"],
    "Huyện U Minh Thượng": ["Xã An Minh Bắc", "Xã Hòa Chánh", "Xã Minh Thuận", "Xã Thạnh Yên", "Xã Vĩnh Hòa"],
    "Huyện Vĩnh Thuận": ["Thị trấn Vĩnh Thuận", "Xã Bình Minh", "Xã Phong Đông", "Xã Tân Thuận", "Xã Vĩnh Bình Bắc"]
  },

  "Kon Tum": {
    "Thành phố Kon Tum": ["Phường Thống Nhất", "Phường Quyết Thắng", "Phường Trường Chinh", "Phường Nguyễn Trãi", "Phường Lê Lợi"],
    "Huyện Đắk Glei": ["Thị trấn Đắk Glei", "Xã Đắk Môn", "Xã Đắk Man", "Xã Đắk Long", "Xã Đắk Plô"],
    "Huyện Đắk Hà": ["Thị trấn Đắk Hà", "Xã Đắk Hring", "Xã Đắk La", "Xã Hà Mòn", "Xã Ngọk Réo"],
    "Huyện Đắk Tô": ["Thị trấn Đắk Tô", "Xã Đắk Rơ Nga", "Xã Đắk Trăm", "Xã Ngọc Tụ", "Xã Tân Cảnh"],
    "Huyện Kon Plông": ["Thị trấn Măng Đen", "Xã Đắk Nên", "Xã Đắk Ring", "Xã Hiếu", "Xã Pờ Ê"],
    "Huyện Kon Rẫy": ["Thị trấn Đắk Rve", "Xã Đắk Kôi", "Xã Đắk Pne", "Xã Tân Lập", "Xã Kon Pne"],
    "Huyện Ngọc Hồi": ["Thị trấn Plei Kần", "Xã Đắk Ang", "Xã Đắk Dục", "Xã Đắk Nông", "Xã Bờ Y"],
    "Huyện Sa Thầy": ["Thị trấn Sa Thầy", "Xã Hơ Moong", "Xã Mô Rai", "Xã Rơ Kơi", "Xã Ya Ly"],
    "Huyện Tu Mơ Rông": ["Xã Đắk Hà", "Xã Đắk Na", "Xã Đắk Sao", "Xã Măng Ri", "Xã Tê Xăng"]
  },
  "Lai Châu": {
    "Thành phố Lai Châu": ["Phường Đông Phong", "Phường Quyết Thắng", "Phường Quyết Tiến", "Phường Tân Phong", "Phường Đoàn Kết"],
    "Huyện Mường Tè": ["Thị trấn Mường Tè", "Xã Bum Nưa", "Xã Ka Lăng", "Xã Mù Cả", "Xã Pa Vệ Sử"],
    "Huyện Nậm Nhùn": ["Thị trấn Nậm Nhùn", "Xã Hua Bum", "Xã Mường Mô", "Xã Nậm Ban", "Xã Nậm Chà"],
    "Huyện Phong Thổ": ["Thị trấn Phong Thổ", "Xã Dào San", "Xã Mường So", "Xã Sin Suối Hồ", "Xã Sì Lở Lầu"],
    "Huyện Sìn Hồ": ["Thị trấn Sìn Hồ", "Xã Chăn Nưa", "Xã Làng Mô", "Xã Nậm Tăm", "Xã Pa Khóa"],
    "Huyện Tam Đường": ["Thị trấn Tam Đường", "Xã Bản Bo", "Xã Bình Lư", "Xã Hồ Thầu", "Xã Khun Há"],
    "Huyện Tân Uyên": ["Thị trấn Tân Uyên", "Xã Hố Mít", "Xã Mường Khoa", "Xã Nậm Cần", "Xã Phúc Khoa"],
    "Huyện Than Uyên": ["Thị trấn Than Uyên", "Xã Hua Nà", "Xã Mường Cang", "Xã Mường Kim", "Xã Phúc Than"]
  },
  "Lâm Đồng": {
    "Thành phố Đà Lạt": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"],
    "Thành phố Bảo Lộc": ["Phường B'Lao", "Phường Lộc Phát", "Phường Lộc Sơn", "Phường Phường 1", "Phường Phường 2"],
    "Huyện Bảo Lâm": ["Thị trấn Lộc Thắng", "Xã Lộc An", "Xã Lộc Đức", "Xã Lộc Ngãi", "Xã Lộc Quảng"],
    "Huyện Cát Tiên": ["Thị trấn Cát Tiên", "Xã Đồng Nai Thượng", "Xã Gia Viễn", "Xã Nam Ninh", "Xã Phước Cát 1"],
    "Huyện Đạ Huoai": ["Thị trấn Đạ M'ri", "Thị trấn Ma Đa Guôi", "Xã Đạ Ploa", "Xã Đoàn Kết", "Xã Hà Lâm"],
    "Huyện Đạ Tẻh": ["Thị trấn Đạ Tẻh", "Xã An Nhơn", "Xã Đạ Kho", "Xã Đạ Lây", "Xã Hương Lâm"],
    "Huyện Đam Rông": ["Thị trấn Đam Rông", "Xã Đạ K' Nàng", "Xã Đạ Long", "Xã Đạ M' Rong", "Xã Liêng Sronh"],
    "Huyện Di Linh": ["Thị trấn Di Linh", "Xã Bảo Thuận", "Xã Đinh Lạc", "Xã Gia Hiệp", "Xã Gung Ré"],
    "Huyện Đơn Dương": ["Thị trấn D'Ran", "Thị trấn Thạnh Mỹ", "Xã Ka Đô", "Xã Lạc Lâm", "Xã Lạc Xuân"],
    "Huyện Đức Trọng": ["Thị trấn Liên Nghĩa", "Xã Hiệp An", "Xã Hiệp Thạnh", "Xã Liên Hiệp", "Xã N'Thol Hạ"],
    "Huyện Lạc Dương": ["Thị trấn Lạc Dương", "Xã Đạ Chais", "Xã Đạ Nhim", "Xã Đưng K'Nớ", "Xã Lát"],
    "Huyện Lâm Hà": ["Thị trấn Đinh Văn", "Thị trấn Nam Ban", "Xã Đạ Đờn", "Xã Đông Thanh", "Xã Gia Lâm"]
  },
  "Lạng Sơn": {
    "Thành phố Lạng Sơn": ["Phường Chi Lăng", "Phường Đông Kinh", "Phường Hoàng Văn Thụ", "Phường Tam Thanh", "Phường Vĩnh Trại"],
    "Huyện Bắc Sơn": ["Thị trấn Bắc Sơn", "Xã Chiến Thắng", "Xã Chiêu Vũ", "Xã Đồng Ý", "Xã Hưng Vũ"],
    "Huyện Bình Gia": ["Thị trấn Bình Gia", "Xã Hồng Phong", "Xã Hồng Thái", "Xã Hưng Đạo", "Xã Minh Khai"],
    "Huyện Cao Lộc": ["Thị trấn Cao Lộc", "Thị trấn Đồng Đăng", "Xã Bảo Lâm", "Xã Bình Trung", "Xã Cao Lâu"],
    "Huyện Chi Lăng": ["Thị trấn Chi Lăng", "Thị trấn Đồng Mỏ", "Xã Bắc Thủy", "Xã Bằng Hữu", "Xã Bằng Mạc"],
    "Huyện Đình Lập": ["Thị trấn Đình Lập", "Thị trấn Nông trường Thái Bình", "Xã Bắc Lãng", "Xã Bắc Xa", "Xã Bính Xá"],
    "Huyện Hữu Lũng": ["Thị trấn Hữu Lũng", "Xã Cai Kinh", "Xã Đô Lương", "Xã Đồng Tân", "Xã Đồng Tiến"],
    "Huyện Lộc Bình": ["Thị trấn Lộc Bình", "Thị trấn Na Dương", "Xã Ái Quốc", "Xã Bằng Khánh", "Xã Đồng Bục"],
    "Huyện Tràng Định": ["Thị trấn Thất Khê", "Xã Chi Lăng", "Xã Đào Viên", "Xã Đề Thám", "Xã Hùng Sơn"],
    "Huyện Văn Lãng": ["Thị trấn Na Sầm", "Xã Bắc La", "Xã Gia Miễn", "Xã Hoàng Văn Thụ"]
  },

  "Lào Cai": {
    "Thành phố Lào Cai": ["Phường Bắc Cường", "Phường Bắc Lệnh", "Phường Bình Minh", "Phường Cốc Lếu", "Phường Duyên Hải"],
    "Thị xã Sa Pa": ["Phường Sa Pa", "Xã Hoàng Liên", "Xã Mường Hoa", "Xã Tả Phìn", "Xã Tả Van"],
    "Huyện Bát Xát": ["Thị trấn Bát Xát", "Xã A Mú Sung", "Xã Bản Qua", "Xã Mường Hum", "Xã Nậm Pung"],
    "Huyện Bắc Hà": ["Thị trấn Bắc Hà", "Xã Bản Liền", "Xã Bản Phố", "Xã Hoàng Thu Phố", "Xã Na Hối"],
    "Huyện Bảo Thắng": ["Thị trấn Phố Lu", "Xã Bản Cầm", "Xã Gia Phú", "Xã Sơn Hà", "Xã Thái Niên"],
    "Huyện Bảo Yên": ["Thị trấn Phố Ràng", "Xã Bảo Hà", "Xã Kim Sơn", "Xã Nghĩa Đô", "Xã Xuân Thượng"],
    "Huyện Mường Khương": ["Thị trấn Mường Khương", "Xã Bản Lầu", "Xã Cao Sơn", "Xã La Pan Tẩn", "Xã Tả Ngài Chồ"],
    "Huyện Si Ma Cai": ["Thị trấn Si Ma Cai", "Xã Cán Cấu", "Xã Lùng Thẩn", "Xã Nàn Sán", "Xã Sín Chéng"],
    "Huyện Văn Bàn": ["Thị trấn Khánh Yên", "Xã Dương Quỳ", "Xã Liêm Phú", "Xã Nậm Xé", "Xã Tân An"]
  },
  "Long An": {
    "Thành phố Tân An": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"],
    "Thị xã Kiến Tường": ["Phường 1", "Phường 2", "Phường 3", "Xã Bình Hiệp", "Xã Thạnh Hưng"],
    "Huyện Bến Lức": ["Thị trấn Bến Lức", "Xã An Thạnh", "Xã Lương Bình", "Xã Mỹ Yên", "Xã Tân Bửu"],
    "Huyện Cần Đước": ["Thị trấn Cần Đước", "Xã Long Cang", "Xã Long Định", "Xã Phước Đông", "Xã Tân Ân"],
    "Huyện Cần Giuộc": ["Thị trấn Cần Giuộc", "Xã Long An", "Xã Long Hậu", "Xã Phước Lại", "Xã Phước Vĩnh Đông"],
    "Huyện Châu Thành": ["Thị trấn Tầm Vu", "Xã An Lục Long", "Xã Dương Xuân Hội", "Xã Hòa Phú", "Xã Vĩnh Công"],
    "Huyện Đức Hòa": ["Thị trấn Hậu Nghĩa", "Xã Đức Hòa Đông", "Xã Đức Hòa Hạ", "Xã Hòa Khánh Đông", "Xã Mỹ Hạnh Bắc"],
    "Huyện Đức Huệ": ["Thị trấn Đông Thành", "Xã Bình Hòa Bắc", "Xã Bình Hòa Hưng", "Xã Mỹ Quý Đông", "Xã Mỹ Thạnh Bắc"],
    "Huyện Mộc Hóa": ["Thị trấn Bình Phong Thạnh", "Xã Bình Hòa Đông", "Xã Bình Hòa Tây", "Xã Tân Lập", "Xã Tân Thành"],
    "Huyện Tân Hưng": ["Thị trấn Tân Hưng", "Xã Hưng Điền", "Xã Vĩnh Bửu", "Xã Vĩnh Đại", "Xã Vĩnh Thạnh"],
    "Huyện Tân Thạnh": ["Thị trấn Tân Thạnh", "Xã Bắc Hòa", "Xã Nhơn Hòa", "Xã Tân Bình", "Xã Tân Ninh"],
    "Huyện Tân Trụ": ["Thị trấn Tân Trụ", "Xã Bình Lãng", "Xã Đức Tân", "Xã Lạc Tấn", "Xã Tân Phước Tây"],
    "Huyện Thạnh Hóa": ["Thị trấn Thạnh Hóa", "Xã Tân Đông", "Xã Thạnh An", "Xã Thạnh Phú", "Xã Thuận Bình"],
    "Huyện Thủ Thừa": ["Thị trấn Thủ Thừa", "Xã Bình An", "Xã Long Thạnh", "Xã Mỹ An", "Xã Tân Thành"],
    "Huyện Vĩnh Hưng": ["Thị trấn Vĩnh Hưng", "Xã Hưng Điền A", "Xã Thái Bình Trung", "Xã Tuyên Bình", "Xã Vĩnh Thuận"]
  },
  "Nam Định": {
    "Thành phố Nam Định": ["Phường Cửa Bắc", "Phường Cửa Nam", "Phường Hưng Lộc", "Phường Lộc Hạ", "Phường Lộc Hòa"],
    "Huyện Giao Thủy": ["Thị trấn Ngô Đồng", "Xã Giao An", "Xã Giao Châu", "Xã Giao Hà", "Xã Giao Hải"],
    "Huyện Hải Hậu": ["Thị trấn Yên Định", "Xã Hải An", "Xã Hải Bắc", "Xã Hải Châu", "Xã Hải Đông"],
    "Huyện Nam Trực": ["Thị trấn Nam Giang", "Xã Bình Minh", "Xã Điền Xá", "Xã Đồng Sơn", "Xã Hồng Quang"],
    "Huyện Nghĩa Hưng": ["Thị trấn Liễu Đề", "Xã Nghĩa Bình", "Xã Nghĩa Châu", "Xã Nghĩa Hồng", "Xã Nghĩa Lạc"],
    "Huyện Trực Ninh": ["Thị trấn Cổ Lễ", "Xã Trực Chính", "Xã Trực Cường", "Xã Trực Đại", "Xã Trực Đạo"],
    "Huyện Vụ Bản": ["Thị trấn Gôi", "Xã Cộng Hòa", "Xã Đại An", "Xã Đại Thắng", "Xã Hiển Khánh", "Xã Hợp Hưng", "Xã Kim Thái", "Xã Liên Minh", "Xã Minh Tân", "Xã Quang Trung", "Xã Tam Thanh", "Xã Thành Lợi",
      "Xã Trung Thành",
      "Xã Vĩnh Hào"]
  },
  "Nghệ An": {
    "Thành phố Vinh": ["Phường Hồng Sơn", "Phường Quang Trung", "Phường Lê Mao", "Phường Trường Thi", "Phường Đội Cung"],
    "Thị xã Thái Hòa": ["Phường Hòa Hiếu", "Phường Long Sơn", "Phường Quang Phong", "Phường Quang Tiến", "Xã Nghĩa Mỹ"],
    "Thị xã Hoàng Mai": ["Phường Quỳnh Thiện", "Phường Quỳnh Xuân", "Phường Quỳnh Phương", "Phường Mai Hùng", "Xã Quỳnh Vinh"],
    "Huyện Quỳnh Lưu": ["Thị trấn Cầu Giát", "Xã Quỳnh Hồng", "Xã Quỳnh Bá", "Xã Quỳnh Lương", "Xã Quỳnh Nghĩa"],
    "Huyện Diễn Châu": ["Thị trấn Diễn Châu", "Xã Diễn Hồng", "Xã Diễn Kỷ", "Xã Diễn Tháp", "Xã Diễn Tân"],
    "Huyện Nghi Lộc": ["Thị trấn Quán Hành", "Xã Nghi Thạch", "Xã Nghi Trung", "Xã Nghi Xuân", "Xã Nghi Yên"],
    "Huyện Yên Thành": ["Thị trấn Yên Thành", "Xã Công Thành", "Xã Sơn Thành", "Xã Phúc Thành", "Xã Xuân Thành"],
    "Huyện Hưng Nguyên": ["Thị trấn Hưng Nguyên", "Xã Hưng Tây", "Xã Hưng Yên Bắc", "Xã Hưng Đạo", "Xã Hưng Thịnh"],
    "Huyện Nam Đàn": ["Thị trấn Nam Đàn", "Xã Xuân Hòa", "Xã Kim Liên", "Xã Nam Giang", "Xã Nam Nghĩa"],
    "Huyện Đô Lương": ["Thị trấn Đô Lương", "Xã Lạc Sơn", "Xã Tràng Sơn", "Xã Thái Sơn", "Xã Đặng Sơn"],
    "Huyện Thanh Chương": ["Thị trấn Thanh Chương", "Xã Thanh Thủy", "Xã Thanh Tiên", "Xã Thanh Hương", "Xã Thanh Lĩnh"],
    "Huyện Anh Sơn": ["Thị trấn Anh Sơn", "Xã Đỉnh Sơn", "Xã Hoa Sơn", "Xã Hội Sơn", "Xã Phúc Sơn"],
    "Huyện Con Cuông": ["Thị trấn Con Cuông", "Xã Bồng Khê", "Xã Chi Khê", "Xã Lạng Khê", "Xã Mậu Đức"],
    "Huyện Tân Kỳ": ["Thị trấn Tân Kỳ", "Xã Nghĩa Đồng", "Xã Kỳ Sơn", "Xã Tân Hương", "Xã Giai Xuân"],
    "Huyện Nghĩa Đàn": ["Thị trấn Nghĩa Đàn", "Xã Nghĩa Bình", "Xã Nghĩa Hưng", "Xã Nghĩa Lộc", "Xã Nghĩa Trung"],
    "Huyện Quỳ Hợp": ["Thị trấn Quỳ Hợp", "Xã Châu Cường", "Xã Châu Đình", "Xã Châu Lộc", "Xã Châu Quang"],
    "Huyện Quỳ Châu": ["Thị trấn Tân Lạc", "Xã Châu Bính", "Xã Châu Hạnh", "Xã Châu Hoàn", "Xã Châu Nga"],
    "Huyện Quế Phong": ["Thị trấn Kim Sơn", "Xã Châu Kim", "Xã Mường Nọc", "Xã Tri Lễ", "Xã Tiền Phong"],
    "Huyện Kỳ Sơn": ["Thị trấn Mường Xén", "Xã Bảo Nam", "Xã Chiêu Lưu", "Xã Hữu Kiệm", "Xã Mường Lống"],
    "Huyện Tương Dương": ["Thị trấn Thạch Giám", "Xã Tam Đình", "Xã Tam Quang", "Xã Tam Thái", "Xã Yên Na"]
  },
  "Ninh Bình": {
    "Thành phố Ninh Bình": ["Phường Đông Thành", "Phường Nam Thành", "Phường Bích Đào", "Phường Vân Giang", "Phường Ninh Sơn"],
    "Thành phố Tam Điệp": ["Phường Bắc Sơn", "Phường Trung Sơn", "Phường Nam Sơn", "Phường Tân Bình", "Xã Quang Sơn"],
    "Huyện Hoa Lư": ["Xã Ninh Hòa", "Xã Ninh Giang", "Xã Ninh Mỹ", "Xã Trường Yên", "Xã Ninh Hải"],
    "Huyện Gia Viễn": ["Thị trấn Me", "Xã Gia Hòa", "Xã Gia Hưng", "Xã Gia Vân", "Xã Gia Thanh"],
    "Huyện Yên Khánh": ["Thị trấn Yên Ninh", "Xã Khánh Cư", "Xã Khánh Phú", "Xã Khánh Hòa", "Xã Khánh An"],
    "Huyện Yên Mô": ["Thị trấn Yên Thịnh", "Xã Yên Đồng", "Xã Yên Hòa", "Xã Mai Sơn", "Xã Yên Thái"],
    "Huyện Kim Sơn": ["Thị trấn Phát Diệm", "Xã Kim Chính", "Xã Kim Mỹ", "Xã Kim Tân", "Xã Ân Hòa"],
    "Huyện Nho Quan": ["Thị trấn Nho Quan", "Xã Gia Sơn", "Xã Phú Sơn", "Xã Sơn Lai", "Xã Quỳnh Lưu"]
  },
  "Ninh Thuận": {
    "Thành phố Phan Rang – Tháp Chàm": ["Phường Bảo An", "Phường Đài Sơn", "Phường Đạo Long", "Phường Đô Vinh", "Phường Đông Hải"],
    "Huyện Bác Ái": ["Xã Phước Bình", "Xã Phước Chính", "Xã Phước Đại", "Xã Phước Hòa", "Xã Phước Tân"],
    "Huyện Ninh Hải": ["Thị trấn Khánh Hải", "Xã Hộ Hải", "Xã Nhơn Hải", "Xã Phương Hải", "Xã Tân Hải"],
    "Huyện Ninh Phước": ["Thị trấn Phước Dân", "Xã An Hải", "Xã Phước Hải", "Xã Phước Hậu", "Xã Phước Hữu"],
    "Huyện Ninh Sơn": ["Thị trấn Tân Sơn", "Xã Hòa Sơn", "Xã Lâm Sơn", "Xã Lương Sơn", "Xã Ma Nới"],
    "Huyện Thuận Bắc": ["Xã Bắc Phong", "Xã Công Hải", "Xã Lợi Hải", "Xã Phước Chiến", "Xã Phước Kháng"],
    "Huyện Thuận Nam": ["Xã Cà Ná", "Xã Nhị Hà", "Xã Phước Diêm", "Xã Phước Dinh", "Xã Phước Hà"]
  },
  "Phú Thọ": {
    "Thành phố Việt Trì": ["Phường Dữu Lâu", "Phường Gia Cẩm", "Phường Nông Trang", "Phường Tiên Cát", "Phường Thọ Sơn"],
    "Thị xã Phú Thọ": ["Phường Âu Cơ", "Phường Hùng Vương", "Phường Phong Châu", "Phường Thanh Vinh", "Xã Hà Lộc"],
    "Huyện Cẩm Khê": ["Thị trấn Cẩm Khê", "Xã Điêu Lương", "Xã Đồng Lương", "Xã Hùng Việt", "Xã Hương Lung"],
    "Huyện Đoan Hùng": ["Thị trấn Đoan Hùng", "Xã Chân Mộng", "Xã Chí Đám", "Xã Hùng Long", "Xã Ngọc Quan"],
    "Huyện Hạ Hòa": ["Thị trấn Hạ Hòa", "Xã Ấm Hạ", "Xã Bằng Giã", "Xã Cáo Điền", "Xã Chuế Lưu"],
    "Huyện Lâm Thao": ["Thị trấn Lâm Thao", "Xã Bản Nguyên", "Xã Cao Xá", "Xã Kinh Kệ", "Xã Sơn Vi"],
    "Huyện Phù Ninh": ["Thị trấn Phong Châu", "Xã An Đạo", "Xã Bình Bộ", "Xã Gia Thanh", "Xã Liên Hoa"],
    "Huyện Tam Nông": ["Thị trấn Hưng Hóa", "Xã Cổ Tiết", "Xã Dậu Dương", "Xã Dị Nậu", "Xã Hiền Quan"],
    "Huyện Tân Sơn": ["Thị trấn Tân Phú", "Xã Kim Thượng", "Xã Lai Đồng", "Xã Long Cốc", "Xã Minh Đài"],
    "Huyện Thanh Ba": ["Thị trấn Thanh Ba", "Xã Chí Tiên", "Xã Đông Lĩnh", "Xã Đồng Xuân", "Xã Đỗ Sơn"],
    "Huyện Thanh Sơn": ["Thị trấn Thanh Sơn", "Xã Cự Đồng", "Xã Cự Thắng", "Xã Địch Quả", "Xã Đông Cửu"],
    "Huyện Thanh Thủy": ["Thị trấn Thanh Thủy", "Xã Bảo Yên", "Xã Đào Xá", "Xã Đồng Luận", "Xã Hoàng Xá"],
    "Huyện Yên Lập": ["Thị trấn Yên Lập", "Xã Đồng Lạc", "Xã Đồng Thịnh", "Xã Hưng Long", "Xã Lương Sơn"]
  },
  "Phú Yên": {
    "Thành phố Tuy Hòa": ["Phường 1", "Phường 2", "Phường 4", "Phường 5", "Phường 7"],
    "Thị xã Sông Cầu": ["Phường Xuân Phú", "Phường Xuân Thành", "Phường Xuân Yên", "Phường Xuân Đài", "Xã Xuân Cảnh"],
    "Thị xã Đông Hòa": ["Phường Hòa Hiệp Trung", "Phường Hòa Vinh", "Phường Hòa Hiệp Bắc", "Phường Hòa Hiệp Nam", "Xã Hòa Tâm"],
    "Huyện Đồng Xuân": ["Thị trấn La Hai", "Xã Xuân Lãnh", "Xã Xuân Quang 1", "Xã Xuân Sơn Bắc", "Xã Xuân Phước"],
    "Huyện Phú Hòa": ["Thị trấn Phú Hòa", "Xã Hòa Quang Nam", "Xã Hòa Quang Bắc", "Xã Hòa Thắng", "Xã Hòa Trị"],
    "Huyện Sơn Hòa": ["Thị trấn Củng Sơn", "Xã Sơn Hà", "Xã Sơn Nguyên", "Xã Sơn Xuân", "Xã Sơn Long"],
    "Huyện Sông Hinh": ["Thị trấn Hai Riêng", "Xã Ea Lâm", "Xã Ea Bá", "Xã Ea Trol", "Xã Sơn Giang"],
    "Huyện Tây Hòa": ["Thị trấn Phú Thứ", "Xã Hòa Phong", "Xã Hòa Phú", "Xã Hòa Mỹ Đông", "Xã Hòa Mỹ Tây"],
    "Huyện Tuy An": ["Thị trấn Chí Thạnh", "Xã An Cư", "Xã An Dân", "Xã An Ninh Đông", "Xã An Ninh Tây"]
  },
  "Quảng Bình": {
    "Thành phố Đồng Hới": ["Phường Bắc Lý", "Phường Đồng Phú", "Phường Hải Thành", "Phường Nam Lý", "Xã Bảo Ninh"],
    "Thị xã Ba Đồn": ["Phường Ba Đồn", "Phường Quảng Long", "Phường Quảng Phong", "Phường Quảng Thọ", "Xã Quảng Hải"],
    "Huyện Bố Trạch": ["Thị trấn Hoàn Lão", "Xã Cự Nẫm", "Xã Hưng Trạch", "Xã Phúc Trạch", "Xã Sơn Trạch"],
    "Huyện Lệ Thủy": ["Thị trấn Kiến Giang", "Xã An Thủy", "Xã Lộc Thủy", "Xã Phong Thủy", "Xã Xuân Thủy"],
    "Huyện Quảng Ninh": ["Thị trấn Quán Hàu", "Xã Duy Ninh", "Xã Gia Ninh", "Xã Hàm Ninh", "Xã Vĩnh Ninh"],
    "Huyện Quảng Trạch": ["Xã Cảnh Dương", "Xã Quảng Châu", "Xã Quảng Hợp", "Xã Quảng Phú", "Xã Quảng Xuân"],
    "Huyện Tuyên Hóa": ["Thị trấn Đồng Lê", "Xã Châu Hóa", "Xã Kim Hóa", "Xã Sơn Hóa", "Xã Tiến Hóa"],
    "Huyện Minh Hóa": ["Thị trấn Quy Đạt", "Xã Dân Hóa", "Xã Hóa Hợp", "Xã Trung Hóa", "Xã Xuân Hóa"]
  },
  "Quảng Nam": {
    "Thành phố Tam Kỳ": ["Phường An Mỹ", "Phường An Phú", "Phường Hòa Hương", "Phường Phước Hòa", "Phường Tân Thạnh", "Phường Trường Xuân", "Phường Hòa Thuận", "Phường An Xuân", "Xã Tam Thanh", "Xã Tam Thăng", "Xã Tam Ngọc"],
    "Thành phố Hội An": ["Phường Cẩm Châu", "Phường Cẩm Nam", "Phường Cẩm Phô", "Phường Minh An", "Phường Sơn Phong", "Phường Tân An", "Phường Thanh Hà", "Xã Cẩm Kim", "Xã Cẩm Thanh", "Xã Cửa Đại"],
    "Thị xã Điện Bàn": ["Phường Điện An", "Phường Điện Dương", "Phường Điện Ngọc", "Phường Vĩnh Điện", "Phường Điện Nam Bắc", "Phường Điện Nam Trung", "Phường Điện Nam Đông", "Phường Điện Thắng Bắc", "Phường Điện Thắng Trung", "Phường Điện Thắng Nam", "Xã Điện Phong", "Xã Điện Hòa", "Xã Điện Quang", "Xã Điện Trung"],
    "Huyện Đại Lộc": ["Thị trấn Ái Nghĩa", "Xã Đại An", "Xã Đại Cường", "Xã Đại Hồng", "Xã Đại Lãnh", "Xã Đại Minh", "Xã Đại Nghĩa", "Xã Đại Quang", "Xã Đại Sơn", "Xã Đại Tân"],
    "Huyện Duy Xuyên": ["Thị trấn Nam Phước", "Xã Duy Châu", "Xã Duy Hải", "Xã Duy Nghĩa", "Xã Duy Phước", "Xã Duy Tân", "Xã Duy Thành", "Xã Duy Trung", "Xã Duy Trinh"],
    "Huyện Quế Sơn": ["Thị trấn Đông Phú", "Xã Quế An", "Xã Quế Châu", "Xã Quế Hiệp", "Xã Quế Phong", "Xã Quế Long", "Xã Quế Minh", "Xã Quế Mỹ", "Xã Quế Thuận"],
    "Huyện Nam Giang": ["Thị trấn Thạnh Mỹ", "Xã Chà Vàl", "Xã La Dêê", "Xã Tà Bhing", "Xã Zuôih", "Xã Cà Dy", "Xã Đắc Pring", "Xã Đắc Pre", "Xã La Êê", "Xã Tà Lu"],
    "Huyện Núi Thành": ["Thị trấn Núi Thành", "Xã Tam Giang", "Xã Tam Hải", "Xã Tam Hiệp", "Xã Tam Nghĩa", "Xã Tam Quang", "Xã Tam Mỹ Đông", "Xã Tam Mỹ Tây", "Xã Tam Xuân 1", "Xã Tam Xuân 2"],
    "Huyện Phú Ninh": ["Thị trấn Phú Thịnh", "Xã Tam An", "Xã Tam Dân", "Xã Tam Lộc", "Xã Tam Phước", "Xã Tam Thành", "Xã Tam Thái", "Xã Tam Vinh", "Xã Tam Đại", "Xã Tam Đàn"],
    "Huyện Thăng Bình": ["Thị trấn Hà Lam", "Xã Bình An", "Xã Bình Dương", "Xã Bình Giang", "Xã Bình Minh", "Xã Bình Chánh", "Xã Bình Hải", "Xã Bình Nam", "Xã Bình Nguyên", "Xã Bình Quý"]
  },

  "Quảng Ngãi": {
    "Thành phố Quảng Ngãi": ["Phường Chánh Lộ", "Phường Nghĩa Chánh", "Phường Nguyễn Nghiêm", "Xã Tịnh An", "Xã Tịnh Khê"],
    "Thị xã Đức Phổ": ["Phường Nguyễn Nghiêm", "Phường Phổ Hòa", "Phường Phổ Minh", "Xã Phổ An", "Xã Phổ Khánh"],
    "Huyện Bình Sơn": ["Thị trấn Châu Ổ", "Xã Bình Chánh", "Xã Bình Đông", "Xã Bình Hải", "Xã Bình Thuận"],
    "Huyện Mộ Đức": ["Thị trấn Mộ Đức", "Xã Đức Chánh", "Xã Đức Hòa", "Xã Đức Lân", "Xã Đức Thắng"],
    "Huyện Tư Nghĩa": ["Thị trấn La Hà", "Xã Nghĩa Điền", "Xã Nghĩa Hiệp", "Xã Nghĩa Kỳ", "Xã Nghĩa Thương"],
    "Huyện Sơn Tịnh": ["Thị trấn Sơn Tịnh", "Xã Tịnh Bình", "Xã Tịnh Đông", "Xã Tịnh Hà", "Xã Tịnh Sơn"],
    "Huyện Nghĩa Hành": ["Thị trấn Chợ Chùa", "Xã Hành Đức", "Xã Hành Minh", "Xã Hành Nhân", "Xã Hành Phước"],
    "Huyện Ba Tơ": ["Thị trấn Ba Tơ", "Xã Ba Bích", "Xã Ba Dinh", "Xã Ba Giang", "Xã Ba Thành"],
    "Huyện Sơn Hà": ["Thị trấn Di Lăng", "Xã Sơn Bao", "Xã Sơn Cao", "Xã Sơn Giang", "Xã Sơn Linh"],
    "Huyện Minh Long": ["Xã Long Hiệp", "Xã Long Mai", "Xã Long Môn", "Xã Long Sơn", "Xã Thanh An"],
    "Huyện Sơn Tây": ["Xã Sơn Bua", "Xã Sơn Dung", "Xã Sơn Lập", "Xã Sơn Long", "Xã Sơn Màu"],
    "Huyện Trà Bồng": ["Thị trấn Trà Xuân", "Xã Trà Bình", "Xã Trà Giang", "Xã Trà Hiệp", "Xã Trà Phú"],
    "Huyện Lý Sơn": ["Xã An Bình", "Xã An Hải", "Xã An Vĩnh"]
  },
  "Quảng Ninh": {
    "Thành phố Hạ Long": ["Phường Bãi Cháy", "Phường Cao Thắng", "Phường Hồng Gai", "Phường Hùng Thắng", "Xã Thống Nhất"],
    "Thành phố Móng Cái": ["Phường Bình Ngọc", "Phường Hải Hòa", "Phường Trà Cổ", "Xã Hải Đông", "Xã Vạn Ninh"],
    "Thành phố Cẩm Phả": ["Phường Cẩm Bình", "Phường Cửa Ông", "Phường Quang Hanh", "Xã Dương Huy"],
    "Thành phố Uông Bí": ["Phường Bắc Sơn", "Phường Nam Khê", "Phường Quang Trung", "Phường Thanh Sơn", "Xã Thượng Yên Công"],
    "Thành phố Đông Triều": ["Phường Đông Triều", "Phường Mạo Khê", "Phường Xuân Sơn", "Xã Bình Dương", "Xã Yên Thọ"],
    "Thị xã Quảng Yên": ["Phường Hà An", "Phường Quảng Yên", "Phường Yên Giang", "Xã Cẩm La", "Xã Tiền An"],
    "Huyện Ba Chẽ": ["Thị trấn Ba Chẽ", "Xã Đạp Thanh", "Xã Lương Mông", "Xã Minh Cầm", "Xã Thanh Lâm"],
    "Huyện Bình Liêu": ["Thị trấn Bình Liêu", "Xã Đồng Tâm", "Xã Hoành Mô", "Xã Húc Động", "Xã Vô Ngại"],
    "Huyện Cô Tô": ["Thị trấn Cô Tô", "Xã Đồng Tiến", "Xã Thanh Lân"],
    "Huyện Đầm Hà": ["Thị trấn Đầm Hà", "Xã Dực Yên", "Xã Quảng An", "Xã Quảng Lâm", "Xã Tân Bình"],
    "Huyện Hải Hà": ["Thị trấn Quảng Hà", "Xã Quảng Chính", "Xã Quảng Đức", "Xã Quảng Phong", "Xã Quảng Thịnh"],
    "Huyện Tiên Yên": ["Thị trấn Tiên Yên", "Xã Đông Hải", "Xã Hải Lạng", "Xã Tiên Lãng", "Xã Yên Than"],
    "Huyện Vân Đồn": ["Thị trấn Cái Rồng", "Xã Bản Sen", "Xã Hạ Long", "Xã Quan Lạn", "Xã Thắng Lợi"]
  },
  "Quảng Trị": {
    "Thành phố Đông Hà": ["Phường 1", "Phường 2", "Phường Đông Giang", "Phường Đông Lễ", "Phường Đông Thanh"],
    "Thị xã Quảng Trị": ["Phường 1", "Phường 2", "Xã Ái Tử", "Xã Hải Lệ", "Xã Triệu Thành"],
    "Huyện Cam Lộ": ["Thị trấn Cam Lộ", "Xã Cam An", "Xã Cam Chính", "Xã Cam Hiếu", "Xã Cam Tuyền"],
    "Huyện Cồn Cỏ": ["Xã Cồn Cỏ"],
    "Huyện Đa Krông": ["Thị trấn Krông Klang", "Xã A Bung", "Xã A Ngo", "Xã Ba Lòng", "Xã Húc Nghì"],
    "Huyện Gio Linh": ["Thị trấn Gio Linh", "Xã Gio An", "Xã Gio Châu", "Xã Gio Hải", "Xã Linh Hải"],
    "Huyện Hải Lăng": ["Thị trấn Diên Sanh", "Xã Hải An", "Xã Hải Ba", "Xã Hải Phú", "Xã Hải Quy"],
    "Huyện Hướng Hóa": ["Thị trấn Khe Sanh", "Thị trấn Lao Bảo", "Xã Húc", "Xã Tân Hợp", "Xã Tân Liên"],
    "Huyện Triệu Phong": ["Thị trấn Ái Tử", "Xã Triệu Đông", "Xã Triệu Hòa", "Xã Triệu Phước", "Xã Triệu Trạch"],
    "Huyện Vĩnh Linh": ["Thị trấn Bến Quan", "Thị trấn Hồ Xá", "Xã Vĩnh Chấp", "Xã Vĩnh Giang", "Xã Vĩnh Hòa"]
  },
  "Sóc Trăng": {
    "Thành phố Sóc Trăng": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"],
    "Thị xã Vĩnh Châu": ["Phường 1", "Phường 2", "Phường Khánh Hòa", "Xã Vĩnh Hiệp", "Xã Lạc Hòa"],
    "Thị xã Ngã Năm": ["Phường 1", "Phường 2", "Phường 3", "Xã Tân Long", "Xã Long Bình"],
    "Huyện Châu Thành": ["Xã An Hiệp", "Xã An Ninh", "Xã Phú Tâm", "Xã Phú Tân", "Xã Thuận Hòa"],
    "Huyện Cù Lao Dung": ["Thị trấn Cù Lao Dung", "Xã An Thạnh 1", "Xã An Thạnh Đông", "Xã An Thạnh Tây", "Xã Đại Ân 1"],
    "Huyện Kế Sách": ["Thị trấn Kế Sách", "Thị trấn An Lạc Thôn", "Xã Ba Trinh", "Xã Nhơn Mỹ", "Xã Trinh Phú"],
    "Huyện Long Phú": ["Thị trấn Long Phú", "Xã Long Đức", "Xã Tân Hưng", "Xã Song Phụng", "Xã Trường Khánh"],
    "Huyện Mỹ Tú": ["Thị trấn Huỳnh Hữu Nghĩa", "Xã Mỹ Phước", "Xã Mỹ Hương", "Xã Mỹ Tú", "Xã Phú Mỹ"],
    "Huyện Mỹ Xuyên": ["Thị trấn Mỹ Xuyên", "Xã Đại Tâm", "Xã Tham Đôn", "Xã Thạnh Phú", "Xã Ngọc Đông"],
    "Huyện Thạnh Trị": ["Thị trấn Phú Lộc", "Xã Lâm Kiết", "Xã Lâm Tân", "Xã Thạnh Tân", "Xã Tuân Tức"],
    "Huyện Trần Đề": ["Thị trấn Trần Đề", "Xã Liêu Tú", "Xã Tài Văn", "Xã Viên An", "Xã Trung Bình"]
  },
  "Sơn La": {
    "Thành phố Sơn La": ["Phường Chiềng An", "Phường Chiềng Cơi", "Phường Chiềng Lề", "Phường Chiềng Sinh", "Xã Chiềng Cọ"],
    "Thị xã Mộc Châu": ["Phường Bình Minh", "Phường Cờ Đỏ", "Phường Đông Sang", "Phường Mộc Lỵ", "Xã Chiềng Chung"],
    "Huyện Bắc Yên": ["Thị trấn Bắc Yên", "Xã Chim Vàn", "Xã Háng Đồng", "Xã Hua Nhàn", "Xã Làng Chếu"],
    "Huyện Mai Sơn": ["Thị trấn Hát Lót", "Xã Chiềng Ban", "Xã Chiềng Chung", "Xã Chiềng Dong", "Xã Chiềng Kheo"],
    "Huyện Mường La": ["Thị trấn Ít Ong", "Xã Chiềng Ân", "Xã Chiềng Công", "Xã Chiềng Hoa", "Xã Chiềng Lao"],
    "Huyện Phù Yên": ["Thị trấn Phù Yên", "Xã Bắc Phong", "Xã Đá Đỏ", "Xã Gia Phù", "Xã Huy Bắc"],
    "Huyện Quỳnh Nhai": ["Thị trấn Mường Giàng", "Xã Chiềng Bằng", "Xã Chiềng Khay", "Xã Chiềng Khoang", "Xã Mường Chiên"],
    "Huyện Sông Mã": ["Thị trấn Sông Mã", "Xã Chiềng Cang", "Xã Chiềng Khoong", "Xã Chiềng Phung", "Xã Huổi Một"],
    "Huyện Sốp Cộp": ["Thị trấn Sốp Cộp", "Xã Dồm Cang", "Xã Mường Lèo", "Xã Mường Và", "Xã Nậm Lạnh"],
    "Huyện Thuận Châu": ["Thị trấn Thuận Châu", "Xã Bó Mười", "Xã Chiềng Bôm", "Xã Chiềng La", "Xã Chiềng Ly"],
    "Huyện Vân Hồ": ["Xã Chiềng Khoa", "Xã Chiềng Xuân", "Xã Lóng Luông", "Xã Mường Tè", "Xã Quang Minh"],
    "Huyện Yên Châu": ["Thị trấn Yên Châu", "Xã Chiềng Đông", "Xã Chiềng Hặc", "Xã Chiềng Khoi", "Xã Chiềng On"]
  },
  "Tây Ninh": {
    "Thành phố Tây Ninh": ["Phường 1", "Phường 2", "Phường 3", "Phường IV", "Phường Hiệp Ninh"],
    "Thị xã Hòa Thành": ["Phường Hiệp Tân", "Phường Long Hoa", "Phường Long Thành Bắc", "Phường Long Thành Trung", "Xã Long Thành Nam"],
    "Thị xã Trảng Bàng": ["Phường An Hòa", "Phường An Tịnh", "Phường Gia Bình", "Phường Gia Lộc", "Phường Lộc Hưng"],
    "Huyện Bến Cầu": ["Thị trấn Bến Cầu", "Xã An Thạnh", "Xã Lợi Thuận", "Xã Long Chữ", "Xã Long Giang"],
    "Huyện Châu Thành": ["Thị trấn Châu Thành", "Xã An Bình", "Xã An Cơ", "Xã Biên Giới", "Xã Đồng Khởi"],
    "Huyện Dương Minh Châu": ["Thị trấn Dương Minh Châu", "Xã Bàu Năng", "Xã Bến Củi", "Xã Chà Là", "Xã Cầu Khởi"],
    "Huyện Gò Dầu": ["Thị trấn Gò Dầu", "Xã Bàu Đồn", "Xã Hiệp Thạnh", "Xã Phước Đông", "Xã Phước Thạnh"],
    "Huyện Tân Biên": ["Thị trấn Tân Biên", "Xã Hòa Hiệp", "Xã Mỏ Công", "Xã Tân Bình", "Xã Tân Lập"],
    "Huyện Tân Châu": ["Thị trấn Tân Châu", "Xã Suối Dây", "Xã Suối Ngô", "Xã Tân Đông", "Xã Tân Hà"]
  },
  "Thái Bình": {
    "Thành phố Thái Bình": ["Phường Bồ Xuyên", "Phường Đề Thám", "Phường Hoàng Diệu", "Phường Kỳ Bá", "Xã Đông Hòa"],
    "Huyện Đông Hưng": ["Thị trấn Đông Hưng", "Xã Đông Các", "Xã Đông Hợp", "Xã Đông La", "Xã Đông Xá"],
    "Huyện Hưng Hà": ["Thị trấn Hưng Hà", "Xã Canh Tân", "Xã Hòa Bình", "Xã Hồng An", "Xã Tân Lễ"],
    "Huyện Kiến Xương": ["Thị trấn Kiến Xương", "Xã An Bình", "Xã Bình Định", "Xã Hòa Bình", "Xã Vũ An"],
    "Huyện Quỳnh Phụ": ["Thị trấn Quỳnh Côi", "Xã An Ấp", "Xã An Cầu", "Xã An Đồng", "Xã An Hiệp"],
    "Huyện Thái Thụy": ["Thị trấn Diêm Điền", "Xã Thái Đô", "Xã Thái Hòa", "Xã Thái Thượng", "Xã Thụy Bình"],
    "Huyện Tiền Hải": ["Thị trấn Tiền Hải", "Xã Đông Hải", "Xã Nam Cường", "Xã Tây Giang", "Xã Vân Trường"],
    "Huyện Vũ Thư": ["Thị trấn Vũ Thư", "Xã Bách Thuận", "Xã Dũng Nghĩa", "Xã Hòa Bình", "Xã Tân Phong"]
  },
  "Thái Nguyên": {
    "Thành phố Thái Nguyên": ["Phường Cam Giá", "Phường Gia Sàng", "Phường Phan Đình Phùng", "Phường Quang Trung", "Xã Phúc Hà"],
    "Thành phố Sông Công": ["Phường Bách Quang", "Phường Cải Đan", "Phường Châu Sơn", "Phường Mỏ Chè", "Xã Bá Xuyên"],
    "Thành phố Phổ Yên": ["Phường Ba Hàng", "Phường Bắc Sơn", "Phường Đồng Tiến", "Phường Nam Tiến", "Xã Tân Hương"],
    "Huyện Đại Từ": ["Thị trấn Hùng Sơn", "Xã Bình Thuận", "Xã Cát Nê", "Xã Hà Thượng", "Xã Phú Cường"],
    "Huyện Định Hóa": ["Thị trấn Chợ Chu", "Xã Bình Yên", "Xã Điềm Mặc", "Xã Kim Phượng", "Xã Phú Tiến"],
    "Huyện Đồng Hỷ": ["Thị trấn Trại Cau", "Xã Cây Thị", "Xã Hóa Thượng", "Xã Hóa Trung", "Xã Khe Mo"],
    "Huyện Phú Bình": ["Thị trấn Hương Sơn", "Xã Dương Thành", "Xã Hà Châu", "Xã Tân Hòa", "Xã Úc Kỳ"],
    "Huyện Phú Lương": ["Thị trấn Đu", "Xã Cổ Lũng", "Xã Hợp Thành", "Xã Phấn Mễ", "Xã Yên Ninh"],
    "Huyện Võ Nhai": ["Thị trấn Đình Cả", "Xã Cúc Đường", "Xã La Hiên", "Xã Lâu Thượng", "Xã Tràng Xá"]
  },

  "Thanh Hóa": {
    "Thành phố Thanh Hóa": ["Phường Ba Đình", "Phường Điện Biên", "Phường Lam Sơn", "Phường Đông Vệ", "Xã Quảng Thịnh"],
    "Thành phố Sầm Sơn": ["Phường Bắc Sơn", "Phường Quảng Cư", "Phường Quảng Thọ", "Phường Trung Sơn", "Xã Quảng Hùng"],
    "Thị xã Bỉm Sơn": ["Phường Ba Đình", "Phường Lam Sơn", "Phường Ngọc Trạo", "Phường Đông Sơn", "Xã Quang Trung"],
    "Thị xã Nghi Sơn": ["Phường Hải Hòa", "Phường Hải Thượng", "Phường Mai Lâm", "Phường Nguyên Bình", "Xã Hải Nhân"],
    "Huyện Bá Thước": ["Thị trấn Cành Nàng", "Xã Ban Công", "Xã Điền Lư", "Xã Lũng Niêm", "Xã Thiết Ống"],
    "Huyện Cẩm Thủy": ["Thị trấn Phong Sơn", "Xã Cẩm Bình", "Xã Cẩm Giang", "Xã Cẩm Liên", "Xã Cẩm Thạch"],
    "Huyện Đông Sơn": ["Thị trấn Rừng Thông", "Xã Đông Hoàng", "Xã Đông Ninh", "Xã Đông Phú", "Xã Đông Tiến"],
    "Huyện Hà Trung": ["Thị trấn Hà Trung", "Xã Hà Bình", "Xã Hà Đông", "Xã Hà Lĩnh", "Xã Hà Sơn"],
    "Huyện Hậu Lộc": ["Thị trấn Hậu Lộc", "Xã Cầu Lộc", "Xã Đa Lộc", "Xã Hoa Lộc", "Xã Liên Lộc"],
    "Huyện Hoằng Hóa": ["Thị trấn Bút Sơn", "Xã Hoằng Cát", "Xã Hoằng Đạt", "Xã Hoằng Đông", "Xã Hoằng Hà"],
    "Huyện Lang Chánh": ["Thị trấn Lang Chánh", "Xã Đồng Lương", "Xã Giao An", "Xã Lâm Phú", "Xã Tam Văn"],
    "Huyện Mường Lát": ["Thị trấn Mường Lát", "Xã Mường Chanh", "Xã Mường Lý", "Xã Nhi Sơn", "Xã Tam Chung"],
    "Huyện Nga Sơn": ["Thị trấn Nga Sơn", "Xã Nga An", "Xã Nga Điền", "Xã Nga Hải", "Xã Nga Liên"],
    "Huyện Ngọc Lặc": ["Thị trấn Ngọc Lặc", "Xã Cao Ngọc", "Xã Kiên Thọ", "Xã Lam Sơn", "Xã Ngọc Liên"],
    "Huyện Như Thanh": ["Thị trấn Bến Sung", "Xã Cán Khê", "Xã Hải Long", "Xã Mậu Lâm", "Xã Phượng Nghi"],
    "Huyện Như Xuân": ["Thị trấn Yên Cát", "Xã Bãi Trành", "Xã Cát Tân", "Xã Hóa Quỳ", "Xã Thanh Lâm"],
    "Huyện Nông Cống": ["Thị trấn Nông Cống", "Xã Công Liêm", "Xã Hoàng Giang", "Xã Minh Khôi", "Xã Tân Khang"],
    "Huyện Quan Hóa": ["Thị trấn Hồi Xuân", "Xã Hiền Chung", "Xã Nam Động", "Xã Phú Lệ", "Xã Trung Sơn"],
    "Huyện Quan Sơn": ["Thị trấn Sơn Lư", "Xã Mường Mìn", "Xã Na Mèo", "Xã Sơn Điện", "Xã Tam Thanh"],
    "Huyện Quảng Xương": ["Thị trấn Quảng Xương", "Xã Quảng Bình", "Xã Quảng Chính", "Xã Quảng Hợp", "Xã Quảng Nhân"],
    "Huyện Thạch Thành": ["Thị trấn Kim Tân", "Xã Thành An", "Xã Thành Công", "Xã Thành Hưng", "Xã Thành Tâm"],
    "Huyện Thiệu Hóa": ["Thị trấn Thiệu Hóa", "Xã Thiệu Chính", "Xã Thiệu Duy", "Xã Thiệu Giang", "Xã Thiệu Hợp"],
    "Huyện Thọ Xuân": ["Thị trấn Thọ Xuân", "Xã Bắc Lương", "Xã Nam Giang", "Xã Phú Xuân", "Xã Xuân Bái"],
    "Huyện Thường Xuân": ["Thị trấn Thường Xuân", "Xã Luận Khê", "Xã Ngọc Phụng", "Xã Tân Thành", "Xã Xuân Cao"],
    "Huyện Tĩnh Gia": ["Thị trấn Tĩnh Gia", "Xã Hải An", "Xã Hải Bình", "Xã Hải Châu", "Xã Hải Hà"],
    "Huyện Triệu Sơn": ["Thị trấn Triệu Sơn", "Xã An Nông", "Xã Dân Lực", "Xã Hợp Lý", "Xã Thọ Bình"],
    "Huyện Vĩnh Lộc": ["Thị trấn Vĩnh Lộc", "Xã Minh Tân", "Xã Ninh Khang", "Xã Vĩnh Hòa", "Xã Vĩnh Long"],
    "Huyện Yên Định": ["Thị trấn Quán Lào", "Xã Định Bình", "Xã Định Công", "Xã Định Hòa", "Xã Định Tăng"]
  },
  "Thừa Thiên Huế": {
    "TP Huế": ["An Cựu", "An Đông", "Phú Hội", "Phú Nhuận", "Thuận Hòa", "Thuận Lộc", "Trường An", "Vĩnh Ninh", "Vỹ Dạ", "Xuân Phú"],
    "Thị xã Hương Thủy": ["Phú Bài", "Thủy Châu", "Thủy Dương", "Thủy Lương", "Thủy Phương"],
    "Thị xã Hương Trà": ["Tứ Hạ", "Hương Chữ", "Hương Vân", "Hương Xuân", "Hương Toàn"],
    "Thị xã Phong Điền": ["Phong An", "Phong Hiền", "Phong Thu", "Phong Hải", "Phong Chương"],
    "Huyện A Lưới": ["A Lưới", "Hồng Bắc", "Hồng Kim", "Hồng Thái", "Nhâm"],
    "Huyện Nam Đông": ["Khe Tre", "Hương Hữu", "Thượng Nhật", "Thượng Lộ", "Thượng Long"],
    "Huyện Phú Lộc": ["Lăng Cô", "Phú Lộc", "Vinh Hiền", "Lộc Thủy", "Lộc Tiến"],
    "Huyện Phú Vang": ["Phú Đa", "Phú Mỹ", "Phú Xuân", "Vinh An", "Vinh Thanh"],
    "Huyện Quảng Điền": ["Sịa", "Quảng An", "Quảng Thành", "Quảng Thọ", "Quảng Lợi"]
  },
  "Tiền Giang": {
    "TP Mỹ Tho": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Xã Đạo Thạnh", "Xã Trung An", "Xã Mỹ Phong", "Xã Tân Mỹ Chánh"],
    "Thị xã Cai Lậy": ["Phường 1", "Phường 2", "Xã Mỹ Hạnh Đông", "Xã Mỹ Hạnh Trung", "Xã Tân Phú", "Xã Tân Hội", "Xã Tân Bình", "Xã Phú Quý", "Xã Long Khánh", "Xã Cẩm Sơn"],
    "Thị xã Gò Công": ["Phường 1", "Phường 2", "Phường 3", "Xã Long Hưng", "Xã Long Chánh", "Xã Long Thuận", "Xã Tân Trung"],
    "Huyện Cái Bè": ["Thị trấn Cái Bè", "Xã An Cư", "Xã An Hữu", "Xã Đông Hòa Hiệp", "Xã Hậu Mỹ Bắc A", "Xã Hậu Mỹ Bắc B", "Xã Hòa Khánh", "Xã Mỹ Đức Đông", "Xã Mỹ Đức Tây"],
    "Huyện Cai Lậy": ["Thị trấn Cai Lậy", "Xã Bình Phú", "Xã Cẩm Sơn", "Xã Hiệp Đức", "Xã Long Tiên", "Xã Mỹ Hạnh Đông", "Xã Mỹ Hạnh Trung", "Xã Tân Phong", "Xã Tân Hội"],
    "Huyện Châu Thành": ["Xã Kim Sơn", "Xã Long Hưng", "Xã Long An", "Xã Nhị Bình", "Xã Song Thuận", "Xã Tân Lý Đông", "Xã Tân Lý Tây", "Xã Tân Hội Đông", "Xã Thân Cửu Nghĩa"],
    "Huyện Chợ Gạo": ["Thị trấn Chợ Gạo", "Xã An Thạnh Thủy", "Xã Bình Ninh", "Xã Hòa Tịnh", "Xã Long Bình Điền", "Xã Phú Kiết", "Xã Quơn Long", "Xã Thanh Bình", "Xã Xuân Đông"],
    "Huyện Gò Công Đông": ["Thị trấn Tân Hòa", "Xã Gia Thuận", "Xã Kiểng Phước", "Xã Phước Trung", "Xã Tăng Hòa", "Xã Tân Điền", "Xã Tân Đông", "Xã Tân Phước", "Xã Tân Tây"],
    "Huyện Gò Công Tây": ["Thị trấn Vĩnh Bình", "Xã Bình Phú", "Xã Đồng Sơn", "Xã Long Bình", "Xã Long Vĩnh", "Xã Thạnh Trị", "Xã Thạnh Nhựt", "Xã Vĩnh Hựu", "Xã Yên Luông"],
    "Huyện Tân Phú Đông": ["Xã Phú Thạnh", "Xã Phú Đông", "Xã Phú Tân", "Xã Tân Thới", "Xã Tân Phú", "Xã Tân Trung"]
  },


  "Tuyên Quang": {
    "TP Tuyên Quang": ["Phường Tân Quang", "Phường Hưng Thành", "Phường Phan Thiết", "Phường Ỷ La", "Phường Minh Xuân", "Phường Nông Tiến", "Xã Tràng Đà", "Xã An Khang", "Xã Lưỡng Vượng", "Xã Thái Long"],
    "Huyện Chiêm Hóa": ["Thị trấn Vĩnh Lộc", "Xã Trung Hòa", "Xã Tân An", "Xã Phúc Sơn", "Xã Phúc Thịnh", "Xã Bình Nhân", "Xã Xuân Quang", "Xã Tân Thịnh", "Xã Yên Lập", "Xã Hòa Phú"],
    "Huyện Hàm Yên": ["Thị trấn Tân Yên", "Xã Bằng Cốc", "Xã Thái Sơn", "Xã Đức Ninh", "Xã Phù Lưu", "Xã Minh Hương", "Xã Yên Phú", "Xã Minh Dân", "Xã Thành Long", "Xã Bạch Xa"],
    "Huyện Lâm Bình": ["Xã Lăng Can", "Xã Thượng Lâm", "Xã Khuôn Hà", "Xã Xuân Lập", "Xã Phúc Yên", "Xã Hồng Quang"],
    "Huyện Na Hang": ["Thị trấn Na Hang", "Xã Hồng Thái", "Xã Đà Vị", "Xã Thượng Giáp", "Xã Thượng Nông", "Xã Năng Khả", "Xã Sinh Long"],
    "Huyện Sơn Dương": ["Thị trấn Sơn Dương", "Xã Trung Yên", "Xã Hồng Lạc", "Xã Tú Thịnh", "Xã Vân Sơn", "Xã Đồng Quý", "Xã Thiện Kế", "Xã Tam Đa", "Xã Lâm Xuyên", "Xã Kháng Nhật"],
    "Huyện Yên Sơn": ["Thị trấn Yên Sơn", "Xã Tứ Quận", "Xã Phúc Ninh", "Xã Lực Hành", "Xã Trung Trực", "Xã Tiến Bộ", "Xã Kim Phú", "Xã Mỹ Bằng", "Xã Trung Môn", "Xã Lang Quán"]
  },
  "Vĩnh Long": {
    "TP Vĩnh Long": ["Phường 1", "Phường 2", "Phường 4", "Phường 5", "Phường 8", "Xã Trường An", "Xã Tân Hòa", "Xã Tân Ngãi", "Xã Tân Hội", "Xã Thanh Đức"],
    "Thị xã Bình Minh": ["Phường Cái Vồn", "Phường Thành Phước", "Xã Đông Bình", "Xã Đông Thạnh", "Xã Mỹ Hòa", "Xã Thuận An"],
    "Huyện Bình Tân": ["Xã Tân Lược", "Xã Tân Hưng", "Xã Tân Bình", "Xã Tân An Thạnh", "Xã Nguyễn Văn Thảnh", "Xã Thành Lợi"],
    "Huyện Long Hồ": ["Thị trấn Long Hồ", "Xã An Bình", "Xã Bình Hòa Phước", "Xã Hòa Ninh", "Xã Phú Quới", "Xã Thanh Đức", "Xã Thạnh Quới"],
    "Huyện Mang Thít": ["Thị trấn Cái Nhum", "Xã An Phước", "Xã Bình Phước", "Xã Chánh An", "Xã Hòa Tịnh", "Xã Nhơn Phú", "Xã Phú Mỹ"],
    "Huyện Tam Bình": ["Thị trấn Tam Bình", "Xã Hậu Lộc", "Xã Hòa Thạnh", "Xã Long Phú", "Xã Mỹ Thạnh Trung", "Xã Tân Lộc", "Xã Tường Lộc"],
    "Huyện Trà Ôn": ["Thị trấn Trà Ôn", "Xã Hựu Thành", "Xã Nhơn Bình", "Xã Phú Thành", "Xã Tân Mỹ", "Xã Thiện Mỹ", "Xã Thới Hòa"],
    "Huyện Vũng Liêm": ["Thị trấn Vũng Liêm", "Xã Hiếu Phụng", "Xã Hiếu Thành", "Xã Quới Thiện", "Xã Thanh Bình", "Xã Trung Hiệp", "Xã Trung Thành Tây"]
  },
  "Vĩnh Phúc": {
    "TP Vĩnh Yên": ["Phường Đống Đa", "Phường Ngô Quyền", "Phường Hội Hợp", "Phường Liên Bảo", "Phường Trưng Nhị", "Phường Trưng Trắc", "Xã Định Trung", "Xã Khai Quang", "Xã Thanh Trù"],
    "TP Phúc Yên": ["Phường Hùng Vương", "Phường Trưng Trắc", "Phường Trưng Nhị", "Phường Phúc Thắng", "Phường Xuân Hòa", "Xã Ngọc Thanh", "Xã Tiền Châu"],
    "Huyện Bình Xuyên": ["Thị trấn Hương Canh", "Xã Bá Hiến", "Xã Tam Hợp", "Xã Quất Lưu", "Xã Sơn Lôi", "Xã Trung Mỹ", "Xã Phú Xuân", "Xã Thiện Kế"],
    "Huyện Lập Thạch": ["Thị trấn Lập Thạch", "Xã Ngọc Mỹ", "Xã Xuân Hòa", "Xã Vân Trục", "Xã Liễn Sơn", "Xã Bàn Giản", "Xã Đồng Ích", "Xã Thái Hòa"],
    "Huyện Sông Lô": ["Thị trấn Tam Sơn", "Xã Đức Bác", "Xã Cao Phong", "Xã Hải Lựu", "Xã Lãng Công", "Xã Nhạo Sơn", "Xã Tân Lập", "Xã Yên Thạch"],
    "Huyện Tam Đảo": ["Thị trấn Hợp Châu", "Thị trấn Tam Đảo", "Xã Hồ Sơn", "Xã Minh Quang", "Xã Đạo Trù", "Xã Yên Dương", "Xã Bồ Lý"],
    "Huyện Tam Dương": ["Thị trấn Hợp Hòa", "Xã An Hòa", "Xã Duy Phiên", "Xã Hoàng Hoa", "Xã Hướng Đạo", "Xã Thanh Vân", "Xã Kim Long"],
    "Huyện Vĩnh Tường": ["Thị trấn Thổ Tang", "Thị trấn Vĩnh Tường", "Thị trấn Tứ Trưng", "Xã Lũng Hòa", "Xã Tuân Chính", "Xã Vũ Di", "Xã Tam Phúc", "Xã Bồ Sao", "Xã Bình Dương", "Xã Thượng Trưng", "Xã Tân Cương", "Xã Yên Lập", "Xã Chấn Hưng"]
  },
  "Yên Bái": {
    "TP Yên Bái": ["Phường Yên Ninh", "Phường Nguyễn Thái Học", "Phường Minh Tân", "Phường Hồng Hà", "Phường Nguyễn Phúc", "Xã Âu Lâu", "Xã Văn Phú", "Xã Tân Thịnh", "Xã Giới Phiên", "Xã Tuy Lộc"],
    "Thị xã Nghĩa Lộ": ["Phường Cầu Thia", "Phường Tân An", "Phường Trung Tâm", "Xã Nghĩa An", "Xã Nghĩa Lợi", "Xã Nghĩa Phúc", "Xã Phù Nham"],
    "Huyện Lục Yên": ["Thị trấn Yên Thế", "Xã An Lạc", "Xã Khánh Hòa", "Xã Khai Trung", "Xã Minh Chuẩn", "Xã Tân Lĩnh", "Xã Vĩnh Lạc", "Xã Trung Tâm"],
    "Huyện Mù Cang Chải": ["Thị trấn Mù Cang Chải", "Xã Dế Xu Phình", "Xã La Pán Tẩn", "Xã Chế Cu Nha", "Xã Nậm Khắt", "Xã Khao Mang", "Xã Kim Nọi"],
    "Huyện Trạm Tấu": ["Thị trấn Trạm Tấu", "Xã Pá Hu", "Xã Pá Lau", "Xã Túc Đán", "Xã Xà Hồ", "Xã Trạm Tấu", "Xã Hát Lừu"],
    "Huyện Trấn Yên": ["Thị trấn Cổ Phúc", "Xã Báo Đáp", "Xã Đào Thịnh", "Xã Hưng Thịnh", "Xã Việt Thành", "Xã Vân Hội", "Xã Quy Mông", "Xã Lương Thịnh"],
    "Huyện Văn Chấn": ["Thị trấn Sơn Thịnh", "Xã Nghĩa Tâm", "Xã Suối Giàng", "Xã Suối Bu", "Xã Tân Thịnh", "Xã Nậm Lành", "Xã Phù Nham"],
    "Huyện Văn Yên": ["Thị trấn Mậu A", "Xã An Thịnh", "Xã Đông Cuông", "Xã Lang Thíp", "Xã Mậu Đông", "Xã Phong Dụ Hạ", "Xã Xuân Tầm"],
    "Huyện Yên Bình": ["Thị trấn Yên Bình", "Thị trấn Thác Bà", "Xã Đại Đồng", "Xã Bảo Ái", "Xã Cảm Nhân", "Xã Phúc An", "Xã Vĩnh Kiên", "Xã Yên Thành"]
  }

};

const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const wardSelect = document.getElementById('ward');

// Load tỉnh
for (let province in data) {
  const option = new Option(province, province);
  provinceSelect.appendChild(option);
}

provinceSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  districtSelect.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && data[province]) {
    for (let district in data[province]) {
      const option = new Option(district, district);
      districtSelect.appendChild(option);
    }
  }
});

districtSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  const district = districtSelect.value;
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && district && data[province][district]) {
    data[province][district].forEach(ward => {
      const option = new Option(ward, ward);
      wardSelect.appendChild(option);
    });
  }
});




document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.querySelector('.Themdiachi');

  addBtn.addEventListener('click', function () {
    // Tạo khối mới với class "from-use"
    const newAddressForm = document.createElement('from');
    newAddressForm.classList.add('.from-use__tabs');
    const alertBox = document.getElementById("alert");
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const ward = document.getElementById('ward').value;
    const fullAddress = `Tỉnh/Thành phố: ${province}, Quận/huyện: ${district}, Phường/Xã: ${ward}`;
    const ten = document.getElementById('Ten').value;
    const Email = document.getElementById('Email').value;
    const SDT = document.getElementById('SDT').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sdtRegex = /^(0|\+84)[0-9]{9}$/;

    // Kiểm tra định dạng email và SĐT
    if (!emailRegex.test(Email)) {
      showAlert("Email không hợp lệ!", "error");
      modal.style.display = "block";
      return;
    } else if (!sdtRegex.test(SDT)) {
      showAlert("Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 số bắt đầu bằng 0.", "error");
      modal.style.display = "block";
      return;
    } else {
      newAddressForm.innerHTML = `
        <form class="ModelInfo">
        <p><Strong>Địa chỉ nhà:</Strong> ${fullAddress}</p>
                  <p><strong>Tên:</strong>${ten}</p>
                  <p><strong>Email</strong> ${Email}</p>
                  <p><strong>Số điện thoại:</strong>${SDT}</p>
                  </form >
      `;
      showAlert("Thêm địa chỉ thành công!", "success");
      // Thêm form mới vào cuối main.content
      const content = document.querySelector('.content');
      content.appendChild(newAddressForm);
      const newAddress = {
        ten,
        email: Email,
        sdt: SDT,
        province,
        district,
        ward
      };
    
      // Lưu vào localStorage
      const saved = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
      saved.push(newAddress);
      localStorage.setItem('savedAddresses', JSON.stringify(saved));
    
      showAlert("Thêm địa chỉ thành công!", "success");
      modal.style.display = "none";
    }

    // Nội dung HTML của form mới (bạn có thể tùy chỉnh lại)


  });
});

function showAlert(message, type) {
  const alertBox = document.getElementById("alert");
  alertBox.textContent = message;
  alertBox.className = "alert-message " + (type === "success" ? "alert-success" : "alert-error");
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}

// Lấy phần tử modal
const modal = document.getElementById("storeOwnerModal");

// Lấy nút mở modal
const openModalBtn = document.getElementById("openModalBtn");

// Lấy nút đóng modal (dấu ×)
const closeElem = document.getElementsByClassName("close")[0];

// Lấy nút "Đồng ý"
const agreeBtn = document.getElementById("agreeBtn");
const addBtn = document.querySelector('.Themdiachi');



// Khi người dùng nhấn nút mở modal, hiển thị modal
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Khi người dùng nhấn vào dấu ×, ẩn modal
closeElem.addEventListener("click", function () {
  modal.style.display = "none";
});

// Khi người dùng nhấn nút "Đồng ý", ẩn modal
addBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Khi người dùng nhấn ngoài khu vực modal, ẩn modal
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
