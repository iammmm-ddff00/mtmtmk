module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "production",
  
    // メインのJS
    entry: "./src/assets/js/index.js",
    // 出力ファイル
    output: {
      filename: "bundle.js"
    }
  }