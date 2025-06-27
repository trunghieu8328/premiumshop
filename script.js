document.querySelector('.login-btn').addEventListener('click', () => {
  alert('Tính năng đăng nhập đang phát triển!');
});
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
}
