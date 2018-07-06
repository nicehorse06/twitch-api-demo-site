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


export {
    scroll_condition
}