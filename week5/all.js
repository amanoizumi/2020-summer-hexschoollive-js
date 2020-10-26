// 有參考範例程式碼
import zh_TW from './zh_TW.js';

// Loading 效果元件，設定標籤名稱為 loading
Vue.component('loading' , VueLoading);
// 掛載 Vue-Loading 套件
Vue.use(VueLoading);

// input 驗證
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 完整表單驗證
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// VeeValidate 的 className 設定
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

new Vue ({
  el: '#app',
  data:{
    products: [],
    tempProduct: {
      num: 0,
    },
    status: {
      loadingItem: '',
    }, 
    // 表單欄位資料
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    cart: {},
    cartTotal:0,
    isLoading: false, // Loading 效果預設關閉
    // 個人 uuid
    UUID: '28ddc881-34aa-4322-95a0-a5ecbf863ad8',
    APIPATH: 'https://course-ec-api.hexschool.io',
    
  },
  created() { //先取得產品列表與購物車列表
    this.getProducts();
    this.getCart();
  },
  methods:{
    // 取得產品資料
    getProducts(page = 1) {
      // 打開 loading 效果
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/products?page=${page}}`;
      axios.get(url).then((response) => {
        // console.log(response);
        this.products = response.data.data;
        this.isLoading = false;
      });
    },
    // 取得點擊到的商品細節所以參數帶id
    getDetailed(id) {
      // 用來判定當下讀取的物品 id 產生 loading 效果
      this.status.loadingItem = id;
      // 以點擊到的 id 去拿商品資料
      const url = `${this.APIPATH}/api/${this.UUID}/ec/product/${id}`;
      console.log(url);
      axios.get(url).then((response) => {
        // 把讀取到的資料放進 tempProduct 物件暫存
        this.tempProduct = response.data.data;
        console.log(this.tempProduct);

        // 助教解說：
        // 由於放進 tempProduct 的資料 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set 再綁上去
        this.$set(this.tempProduct, 'num', 0);
        $('#productModal').modal('show');
        // 顯示視窗後清掉 loading 效果
        this.status.loadingItem = '';
      });
    },
    addToCart(item, quantity = 1) { // 數量預設值為 1
      this.status.loadingItem = item.id;

      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      const cart = { // 把指定商品 id 以及選的數量加到購物車中
        product: item.id,
        quantity,
      };

      axios.post(url, cart).then(() => {
        // 取得資料成功後關閉 loading 效果並且隱藏視窗
        this.status.loadingItem = '';
        $('#productModal').modal('hide');
        // 刷新購物車
        this.getCart();
      }).catch((error) => {
        // 若失敗則關閉 loading 顯示錯誤在 console 並且關閉視窗
        this.status.loadingItem = '';
        console.log(error.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
    getCart() {
      // 打開 loading 效果
      this.isLoading = true; 
      // 取得購物車列表
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      axios.get(url).then((response) => {
        this.cart = response.data.data;
        // 累加總金額，先歸零後重新計算
        this.cartTotal = 0;
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity);
        });
        this.isLoading = false;
      });
    },
    quantityUpdata(id, num) {// 購物車的增減商品   
      // 避免數量低於 0 個
      if(num <= 0) return;

      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      // 設定一個物件放入指定商品與當前此商品數量
      const data = {
        product: id,
        quantity: num,
      };
      // 編輯購物車的資料成功後關掉 loading 並刷新購物車內容
      axios.patch(url, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeAllCartItem() { // 刪除購物車所有商品
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/all/product`;

      axios.delete(url) // 以 axios.delete 的方法直接清空購物車後，關掉 loading 並刷新購物車
        .then(() => {
          this.isLoading = false; 
          this.getCart();    
        });
    },
    removeCartItem(id) { // 刪除購物車內特定商品所以帶入 id
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    createOrder() { // 新增訂單
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/orders`;

      axios.post(url, this.form).then((response) => {
        if (response.data.data.id) {//如果成功新增 (該 id 存在的話就執行以下內容)
          this.isLoading = false;
          // 跳出完成訂單的訊息
          $('#orderModal').modal('show');

          // 重新渲染購物車
          this.getCart();
        }
      }).catch((error) => { // 失敗 關閉 loading效果，console 顯示錯誤訊息
        this.isLoading = false;
        console.log(error.response.data.errors);
      });
    },
  },
});