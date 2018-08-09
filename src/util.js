import i18n from './i18n/index'
import { Language, Twitch } from './constants'
class Scroll {
    constructor() {
        // 頁面倒底前預先載入的距離
        this.pre_load_height = 200
    }

    // window height 為該網頁總高度
    window_height() {
        const body = document.body
        const html = document.documentElement
        return Math.max(
            body.offsetHeight,
            body.scrollHeight,
            html.clientHeight,
            html.offsetHeight,
            html.scrollHeight
        )
    }

    // scrollTop 為因為捲動而讓畫面跑到視窗上面的距離
    scrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    }

    // infinite scroll 為偵測 scrollTop + window height === document height 時觸發載入
    // window.innerHeight 為使用者視窗的高度
    onButtom() {
        return this.scrollTop() + window.innerHeight >= this.window_height() - this.pre_load_height
    }
}
let scroll_condition = new Scroll


class TwitchApi {
    constructor() {
        // 當前頁數
        this.isLoading = false
        this.currentPage = 0
    }

    // 把 api url跟參數合併的函式
    url_maker(url, para) {
        let first_item = true
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

    // 把設定值組成 url
    combine_config_baseUrl_to_targetUrl(language_status){
        return this.url_maker(Twitch.basetUrl, {
            'game': Twitch.gameInfo,
            'client_id': Twitch.client_id,
            'offset': this.currentPage,
            'language': language_status,
        })
    }

    sendHttpRequest(language_status) {
        let targetUrl = this.combine_config_baseUrl_to_targetUrl(language_status)

        // promise 物件成功時用 then 取用上一個函式的回傳值，如果失敗用catch捕獲
        // 由於 JSON.parse() 採用單一參數並返回改變的值，因此我們可以將其簡化爲：JSON.parse
        // 參閱 https://developers.google.com/web/fundamentals/primers/promises
        return http_get(targetUrl)
        .then(JSON.parse)  
        .catch(error =>{ console.error("Failed!", error);})
    }

    increase_current_page(){
        this.currentPage += 20
    }
}
let twitchApi = new TwitchApi()

// todo 之後可以改寫為class
function http_get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.responseText);
          // 也可以用 req.response
          // 差別參閱：https://stackoverflow.com/questions/46751610/whats-the-difference-bertween-xhr-response-and-xhr-responsetext-in-xmlhttpreque
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
  
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      req.send();
    });
}

class I18n_handler {
    constructor() {
        // 初始語言
        this.status = Language.TW
    }

    //依據語言更改 Title 的值
    render_title_by_lang() {
        document.querySelector('.title').innerHTML = i18n[this.status].TITLE
    }
}
let i18n_handler = new I18n_handler()


class Render_handler {
    // 增加時用的直撥方匡模板
    getColumn(stream) {
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

    // 在改變語言時移除舊有語言的直撥方匡
    remove_all_child_element() {
        let node = document.querySelector(".row")
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
    }
}
let render_handler = new Render_handler()


export {
    scroll_condition,
    twitchApi,
    i18n_handler,
    render_handler
}