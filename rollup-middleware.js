
module.exports = function rollupMiddleware (directory) {
  return function (req, res, next) {
    if (/\.js$/.test(req.url)) {
      var file = (directory || '.') + req.url.replace(/\.js$/, '.es')
      require('fs').stat(file, function (err) {
        if (err) {
          next()
          return
        }
        require('rollup').rollup({
          entry: file
        }).then(function (bundle) {
          var result = bundle.generate({
            sourceMap: true,
            sourceMapFile: file
          })
          res.type('js')
            .send(result.code + '\n//# sourceMappingURL=' + result.map.toUrl())
        }).catch(function (error) {
          console.error('[rollup-middleware]', error.message, '\n' + error.file + '(' + error.loc.line + ')')
          res.type('js')
            .end()
        })
      })
    } else {
      next()
    }
  }
}
