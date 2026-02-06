$(document).ready(function () {
	const table = $('#studentsTable').DataTable({
		ajax: {
			url: 'students.json',
			dataSrc: '',
		},
		columns: [
			{ data: 'id' },
			{ data: 'imie' },
			{ data: 'nazwisko' },
			{ data: 'wiek' },
			{ data: 'email' },
			{ data: 'kierunek' },
			{
				data: null,
				orderable: false,
				render: function () {
					return `
                        <button class="edit">Edytuj</button>
                        <button class="delete">Usuń</button>
                    `
				},
			},
		],
		pageLength: 10,
		lengthMenu: [10, 25, 50],
		dom: 'Bfltip',
		buttons: [
			{ extend: 'csvHtml5', text: 'Eksport CSV' },
			{ extend: 'pdfHtml5', text: 'Eksport PDF' },
		],
		language: {
			search: 'Szukaj:',
			lengthMenu: 'Pokaż _MENU_ rekordów',
			info: 'Wyświetlono _START_ - _END_ z _TOTAL_',
			paginate: {
				next: 'Następna',
				previous: 'Poprzednia',
			},
		},
	})

	// USUWANIE
	$('#studentsTable tbody').on('click', '.delete', function () {
		table.row($(this).parents('tr')).remove().draw()
	})

	// EDYCJA (wiek)
	$('#studentsTable tbody').on('click', '.edit', function () {
		const row = table.row($(this).parents('tr'))
		const data = row.data()

		const newAge = prompt('Podaj nowy wiek:', data.wiek)
		if (newAge !== null && !isNaN(newAge)) {
			data.wiek = newAge
			row.data(data).draw()
		}
	})
})
