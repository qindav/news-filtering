function filterArticle(info){
	acceptedelements = info[0]
	rejectedelements = info[1]
	
	//delete stray elements
	for(i = 0; i < rejectedelements.length; i++){
		var element = document.querySelector(rejectedelements[i]);
		element.parentElement.removeChild(element);
	}
	
	//clear out document body except for desired content
	perserve = []
	for(i = 0; i < acceptedelements.length; i++){
		if(acceptedelements[i] != ''){
			var item = document.querySelector(acceptedelements[i]);
			perserve.push(item);
		}
	}
	
	//Clean body
	document.body.innerHTML = '';
	for (i = 0; i < perserve.length; i++){
		document.body.appendChild(perserve[i]);
	}
	
	return true;
}

function displayBanner(normal_copy, filtered_copy){
	//Restore Button
	//Restores the main page before plugin work happens
	restoreButton = document.createElement('button');
	restoreButton.textContent = 'Restore Main Page';
	restoreButton.addEventListener("click", function() {
		document.body.innerHTML = normal_copy;
	});
	restoreButton.classList.add('news_filter_button')
	
	//Print Button
	//Prints the page out if needed
	printButton = document.createElement('button')
	printButton.textContent = 'Print Page';
	printButton.addEventListener("click", function() {
		window.print();
		return true;
	}); 
	printButton.classList.add('news_filter_button')
	
	//(Dumb) Close button
	closeButton = document.createElement('span');
	closeButton.id = 'close';
	closeButton.textContent = 'X';
	closeButton.onclick = function(){
        document.body.removeChild(controls);
        return true;
    };
	
	//New Header Object
	//Holds buttons and conents
	controls = document.createElement('div');
	controls.id  = 'news_filter_header';
	controls.appendChild(document.createTextNode('News Filter Plugin Activated'));
	controls.appendChild(restoreButton);
	controls.appendChild(printButton);
	controls.appendChild(closeButton);
	
	
	document.body.insertBefore(controls, document.body.firstChild);
	
	return true;
}


function performFilter(){
	//check to see if we filtered this website domain
	chrome.storage.sync.get(null, function(items) {
		var allKeys = Object.keys(items);
		for (i = 0; i < allKeys.length; i++){
			if(document.URL.includes(allKeys[i])){
				var foundkey = allKeys[i]
				chrome.storage.sync.get(foundkey, function(stuff) {
					//Do work
					normal_copy = document.body.innerHTML
					filterArticle(stuff[[foundkey]])
					filtered_copy = document.body.innerHTML
					displayBanner(normal_copy, filtered_copy)
				});
			}
		}
	});
	return true;
}

performFilter();




