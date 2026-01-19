// 模擬等待人數（從你的截圖開始）
let currentQueue = 11601;
let totalUsers = 50000;
let countdownTimer;
let simulateInterval;

// 元素
const queueNumberEl = document.getElementById('queueNumber');
const queueScreen = document.getElementById('queueScreen');
const successScreen = document.getElementById('successScreen');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');

// 隨機反應速度（模擬）
function getRandomLatency() {
  return Math.floor(Math.random() * 40 + 80); // 80~120ms 之間
}

// 開始倒數 / 模擬前進
function startCountdown() {
  queueScreen.classList.add('active');
  successScreen.classList.remove('active');

  currentQueue = Math.floor(Math.random() * 30000) + 5000; // 隨機起始號碼更有趣
  queueNumberEl.textContent = currentQueue.toLocaleString();

  document.getElementById('firstClick').textContent = getRandomLatency();
  document.getElementById('finalClick').textContent = getRandomLatency();

  simulateInterval = setInterval(() => {
    if (currentQueue > 0) {
      currentQueue -= Math.floor(Math.random() * 8 + 3); // 每次減少 3~10 人
      if (currentQueue < 0) currentQueue = 0;
      queueNumberEl.textContent = currentQueue.toLocaleString();

      // 隨機更新總人數（可有可無）
      if (Math.random() > 0.92) {
        totalUsers += Math.floor(Math.random() * 300 - 100);
        document.querySelector('.stats strong').textContent = totalUsers.toLocaleString() + '명';
      }

      // 到達前幾名時跳成功畫面
      if (currentQueue <= 50) {
        clearInterval(simulateInterval);
        setTimeout(() => {
          queueScreen.classList.remove('active');
          successScreen.classList.add('active');
        }, 1500);
      }
    }
  }, 400); // 每0.4秒更新一次，比較有真實感
}

// 重置
function resetAll() {
  clearInterval(simulateInterval);
  queueScreen.classList.add('active');
  successScreen.classList.remove('active');
  startCountdown();
}

// 事件
resetBtn.addEventListener('click', resetAll);
backBtn.addEventListener('click', resetAll);

// 頁面載入時自動開始
startCountdown();
