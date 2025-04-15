document.querySelector('.checkout-Select-Address').addEventListener('click', () => {
  fetch('../pages/api/lay-diachi.php')
    .then(res => res.json())
    .then(addresses => {
      if (!addresses.length) {
        alert('Chưa có địa chỉ nào. Vui lòng thêm ở trang địa chỉ!');
        return;
      }

      console.log("📦 Danh sách địa chỉ nhận được:", addresses); // ✅ để ngoài HTML

      const popup = document.createElement('div');
      popup.className = 'address-popup';
      popup.innerHTML = `
        <div class="address-popup__overlay"></div>
        <div class="address-popup__content">
          <h3>Chọn địa chỉ giao hàng</h3>
          <ul class="address-popup__list">
            ${addresses.map(addr => `
              <li class="address-popup__item" data-id="${addr.ID_Dia_Chi}">
                <strong>${addr.ten}</strong> | ${addr.sdt}<br/>
                ${addr.diachi}, ${addr.ward}, ${addr.district}, ${addr.province}
              </li>
            `).join('')}
          </ul>
          <button class="address-popup__close">Đóng</button>
        </div>
      `;

      document.body.appendChild(popup);

      document.querySelectorAll('.address-popup__item').forEach(item => {
        item.addEventListener('click', () => {
          const id = parseInt(item.dataset.id);
          const addr = addresses.find(a => a.ID_Dia_Chi == id);

          if (!addr) {
            alert("Không tìm thấy địa chỉ tương ứng!");
            return;
          }

          const infoBox = document.querySelector('.checkout-address__info');
          infoBox.innerHTML = `
            <strong>${addr.ten}</strong> &nbsp; (${addr.sdt})<br/>
            ${addr.diachi}, ${addr.ward}, ${addr.district}, ${addr.province}
          `;
          infoBox.dataset.id = addr.ID_Dia_Chi;
          window.selectedAddressId = addr.ID_Dia_Chi;

          console.log("✅ Đã chọn địa chỉ ID:", addr.ID_Dia_Chi);
          popup.remove();
        });
      });

      document.querySelector('.address-popup__close').addEventListener('click', () => popup.remove());
    })
    .catch(() => alert('Không thể lấy danh sách địa chỉ!'));
});
