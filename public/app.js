document.addEventListener('click', event => {
	switch (event.target.dataset.type) {
		case 'remove': {
			const id = event.target.dataset.id

			removeNote(id).then(() => {
				event.target.closest('li').remove()
			})

			break
		}

		case 'edit': {
			const id = event.target.dataset.id

			const title = event.target.closest('li').querySelector('span').textContent

			const newTitle = prompt('Enter new title: ', title).trim()

			if (newTitle) {
				editNote(id, newTitle).then(() => {
					event.target.closest('li').querySelector('span').textContent = newTitle
				})
			}

			break
		}
	}
})

async function removeNote(id) {
	await fetch(`/${id}`, {
		method: 'DELETE'
	})
}

async function editNote(id, title) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({ id, title })
	})
}