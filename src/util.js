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
    constructor(language_status ,callback) {
        // 當前頁數
        this.isLoading = false
        this.currentPage = 0
        this.language_status = language_status
        this.callback = callback
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

    sendHttpRequest(callback){
        const client_id = '80stfocyvne9dzzxyvz4j4x9yl75bd';
        const game = 'League%20of%20Legends';
        let basetUrl = 'https://api.twitch.tv/kraken/streams/';
        let urlPara = {
            'game': game,
            'client_id': client_id,
            'offset': this.currentPage,
            'language': this.language_status,
        }
        let targetUrl = this.url_maker(basetUrl, urlPara);
    
        let request = new XMLHttpRequest();
        this.isLoading = true;
        request.open("GET", targetUrl);
        request.onload = () => {
            this.callback(null, JSON.parse(request.responseText));
        };
        request.send();
    }
}


export {
    scroll_condition,
    TwitchApi
}