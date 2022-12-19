function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  checkForName(formText);

  console.log("::: Form Submitted :::");

  // input
  let urlInput = document.querySelector("#url").value;
  // output
  let polarity = document.querySelector("#polarity");
  let subjectivity = document.querySelector("#subjectivity");

  //   Check if it's URL or not
  if (Client.checkURL(urlInput) === false) {
    alert("Please enter an url.");

    // If polarity and subjectivity has value, return null

    if (polarity.innerHTML && subjectivity.innerHTML != null) {
      polarity.innerHTML = "";
      subjectivity.innerHTML = "";
    }

    return;
  }

  ///////////////////////////////////////////////////

  fetch("http://localhost:8081/api", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urlInput }),
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      if (data.validation != null) {
        alert(data.validation);
        console.log(`*** ${data.validation} ***`);

        polarity.innerHTML = "";
        subjectivity.innerHTML = "";
      } else {
        // Form Result with  API data

        polarity.innerHTML = `<h2>Polarity</h2><div >${data.polarity}.</div>`;
        scannedTexts.innerHTML = `<h2>subjectivity</h2><div >${data.subjectivity}</div>`;
      }
    });
  //////////////////////////////////////////////
}

export { handleSubmit };
