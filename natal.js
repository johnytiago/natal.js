const fs = require('fs')
const markdownpdf = require('markdown-pdf')
const replace  = require('stream-replace')
const dir = "./results"

const family = [
  ['Tia zelia', 'Zezito','Tio Joao' ,'Joao Tiago Filho','Bia'],
  ['Kiko','Andre','Tia Fatima','Tio Fernando'],
  ['Mariana','Tiago','Tio Horacio','Tia Luisa'],
  ['Luis','Rafa','Tia Isa','Tio Luis'],
  ['Sara']
];
var taken = [
[null, null, null, null, null],
[null, null, null, null],
[null, null, null, null],
[null, null, null, null],
[null]];
var count = [0, 0, 0, 0, 0]

function output(from, to) {
  fs.createReadStream("./template.md")
  .pipe(replace(/FROM/g, from))
  .pipe(replace(/TO/g, to))
  .pipe(markdownpdf())
  .pipe(fs.createWriteStream(`${dir}/${from}.pdf`))
  .on('close', () => {
    console.log(`Found match for ${from}`);
  })
}

fs.mkdir( dir, (err) => {
  if(err)
    console.log("Folder already created")

  family.forEach((casa, index) => {
    casa.forEach(membro => {
      do {
        casaChoice = (Math.floor(Math.random() * 5))
      }
      while (casaChoice === index || count[casaChoice] === family[casaChoice].length);

      do {
        memberChoice = Math.floor(Math.random() * family[casaChoice].length) 
      }
      while (taken[casaChoice][memberChoice]);

      taken[casaChoice][memberChoice] = true
      count[casaChoice]++
        output(membro, family[casaChoice][memberChoice])
    })
  })
})
