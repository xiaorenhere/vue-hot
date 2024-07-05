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
    const url = 'https://hot-api.codefun.top/tengxun';
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
const loading = ref(true);
const fetchData1 = async () => {
  loading.value = true;
  data1.value = await fetchData();
  timers.value[0] = new Date();
  
  setTimeout(() => {
    // 异步操作完成后关闭 loading
    loading.value = false;
  }, 1500);
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
          <span><img src="../../../assets/images/tengxun.svg" alt=""></span>
          <p>腾讯</p>

        </div>
        <div class="icon">
          <img src="../../../assets/images/绿色对号.svg" alt="">
          <p>热搜榜</p>
        </div>
      </template>

      <!-- 主体部分 -->
      <div class="scroll-list">
        <div class="load" v-loading="loading" v-if="loading"></div>
        <div v-else>
          <div v-for="(item, i) in data1" :key="item.id" :id="item.id" class="data">
            <li><span class="rank">{{ i + 1 }}</span>
              <el-tooltip popper-class="my_tooltip" effect="light" :content=item.title placement="top" show-after=500
                v-if="item.title.length > 12">
                <a :href="item.url" target="_blank" class="data-text">{{ item.title }}</a>
              </el-tooltip>
              <a :href="item.url" target="_blank" class="data-text" v-else>{{ item.title }}</a>
              <span class="heat" v-if="item.hot">{{ redu(item.hot) }}万</span><span class="heat" v-else></span>
            </li>
          </div>
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