export async function loadHTML(selector, filePath) {
  try {
    const response = await fetch(filePath);         // Gửi yêu cầu GET tới file HTML
    const html = await response.text();             // Lấy nội dung HTML dạng chuỗi
    const target = document.querySelector(selector); // Tìm phần tử cần chèn nội dung
    if (target) {
      target.innerHTML = html;                      // Gán nội dung vào trong phần tử đó
    } else {
      console.warn(`Không tìm thấy selector: ${selector}`);
    }
  } catch (err) {
    console.error(`Không thể load file ${filePath}:`, err);
  }
}
