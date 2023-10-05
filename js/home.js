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
                        <td>${data[i].address}</td>
                        <td>${data[i].bedroom_count}</td>
                        <td>${data[i].bathroom_count}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].price}</td>
<!--                        Chưa xử lý image//-->
                        <td><img style="width: 100px; height: 100px" src="../src/main/resources/static/image/${data[i].image}" alt=""></td>

                        <td>${data[i].status}</td>
                        <td>${data[i].account}</td>
                        
                        <td><button onclick="updateProduct(${data[i].id})">Update</button></td>
                        <td><button onclick="deleteProduct(${data[i].id})">Delete</button></td>
                        </tr>`
            }
            content += `</table>`
            document.getElementById("homes").innerHTML = content
        }
    })
}

function demoDisplay() {
    $.ajax({
        url: "http://localhost:8080/api/homes",
        type: "GET",
        success: function (data) {
            arr = data
            let content = ""
            for (let i = 0; i < arr.length; i++) {
                content += `
<div class="col-xl-3 col-lg-4 col-md-6">
    <div class="product-item">
        <div class="position-relative bg-light overflow-hidden">
            <img class="img-fluid w-100" src="../img/chien.jpg" alt="">
            <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
        </div>
        <div class="text-center p-4">
            <a class="d-block h5 mb-2" href="">${arr[i].name}</a>
            <span class="text-primary me-1">Gia: ${arr[i].price}|</span>
            <span class="text-body"> Phong ngu: ${arr[i].bedroom_count}</span>
        </div>
        <div class="d-flex border-top">
            <small class="w-50 text-center border-end py-2">
                <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>Xem chi tiết</a>
            </small>
            <small class="w-50 text-center py-2">
                <a class="text-body" href=""><i class="far fa-heart"></i>  Ưa thích</a>
            </small>
        </div>
    </div>
</div>`
            }
            document.getElementById("homes").innerHTML = content
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