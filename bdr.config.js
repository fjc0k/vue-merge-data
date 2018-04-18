module.exports = {
  entry: {
    'vue-merge-data': [
      'src/index.js',
      'VueMergeData'
    ]
  },
  getUmdMinSize(rawSize, gzippedSize) {
    const path = require('path')
    const fs = require('fs')

    const readmeFile = path.resolve(__dirname, 'README.md')
    const readmeContent = fs.readFileSync(readmeFile)

    fs.writeFileSync(
      readmeFile,
      String(readmeContent)
        .replace(/[^-]+(?=-blue\.svg\?MIN)/, encodeURIComponent(rawSize))
        .replace(/[^-]+(?=-blue\.svg\?MZIP)/, encodeURIComponent(gzippedSize))
    )
  }
}
