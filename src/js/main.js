function filterArticle(info){
	acceptedelements = info[0]
	rejectedelements = info[1]
	
	//delete stray elements
	//console.log("Deleting stuff")
	//console.log(rejectedelements)
	for(i = 0; i < rejectedelements.length; i++){
		//console.log("Removing elements!")
		//console.log(rejectedelements[i])
		//document.querySelector(rejectedelements[i]).style.display = 'none';
		//document.querySelector(rejectedelements[i]) = '';
		//$(rejectedelements[i]).remove();
		var element = document.querySelector(rejectedelements[i]);
		element.parentElement.removeChild(element);
	}
	
	
	//Check if page has all elements, to know if it's an article
	//if not, exit function
	allelements = acceptedelements.concat(rejectedelements)
	hasAll = true
	for(i = 0; i < acceptedelements.length; i++){
		if(document.querySelector(acceptedelements[i]) == null){
			return false;
		}
	}
	
	
	//clear out document body except for desired content
	perserve = []
	for(i = 0; i < acceptedelements.length; i++){
		console.log("in loop")
		if(acceptedelements[i] != ''){
			console.log("adding to perserve")
			console.log(acceptedelements[i])
			var item = document.querySelector(acceptedelements[i]);
			perserve.push(item);
		}
	}
	console.log("here")
	console.log(perserve.length)
	document.body.innerHTML = '';
	for (i = 0; i < perserve.length; i++){
		document.body.appendChild(perserve[i]);
	}
	

	
}

//https://stackoverflow.com/questions/11638509/chrome-extension-remove-script-tags
reloadAndKillJS = function(eles) {
    document.documentElement.innerHTML = 'Reloading Page...';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', window.location.href, true);

    xhr.onerror = function() {
        document.documentElement.innerHTML = 'Error getting Page';
    }

    xhr.onload = function() {
        var page = document.implementation.createHTMLDocument("");
        page.documentElement.innerHTML = this.responseText;

        var newPage = document.importNode(page.documentElement, true);

        var nodeList = newPage.querySelectorAll('script');
        for (var i = 0; i < nodeList.length; ++i) {
            var node = nodeList[i];
            if (node.src) {
                node.setAttribute('original-src', node.src);
                node.removeAttribute('src');
            }
            node.innerText = '';
        }

        document.replaceChild(newPage, document.documentElement);
        delete page;

        // Do your thing here
		filterArticle(eles);
    }

    xhr.send();
}

/*
chrome.storage.local.get("block"+window.location.href,function(items){
    if (items["block"+window.location.href]){
    window.stop();
    reloadAndKillJS();  
    }
});
*/

//check to see if we filtered this website domain
chrome.storage.sync.get(null, function(items) {
	console.log(document.location.hostname)
	console.log(items)
	
	var allKeys = Object.keys(items);
	for (i = 0; i < allKeys.length; i++){
		if(document.URL.includes(allKeys[i])){
			var foundkey = allKeys[i]
			chrome.storage.sync.get(foundkey, function(stuff) {
				//filterArticle(stuff[[foundkey]]);
				window.stop();
				reloadAndKillJS(stuff[[foundkey]]); 
				filterArticle(stuff[[foundkey]]);
			});
		}
	}
});
