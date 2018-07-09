import i18n from './i18n/index'
class Scroll {
    constructor() {
        // 頁面倒底前預先載入的距離
        this.pre_load_height = 200
    }

    // window height 為該網頁總高度
    window_height() {
        const body = document.body;
        const html = document.documentElement;
        return Math.max(
            body.offsetHeight,
            body.scrollHeight,
            html.clientHeight,
            html.offsetHeight,
            html.scrollHeight
        );
    }

    // scrollTop 為因為捲動而讓畫面跑到視窗上面的距離
    scrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
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

    sendHttpRequest(language_status, callback){
        const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd';
        const game = 'League%20of%20Legends';
        let basetUrl = 'https://api.twitch.tv/kraken/streams/';
        let urlPara = {
            'game': game,
            'client_id': client_id,
            'offset': this.currentPage,
            'language': language_status,
        }
        let targetUrl = this.url_maker(basetUrl, urlPara);
    
        let request = new XMLHttpRequest();
        this.isLoading = true;
        request.open("GET", targetUrl);
        request.onload = () => {
            callback(null, JSON.parse(request.responseText));
        };
        request.send();
    }
}
let twitchApi = new TwitchApi()


class I18n_handler{
    constructor() {
        // 初始語言
        this.status = 'zh-tw'
    }

    //依據語言更改 Title 的值
    render_title_by_lang(){
        document.querySelector('.title').innerHTML = i18n[this.status].TITLE
    }
}
let i18n_handler = new I18n_handler()


export {
    scroll_condition,
    twitchApi,
    i18n_handler
}