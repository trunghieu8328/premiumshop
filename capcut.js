const packages = [
  { name: "Capcut Pro 7 ngày", price: 19900 },
  { name: "Capcut Pro ~1 tháng (hot sale)", price: 39000 },
  { name: "Capcut Pro 1 tháng", price: 49000 },
  { name: "Capcut Pro 1 tháng (chính chủ)", price: 69000 },
  { name: "Capcut Pro 1 năm (chính chủ)", price: 499000 },
  { name: "Capcut Pro 1 năm", price: 2990000 },
];

let selectedPrice = 0;

function formatVND(number) {
  return number.toLocaleString('vi-VN');
}

function renderPackages() {
  const container = document.getElementById("packages");
  packages.forEach((pkg, index) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="service" value="${index}" onchange="updateTotal()"> 
      ${pkg.name} <span class="price">Giá ${formatVND(pkg.price)}₫</span>
    `;
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function updateTotal() {
  const selected = document.querySelector('input[name="service"]:checked');
  if (selected) {
    selectedPrice = packages[+selected.value].price;
    const quantity = +document.getElementById("quantity").value || 1;
    document.getElementById("total").innerText = formatVND(selectedPrice * quantity);
    document.getElementById("service-error").classList.add("hidden");
  }
}

function submitOrder() {
  const contact = document.getElementById("contact").value.trim();
  const quantity = +document.getElementById("quantity").value;
  const note = document.getElementById("note").value.trim();
  const selected = document.querySelector('input[name="service"]:checked');

  if (!selected) {
    document.getElementById("service-error").classList.remove("hidden");
    return;
  }

  const service = packages[+selected.value];
  const total = selectedPrice * quantity;

  const message = `
🔔 ĐƠN HÀNG MỚI – CAPCUT PRO
👤 Liên hệ: ${contact}
📦 Gói: ${service.name}
🔢 Số lượng: ${quantity}
📝 Ghi chú: ${note || "Không có"}
💰 Thành tiền: ${formatVND(total)}₫
`;

  // Gửi về Telegram
  const token = "YOUR_BOT_TOKEN";
  const chat_id = "YOUR_CHAT_ID";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text: message, parse_mode: "Markdown" })
  })
    .then(res => {
      if (res.ok) alert("✅ Đơn hàng đã được gửi!");
      else alert("❌ Gửi thất bại. Vui lòng thử lại.");
    });
}

renderPackages();
