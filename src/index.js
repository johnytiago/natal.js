const fs = require('fs')
const markdownpdf = require('markdown-pdf')
const replace  = require('stream-replace')
const OUTPUT_DIR = "./results"

const families = require('./family')
// Creates array clone full of nulls
const taken = new Array(families.length)
  .fill(null)
  .map(( _, i) => new Array(families[i].length).fill(null))
const count = new Array(families.length).fill(0)

function output(from, to) {
  fs.createReadStream("./src/template.md")
  .pipe(replace(/FROM/g, from))
  .pipe(replace(/TO/g, to))
  .pipe(markdownpdf({remarkable: {html: true}}))
  .pipe(fs.createWriteStream(`${OUTPUT_DIR}/${from}.pdf`))
  .on('close', () => {
    console.log(`Found match for ${from}`);
  })
}

fs.mkdir( OUTPUT_DIR, (err) => {
  if(err)
    console.log("Folder already created")

  families.forEach((casa, index) => {
    casa.forEach(member => {
      // First: find a house with free member
      do {
        houseDrawn = (Math.floor(Math.random() * families.length))
      }
      while (houseDrawn === index || count[houseDrawn] === families[houseDrawn].length); 
      // continue to draw while own house, or all taken

      // Second: find a member that is free
      do {
        memberChoice = Math.floor(Math.random() * families[houseDrawn].length) 
      }
      while (taken[houseDrawn][memberChoice]);

      taken[houseDrawn][memberChoice] = true;
      count[houseDrawn]++;
      output(member, families[houseDrawn][memberChoice]);
    })
  })
})

