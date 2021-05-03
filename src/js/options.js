//get information, pack up
document.getElementById("submitbtn").addEventListener('click',function () {
	var domainValue = document.getElementById("dname").value.toString();
	var body = document.getElementById("b").value.split(",").filter(Boolean);
	var junk = document.getElementById("j").value.split(",").filter(Boolean);
	for (i in body){ i = i.trim(); }
	for (i in junk){ i = i.trim(); }
	stuff = [body,junk]
	
	chrome.storage.sync.set({[domainValue]: stuff}, function() {
		alert("New entry added");
		//Refresh table
		updateTable();
	});
});

//Delete a entry
document.getElementById("removebtn").addEventListener('click',function () {
	var removeItem = document.getElementById("deleteList").value.toString();
	chrome.storage.sync.remove(removeItem, function(Items) {
        alert("Entry removed");
        updateTable()
    });
});

//Set up a couple of websites, "defaults"
document.getElementById("presetbtn").addEventListener('click',function () {
    chrome.storage.local.clear(function(obj){
		alert("Sites Cleared and Reset!")
	});
	
	/*
	****************************************
	Websites
	****************************************
	*/
	
	//Buzzfeed
	domainValue = "https://www.buzzfeednews.com/article/"
	stuff = [["#news-content"],[]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	//Fox News Domains
	domainValue = "https://www.foxnews.com/"
	stuff = [[".article-header", ".article-content"],[".video-container",".info"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});

	domainValue = "https://www.foxbusiness.com/"
	stuff = [[".article-header", ".article-content"],[".video-container",".info"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	//Washington Post
	domainValue = "https://www.washingtonpost.com/"
	stuff = [["header","article"],[".hide-for-print",".b.bh.mb-lg-mod","#comments-wrapper"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	//ABC News
	domainValue = "https://abcnews.go.com/"
	stuff = [["header","article"],[".hide-for-print",".b.bh.mb-lg-mod","#comments-wrapper"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	
	alert("Presets enabled");
	updateTable();

});

//Refreshes content of main page
function updateTable(){
	chrome.storage.sync.get(null, function(data){
	var allKeys = Object.keys(data);
	console.log(data)
	//Main table
	content = ""
	
	if(allKeys != null){
		for(i = 0; i < allKeys.length; i++){
			row = data[[allKeys[i]]]
			str = "Domain: " + allKeys[i] + "<br>Body: " + row[0] + "<br>Junk: " + row[1] + "<br><br>"
			content += str 
		}
		document.getElementById("p1").innerHTML = content;
	}
	
	
	//Dropdowns
	//Create and append select list
	selectList = document.getElementById("deleteList");
	//Clear first
	for (i = selectList.options.length - 1; i >= 0; i--) {
	  selectList.options[i] = null;
	}
	//Create and append the options
	for (i = 0; i < allKeys.length; i++) {
		option = document.createElement("option");
		option.value = allKeys[i];
		option.text = allKeys[i];
		selectList.appendChild(option);
	}

	});
}

//Refresh table upon loading
updateTable();

