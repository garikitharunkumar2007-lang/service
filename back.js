// ✅ Replace this with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "xxxxxx",
  appId: "xxxxxx"
};

// Init Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const serviceList = document.getElementById("service-list");
const searchInput = document.getElementById("search");

// Load and display services from Firestore
async function loadServices(filter = "") {
  serviceList.innerHTML = "";
  const snapshot = await db.collection("providers").get();
  snapshot.forEach(doc => {
    const service = doc.data();
    if (service.type.toLowerCase().includes(filter.toLowerCase())) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${service.type}</h3>
        <p><b>Name:</b> ${service.name}</p>
        <p><b>Phone:</b> ${service.phone}</p>
        <a class="btn" href="tel:${service.phone}">Call Now</a>
      `;
      serviceList.appendChild(card);
    }
  });
}

// Search input
searchInput.addEventListener("input", (e) => {
  loadServices(e.target.value);
});

// Load all initially
loadServices();
