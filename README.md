# twitch API的應用實做專案

## todo
* 須更新 [Twitch API](https://dev.twitch.tv/docs/api) 版本

## [Github page url](https://nicehorse06.github.io/twitch-api-demo-site/dist/index.html)

* bundle的位置為dist/mian.js

* webpack config 可以轉換ES6語法、把JS壓縮、混淆、自動生成index.html在dist中，把CSS壓縮到bundle

* run webpack dev server，在記憶體中產生bundle檔案
```
npm run dev
```

* 產生 bundle(main.js)和index.html在 /dist 中
```
npm run build
```

* /dist要讓github page讀取，未加入 gitignore

## 參考資料：
* [style-loader  css-loader 引入CSS](https://5xruby.tw/ja/posts/webpack-05)
* [從新手到中手：前端工程加強班](https://github.com/aszx87410/frontend-intermediate-course)