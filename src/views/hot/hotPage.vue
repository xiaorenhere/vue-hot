<script setup>
import { ref, onMounted } from 'vue';
import HotCardrBaiDu from './components/hotCardr-baidu.vue';
import HotCardWeiBo from './components/hotCardr-weibo.vue';
import HotCardBiLiBiLi from './components/hotCardr-bilibili.vue';
import HotCardBiLiBiLiRank from './components/hotCardr-bilibilirank.vue';
import HotCardDouYin from './components/hotCardr-douyin.vue';
import HotCardLoL from './components/hotCardr-lol.vue';
import HotCardZhiHu from './components/hotCardr-zhihu.vue';
import HotCardTengXun from './components/hotCardr-tengxun.vue';
import HotCardWangYi from './components/hotCardr-wangyi.vue';
import HotCardJueJin from './components/hotCardr-juejin.vue';
import HotCardTouTiao from './components/hotCardr-toutiao.vue';
import HotCardHyper from './components/hotCardr-hyper.vue';
import HotCardRenMin from './components/hotCardr-renmin.vue';
import HotCardTapIos from './components/hotCardr-tapios.vue';
import HotCardTapAz from './components/hotCardr-tapaz.vue';
import HotCardQingNian from './components/hotCardr-qingnian.vue';
import HotCardGongRen from './components/hotCardr-gongren.vue';
import HotCardGuangMing from './components/hotCardr-guangming.vue';
import HotCardJieFang from './components/hotCardr-jiefang.vue';
import HotCardJunBao from './components/hotCardr-junbao.vue';
import HotCardJingJi from './components/hotCardr-jingji.vue';
import HotCardXinHua from './components/hotCardr-xinhua.vue';

const componentsList = [
  HotCardrBaiDu,
  HotCardWeiBo,
  HotCardBiLiBiLi,
  HotCardBiLiBiLiRank,
  HotCardDouYin,
  HotCardLoL,
  HotCardZhiHu,
  HotCardTengXun,
  HotCardWangYi,
  HotCardJueJin,
  HotCardTouTiao,
  HotCardHyper,
  HotCardRenMin,
  HotCardTapIos,
  HotCardTapAz,
  HotCardQingNian,
  HotCardGongRen,
  HotCardGuangMing,
  HotCardJieFang,
  HotCardJunBao,
  HotCardJingJi,
  HotCardXinHua,
];

const visibleComponents = ref(componentsList.slice(0, 8));
const loading = ref(false);

const loadMore = () => {
  if (loading.value) return;
  loading.value = true;

  setTimeout(() => {
    const nextBatch = componentsList.slice(visibleComponents.value.length, visibleComponents.value.length + 8);
    visibleComponents.value.push(...nextBatch);
    loading.value = false;
  }, 500); 
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  const sentinel = document.querySelector('.sentinel');
  if (sentinel) {
    observer.observe(sentinel);
  }
});
</script>

<template>
  <nav>
    <div class="big">
      <component :is="comp" v-for="(comp, index) in visibleComponents" :key="index" />
      <div class="sentinel" v-if="visibleComponents.length < componentsList.length"></div>
    </div>
  </nav>
  <div class="footer">
    <div class="beian">
      <a href="https://beian.miit.gov.cn/" target="_blank">
        <img src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" alt="">
        <span>备案号：豫ICP备2024068276号</span>
      </a>
      <!-- <a href="https://www.kelcena.com/" target="_blank">友情链接：香香编程知识平台</a> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("../../assets/css/index.scss");

</style>
