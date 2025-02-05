onload=main;

function main() {
    // Elements
    const chatWindow = document.getElementById("chatWindow");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendButton");
    const timeSpan = document.getElementById("time");
    const trayTime = document.getElementById("trayTime");
    const startButton = document.getElementById("startButton");
    const startMenu = document.getElementById("startMenu");
    const randomizeButton = document.getElementById("randomize");
    const openChatExe = document.getElementById("openChatExe");
    data = "";

    // Window controls
    document.querySelector(".minimize").addEventListener("click", () => {
        chatWindow.classList.add("minimized");
        document.querySelector(".task-button").classList.remove("active");
    });

    document.querySelector(".maximize").addEventListener("click", () => {
        chatWindow.style.width = chatWindow.style.width === "100%" ? "800px" : "100%";
    });

    document.querySelector(".close").addEventListener("click", () => {
        if (confirm("Are you sure you want to exit Chat.exe?")) {
            chatWindow.style.display = "none";
            document.querySelector(".task-button").style.display = "none";
        }
    });

    // Taskbar functionality
    document.querySelector(".task-button").addEventListener("click", () => {
        if (chatWindow.classList.contains("minimized")) {
            chatWindow.classList.remove("minimized");
            document.querySelector(".task-button").classList.add("active");
        } else {
            chatWindow.classList.add("minimized");
            document.querySelector(".task-button").classList.remove("active");
        }
    });

    startButton.addEventListener("click", () => {
        startMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.classList.remove("active");
        }
    });

    // Chat functionality
    function addMessage(text, isUser, timestamp = new Date().toLocaleTimeString()) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;
        messageDiv.textContent = text;

        const timestampDiv = document.createElement("div");
        timestampDiv.className = "message-timestamp";
        timestampDiv.textContent = timestamp;
        messageDiv.appendChild(timestampDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        if (chatInput.value) {
            addMessage(chatInput.value, true);
            getResponse()
            chatInput.value = "";
        }
    }

    function getResponse(){
        let xhr = new XMLHttpRequest();
        let url = `http://127.0.0.1:8000/ask?question=${encodeURIComponent(chatInput.value)}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText);
                    addMessage(response.answer, false);
                } else {
                    console.error("Error:", xhr.responseText);
                }
            }
        };
        xhr.send();
    }


    // Random question functionality

    function getData(){
        let xhr = new XMLHttpRequest();
        let url = `http://127.0.0.1:8000/get_data`;
        
        // Open a GET request
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        // Function executes after request is successful
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                } else {
                    console.error("Error:", xhr.responseText);
                }
            }
        };
    
        // Sending our request
        xhr.send();
    }
    
    function randomize(){
        chatInput.value = data.questions[Math.floor(Math.random() * data.questions.length)];
    }

    // Event listeners
    randomizeButton.addEventListener("click", randomize);
    sendButton.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
    openChatExe.addEventListener("click", (e) => {chatWindow.style.display = "block"});

    // Clock functionality
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        timeSpan.textContent = timeStr;
        trayTime.textContent = timeStr.slice(0, 5); // Show only HH:MM in tray
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Start-menu items functionality
    document.querySelectorAll(".start-menu-item").forEach((item) => {
        item.addEventListener("click", () => {
            if (item.textContent === "Shut Down...") {
                if (confirm("Are you sure you want to shut down?")) {
                    document.body.innerHTML =
                        '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:navy;color:white;padding:20px;">It is now safe to turn off your computer.</div>';
                }
            }
            startMenu.classList.remove("active");
        });
    });

    // System tray hover effect
    const systemTray = document.querySelector(".system-tray");
    systemTray.addEventListener("mouseover", () => {
        trayTime.title = new Date().toLocaleDateString();
    });

    // Window focus effect
    chatWindow.addEventListener("mousedown", () => {
        document.querySelectorAll(".window").forEach((win) => {
            win.style.zIndex = "1";
        });
        chatWindow.style.zIndex = "2";
    });

    // Startup sound
    const startupSound = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1NOTQrHxEQGClEY4KRiX9xW0EwICUzTW6FjIJ5cF9NOjEhHBUaKEBVd4mYkHhiRzYnGxoiO1p8kZyMdls+LRkWHzNCY4OXnJKAZEU5KSUpQ2mMnqGYi29RPCsQBgQOGzRTcJGqqZyJeGZaTkpKT1lkaXF3foWLlJ2lq7O6wMbM0tbY2tzY1tDKwLmwpZqPgndqWEc2JhcNBgIKFSc9V3KNn6qxtbr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9zcm9mVEArGQsEAgYQITlWc4yksbjB0Nvm8/rz6+HQwK2aj31vZmNmb32MnrDC0uDt+P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v38+/j29PDq5eDZ0szFvbWspJuSiYB4cGhgWVVVV19seYqerL3O3uz6////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6+Lb0Me8sKeekYeAeXNuaWVjYmNobHN7g4uTm6Kpr7W6v8PHy87R09TV1tbW1dTT0dDOzMrIx8bFxcXGx8nLztHV2t/l6u70+v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////r28+zozsGvm4+LsZ+bvK+nzru12Ml1Xj4TEQ8MUEQybn5kc3hcbWpHdGUmcmMqXT0JpZ2RoJ+gqqint62qsaacqpmZn5OChYFpXWpbLlhHQGhXVmxaQ2BHGEg+OUOHYG6SeYqhh5e5qrO0xbG0xbS7r6e4p56yrKPOt6jQqo6oknyseGKwcEmwYyeWTg+lXBG4b1CmVxKzZC+mWiCmUQ67b0bGeVbHdkXDaDTJYxzQYRLVZhPVZBTTZxfTZBPVYQ7VYhDUZRTTZxrSZhvNZh7GZSPBZiqyZDKsZDatYjetYjaqYzikZEOgZ0+bZ1eWZV6OZGWKaG+Oa3eNbX+MboaLboyLbo6McJGNc5WOdZiOd5qOeJmNeZmMepmLe5qLfJqLfJqKfJqJe5mIepmGe5mEfJiAfJd8e5Z4epZ0eZVweJRud5Nqd5JneJJleJNieJVge5ldfJtafJtYeplXeZlXeJhYd5dbd5Zfd5VkdpNpb41tZoNvW3lyUnN0SmhxP2RuN2JtMWRvLWp1KXB6J3N8JnV+JneAJniCJnmDJnmEJnqEJnqEJ3qEKHmDKnmDLHiCLneAMHZ/M3Z+NnR8OXJ6PG93PG50Omx0OGp0NmpzM2lyL2hxK2dwJ2VvI2RuH2JsHGBrGV5qFl1oE1pmEVhlDlZkC1VjCVNiB1JiBVBhBE9gA05fAk1eAUxdAEtdAEtcAEpaAElZAEhYAEdXAEZXAEZWAEVVAENTAEJSAEFRAD9PAD5OAD1NADxMADpKADlJADhIADZGADVFADREADJCACwrACgnACclACYkACQiACMhACIfACEeACAcAB8bAB4aAB0YABwXABoVABkUABgSABYRABUPABMOABINABALAA8KAA4IAA0HAAwFAAsEAAkCAAcBAAYAAAQAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    startupSound.play().catch(() => {
        console.log("Autoplay prevented");
    });

    getData();
}