import {scroll_condition, twitchApi, i18n_handler, render_handler} from './util'
import {Language} from './constants'

window.onload = () => {
  // 首次載入前20項
  appendData();

  // 渲染 title
  i18n_handler.render_title_by_lang()

  // 綁定 click 事件，addEventListener 需要帶入函式，所以先用一個匿名函示包著帶進去
  document.querySelector(".zh-tw").addEventListener("click", ()=>{return change_language_status(Language.TW)});
  document.querySelector(".en").addEventListener("click", ()=>{return change_language_status(Language.EN)});

  // 滑動時執行該函式
  window.onscroll = () => {
    // 符合到底的條件
    if (scroll_condition.onButtom()) {
      // 如果沒在載入的話，做載入的動作
      if (!twitchApi.isLoading) {
        appendData();
      }
    }
  }
}

// 改變語言，需要連帶改變 title 和 
let change_language_status = (language) => {
  i18n_handler.status = language
  i18n_handler.render_title_by_lang()
  render_handler.remove_all_child_element()

  // init_page_status
  twitchApi.currentPage = 0
  appendData()
}

// 用來結合 HttpRequest 和 插入 HTML 內容的函式
let appendData = () => {
  twitchApi.sendHttpRequest(i18n_handler.status,(err, data) => {
    const { streams } = data;
    const row = document.querySelector('.row');
    for (let stream of streams) {
      //插入element string到row的最後一個子項
      row.insertAdjacentHTML('beforeend', render_handler.getColumn(stream));
    }
    twitchApi.currentPage += 20;
    twitchApi.isLoading = false;
  });
}