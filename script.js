// Initialize chatbot functionality
const faqData = {
    "hours": "We're open every day from 8:00 AM to 8:00 PM",
    "delivery": "Yes, we offer home delivery service for medications and health products. Delivery is available within a 10km radius for a small fee. Orders placed before 3pm are delivered the same day.",
    "prescription": "You can refill prescriptions by:<br>1. Calling us at +263 779242953<br>2. Using our prescription upload form on the website<br>3. Visiting the pharmacy in person<br>4. Through our mobile app (coming soon)",
    "vaccines": "We offer the following vaccinations:<br>- Flu vaccine<br>- COVID-19 vaccine and boosters<br>- Pneumonia vaccine<br>- Shingles vaccine<br>- Tetanus, diphtheria, pertussis (Tdap)<br>- Travel vaccines (please consult with our pharmacists)",
    "medical aid": "We accept all major medical aid providers in Zimbabwe. Please bring your medical aid card when visiting the pharmacy. For prescription refills, please have your membership information ready.",
    "hello": "Hello! How can I assist you with your pharmacy needs today?",
    "hi": "Hi there! I'm your pharmacy assistant. How can I help?",
    "contact": "You can reach us at:<br>Phone: +263 779242953<br>Email: simedpharmacy@gmail.com<br>Address: Highfields, Western Triangle, Harare<br><br>We're available everyday from 8am to 8pm",
    "services": "We offer a wide range of services including:<br>- Prescription filling<br>- Medication therapy management<br>- Health screenings (BP, cholesterol, diabetes)<br>- Vaccinations<br>- Home delivery<br>- Baby care products<br>- Health and wellness consultations",
    "location": "We're located at:<br>Highfields, Western Triangle, Harare<br><br>You can find us near the Western Triangle shopping center.",
    "thank": "You're welcome! Let me know if you need anything else.",
    "thanks": "Happy to help! Feel free to ask if you have more questions."
};

// Chatbot functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotModal = document.getElementById('chatbotModal');
const closeChatbot = document.querySelector('.close-chatbot');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const sendChatbotMessage = document.getElementById('sendChatbotMessage');

chatbotBtn.addEventListener('click', () => {
    chatbotModal.style.display = 'block';
    chatbotInput.focus();
});

closeChatbot.addEventListener('click', () => {
    chatbotModal.style.display = 'none';
});

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function handleUserMessage() {
    const message = chatbotInput.value.trim().toLowerCase();
    if (!message) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chatbot-message user-message';
    userMessageDiv.innerHTML = `<p>${chatbotInput.value}</p>`;
    chatbotBody.appendChild(userMessageDiv);

    // Clear input
    chatbotInput.value = '';

    // Find response
    let response = "I'm sorry, I don't understand that question. Here are some topics I can help with:<br>- Operating hours<br>- Prescription refills<br>- Delivery services<br>- Vaccinations<br>- Medical aid acceptance<br>- Our location";
    
    // Check for keywords in the FAQ data
    for (const [keyword, answer] of Object.entries(faqData)) {
        if (message.includes(keyword)) {
            response = answer;
            break;
        }
    }

    // Simulate typing delay
    setTimeout(() => {
        addBotMessage(response);
    }, 500);
}

sendChatbotMessage.addEventListener('click', handleUserMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === chatbotModal) {
        chatbotModal.style.display = 'none';
    }
});

// File upload functionality
const fileUpload = document.getElementById('fileUpload');
const prescriptionFile = document.getElementById('prescriptionFile');

fileUpload.addEventListener('click', () => {
    prescriptionFile.click();
});

prescriptionFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        fileUpload.innerHTML = `
            <i class="fas fa-file-medical" style="color: green;"></i>
            <p>${fileName}</p>
            <small>Click to change file</small>
        `;
    }
});

// Form submission for prescription
document.getElementById('prescriptionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const delivery = document.getElementById('delivery').value;
    const notes = document.getElementById('notes').value;
    
    // Prepare WhatsApp message
    const whatsappMessage = `New Prescription Submission:\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nDelivery: ${delivery}\nNotes: ${notes}\n\nPlease attach the prescription image below.`;
    const whatsappUrl = `https://wa.me/263779242953?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation
    alert('Thank you! Your prescription details have been sent. Please attach your prescription image in WhatsApp.');
    
    // Reset form
    e.target.reset();
    fileUpload.innerHTML = `
        <i class="fas fa-file-upload"></i>
        <p>Click to upload your prescription</p>
    `;
});