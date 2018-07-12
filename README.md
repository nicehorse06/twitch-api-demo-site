reference URL: [從新手到中手：前端工程加強班](https://github.com/aszx87410/frontend-intermediate-course)

[Github page url](https://nicehorse06.github.io/practice-frontend-intermediate-course/dist/index.html)

webpack config 可以轉換ES6語法、把JS壓縮、混淆、自動生成index.html在dist中

run webpack dev server，在記憶體中產生bundle檔案
```
npm run dev
```

產生 bundle(main.js)和index.html在 /dist 中
```
npm run build
```

/dist要讓github page讀取，未加入 gitignore