module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        query: {
            presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    alias: { 
    }
  },
  plugins: [
  ]
}