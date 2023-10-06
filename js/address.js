// function displayCity() {
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/cities`,
//         success: function (data) {
//             let content = "<label for='select_city' class=\"fw-bold\">Thành phố</label><br>"
//             content += '<select id="select_city" onchange="displayDistrict()" class="form-select">';
//             content += `<option>--Chọn thành phố-- </option>`;
//             for (let i = 0; i < data.length; i++) {
//
//                 content += `<option value = ${data[i].idCity}> ${data[i].name} </option>`;
//             }
//             content += '</select>'
//             document.getElementById("city").innerHTML = content;
//         }
//
//     })
// }
//
// function displayDistrict() {
//     let idCity = $('#select_city').val();
//     $.ajax({
//         type: "POST",
//         url: `http://localhost:8080/api/addresses/city/${idCity}`,
//         success: function (data) {
//             let content = "<label for='select_district' class=\"fw-bold\">Quận</label><br>"
//             content += '<select id="select_district"  class="form-select">';
//             for (let i = 0; i < data.length; i++) {
//                 content += `<option value = ${data[i].idAddress}> ${data[i].name} </option>`;
//             }
//             content += '</select>'
//             document.getElementById("district").innerHTML = content;
//         }
//     })
// }
//
// function displayStatus() {
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/api/status`,
//         success: function (data) {
//             let content = "<label for='select_status' class=\"fw-bold\">Trạng thái</label><br>"
//             content += '<select id="select_status"  class="form-select">';
//             content += `<option>--Chọn trạng thái-- </option>`;
//             for (let i = 0; i < data.length; i++) {
//                 content += `<option value = ${data[i].idStatus}> ${data[i].name} </option>`;
//             }
//             content += '</select>'
//             document.getElementById("status").innerHTML = content;
//         }
//
//     })
// }
//
// function displayAddress() {
//     displayCity();
//     displayDistrict();
//     displayStatus()
// }
//
// function Filter() {
//     let price = $("#price").val();
//     let priceValue = price.split("-")
//     let minPrice = priceValue[0];
//     let maxPrice = priceValue[1];
//     let count_bathroom = $("#bathroom").val();
//     let count_bedroom = $("#bedroom").val();
//     let idCity = $('#select_city').val();
//     if(idCity === "--Chọn thành phố--") {
//         idCity = null;
//     }
//     let idDistrict = $('#select_district').val();
//     if(idDistrict === undefined) {
//         idDistrict = null;
//     }
//     let idStatus = $('#select_status').val();
//     if(idStatus === "--Chọn trạng thái--") {
//         idStatus = null;
//     }
//     newFilter = {
//         minPrice: minPrice,
//         maxPrice: maxPrice,
//         count_bathroom: count_bathroom,
//         count_bedroom: count_bedroom,
//         city: {
//             idCity: idCity
//         },
//         address: {
//             idAddress: idDistrict
//         },
//         status: {
//             idStatus: idStatus
//         }
//     }
//
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "POST",
//         data: JSON.stringify(newFilter),
//         url: "http://localhost:8080/api/filters",
//         success: function (arr) {
//             if (arr == null) {
//                 document.getElementById("homes").innerHTML = "Khong tim thay"
//             } else {
//                 let content = ""
//                 for (let i = 0; i < arr.length; i++) {
//                     content += `<div class="col-xl-3 col-lg-4 col-md-6">
//                  <div class="product-item">
//                     <div class="position-relative bg-light overflow-hidden">
//                         <img class="img-fluid w-100" src="../img/chien.jpg" alt="">
//                             <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
//                     </div>
//                     <div class="text-center p-4">
//                     <a class="d-block h5 mb-2" href="">${arr[i].name}</a>
//                     <span class="text-primary me-1">Gia: ${arr[i].price}|</span>
//                     <span class="text-body"> Phong ngu: ${arr[i].bedroom_count}</span>
//                     </div>
//                     <div class="d-flex border-top">
//                     <small class="w-50 text-center border-end py-2">
//                     <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>Xem chi tiết</a>
//                     </small>
//                     <small class="w-50 text-center py-2">
//                     <a class="text-body" href=""><i class="far fa-heart"></i>  Ưa thích</a>
//                     </small>
//                     </div>
//                 </div>
//             </div>`
//                 }
//                 document.getElementById("homes").innerHTML = content
//             }
//         }
//
//     });
//     event.preventDefault()
// }