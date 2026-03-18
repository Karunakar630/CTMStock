const API_URL = "https://script.google.com/macros/s/AKfycbzEas4N0XsbRZtTzqBv2j5Ochm9HvfQdh9LL-pS0ljmguXvI1hvt-K3wFKWBT5GUdKQUw/exec";

async function submitForm() {
  const file = document.getElementById("photo").files[0];

  if (!file) {
    alert("Please upload a photo");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async function () {
    const data = {
      name: document.getElementById("name").value,
      ctm: document.getElementById("ctm").value,
      paid: document.getElementById("paid").value,
      cardReceived: document.getElementById("cardReceived").value,
      cardDelivered: document.getElementById("cardDelivered").value,
      image: reader.result
    };

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    alert("Saved successfully!");
    loadData();
  };
}

async function loadData() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <p><b>${item.name}</b></p>
        <p>CTM: ${item.ctm}</p>
        <p>Paid: ${item.paid}</p>
        <p>Card Received: ${item.cardReceived}</p>
        <p>Card Delivered: ${item.cardDelivered}</p>
        <a href="${item.image}" target="_blank">📸 View Photo</a>
      </div>
    `;
  });
}

loadData();
