var url = document.getElementById("input-url");
var result = document.getElementById("result");
var button = document.getElementById("btn_submit");

button.onclick = function (e) {
  axios
    .post("/api/url/shorten", {
      longUrl: url.value,
    })
    .then(function (response) {
      result.innerHTML = `
        <div id="form_get">
            <div class="input-group col-lg-10 col-md-10 col-sm-10">
                <input name="result-url" class="form-control input-md ht53" id="result-url" type="text" value="${response.data.shortUrl}" />
                <span class="input-group-btn">
                    <button class="btn btn-primary input-md btn-download ht53" type="submit"
                        id="btn_copy">
                          COPY
                    </button>
                </span>
            </div>
        </div>`;

      var copy_btn = document.getElementById("btn_copy");
      copy_btn.onclick = function (e) {
      var copyText = document.getElementById("result-url");
      copyText.select();
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
      };
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};


function showData() {

  axios.get('/api/geturl')
  .then(function (response) {
    // handle success 

    var urls = response.data.map(function (url) {
      return `
        <tr>
          <td><a href="${url.shortUrl}" target="_blank">${url.shortUrl}</a></td>
          <td>${new Date(url.date).getDate() + '/' + (new Date(url.date).getMonth()+1) + '/' + new Date(url.date).getFullYear()}</td>
          <td>${1}</td>
        </tr>
      `;
    })

    document.getElementById("tbody").innerHTML = urls.join("");

    //document.getElementById("data").innerHTML = urls;
    //console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

showData();