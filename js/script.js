$(document).ready(function () {
	var _KEY = 'todo_data';
	var default_data = {
		lists: []
	};
	var data = JSON.parse(localStorage.getItem(_KEY)) || default_data; // iei datele din store

	function save (dt) {
		// daca modifici le salvezi
		localStorage.setItem(_KEY, JSON.stringify(dt));
	}

	function addList (key, item) {
			//prelucrezi
			
			var li = $('<li></li>');
			var input = $('<input type="text" placeholder="TooDoo" class="item-name" />');

			input.attr('value', item);
			input.attr('readonly', ''); // sa nu poti edita

			li.append(input);

			var buttons = $('<div></div>');

			var actions = [
				{	

					text: 'Edit',

					click: function (event) {
						$(this).addClass('edit');
						event.preventDefault();

						if ($(this).attr('save') !== 'true') {
							$(this).text('Save');
							input.removeAttr('readonly');
							input.focus();

							input.on('blur', function () {
								var newList = [];

								$.each(data.lists, function (index, dd) {
									if (index == key) {
										dd = input.val();
									}

									newList.push(dd);
								});

								data.lists = newList;

								save(data);
							});

							$(this).attr('save', 'true');
						} else {
							$(this).text('Edit');
							input.attr('readonly', '');
							$(this).attr('save', 'false');
						}

						return false;
					}, 
				},
				{
					text: 'Delete',

					click: function (event) {
						//$(this).addClass('delete');
						event.preventDefault();
						li.slideUp(300, function () {
							li.remove();
							var newList = [];

							$.each(data.lists, function (index, dd) {
								if (index != key) {
									newList.push(dd);
								}
							});

							data.lists = newList;

							save(data);
						});
						return false;
					}
				}
			];

			$.each(actions, function (key, action) {

				var button = $('<button></button>');

				button.addClass('delete');
				button.text(action.text);
				button.on('click', action.click);

				buttons.append(button);
			});

			li.append(buttons)
			// le prelucrezi virtual ^^^


			//le afisezi in pagina
			$('#things-list').append(li);
		}

	if (data) {
		//parcurgi lista, e un fel de for asta 
		$.each(data.lists, addList);
	}

	$('#addButton').on('click', function (e) {
		e.preventDefault();

		var name = $('.list-name').val();
		
		data.lists.push(name);

		addList(data.lists.length - 1, name);
		save(data);

		$('.list-name').val('');
		$('.list-name').blur();

		return false;
	});

	if(action.text == 'Delete') {
		$(this).addClass('delete');
	} 

	if(action.text == 'Edit') {
		$(this).addClass('edit');
	} 
});