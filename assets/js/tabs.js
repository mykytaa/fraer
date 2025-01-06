const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabContents.forEach(content => (content.style.display = 'none'));
    const targetTab = button.dataset.tab;
    document.getElementById(targetTab).style.display = 'block';
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
document.querySelector('#tap-section').style.display = 'block';
