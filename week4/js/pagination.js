// 有參考範例程式碼，註解在最下方。

// 製作分頁元件
Vue.component('pagination', { //元件名稱
  template:`<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li 
      class="page-item"
      :class="{'disabled': pages.current_page === 1}"
      >
      <a
       class="page-link" 
       href="#" 
       aria-label="Previous"
       @click.prevent="emitPages(pages_current - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-for="(item, index) in pages.total_pages"
      :key="index"
      class="page-item"
      :class="{'active': item === pages.current_page}"
    >
      <a 
        class="page-link"
        href="#"
        @click.prevent="emitPages(item)"
      >{{ item }}</a>
    </li>
    <li
      class="page-item"
      :class="{'disabled': pages.current_page === pages.total_pages}"
      >
      <a
        class="page-link"
        href="#"
        aria-label="Next"
        
        @click.prevent="emitPages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  data() {
    return {      
    };
  },
  props: {
    pages: {},
  },
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
});
  // 去 BS4 網站複製想要的分頁程式碼
  /* 
  8 
  在往前一頁的按鈕上，用 v-bind 類別的方式，當頁數為1的時候呈現 disabled。
  筆記：:class="{ '要加入的類別名稱': 判斷式}"
  14
  取消 a 連結預設行為。點擊時觸發 emitPages 事件，參數為當前頁面 -1。
  由子層操控父層資料，emitPages事件 對應到 products.html 中的 pagination 元件的屬性 @emit-pages，便會呼叫 getProducts 的方法顯示上一頁的頁面資料。
  20~23
  迴圈用 props 取得外部資料跑總頁數，如果取到的 item 和當前頁面數字相同時，按鈕的 class 就綁上 active 的樣式。
  25~29
  a 連結取消預設行為，把你當下點擊的頁碼數字作為參數發到父層呼叫 getProducts ，便能前往指定頁數。
  31~34
  當前頁面數字和總頁面數相同時，用 v-bind 類別的方式讓下一頁的按鈕呈現 disabled。
  35~43
  和前往上一頁的做法一樣，觸發 emitPages 事件，參數為當前頁面 +1，就會顯示下一頁的資料。

  */