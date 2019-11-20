let xlabels = [];
let ylabels = [];
chartIt();
async function chartIt() {
  await getData();
  const ctx = document.getElementById("chart1").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Count",
          data: ylabels,
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
      legend: { display: false },
      title: {
        display: true,
        text: "Frequency of Cancer Diagnoses by Racial Backgrounds",
        fontSize: 20
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
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
    let arr = data.map(e => e.race);
    for (let i = 0; i < arr.length; i++) {
      if (!labels.includes(arr[i])) {
        labels.push(arr[i]);
      }
    }
    //[white, african, multi]

    //put labels in an object as the key

    for (let i = 0; i < labels.length; i++) {
      obj[labels[i]] = 0;
    }
    console.log(obj);

    // {white: 0, african : 0}

    //lop through data and save it in object
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case "White":
          obj["White"] = obj["White"] + 1;
          break;

        case "Black/African American":
          obj["Black/African American"] = obj["Black/African American"] + 1;
          break;

        case "Multi-racial":
          obj["Multi-racial"] = obj["Multi-racial"] + 1;
          break;

        case "Other Race":
          obj["Other Race"] = obj["Other Race"] + 1;
          break;
      }
    }
    console.log(obj);
    xlabels = Object.keys(obj);
    ylabels = Object.values(obj);
  });
  //{white: 324}
}
