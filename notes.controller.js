const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

// get

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })

	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

// add

async function addNote(title) {
	// const notes = require('./db.json')
	// const notes = Buffer.from(buffer).toString('utf-8')

	const notes = await getNotes()

	const note = {
		title,
		id: Date.now().toString()
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))

	console.log(chalk.bgGreen('Note has been successfully added!'))
}

// remove

async function removeNotes(id) {
	const notes = await getNotes()

	const filteredNotes = notes.filter(note => note.id !== id)

	await fs.writeFile(notesPath, JSON.stringify(filteredNotes))

	console.log(chalk.bgRed('Note has been successfully removed!'))

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
	removeNotes,
	printNotes
}