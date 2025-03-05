chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        enabled: true,
        botName: "",
        whitelistEnabled: false,
        whitelistedDomains: []
    });
});
