const fs = require('fs');

var objToStr = () => {
    var person = {
        firstName : 'Victor',
        lastName : 'Zapata',
        age : 31
    };
    var personStr = JSON.stringify(person);
    console.log(typeof personStr);
    console.log(personStr);
}

var strToObj = () => {
    var personStr = '{"firstName":"Victor","lastName":"Zapata","age":31}';
    var person = JSON.parse(personStr);
    console.log(typeof person);
    console.log(person);
}

var readAndWriteFile = () => {
    var note = {
        title : 'A title',
        body : 'A body' 
    };
    fs.writeFileSync('notes.json', JSON.stringify(note));
    const noteString = fs.readFileSync('notes.json');
    console.log('Note:', JSON.parse(noteString).title);
}


objToStr();
console.log('----------------');
strToObj();
console.log('----------------');
readAndWriteFile();