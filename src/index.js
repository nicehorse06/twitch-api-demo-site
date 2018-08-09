import { scroll_condition, twitchApi, i18n_handler, render_handler } from './util'
import { Language } from './constants'
import '../style/main.css'

window.onload = () => {
  let page_status_handler = new Page_status_handler()

  page_status_handler.init()

  // 滑動時執行該函式
  window.onscroll = () => {
    // 符合到底的條件
    if (scroll_condition.onButtom()) {
      // 如果沒在載入的話，做載入的動作
      if (!twitchApi.isLoading) {
        page_status_handler.appendData()
      }
    }
  }
}

class Page_status_handler {
  // 初始化
  init() {
    // 首次載入前20項
    this.appendData()

    // 渲染 title
    i18n_handler.render_title_by_lang()

    // 綁定 click事件
    // toFix 如果改變語言時會重複綁定，可偵測是否綁定過
    this.add_click_event_on_language_button()
  }

  /* 
    綁定click事件，addEventListener需要帶入函式，所以用一個匿名函示包著帶進去
    綁定的button其class名稱必須等於Langusge的key
  */
  add_click_event_on_language_button(){
    for(let key of Object.keys(Language)){
      document.querySelector(`.${Language[key]}`).addEventListener("click", () => { return this.change_language(Language[key]) })
    }
  }

  // 改變語言，需要連帶改變 title 和 
  change_language(language) {

    i18n_handler.status = language
    render_handler.remove_all_child_element()
    twitchApi.currentPage = 0

    this.init()
  }

  // 增加直撥匡，用來結合 HttpRequest 和 插入 HTML 內容的函式
  appendData() {
    twitchApi.increase_current_page()
    twitchApi.sendHttpRequest(i18n_handler.status)
    .then((data) =>{
      const { streams } = data
      const row = document.querySelector('.row')
      for (let stream of streams) {
        //插入element string到row的最後一個子項
        row.insertAdjacentHTML('beforeend', render_handler.getColumn(stream))
      }
      twitchApi.isLoading = false     
    })
    .catch(error =>{ console.error("Failed!", error);})
  }
}