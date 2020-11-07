<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div class="nav-item" :class="{active : active === i}"
            v-for="(category,i) in categories" :key="i"
            @click="$refs.list.swiper.slideTo(i)">
              <div class="nav-link">{{category.name}}</div>
            </div>
        </div>

        <div class="pt-3">
            <!-- slide-change方法是vue-awesome-swiper自带的方法，随着滑动切换标题高亮显示 -->
            <!-- 通过ref设置标识来控制组件滑动 -->
            <!-- :options="{autoHeight:true}"高度自适应 -->
            <swiper ref="list" :options="{autoHeight:true}"
            @slide-change="() => active = $refs.list.swiper.realIndex">
              <swiper-slide  v-for="(category,i) in categories" :key="i">
                <!-- 具名插槽，通过绑定category把循环出来的数据传给父组件 -->
                <slot name="items" :category="category"></slot>
              </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    props:{
        icon:{type:String,required:true},
        title:{type:String,required:true},
        categories:{type:Array,required:true}
    },
    data(){
        return {
            active:0
        }
    }
}
</script>

<style lang="scss">
    
</style>