<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 定义响应式数据
const data1 = ref('');

const timerstr = ref([]);
const timers = ref([]);

// 方法定义
const redu = val => (parseInt(val) / 40000).toFixed(2);
const formatTime = seconds => {
  const second = seconds / 1000;
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  return hours > 0 ? `${hours}小时 ${minutes}分钟` : `${minutes}分钟`;
};


// 定时器设置
const setTimer = () => {
  setInterval(() => {
    for (let i = 0; i < 22; i++) {
      const dif = new Date() - timers.value[i];
      timerstr.value[i] = formatTime(dif);
    }
  }, 60000);
};

// 数据获取方法
const fetchData = async () => {
  try {
    const url = 'http://www.codefun.top:8087/zhihu';
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchData1 = async () => {
  data1.value = await fetchData();
  timers.value[0] = new Date();
  timerstr.value[0] = '0分钟';
};



// 生命周期钩子
onMounted(() => {
  setTimer();
  fetchData1()
});
</script>

<template>
  <div class="card">
    <el-card shadow="hover">
      <!-- 头部 -->
      <template #header>
        <div class="title">
          <span><img src="../../../assets/images/zhihu.svg" alt=""></span>
          <p>知乎</p>

        </div>
        <div class="icon">
          <img src="../../../assets/images/绿色对号.svg" alt="">
          <p>热搜榜</p>
        </div>
      </template>

      <!-- 主体部分 -->
      <div class="scroll-list">
        <div v-for="(item, i) in data1" :key="item.id" :id="item.id" class="data">
          <li><span class="rank">{{ i + 1 }}</span><a :href="item.url" target="_blank" class="data-text"
              :title="item.title">{{
                item.title }}</a><span class="heat" v-if="item.hot">{{ redu(item.hot) }}万</span><span class="heat"
              v-else></span></li>
        </div>
      </div>


      <!-- 底部 -->
      <template #footer>
        <ul class="refresh">
          <li>{{ timerstr[0] }}前更新</li>
          <li><span> <button @click="fetchData1()" class="button"><img src="../../../assets/images/shuaxin.svg"
                  alt=""></button></span>
          </li>
        </ul>
      </template>
    </el-card>
  </div>

</template>

<style lang="scss">
@import "../../../assets/css/hotCard.scss";
// 卡片</style>