const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')

console.log(path.parse(__filename))

const getContent = () => `${process.argv[2] ?? ''}\n`

async function createFolder() {

	try {
		if (fsSync.existsSync(base)) {

			await fs.appendFile(
				path.join(base, 'logs.txt'),
				getContent(),
			)

			const data = await fs.readFile(path.join(base, 'logs.txt'), { encoding: 'utf-8' })

			console.log('data', data)

		} else {

			await fs.mkdir(base)
			console.log('folder created')

			fs.writeFile(
				path.join(base, 'logs.txt'),
				process.argv[2] ?? '',
				'utf-8'
			)

		}
	} catch (err) {
		console.log('err', err)
	}
}

createFolder()