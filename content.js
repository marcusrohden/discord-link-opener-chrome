console.log("[LinkOpener] ✅ Script loaded and running.");

// Function to check and log messages
function checkForNewMessages(node) {
    try {
        if (!node || node.nodeType !== 1) return; // Ignore non-element nodes

        console.log("[LinkOpener] 🔍 Checking new message:", node);

        let messageText = node.innerText || "";
        if (!messageText.trim()) {
            console.log("[LinkOpener] ⚠️ Empty or non-text message detected, skipping.");
            return;
        }

        let links = node.querySelectorAll("a[href]");
        if (links.length === 0) {
            console.log("[LinkOpener] ❌ No links found in this message.");
            return;
        }

        console.log(`[LinkOpener] 🔗 Found ${links.length} link(s) in message.`);

        links.forEach(link => {
            let url = link.href;
            console.log(`[LinkOpener] 🔗 Detected link: ${url}`);

            if (!link.dataset.opened) {
                link.dataset.opened = "true"; // Prevent duplicate openings
                console.log(`[LinkOpener] 🚀 Opening link: ${url}`);
                window.open(url, "_blank"); // Open link in new tab
            } else {
                console.log("[LinkOpener] 🛑 Link was already opened, skipping.");
            }
        });
    } catch (error) {
        console.error("[LinkOpener] ❌ Error while processing message:", error);
    }
}

// Mutation Observer to detect new messages
const observer = new MutationObserver((mutations) => {
    try {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                console.log("[LinkOpener] 🔄 DOM Mutation detected, checking node...");
                checkForNewMessages(node);
            });
        });
    } catch (error) {
        console.error("[LinkOpener] ❌ Error in Mutation Observer:", error);
    }
});

// Attach observer to chat container
function attachObserver() {
    const chatContainer = document.querySelector("main");
    if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
        console.log("[LinkOpener] ✅ Observer attached to chat container.");
    } else {
        console.log("[LinkOpener] ⏳ Chat container not found. Retrying in 3 seconds...");
        setTimeout(attachObserver, 3000);
    }
}

// Start observing
attachObserver();
