let arrHome;
let listDisplayPage;
let numberPage;
let totalPage;
function demoDisplay() {
    $.ajax({
        url: "http://localhost:8080/api/homes",
        type: "GET",
        success: function (data) {
            showHome(data)
            numberPage = 0;
            arrHome = data;
            listDisplayPage = data.reverse();
            showPage();
        }
    })

}
function detailHome(id) {
    $.ajax({
        url: `http://localhost:8080/api/homes/${id}`,
        type:"GET"
    })
}

function findOne() {

}

function Filter() {
    let price = $("#price").val();
    let priceValue = price.split("-")
    let minPrice = priceValue[0];
    let maxPrice = priceValue[1];
    let count_bathroom = $("#bathroom").val();
    let count_bedroom = $("#bedroom").val();
    let idCity = $('#select_city').val();
    if(idCity === "--Chọn thành phố--") {
        idCity = null;
    }
    let idDistrict = $('#select_district').val();
    if(idDistrict === undefined) {
        idDistrict = null;
    }
    let idStatus = $('#select_status').val();
    if(idStatus === "--Chọn trạng thái--") {
        idStatus = null;
    }
    newFilter = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        count_bathroom: count_bathroom,
        count_bedroom: count_bedroom,
        city: {
            idCity: idCity
        },
        address: {
            idAddress: idDistrict
        },
        status: {
            idStatus: idStatus
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newFilter),
        url: "http://localhost:8080/api/filters",
        success: function (arr) {
            if (arr == null) {
                document.getElementById("homes").innerHTML = "Khong tim thay"
            } else {
                showHome(arr);
                showPage();
            }
        }
    });
    event.preventDefault();
}

function searchByName() {
    let search = document.getElementById("search").value
    $.ajax({
        url: `http://localhost:8080/api/homes/search/${search}`,
        type: "GET",
        success: function (data) {
           showHome(data);
            showPage();
        }
    })
    event.preventDefault();
}
function displayOneImg(id) {
    var settings = {
        "url": `http://localhost:8080/api/homes/img/${id}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        let content = "";
        for (let i = 0; i < response.length; i++) {
            content += `<img style="width: 100px" src="../../src/main/resources/static/image/${response[i].image}" alt=""/>`
            break;
        }
        document.getElementById("img" + id).innerHTML = content;
    });
}

// phan trang


function showPage() {
    let data = listDisplayPage;
    let elementPage = 2;
    totalPage = Math.ceil(data.length / elementPage);
    // numberPage;
    //lưu numberPage ra biến Global
    let startPage = (numberPage * elementPage);
    let endPage = ((numberPage + 1) * elementPage);
    let subArr = data.slice(startPage, endPage);
    showHome(subArr);
    showFootPage();
    console.log(totalPage)
}

function showFootPage() {
    let content = `<div id="footPage">
                     <button class="btn btn-outline-primary" id="previous" onclick="previousPage(numberPage)">Previous</button>
                     <span>${numberPage + 1}/${totalPage}</span>
                     <button class="btn btn-outline-primary" id="next" onclick="nextPage(numberPage)">Next</button>
                     </div>`
    document.getElementById("footPage").innerHTML = content;
    if (numberPage === 0){
        $("#previous").hide();
    }else if (numberPage === totalPage - 1){
        $("#next").hide();
    }
}

function previousPage(page) {
    numberPage = page - 1;
    showPage();
}

function nextPage(page) {
    numberPage = page + 1;
    showPage();
}

function showHome(data) {
    let content = ""
    for (let i = 0; i < data.length; i++) {
        content += `
<div class="col-xl-3 col-lg-4 col-md-6">
    <div class="product-item">
        <div class="position-relative bg-light overflow-hidden">
            <img class="img-fluid w-100" src="../img/1.${data[i].idHome}.jpg" alt="">
            <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
        </div>
        <div class="text-center p-4">
            <span class="d-block h5 mb-2">${data[i].name}</span>
            <span class="text-primary me-1">Giá: ${data[i].price}</span>
            <span class="text-body"> Phòng ngủ: ${data[i].bedroom_count}</span><br>
            <span class="text-body"> Phòng tắm: ${data[i].bathroom_count}</span><br>
            <span class="text-body"> Địa chỉ: ${data[i].address.name},${data[i].address.city.name}</span>
        </div>
        <div class="d-flex border-top">
            <small class="w-50 text-center border-end py-2">
                <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>Xem chi tiết</a>
            </small>
            <small class="w-50 text-center py-2">
                <a class="text-body" href=""><i class="far fa-heart"></i>  Thuê ngay</a>
            </small>
        </div>
    </div>
</div>`
    }
    document.getElementById("homes").innerHTML = content
}
function displayImg(id) {
    var settings = {
        "url": `http://localhost:8080/api/homes/img/${id}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        let content = "";
        for (let i = 0; i < response.length; i++) {
            content += `<img  src="../../src/main/resources/static/image/${response[i].image}" alt=""/>`
        }
        document.getElementById("img" + id).innerHTML = content;
    });
}

