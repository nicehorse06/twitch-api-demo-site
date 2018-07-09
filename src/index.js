import {scroll_condition, twitchApi, i18n_handler} from './util'

window.onload = () => {
  // 首次載入前20項
  appendData();

  // 渲染 title
  i18n_handler.render_title_by_lang()

  // 綁定 click 事件，addEventListener 需要帶入函式，所以先用一個匿名函示包著帶進去
  document.querySelector(".zh-tw").addEventListener("click", ()=>{return change_language_status('zh-tw')});
  document.querySelector(".en").addEventListener("click", ()=>{return change_language_status('en')});

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


// 在改變語言時間移除舊有語言的 element
let remove_all_child_element = () => {
  let node = document.querySelector(".row");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// 改變語言，需要連帶改變 title 和 
let change_language_status = (language) => {
  i18n_handler.status = language
  i18n_handler.render_title_by_lang()
  remove_all_child_element()

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
      row.insertAdjacentHTML('beforeend', getColumn(stream));
    }
    twitchApi.currentPage += 20;
    twitchApi.isLoading = false;
  });
}

// 準備用來增加HTML的載入動作
let getColumn = (stream) => {
  return `
    <div class='col'>
      <div class='preview'>
        <div class='placeholder'></div>
        <img src='${stream.preview.medium}' onload='this.style.opacity=1'/>
      </div>
      <div class='bottom'>
        <div class="avatar">
          <img class='avatar_img' src='${stream.channel.logo}' />
        </div>
        <div class='intro'>
          <div class='channel_name'>${stream.channel.display_name}</div>
          <div class='owner_name'>${stream.channel.name}</div>
        </div>
      </div>
    </div>  
    `
}