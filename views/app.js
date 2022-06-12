console.log("QR code generator");

var qrdata = document.getElementById("fullUrl");
let qrcode = new QRCode(document.getElementById("qrcode"));

function GenerateQR() {
  var data = qrdata.value;

  const playloaData = { fullUrl: qrdata.value };

  fetch("/shortUrls", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playloaData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      (document.getElementById("shrturls").innerHTML += `<tr
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        <p>
          ${qrdata.value}
        </p>
      </th>
      <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <a href="${data.shortUrl}">
        ${data.shortUrl}
        </a>
      </td>
      <td class="px-6 py-4">
        0
      </td>
    </tr>`);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  qrcode.makeCode(data);
}

function fetchUrls() {
  fetch("/urls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

qrdata.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn1").click();
  }
});
