const chalk = require('chalk')
const { Note} = require('./models/note-model')

async function addNote(title, author) {
	await Note.create({ title, author })
	console.log(chalk.bgBlue('Note has been successfully added!'))
}

async function getNotes() {
	const notes = await Note.find()
	return notes || []
}

async function updateNote(id, title, author) {
	const result = await Note.updateOne({ _id: id, author }, { title })
	console.log('result', result)
	console.log(chalk.bgBlue('Note has been successfully updated!'), result)

	if (result.matchedCount === 0) {
		throw new Error('Note not found')
	}
}

async function removeNote(id, author) {
	const result = await Note.deleteOne({ _id: id, author })

	if (result.matchedCount === 0) {
		throw new Error('Note not found')
	}

	console.log(chalk.redBright(`Note with id=${id} has been removed!`))
}

// print

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.blue('Here is the list of notes:'))
	notes.forEach(note => {
		console.log(chalk.bgGreen(note.id), chalk.bgBlue(note.title))
	})
}

module.exports = {
	addNote,
	getNotes,
	updateNote,
	removeNote,
	printNotes
}