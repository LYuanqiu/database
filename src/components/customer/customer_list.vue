<template>
  <div v-show="list.length">
    <!--搜索框-->
    <div class="container" id="div1">
      <div class="search bar1">
        <form>
          <input type="text" v-model="inputText" placeholder="请输入您要搜索的内容...">
          <button type="submit" @click="Click()"> <img src="../../assets/search.png" width="20px" height="20px"> </button>
        </form>
      </div>
    </div>
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterBrand}"
              v-for="item in brands" :key="item.index"
              @click="handleFilterBrand(item)" >{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterColor}"
              v-for="item in colors" :key="item.index"
              @click="handleFilterColor(item)">{{item}}</span>
      </div>

      <div class="list-control-order">
        <span>排序:</span>
        <span class="list-control-order-item"
              :class="{on: order === ''}"
              @click="handleOrderDefault">默认</span>
        <span class="list-control-order-item"
              :class="{on: order === 'sales'}"
              @click="handleOrderSales">
                    销量
                    <template v-if="order === 'sales'">↓</template>
                </span>
        <span class="list-control-order-item"
              :class="{on: order.indexOf('cost') > -1}"
              @click="handleOrderCost">
                    价格
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
      </div>
    </div>
    <div class="productsList">
      <Customer_Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Customer_Product>
    </div>
    <div class="product-not-found"
         v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    <!--猜你喜欢-->
    <!--转换成 v-for--后端实现 todo -->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>


</template>

<script>
//导入商品简介组件
import Customer_Product from './customer_product.vue';
export default {
  components: {Customer_Product},
  computed: {
    list(){
      //从Vuex获取商品列表信息
      return this.$store.state.productList;
    },
    brands(){
      return this.$store.getters.brands;
    },
    colors(){
      return this.$store.getters.colors;
    },
    filteredAndOrderedList(){
      //拷贝原数组
      let list = [...this.list];
      //品牌过滤
      if(this.filterBrand !== ''){
        list = list.filter(item => item.brand === this.filterBrand);
      }
      //颜色过滤
      if(this.filterColor !== ''){
        list = list.filter(item => item.color === this.filterColor);
      }
      //排序
      if(this.order !== ''){
        if(this.order === 'sales'){
          list = list.sort((a, b) => b.sales - a.sales);
        }else if(this.order === 'cost-desc'){
          list = list.sort((a, b) => b.cost - a.cost);
        }else if(this.order === 'cost-asc'){
          list = list.sort((a, b) => a.cost - b.cost);
        }
      }
      return list;
    }
  },
  data(){
    return {
      //品牌过滤
      filterBrand: '',
      //颜色过滤
      filterColor: '',
      //排序依据，可选值：
      //cost-desc价格降序
      //cost-asc价格升序
      //sales销量
      order: ''
    }
  },
  methods: {
    //品牌筛选
    handleFilterBrand(brand){
      //点击品牌过滤，再次点击取消
      if (this.filterBrand === brand) {
        this.filterBrand = '';
      }else{
        this.filterBrand = brand;
      }
    },
    //颜色筛选
    handleFilterColor(color){
      //点击颜色过滤，再次点击取消
      if (this.filterColor === color) {
        this.filterColor = '';
      }else{
        this.filterColor = color;
      }
    },
    handleOrderDefault(){
      this.order = '';
    },
    handleOrderSales(){
      this.order = 'sales';
    },
    handleOrderCost(){
      //当点击升序时将箭头更新↓,降序设置为↑
      if(this.order === 'cost-desc'){
        this.order = 'cost-asc';
      }else{
        this.order = 'cost-desc';
      }
    },

  },
  mounted(){
    //初始化时通过Vuex actions获取商品列表信息
    this.$store.dispatch('getProductList');
  }
}
</script>

<style scoped>
.list-control{
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
}
.list-control-filter{
  margin-bottom: 16px;
}
.container {

  width: 500px;

  margin: 50px auto;

  overflow: hidden;

  border: 1px solid #ccc;

}
.bar1 {background: #A3D0C3; }
.bar1 input {
  border: 2px solid #7BA7AB;
  border-radius: 5px;
  background: #F9F0DA;
  color: #9E9C9C;
}
.bar1 button {
  top: 0;
  right: 0;
  background: #7BA7AB;
  border-radius: 0 5px 5px 0;
}
.bar1 button:before {
  font-family: FontAwesome,serif;
  font-size: 16px;
  color: #F9F0DA;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on{
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.product-not-found{
  text-align: center;
  padding: 32px;
}
.like {
  width: 1000px;

  margin: 50px auto;

  overflow: hidden;

  border: 1px solid #ccc;
}
.likeItem {
  display:inline-block; width:200px; height:200px;
}
</style>