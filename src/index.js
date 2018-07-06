import i18n from './i18n/index'
import {scroll_condition} from './util'

//當前頁數
let currentPage = 0;
//確保每次ajax玩才會再發一次
let isLoading = false;

// 初始語言
let language_status = 'zh-tw';

window.onload = () => {
  // 首次載入前20項
  appendData();

  // 渲染 title
  render_title_by_lang()

  // 綁定 click 事件，addEventListener 需要帶入函式，所以先用一個匿名函示包著帶進去
  document.querySelector(".zh-tw").addEventListener("click", ()=>{return change_language_status('zh-tw')});
  document.querySelector(".en").addEventListener("click", ()=>{return change_language_status('en')});

  // 滑動時執行該函式
  window.onscroll = () => {
    // 符合到底的條件
    if (scroll_condition.onButtom()) {
      // 如果沒在載入的話，做載入的動作
      if (!isLoading) {
        appendData();
      }
    }
  }
}

// 依據語言更改 Title 的值
let render_title_by_lang = () => {
  document.querySelector('.title').innerHTML = i18n[language_status].TITLE
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
  language_status = language
  render_title_by_lang()
  remove_all_child_element()

  // init_page_status
  currentPage = 0
  appendData()
}

// 用來結合 HttpRequest 和 插入 HTML 內容的函式
let appendData = () => {
  sendHttpRequest((err, data) => {
    const { streams } = data;
    const row = document.querySelector('.row');
    for (let stream of streams) {
      //插入element string到row的最後一個子項
      row.insertAdjacentHTML('beforeend', getColumn(stream));
    }
    currentPage += 20;
    isLoading = false;
  });
}

// 發出 ajax
let sendHttpRequest = (callback) => {
  const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd';
  const game = 'League%20of%20Legends';
  let basetUrl = 'https://api.twitch.tv/kraken/streams/';
  let urlPara = {
    'game': game,
    'client_id': client_id,
    'offset': currentPage,
    'language': language_status,
  }
  let targetUrl = url_maker(basetUrl, urlPara);

  let request = new XMLHttpRequest();
  isLoading = true;
  request.open("GET", targetUrl);
  request.onload = () => {
    callback(null, JSON.parse(request.responseText));
  };
  request.send();
};

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

// 把 api url跟參數合併的函式
let url_maker = (url, para) => {
  let first_item = true;
  for (let key of Object.keys(para)) {
    let prefix = '&'
    if (first_item) {
      prefix = '?'
      first_item = false
    }
    url += `${prefix}${key}=${para[key]}`
  }
  return url
}