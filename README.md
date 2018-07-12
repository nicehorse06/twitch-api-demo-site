reference URL: [從新手到中手：前端工程加強班](https://github.com/aszx87410/frontend-intermediate-course)

[此專案的 Github page URL](https://nicehorse06.github.io/practice-frontend-intermediate-course/dist/index.html)

bundle的位置為dist/mian.js

webpack config 可以轉換ES6語法、把JS壓縮、混淆、自動生成index.html在dist中，把CSS壓縮到bundle

run webpack dev server，在記憶體中產生bundle檔案
```
npm run dev
```

產生 bundle(main.js)和index.html在 /dist 中
```
npm run build
```

/dist要讓github page讀取，未加入 gitignore

參考資料：
[style-loader  css-loader 引入CSS](https://5xruby.tw/ja/posts/webpack-05)