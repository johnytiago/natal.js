var markdownpdf = require("markdown-pdf")
const fs = require('fs')
const replace  = require('stream-replace')

fs.createReadStream("./src/template.md")
  .pipe(replace(/FROM/g, "Zezinho"))
  .pipe(replace(/TO/g, "Tio Langão"))
  .pipe(markdownpdf({remarkable: {html: true}}))
  .pipe(fs.createWriteStream(`exemplo.pdf`))
