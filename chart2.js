let xlabels2 = [];
let ylabels2 = [];
chartIt();
async function chartIt() {
  await getData();
  const ctx2 = document.getElementById("chart2").getContext("2d");
  const myChart = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: xlabels2,
      datasets: [
        {
          label: "Frequency of Cancer Diagnoses by Racial Backgrounds",
          data: ylabels2,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Frequency of Cancer Diagnoses by Age",
        fontSize: 20
      }
    }
  });
}

async function getData() {
  await $.ajax({
    url:
      "https://health.data.ny.gov/resource/gnzp-ekau.json?$where=UPPER(ccs_diagnosis_description)%20like%20%27%25CANCER%25%27",
    type: "GET",
    data: {
      $limit: 1000,
      $$app_token: "tm3ORnaNFHUQzXCE04B4KWQvE"
    }
  }).done(function(data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    // console.log(data.map(e => e.race));
    // store data.map to variable
    // loop through it, each unique name add to xlabels

    //get unique labels
    let labels = [];
    let obj = {};
    let arr = data.map(e => e.age_group);
    for (let i = 0; i < arr.length; i++) {
      if (!labels.includes(arr[i])) {
        labels.push(arr[i]);
      }
    }

    //put labels in an object as the key

    for (let i = 0; i < labels.length; i++) {
      obj[labels[i]] = 0;
    }
    console.log(obj);

    //lop through data and save it in object
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case "70 or Older":
          obj["70 or Older"] = obj["70 or Older"] + 1;
          break;

        case "50 to 69":
          obj["50 to 69"] = obj["50 to 69"] + 1;
          break;

        case "30 to 49":
          obj["30 to 49"] = obj["30 to 49"] + 1;
          break;

        case "18 to 29":
          obj["18 to 29"] = obj["18 to 29"] + 1;
          break;

        case "0 to 17":
          obj["0 to 17"] = obj["0 to 17"] + 1;
          break;
      }
    }
    console.log(obj);
    xlabels2 = Object.keys(obj);
    ylabels2 = Object.values(obj);
  });
  //{white: 324}
}
