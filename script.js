// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const askButton = document.getElementById('askButton');
    const userInput = document.getElementById('userInput');
    const aiResponseContainer = document.getElementById('aiResponse');

    if (!askButton || !userInput || !aiResponseContainer) {
        console.error('One or more required elements are missing: askButton, userInput, aiResponse');
        return;
    }

    // Function to append a message to the chat container
    function appendMessage(message, sender) {
        const messageElem = document.createElement('div');
        messageElem.classList.add('chat-message', sender);
        messageElem.textContent = message;
        aiResponseContainer.appendChild(messageElem);
        // Scroll to bottom
        aiResponseContainer.scrollTop = aiResponseContainer.scrollHeight;
    }

    // Simulate AI response (can be replaced with real API call)
    async function simulateAIResponse(userText) {
        const GEMINI_API_KEY = "AIzaSyAWO0KSW28W9_h-cNIATd-Sjdtrcb1EATw";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: {
                        messages: [
                            {
                                author: "user",
                                content: userText
                            }
                        ]
                    }
                })
            });
    
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
    
            const aiReply = data?.candidates?.[0]?.content;
            if (aiReply) {
                return `AI Robot: ${aiReply}`;
            } else {
                return "AI Robot: Sorry, I couldn't find an answer to that.";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "AI Robot: Sorry, there was an error processing your request.";
        }
    }
    
    // Event listener for ask button click
    askButton.addEventListener('click', async () => {
        const userText = userInput.value.trim();
        if (!userText) {
            alert('Please enter a question.');
            return;
        }
    
        appendMessage(userText, 'user-message');
        userInput.value = '';
        appendMessage("AI Robot: Let me think about that...", 'ai-message');
    
        try {
            const response = await simulateAIResponse(userText);
    
            // Remove loading message
            const loadingMessages = aiResponseContainer.getElementsByClassName('ai-message');
            if (loadingMessages.length > 0) {
                aiResponseContainer.removeChild(loadingMessages[loadingMessages.length - 1]);
            }
    
            appendMessage(response, 'ai-message');
        } catch (error) {
            console.error("Error getting AI response:", error);
            appendMessage("AI Robot: Sorry, there was an error processing your request we will Fix it Very Soon !!.", 'ai-message');
        }
    });
    
    
});
