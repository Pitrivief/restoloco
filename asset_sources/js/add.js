
function addPhoto(){
	

	        var form = document.getElementById('form-file-upload')
	        var photoInput = document.getElementById('photo')
	        var photoError = document.getElementById('upload-error')
	    
	        var data = new FormData(form)
	        
	        var request = new XMLHttpRequest()
	        
	        request.onreadystatechange = function(){
	        	 if (request.readyState === 4) {
	        		 
	        		 
	        		 var json = JSON.parse(request.responseText);
	        		 if(request.status == 200){
	        			 photoError.style.display = 'none';
	        			 photoInput.value = json.file;
	        		 }else{
	        			 photoError.textContent = json.error;
	        			 
	        			 photoError.style.display = 'block';
	        		 } 
	        		 
	        	 }
	        }
	        
	        request.open(form.method, form.action)
	        request.send(data)
}
window.addPhoto = addPhoto;

function addContact(){
	

    var form = document.getElementById('form-contact')
    var contactError = document.getElementById('form-contact-error')
    
    var contactSuccess = document.getElementById('form-contact-success')
    
    var emailFormField = document.getElementById('form-contact-email')
    var textFormField = document.getElementById('form-contact-text')
    var nameFormField = document.getElementById('form-contact-name')

    var error = false;
    if(form.email.value == ""){
    	emailFormField.classList.add("form-field-error");
    	error = true;
    }else{
    	emailFormField.classList.remove("form-field-error");
    }
    
    if(form.name.value == ""){
    	nameFormField.classList.add("form-field-error");
    	error = true;
    }else{
    	nameFormField.classList.remove("form-field-error");
    }
    
    if(form.text.value == ""){
    	error = true;
    	textFormField.classList.add("form-field-error");
    }else{
    	textFormField.classList.remove("form-field-error");
    }
    
    if(error){
    	contactError.style.display = 'block';
    	contactError.textContent = "Les champs sont obligatoires";
    	return;
    }else{
    	contactError.style.display = 'none';
    }
    
    var data = new FormData(form)
    
    var request = new XMLHttpRequest()
    
    request.onreadystatechange = function(){
    	 if (request.readyState === 4) {
    		 
    		 alert(form);
    		 var json = JSON.parse(request.responseText);
    		 if(request.status == 200){
    			 contactError.style.display = 'none';
    			 form.style.display = 'none';
    			 contactSuccess.textContent = 'Nous revenons rapidement vers vous';
    			 contactSuccess.style.display = 'block';
    				 
    		 }else{
    			 contactError.textContent = json.error;
    			 
    			
    		 } 
    		 
    	 }
    }
    
    request.open(form.method, form.action)
    request.send(data)
}
window.addContact = addContact;

function addLink(){
	// Get the element
	var count = document.querySelectorAll('#links input') ? document.querySelectorAll('#links input').length : 0;;
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
window.addLink = addLink;

function addCookType(){
	// Get the element
	var countCookType = document.querySelectorAll('#cookTypes input') ? document.querySelectorAll('#cookTypes input').length : 0;
	
	var elem = document.querySelector('#cookTypes');
	var selected= document.querySelector('#formCookType');
	var selectedValue=selected.options[selected.selectedIndex].value;
	
	var markup= `
		<input type="text" name="cookTypes[${countCookType}].name" readonly="" id="cookTypes${countCookType}.name" value="${selectedValue}">
	`;

	var newLinkElem = document.createElement('div');
	newLinkElem.innerHTML= markup;
	// Inject it into the DOM
	
	var child = elem.appendChild(newLinkElem.firstElementChild);

}
window.addCookType= addCookType;