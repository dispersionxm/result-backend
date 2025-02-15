const yargs = require('yargs')
const pkg = require('./package.json')
const { addNote, printNotes, updateNote, removeNotes} = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
	command: 'add',
	describe: 'Add a new note to the list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true
		}
	},
	handler({ title }) {
		addNote(title)
	}
})

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		const notes = await printNotes()
		console.log(notes)
	}
})

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id',
			demandOption: true
		}
	},
	handler({ id }) {
		removeNotes(id)
	}
})

yargs.command({
	command: 'edit',
	describe: 'Edit note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id',
			demandOption: true
		},

		title: {
			type: 'string',
			describe: `Note's new title`,
			demandOption: true
		}
	},
	handler({ id, title }) {
		updateNote(id, title)
	}
})

yargs.parse()