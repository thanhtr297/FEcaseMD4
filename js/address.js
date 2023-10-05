
function displayCity() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/cities`,
        success: function (data) {
            let content = "<label for='select_city'>City</label><br>"
             content += '<select id="select_city" onchange="displayDistrict()"  class="form-select">';
            content += `<option>--Chọn thành phố-- </option>`;
            for (let i = 0; i<data.length; i++) {

                content += `<option value = ${data[i].idCity}> ${data[i].name} </option>`;
            }
            content += '</select>'
            document.getElementById("city").innerHTML = content;
        }

    })
}
function displayDistrict() {
    let idCity = document.getElementById("select_city").value
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/addresses/city/${idCity}`,
        success: function (data) {
            let content = '<select id="district" style="width: 80%; height: 30px" class="form-select">';
            for (let i= 0; i < data.length; i++) {
                content += `<option value = ${data[i].idAddress}> ${data[i].name} </option>`;
            }
            content +='</select>'
            document.getElementById("select_district").innerHTML = content;
        }
    })
}
function displayAddress() {
    displayCity();
    displayDistrict();
}