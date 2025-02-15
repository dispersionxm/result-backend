document.addEventListener('click', event => {
	switch (event.target.dataset.type) {
		case 'remove': {
			const id = event.target.dataset.id

			removeNote(id).then(() => {
				event.target.closest('li').remove()
			})

			break
		}

		case 'update': {
			const id = event.target.dataset.id

			const initialTitle = event.target.closest('li').querySelector('span').textContent

			const title = event.target.closest('li').querySelector('span')

			title.contentEditable = true
			title.style.border = '1px solid #242424'
			title.style.padding = '0 5px'
			title.style.borderRadius = '5px'

			const buttons = event.target.closest('li').querySelector('.buttons')

			buttons.innerHTML = `
				<button class="btn btn-primary" data-type="save" data-id="${id}">Сохранить</button>
				<button class="btn btn-danger" data-type="cancel" data-id="${id}">Отменить</button>
			`

			buttons.addEventListener('click', event => {
				if (event.target.dataset.type === 'save') {
					const newTitle = title.textContent

					editNote(id, newTitle).then(() => {
						title.contentEditable = false
						title.style.border = 'none'
						title.style.padding = '0'
						title.style.borderRadius = '0'

						buttons.innerHTML = `
							<button class="btn btn-primary" data-type="update"  data-id="${id}">Обновить</button>
            	<button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
						`
					})
				} else if (event.target.dataset.type === 'cancel') {
					title.textContent = initialTitle

					title.contentEditable = false
					title.style.border = 'none'
					title.style.padding = '5px 0'
					title.style.borderRadius = '0'

					buttons.innerHTML = `
						<button class="btn btn-primary" data-type="update"  data-id="${id}">Обновить</button>
            <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
					`
				}
			})
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