document.getElementById("submitbtn").addEventListener('click',function () {
	//get information, pack up
	var domainValue = document.getElementById("dname").value.toString();
	var body = document.getElementById("b").value.split(",").filter(Boolean);
	var junk = document.getElementById("j").value.split(",").filter(Boolean);
	stuff = [body,junk]
	
	chrome.storage.sync.set({[domainValue]: stuff}, function() {
		alert("New entry added");
		//Refresh page or table
		updateTable();
	});

});

document.getElementById("removebtn").addEventListener('click',function () {
	//Delete a entry
	var removeItem = document.getElementById("rdomain").value.toString();
	chrome.storage.sync.remove(removeItem, function(Items) {
        alert("Entry removed(?)");
        updateTable()
    });
});

document.getElementById("presetbtn").addEventListener('click',function () {
	//set up a couple of websites, "defaults"
    chrome.storage.local.clear(function(obj){
		alert("Cleared")
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
	
	//Fox domains
	domainValue = "https://www.foxnews.com/"
	stuff = [[".article-header", ".article-content"],[".video-container",".info"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	domainValue = "https://www.foxbusiness.com/"
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	//WIP washington post
	domainValue = "https://www.washingtonpost.com/"
	stuff = [["header","article"][".hide-for-print",".b.bh.mb-lg-mod","#comments-wrapper"]]
	chrome.storage.sync.set({[domainValue]: stuff}, function() {});
	
	
	alert("Presets enabled");
	updateTable();

});


function updateTable(){
	chrome.storage.sync.get(null, function(data){
	content = ""
	
	var allKeys = Object.keys(data);
	console.log(allKeys)
	if(allKeys != null){
		for(i = 0; i < allKeys.length; i++){
			row = data[[allKeys[i]]]
			console.log(row)
			str = "Domain: " + allKeys[i] + "<br>Body: " + row[0] + "<br>Junk: " + row[1] + "<br><br>"
			content += str 
		}
	
		document.getElementById("p1").innerHTML = content;
	}

	});
}

//Refresh table upon loading
updateTable();

