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
			const $card = event.target.closest('li')
			const $initialCardHTML = event.target.closest('li').innerHTML
			const $title = event.target.closest('li').querySelector('span')

			$title.contentEditable = true
			$title.style.border = '1px solid #242424'
			$title.style.padding = '0 5px'
			$title.style.borderRadius = '5px'

			const $buttons = event.target.closest('li').querySelector('.buttons')

			$buttons.innerHTML = `
				<button class="btn btn-success" data-type="save" data-id="${id}">Сохранить</button>
				<button class="btn btn-danger" data-type="cancel" data-id="${id}">Отменить</button>
			`

			$buttons.addEventListener('click', event => {
				if (event.target.dataset.type === 'save') {
					const newTitle = $title.innerText

					editNote(id, newTitle).then(() => {
						$card.innerHTML = $initialCardHTML
						$card.querySelector('span').innerText = newTitle
					})
				} else if (event.target.dataset.type === 'cancel') {
					$card.innerHTML = $initialCardHTML
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