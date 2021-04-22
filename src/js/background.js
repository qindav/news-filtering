//Simply opens the settings page
chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.runtime.openOptionsPage()
});

//Installed function, this will setup some default page blockers,
//This will open the options page up.
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		chrome.storage.local.clear(function(obj){
			alert("Thanks for Installing! To access this page, click on the extension's icon again or go to the plugin's setting page")
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

		//Open options page on load
		chrome.runtime.openOptionsPage();
	}
});