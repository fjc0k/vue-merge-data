const path = require('path')
const fs = require('fs')
const gzipSize = require('gzip-size')
const fileSize = require('filesize')
const { name } = require('../package.json')

const umdFile = path.resolve(__dirname, '../dist/' + name + '.min.js')
const readmeFile = path.resolve(__dirname, '../README.md')

const umdContent = fs.readFileSync(umdFile)
const readmeContent = fs.readFileSync(readmeFile)

const rawSize = fileSize(Buffer.byteLength(umdContent))
const gzippedSize = fileSize(gzipSize.sync(umdContent))

fs.writeFileSync(
  readmeFile,
  String(readmeContent)
    .replace(/[^-]+(?=-blue\.svg\?MIN)/, encodeURIComponent(rawSize))
    .replace(/[^-]+(?=-blue\.svg\?MZIP)/, encodeURIComponent(gzippedSize))
)
