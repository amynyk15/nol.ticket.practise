// 元素
const verifyScreen   = document.getElementById('verifyScreen');
const queueScreen    = document.getElementById('queueScreen');
const seatScreen     = document.getElementById('seatScreen');

const captchaDisplay = document.getElementById('captchaDisplay');
const captchaInput   = document.getElementById('captchaInput');
const verifyBtn      = document.getElementById('verifyBtn');
const refreshCaptcha = document.getElementById('refreshCaptcha');
const verifyError    = document.getElementById('verifyError');

const queueNumberEl  = document.getElementById('queueNumber');
const totalUsersEl   = document.getElementById('totalUsers');
const resetBtn       = document.getElementById('resetBtn');

const zones          = document.querySelectorAll('.zone');
const selectedZoneEl = document.getElementById('selectedZone');
const confirmSeat    = document.getElementById('confirmSeat');
const backToQueue    = document.getElementById('backToQueue');

// 變數
let currentCaptcha = '';
let currentQueue = 11601;
let simulateInterval;

// 產生隨機6位大寫字母
function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = code;
  captchaDisplay.textContent = code;
  captchaInput.value = '';
  verifyError.textContent = '';
}

// 驗證
function checkCaptcha() {
  if (captchaInput.value.toUpperCase() === currentCaptcha) {
    verifyScreen.classList.remove('active');
    queueScreen.classList.add('active');
    startCountdown();
  } else {
    verifyError.textContent = '잘못된 코드입니다. 다시 입력해주세요.';
    captchaInput.value = '';
    captchaInput.focus();
  }
}

// 開始模擬排隊
function startCountdown() {
  currentQueue = Math.floor(Math.random() * 30000) + 5000;
  queueNumberEl.textContent = currentQueue.toLocaleString();
  totalUsersEl.textContent = (50000 + Math.floor(Math.random()*5000)).toLocaleString();

  simulateInterval = setInterval(() => {
    if (currentQueue > 0) {
      currentQueue -= Math.floor(Math.random() * 8 + 3);
      if (currentQueue < 0) currentQueue = 0;
      queueNumberEl.textContent = currentQueue.toLocaleString();

      if (currentQueue <= 30) {
        clearInterval(simulateInterval);
        setTimeout(() => {
          queueScreen.classList.remove('active');
          seatScreen.classList.add('active');
        }, 1200);
      }
    }
  }, 380);
}

// 重置全部
function resetAll() {
  clearInterval(simulateInterval);
  verifyScreen.classList.add('active');
  queueScreen.classList.remove('active');
  seatScreen.classList.remove('active');
  generateCaptcha();
  confirmSeat.disabled = true;
  confirmSeat.classList.remove('enabled');
  selectedZoneEl.textContent = '없음';
}

// 事件綁定
verifyBtn.addEventListener('click', checkCaptcha);
captchaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkCaptcha();
});
refreshCaptcha.addEventListener('click', generateCaptcha);

resetBtn.addEventListener('click', resetAll);
backToQueue.addEventListener('click', resetAll);

// 座位選擇
zones.forEach(zone => {
  zone.addEventListener('click', () => {
    zones.forEach(z => z.style.borderColor = 'transparent');
    zone.style.borderColor = '#ffdd57';
    selectedZoneEl.textContent = zone.textContent.trim();
    confirmSeat.disabled = false;
    confirmSeat.classList.add('enabled');
  });
});

confirmSeat.addEventListener('click', () => {
  alert(`축하합니다! ${selectedZoneEl.textContent} 구역으로 예매를 시도합니다.\n(이건 연습 페이지라 실제 결제는 안 됩니다 ^^)`);
});

// 頁面載入
generateCaptcha();
