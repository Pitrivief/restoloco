
var count = 0;
function addLink(){
	// Get the element
	count++;
	var elem = document.querySelector('#links').firstElementChild
	
	var markup= `
	<div class="form-group row">
		<div class="col-sm-10">
			
			<select id="externalLinks${count}.type" name="externalLinks[${count}].type">
				<option value="Deliveroo" selected="selected">Deliveroo</option>
				<option value="Uber Eat">Uber Eat</option>
				<option value="Just-Eat">Just-Eat</option>
			</select>
		</div>

		<label for="fullName" class="col-sm-2 col-form-label">Url </label>
		<div class="col-sm-10">
			<input type="text" name="externalLinks[${count}].url" id="externalLinks${count}.url" value="">
		</div>
	`;

	var newLinkElem = document.createElement('div');
	newLinkElem.innerHTML= markup;
	// Inject it into the DOM
	elem.before(newLinkElem);

}