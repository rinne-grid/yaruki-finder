module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
