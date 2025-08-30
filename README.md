# service
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Local Services App</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f9;
      margin: 0;
      padding: 0;
    }
    header {
      background: #007bff;
      color: white;
      text-align: center;
      padding: 1rem;
    }
    .container {
      padding: 20px;
    }
    .search-bar {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .card {
      background: black;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    }
    .card h3 {
      margin: 0;
      color: #007bff;
    }
    .btn {
      display: inline-block;
      margin-top: 10px;
      padding: 8px 12px;
      background: #007bff;
      color: black;
      border-radius: 5px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header>
    <h1>Local Service App</h1>
    <p>Find Electricians, Plumbers, Mechanics, Aluminium near you!</p>
  </header>

  <div class="container">
    <input type="text" id="search" class="search-bar" placeholder="Search for a service (e.g. Plumber)">
    <div id="service-list"></div>
  </div>

  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>

  <script>
    // 👉 Step 1: Paste your Firebase config here
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID"
    };

    // 👉 Step 2: Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const serviceList = document.getElementById("service-list");
    const searchInput = document.getElementById("search");

    // 👉 Step 3: Display providers from Firestore
    async function displayServices(filter = "") {
      serviceList.innerHTML = "";
      const snapshot = await db.collection("providers").get();
      snapshot.forEach(doc => {
        const s = doc.data();
        if (!filter || s.type.toLowerCase().includes(filter.toLowerCase())) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${s.type}</h3>
            <p><b>Name:</b> ${s.name}</p>
            <p><b>Phone:</b> ${s.phone}</p>
            <a class="btn" href="tel:${s.phone}">Call Now</a>
          `;
          serviceList.appendChild(card);
        }
      });
    }

    // 👉 Step 4: Search filter
    searchInput.addEventListener("input", (e) => {
      displayServices(e.target.value);
    });

    // 👉 Step 5: Load all on start
    displayServices();
  </script>
</body>
</html>
