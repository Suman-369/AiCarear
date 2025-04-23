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

    // Event listener for ask button click
    askButton.addEventListener('click', () => {
        const userText = userInput.value.trim().toLowerCase();
        if (!userText) {
            alert('Please enter a question.');
            return;
        }

        appendMessage(userInput.value.trim(), 'user-message');
        userInput.value = '';
        appendMessage("AI Robot: Let me think about that...", 'ai-message');

        // Remove loading message after processing
        setTimeout(() => {
            const loadingMessages = aiResponseContainer.getElementsByClassName('ai-message');
            if (loadingMessages.length > 0) {
                aiResponseContainer.removeChild(loadingMessages[loadingMessages.length - 1]);
            }

            // Simple if-else greeting message logic
            let response = '';
            if (userText.includes('hello') || userText.includes('hi')) {
                response = 'AI Robot: Hello! How can I help you today?';
            } else if (userText.includes('good morning')) {
                response = 'AI Robot: Good morning! Hope you have a great day!';
            } else if (userText.includes('good afternoon')) {
                response = 'AI Robot: Good afternoon! How is your day going?';
            } else if (userText.includes('good evening')) {
                response = 'AI Robot: Good evening! How can I assist you tonight?';
            } else if (userText.includes('how are you')) {
                response = 'AI Robot: I am just a robot, but I am here to help you!';
            } else if (userText.includes('thank you') || userText.includes('thanks')) {
                response = 'AI Robot: Youre welcome!';
            } else if (userText.includes('about you')) {
                response = 'AI Robot: I am an AI designed to assist and provide information on various topics. I am constantly learning and improving to better serve users like you.';
            } else if (userText.includes('what can you do')) {
                response = 'AI Robot: I can assist with a wide range of tasks, from answering questions to generating text. Let me know how I can help you!';
            } else if (userText.includes('can you help me')) {
                response = 'AI Robot: Of course! I am here to assist you with any questions or tasks you may have. Please let me know how I can help.';
            } else if (userText.includes('how do you work')) {
                response = 'AI Robot: I use advanced algorithms and machine learning to understand and respond to user input. I am constantly learning and improving to better serve users like you.';
            } else if (userText.includes('are you intelligent')) {
                response = 'AI Robot: I am designed to simulate human-like intelligence, but I am not conscious or self-aware. I am simply a tool designed to assist and provide information.';
            } else {
                response = "AI Robot: Sorry, I can only respond to greetings right now !! we working on it and give you the best result in the future!";
            }

            appendMessage(response, 'ai-message');
        }, 1000);
    });
});



