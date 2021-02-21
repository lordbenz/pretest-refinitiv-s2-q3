const arg = process.argv[2];

const axios = require("axios");
const cheerio = require("cheerio");

axios
  .get("https://codequiz.azurewebsites.net/", {
    headers: { Cookie: "hasCookie=true" },
  })
  .then((res) => {
    $ = cheerio.load(res.data);

    let fundNav = `not found.`;
    for (let i = 0; i < $("table tr").length; i++) {
      let rowData = $(`table tr`).eq(i);
      if (
        rowData.find(`td:nth-of-type(1)`).text().trim() == `${process.argv[2]}`
      ) {
        fundNav = rowData.find(`td:nth-of-type(2)`).text();
        break;
      }
    }

    console.log(fundNav);
  })
  .catch((e) => {
    console.log(e);
  });
