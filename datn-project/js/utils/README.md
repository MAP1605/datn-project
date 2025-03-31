## 📁 Thư mục js/utils/

### Mục đích:
Chứa các hàm JavaScript dùng lại nhiều nơi (gọi là tiện ích / utilities).

---

## ✅ Hàm `loadHTML()`

### File định nghĩa:
`js/utils/dom.js`

### Dùng để:
Tự động chèn nội dung từ 1 file HTML (VD: header, footer) vào đúng vị trí trên trang web.

---

### Ví dụ cách dùng:
```js
loadHTML('#header', 'components/header.html');
