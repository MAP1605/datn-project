const addressData = {
  "Hà Nội": {
    "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Cống Vị"],
    "Hoàn Kiếm": ["Hàng Bạc", "Hàng Trống", "Tràng Tiền"],
    "Đống Đa": ["Khâm Thiên", "Văn Miếu", "Trung Liệt"]
  },
  "TP. Hồ Chí Minh": {
    "Quận 1": ["Bến Nghé", "Bến Thành", "Phạm Ngũ Lão"],
    "Quận 5": ["Chợ Lớn", "Phường 2", "Phường 3"],
    "Bình Thạnh": ["Phường 13", "Phường 14", "Phường 25"]
  },
  "An Giang": {
    "Long Xuyên": ["Mỹ Bình", "Mỹ Hòa", "Mỹ Phước"],
    "Châu Đốc": ["Châu Phú A", "Núi Sam", "Vĩnh Mỹ"]
  },
  "Bà Rịa - Vũng Tàu": {
    "Vũng Tàu": ["Phường 1", "Phường 2", "Thắng Tam"],
    "Bà Rịa": ["Long Toàn", "Phước Hiệp", "Phước Trung"]
  },
  "Bắc Giang": {
    "TP Bắc Giang": ["Hoàng Văn Thụ", "Ngô Quyền", "Thọ Xương"],
    "Yên Dũng": ["Tân An", "Cảnh Thụy", "Tiền Phong"]
  },
  "Bắc Ninh": {
    "TP Bắc Ninh": ["Đại Phúc", "Kinh Bắc", "Tiền An"],
    "Thuận Thành": ["Gia Đông", "Ninh Xá", "Trạm Lộ"]
  },
  "Bình Dương": {
    "Thủ Dầu Một": ["Phú Hòa", "Phú Cường", "Chánh Mỹ"],
    "Dĩ An": ["Đông Hòa", "Tân Đông Hiệp", "Tân Bình"]
  },
  "Cần Thơ": {
    "Ninh Kiều": ["An Hòa", "Tân An", "Thới Bình"],
    "Bình Thủy": ["Bình Thủy", "Long Tuyền", "An Thới"]
  },
  "Đà Nẵng": {
    "Hải Châu": ["Thanh Bình", "Hải Châu 1", "Hải Châu 2"],
    "Sơn Trà": ["An Hải Đông", "Phước Mỹ", "Thọ Quang"]
  },
  "Hải Phòng": {
    "Hồng Bàng": ["Minh Khai", "Quang Trung", "Hoàng Văn Thụ"],
    "Ngô Quyền": ["Cầu Đất", "Lạc Viên", "Máy Chai"]
  },
  "Khánh Hòa": {
    "Nha Trang": ["Lộc Thọ", "Phước Tiến", "Vĩnh Thọ"],
    "Cam Ranh": ["Cam Phú", "Cam Nghĩa", "Ba Ngòi"]
  },
  "Lâm Đồng": {
    "Đà Lạt": ["Phường 1", "Phường 2", "Phường 3"],
    "Bảo Lộc": ["Lộc Phát", "B'Lao", "Lộc Sơn"]
  },
  "Nam Định": {
    "TP Nam Định": ["Trần Tế Xương", "Vị Hoàng", "Cửa Bắc"],
    "Ý Yên": ["Yên Bình", "Yên Chính", "Yên Cường"]
  },
  "Nghệ An": {
    "Vinh": ["Bến Thủy", "Hồng Sơn", "Trường Thi"],
    "Cửa Lò": ["Thu Thủy", "Nghi Thủy", "Nghi Tân"]
  },
  "Quảng Ninh": {
    "Hạ Long": ["Bạch Đằng", "Hồng Hà", "Tuần Châu"],
    "Cẩm Phả": ["Cẩm Đông", "Cẩm Sơn", "Cẩm Tây"]
  },
  "Thừa Thiên Huế": {
    "TP Huế": ["Vĩnh Ninh", "Thuận Thành", "Phước Vĩnh"],
    "Hương Thủy": ["Phú Bài", "Thủy Lương", "Thủy Dương"]
  },
  "Yên Bái": {
    "TP Yên Bái": ["Đồng Tâm", "Nguyễn Thái Học", "Minh Tân"],
    "Nghĩa Lộ": ["Cầu Thia", "Pú Trạng", "Trung Tâm"]
  },
    "An Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bà Rịa - Vũng Tàu": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bắc Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bắc Kạn": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bạc Liêu": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bắc Ninh": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bến Tre": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bình Định": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bình Dương": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bình Phước": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Bình Thuận": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Cà Mau": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Cần Thơ": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Cao Bằng": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Đà Nẵng": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Đắk Lắk": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Đắk Nông": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Điện Biên": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Đồng Nai": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Đồng Tháp": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Gia Lai": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hà Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hà Nam": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hà Nội": {
      "Ba Đình": [
        "Trúc Bạch",
        "Vĩnh Phúc",
        "Cống Vị"
      ],
      "Cầu Giấy": [
        "Dịch Vọng",
        "Nghĩa Đô",
        "Mai Dịch"
      ],
      "Hà Đông": [
        "Văn Quán",
        "Yên Nghĩa",
        "La Khê"
      ]
    },
    "Hà Tĩnh": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hải Dương": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hải Phòng": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hậu Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hòa Bình": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Hưng Yên": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Khánh Hòa": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Kiên Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Kon Tum": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Lai Châu": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Lâm Đồng": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Lạng Sơn": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Lào Cai": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Long An": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Nam Định": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Nghệ An": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Ninh Bình": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Ninh Thuận": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Phú Thọ": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Phú Yên": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Quảng Bình": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Quảng Nam": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Quảng Ngãi": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Quảng Ninh": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Quảng Trị": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Sóc Trăng": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Sơn La": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Tây Ninh": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Thái Bình": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Thái Nguyên": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Thanh Hóa": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Thừa Thiên Huế": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Tiền Giang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "TP. Hồ Chí Minh": {
      "Quận 1": [
        "Bến Nghé",
        "Bến Thành",
        "Cô Giang"
      ],
      "Quận 3": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ]
    },
    "Trà Vinh": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Tuyên Quang": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Vĩnh Long": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Vĩnh Phúc": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    },
    "Yên Bái": {
      "Quận 1": [
        "Phường 1",
        "Phường 2",
        "Phường 3"
      ],
      "Quận 2": [
        "Phường 4",
        "Phường 5",
        "Phường 6"
      ],
      "Huyện A": [
        "Xã A1",
        "Xã A2",
        "Xã A3"
      ]
    }
  
};