let arr;
function displayAll1() {
    $.ajax({
        url: "http://localhost:8080/api/homes",
        type: "GET",
        success: function (data) {
            arr = data
            let content = `<h2>List home</h2>`
            content += `<table><tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Bedroom</th>
                        <th>Bathroom</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Account</th>
                        <th colspan="2">Action</th>
                        </tr>`
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                        <td>${i + 1}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].address.name} ${data[i].address.city.name}</td>
                        <td>${data[i].bedroom_count}</td>
                        <td>${data[i].bathroom_count}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].price}</td>
                        <td><p id="\img${data[i].idHome}\"></p></td>

                        <td>${data[i].status.name}</td>
                        <td>${data[i].account}</td>
                        
                        <td><button onclick="updateProduct(${data[i].id})">Update</button></td>
                        <td><button onclick="deleteProduct(${data[i].id})">Delete</button></td>
                        </tr>`
                displayImg(data[i].idHome);
            }
            content += `</table>`
            document.getElementById("homes").innerHTML = content
        }
    })
}
displayAddress()
function displayCity() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/cities`,
        success: function (data) {
            let content = "<label for='select_city'>Thành phố</label><br>"
            content += '<select id="select_city" onchange="displayDistrict()"  class="form-select">';
            content += `<option>--Chọn thành phố--</option>`;
            for (let i = 0; i<data.length; i++) {

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
            let content = "<label for='select_district'>Quận/huyện</label><br>"
            content += '<select id="select_district"  class="form-select">';
            for (let i = 0; i<data.length; i++) {
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
            let content = "<label for='select_status'>Trạng thái</label><br>"
            content += '<select id="select_status" class="form-select">';
            content += `<option>--Chọn trạng thái--</option>`;
            for (let i = 0; i<data.length; i++) {
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
function save() {
    let home
    let name = $("#name").val()
    let bedroom_count = $("#bedroom_count").val()
    let bathroom_count = $("#bathroom_count").val()
    let description = $("#description").val()
    let price = $("#price").val()
    let district = $("#select_district").val()
    let status = $("#select_status").val()
    let files = $("#file")[0].files

    let formData = new FormData()

    for (let i = 0; i < files.length; i++) {
        formData.append("image" + i, files[i])
    }

    let id = +localStorage.getItem("idUpdate")

    if (file === undefined) {
        file = new File([], "", undefined)
    }

    if (id !== -1) {
        home = {
            id: id,
            name: name,
            bedroom_count: bedroom_count,
            bathroom_count: bathroom_count,
            description: description,
            price: price,
            address: {
                idAddress: district
            },
            status: {
                idStatus: status
            },
            image: localStorage.getItem("img")
        }
    } else {
        home = {
            name: name,
            bedroom_count: bedroom_count,
            bathroom_count: bathroom_count,
            description: description,
            price: price,
            address: {
                idAddress: district
            },
            status: {
                idStatus: status
            }
        }
    }


    formData.append("homes",
        new Blob([JSON.stringify(home)], {type: 'application/json'}))

    $.ajax({
        url: "http://localhost:8080/api/homes",
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Create successfully!")
            displayAll1()
            localStorage.setItem("idUpdate", "-1")
        }
    })
    document.getElementById("form").reset()
    event.preventDefault()
}
function displayImg(id) {
    var settings = {
        "url": `http://localhost:8080/api/homes/img/${id}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        let content = "";
        for (let i = 0; i < response.length; i++) {
            content += `<img style="width: 100px" src="../../src/main/resources/static/image/${response[i].image}" alt=""/>`
        }
        document.getElementById("img" + id).innerHTML = content;
    });
}