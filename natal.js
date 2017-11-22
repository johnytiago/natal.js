const fs = require('fs')
const markdownpdf = require('markdown-pdf')
const replace  = require('stream-replace')
const dir = "./results"

const families = [
  ['Tia zelia', 'Zezito','Tio Joao' ,'Joao Tiago Filho','Bia'],
  ['Kiko','Andre','Tia Fatima','Tio Fernando'],
  ['Mariana','Tiago','Tio Horacio','Tia Luisa'],
  ['Luis Filho','Rafa','Sara','Tia Isa','Tio Luis']
];
var taken = [
[null, null, null, null, null],
[null, null, null, null],
[null, null, null, null],
[null, null, null, null, null]];
var count = [0, 0, 0, 0]

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

  families.forEach((casa, index) => {
    casa.forEach(membro => {
      do {
        casaChoice = (Math.floor(Math.random() * families.length))
      }
      while (casaChoice === index || count[casaChoice] === families[casaChoice].length);

      do {
        memberChoice = Math.floor(Math.random() * families[casaChoice].length) 
      }
      while (taken[casaChoice][memberChoice]);

      taken[casaChoice][memberChoice] = true;
      count[casaChoice]++;
      output(membro, families[casaChoice][memberChoice]);
    })
  })
})

