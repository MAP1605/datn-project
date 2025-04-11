document.querySelector('.checkout-Select-Address').addEventListener('click', () => {
    const addresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
    if (!addresses.length) {
      alert('Chưa có địa chỉ nào. Vui lòng thêm ở trang địa chỉ!');
      return;
    }
  
    const popup = document.createElement('div');
    popup.className = 'address-popup';
    popup.innerHTML = `
      <div class="address-popup__overlay"></div>
      <div class="address-popup__content">
        <h3>Chọn địa chỉ giao hàng</h3>
        <ul class="address-popup__list">
          ${addresses.map((addr, i) => `
            <li class="address-popup__item" data-index="${i}">
              <strong>${addr.ten}</strong> | ${addr.sdt}<br/>
              ${addr.ward}, ${addr.district}, ${addr.province}
            </li>`).join('')}
        </ul>
        <button class="address-popup__close">Đóng</button>
      </div>
    `;
    document.body.appendChild(popup);
  
    document.querySelectorAll('.address-popup__item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = item.dataset.index;
        const addr = addresses[idx];
        document.querySelector('.checkout-address__info').innerHTML = `
          <strong>${addr.ten}</strong> &nbsp; (${addr.sdt})<br/>
          ${addr.ward}, ${addr.district}, ${addr.province}
        `;
        popup.remove();
      });
    });
  
    document.querySelector('.address-popup__close').addEventListener('click', () => popup.remove());
  });
  