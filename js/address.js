function displayCity() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/cities`,
        success: function (data) {
            let content = "<label for='select_city' class=\"fw-bold\">Thành phố</label><br>"
            content += '<select id="select_city" onchange="displayDistrict()" class="form-select">';
            content += `<option>--Chọn thành phố-- </option>`;
            for (let i = 0; i < data.length; i++) {

                content += `<option value = ${data[i].idCity}> ${data[i].name} </option>`;
            }
            content += '</select>'
            document.getElementById("city").innerHTML = content;
        }

    })
}

function displayDistrict() {
    let idCity = $('#select_city').val();
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/addresses/city/${idCity}`,
        success: function (data) {
            let content = "<label for='select_district' class=\"fw-bold\">Quận</label><br>"
            content += '<select id="select_district"  class="form-select">';
            for (let i = 0; i < data.length; i++) {
                content += `<option value = ${data[i].idAddress}> ${data[i].name} </option>`;
            }
            content += '</select>'
            document.getElementById("district").innerHTML = content;
        }
    })
}

function displayStatus() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/status`,
        success: function (data) {
            let content = "<label for='select_status' class=\"fw-bold\">Trạng thái</label><br>"
            content += '<select id="select_status"  class="form-select">';
            content += `<option>--Chọn trạng thái-- </option>`;
            for (let i = 0; i < data.length; i++) {
                content += `<option value = ${data[i].idStatus}> ${data[i].name} </option>`;
            }
            content += '</select>'
            document.getElementById("status").innerHTML = content;
        }

    })
}

function displayAddress() {
    displayCity();
    displayDistrict();
    displayStatus()
}
