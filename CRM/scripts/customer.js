document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById("addCustomer").addEventListener("click", createCustomer);
  })
let TableFilter = (function(Arr) {
		let input;
		function _onInputEvent(e) {
		input = e.target;
		let tables = document.getElementsByClassName(input.getAttribute('data-table'));
		Arr.forEach.call(tables, function(table) {
		Arr.forEach.call(table.tBodies, function(tbody) {
		Arr.forEach.call(tbody.rows, _filter);
		});
		});
		}
 
		function _filter(row) {
		let text = row.textContent.toLowerCase(), val = input.value.toLowerCase();
		row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}
 
		return {
		init: function() {
		let inputs = document.getElementsByClassName('light-table-filter');
		Arr.forEach.call(inputs, function(input) {
		input.oninput = _onInputEvent;
		});
		}
		};
	})(Array.prototype);
 
	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
		TableFilter.init();
		}
	});


function createCustomer(){
//knappen plus är kopplad till den här functionen
}