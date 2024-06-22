<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const currentDateTime = ref(new Date());

const currentDate = computed(() => {
  return currentDateTime.value.toLocaleDateString();
});

const currentTime = computed(() => {
  return currentDateTime.value.toLocaleTimeString();
});

// 天干地支纪年法
const formatChineseDateTime = computed(() => {
  const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday = now.getDay();

  const yearTianganIndex = (year - 4) % 10;
  const yearDizhiIndex = (year - 4) % 12;
  const monthTianganIndex = (yearTianganIndex + month - 1) % 10;
  const monthDizhiIndex = (yearDizhiIndex + month - 1) % 12;
  const dayTianganIndex = (yearTianganIndex + day - 1) % 10;
  const dayDizhiIndex = (yearDizhiIndex + day - 1) % 12;

  const yearStr = tiangan[yearTianganIndex] + dizhi[yearDizhiIndex] + '年';
  const monthStr = tiangan[monthTianganIndex] + dizhi[monthDizhiIndex] + '月';
  const dayStr = tiangan[dayTianganIndex] + dizhi[dayDizhiIndex] + '日';
  const weekdayStr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][weekday];

  return `${yearStr} ${monthStr} ${dayStr} ${weekdayStr}`;
});

onMounted(() => {
  if (route.path !== '/') {
    route.replace('/');
  }
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});

let timer = null;

function startTimer() {
  timer = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

document.addEventListener('scroll', function () {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  const progress = Math.min(scrollPercent, 100);

  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;

  const progressPercentage = document.querySelector('.progress-percentage');
  progressPercentage.textContent = `${Math.round(progress)}`;

  if (progress < 33) {
    circle.style.stroke = 'red';
  } else if (progress < 66) {
    circle.style.stroke = 'skyblue';
  } else {
    circle.style.stroke = 'lightgreen';
  }
});

let isLight = true

const changeBgColor = () => {
  isLight = !isLight
  // if (isLight.value) {
  //   const header = document.querySelector('.hot-top')
  //   header.classList.add('write')
  // }
  // const header = document.querySelector('.hot-top')
  // header.classList.add('black')
}

const loading = ref(true)
setTimeout(() => {
  // 异步操作完成后关闭 loading
  loading.value = false;
}, 1000);
</script>
<template>
  <div v-loading="loading">
    <div class="hot-top">
      <header>
        <div class="logo1">
          <div id="pic"><img src="./assets//images/热门.png" alt="" /></div>
          <div class="title1">
            <p>今日热榜</p>
            <p>汇聚全网热点，热门尽览无余</p>
          </div>

        </div>
        <div class="times">
          <div class="time1">{{ currentDate }}
            &nbsp;{{ currentTime }}
          </div>
          <div class="time2">{{ formatChineseDateTime }}</div>
        </div>
        <div class="hot-right">
          <div class="hot-right-one">
            <button @click="changeBgColor">
              <img v-if="isLight" src="./assets/images/太阳.svg" alt="">
              <img v-else src="./assets/images/moon-月亮.svg" alt="">
            </button>
          </div>
          <div class="hot-right-two">
            <a href="https://gitee.com/liushuohere/vue-hot">
              <img src="./assets/images/GITEE.svg" alt="">
            </a>
          </div>
          <div class="hot-right-three">
            <div class="progress-container">
              <svg class="progress-ring" width="30" height="30">
                <circle class="progress-ring__circle" stroke="white" stroke-width="3" fill="transparent" r="12" cx="15"
                  cy="15" />
              </svg>
              <div class="progress-percentage">0</div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <RouterView />
  </div>

</template>
<style scoped lang="scss">
@import url('./assets/css/app.scss');

</style>