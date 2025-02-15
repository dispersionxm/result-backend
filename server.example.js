const http = require('http')
const path = require('path')
const fs = require('fs/promises')
const {addNote} = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET') {
		const content = await fs.readFile(path.join(basePath, 'index.ejs'), 'utf-8')
		// res.setHeader('Content-Type', 'text/html')
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})

		res.end(content)
	} else if (req.method === 'POST') {
		const body = []

		res.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8'
		})

		req.on('data', data => {
			body.push(Buffer.from(data))
		})

		req.on('end', () => {
			const title = body.toString().replaceAll('+', ' ').split('=')[1]
			addNote(title)

			res.end(`Title = ${title}`)
		})
	}
})

server.listen(port, () => {
	console.log(chalk.green(`Server is running on port ${port}...`))
})