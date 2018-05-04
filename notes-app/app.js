const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const ADD_COMMAND = 'add';
const LIST_COMMAND = 'list';
const REMOVE_COMMAND = 'remove';
const READ_COMMAND = 'read'; 

const TITLE_COMMAND_OPTIONS = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const BODY_COMMAND_OPTIONS = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
                .command(ADD_COMMAND, 'Add a new note.', {
                    title: TITLE_COMMAND_OPTIONS,
                    body: BODY_COMMAND_OPTIONS
                })
                .command(LIST_COMMAND, 'List all notes.')
                .command(REMOVE_COMMAND, 'Remove one note.', {
                    title: TITLE_COMMAND_OPTIONS
                })
                .command(READ_COMMAND, 'Read one note.', {
                    title: TITLE_COMMAND_OPTIONS
                })
                .help().argv;

const command = process.argv[2];

if(ADD_COMMAND === command) {
    addNoteCommand();
} else if(LIST_COMMAND === command) {
    listNotesCommand(); 
} else if(REMOVE_COMMAND === command) {
    removeNoteCommand();
} else if(READ_COMMAND === command) {
    readNoteCommand();
} else {
    console.log('Command not recognized...');
}

function addNoteCommand() {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log('Added note');
        notes.logNote(note);
    } else {
        console.log('The note\'s title already exists.');
    }
}

function removeNoteCommand() {
    var removed = notes.removeNote(argv.title);
    var message = removed ? 'The note was removed...' : 'Note not found...';
    console.log(message);
}

function readNoteCommand() {
    var note = notes.getNote(argv.title);
    if(note) {
        console.log('Found note');
        notes.logNote(note);
    } else {
        console.log('Note not found.')
    }
}

function listNotesCommand() {
    var allNotes = notes.listAll();
    console.log(`Showing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
}