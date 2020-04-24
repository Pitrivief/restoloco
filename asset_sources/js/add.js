
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


function addContact(){
	

    var form = document.getElementById('form-contact')
    var contactError = document.getElementById('form-contact-error')

    var data = new FormData(form)
    
    var request = new XMLHttpRequest()
    
    request.onreadystatechange = function(){
    	 if (request.readyState === 4) {
    		 
    		 
    		 var json = JSON.parse(request.responseText);
    		 if(request.status == 200){
    			 contactError.style.display = 'none';
    			 photoInput.value = json.file;
    		 }else{
    			 contactError.textContent = json.error;
    			 contact.style.display = 'block';
    		 } 
    		 
    	 }
    }
    
    request.open(form.method, form.action)
    request.send(data)
}


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