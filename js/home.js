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
            <img class="img-fluid w-100" src="../img/chien.jpg" alt="">
            <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
        </div>
        <div class="text-center p-4">
            <span class="d-block h5 mb-2" href="">${data[i].name}</span>
            <span class="text-primary me-1">Giá: ${data[i].price}</span>
            <span class="text-body"> Phòng ngủ: ${data[i].bedroom_count}</span>
            <span class="text-body"> Phòng tắm: ${data[i].bathroom_count}</span>
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
