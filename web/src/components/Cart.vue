<template>
    <div class="card bg-white p-3 mt-3">
        <div 
        class="card-header d-flex ai-center" 
        :class="{'border-bottom':!plain,'pb-3':!plain}">
          <i class="iconfont" :class="`icon-${icon}`"></i>
          <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
          <!-- plain控制省略号显示与否,组件不加plain则显示省略号，加了就不显示 -->
          <i class="iconfont icon-menu" v-if="!plain"></i>
        </div>

        <div class="card-body pt-3">
          <slot></slot>
        </div>
      </div>
</template>

<script>
export default {
    props:{//required表示参数必填
       title:{type:String,required:true},
       icon:{type:String,required:true},
       plain:{type:Boolean} 
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.card{
    
    border-bottom: 1px solid $border-color;
}
</style>