const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const wardSelect = document.getElementById('ward');

// Load tỉnh
for (let province in addressData) {
  const option = new Option(province, province);
  provinceSelect.appendChild(option);
}

provinceSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  districtSelect.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && addressData[province]) {
    for (let district in addressData[province]) {
      const option = new Option(district, district);
      districtSelect.appendChild(option);
    }
  }
});

districtSelect.addEventListener('change', () => {
  const province = provinceSelect.value;
  const district = districtSelect.value;
  wardSelect.innerHTML = '<option value="">-- Chọn Phường / Xã --</option>';

  if (province && district && addressData[province][district]) {
    addressData[province][district].forEach(ward => {
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
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng!");
        modal.style.display = "block";
        return;
      }else if (!sdtRegex.test(SDT)) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập số bắt đầu bằng 0 hoặc +84 và đủ 10 chữ số.");
        modal.style.display = "block";
        return;
      }else{
        newAddressForm.innerHTML = `
        <form class="ModelInfo">
        <p><Strong>Địa chỉ nhà:</Strong> ${fullAddress}</p>
                  <p><strong>Tên:</strong>${ten}</p>
                  <p><strong>Email</strong> ${Email}</p>
                  <p><strong>Số điện thoại:</strong>${SDT}</p>
                  </form >
      `;
    
    // Thêm form mới vào cuối main.content
    const content = document.querySelector('.content');
    content.appendChild(newAddressForm);
      }
      
      // Nội dung HTML của form mới (bạn có thể tùy chỉnh lại)
     
    
    });
  });

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
openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

// Khi người dùng nhấn vào dấu ×, ẩn modal
closeElem.addEventListener("click", function() {
  modal.style.display = "none";
});

// Khi người dùng nhấn nút "Đồng ý", ẩn modal
addBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Khi người dùng nhấn ngoài khu vực modal, ẩn modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
