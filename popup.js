document.addEventListener("DOMContentLoaded", () => {
    // Load saved settings
    chrome.storage.local.get(["enabled", "botName", "whitelistEnabled", "whitelistedDomains"], (settings) => {
        document.getElementById("enableToggle").checked = settings.enabled ?? true;
        document.getElementById("botName").value = settings.botName || "";
        document.getElementById("whitelistToggle").checked = settings.whitelistEnabled ?? false;
        document.getElementById("whitelistDomains").value = settings.whitelistedDomains ? settings.whitelistedDomains.join(", ") : "";
    });

    // Save settings
    document.getElementById("saveSettings").addEventListener("click", () => {
        let enabled = document.getElementById("enableToggle").checked;
        let botName = document.getElementById("botName").value.trim();
        let whitelistEnabled = document.getElementById("whitelistToggle").checked;
        let whitelistedDomains = document.getElementById("whitelistDomains").value.split(",").map(d => d.trim()).filter(d => d);

        chrome.storage.local.set({
            enabled,
            botName,
            whitelistEnabled,
            whitelistedDomains
        });

        alert("[LinkOpener] Settings saved!");
    });
});