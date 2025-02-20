require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const { addNote, getNotes, updateNote, removeNote } = require('./notes.controller')
const { addUser, loginUser} = require('./users.controller')
const { auth } = require('./middlewares/auth')

const port = process.env.PORT || 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', './pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/register', async (req, res) => {
	res.render('register', {
		title: 'Registration',
		error: undefined
	})
})

app.post('/register', async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password)

		res.redirect('/')
	} catch (e) {

		if (e.code === 11000) {
			res.render('register', {
				title: 'Express App',
				error: 'User with this email already exists'
			})

			return
		}

		res.render('register', {
			title: 'Express App',
			error: e.message
		})
	}
})

app.get('/login', async (req, res) => {
	res.render('login', {
		title: 'Login',
		error: undefined
	})
})

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password)
		res.cookie('token', token, { httpOnly: true })

		res.redirect('/')
	} catch (e) {
		res.render('login', {
			title: 'Login',
			error: e.message
		})
	}
})

app.use('/', auth)
app.use('/:id', auth)

app.get('/logout', async (req, res) => {
	res.clearCookie('token', { httpOnly: true })
	res.redirect('/login')
})

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title, req.user.email)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: true,
			error: false
		})
	} catch (e) {
		console.log(chalk.bgRed('Creation error: '), e)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: true
		})
	}
})

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Registration',
		notes: await getNotes(),
		userEmail: req.user.email,
		created: false,
		error: false
	})
})

app.put('/:id', async (req, res) => {
	try {
		await updateNote(req.params.id, req.body.title, req.user.email)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false
		})
	} catch (e) {
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: e.message
		})
	}
})

app.delete('/:id', async (req, res) => {
	try	{
		await removeNote(req.params.id, req.user.email)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: false
		})
	} catch (e) {
		await removeNote(req.params.id)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			created: false,
			error: e.message
		})
	}
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server is running on port ${port}...`))
		})
	})