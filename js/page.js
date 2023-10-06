let arrProduct;
let listDisplayPage;

function findAllProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/products",
        success: function (data) {
            numberPage = 0;
            arrProduct = data;
            listDisplayPage = data.reverse();
            // showProduct(data.content);
            showPage()
        }
    })
}

let numberPage;
let totalPage;

function showPage() {
    let data = listDisplayPage;
    let elementPage = 5;
    totalPage = Math.ceil(data.length / elementPage);
    // numberPage;
    //lưu numberPage ra biến Global
    let startPage = (numberPage * elementPage);
    let endPage = ((numberPage + 1) * elementPage);
    let subArr = data.slice(startPage, endPage);
    showProduct(subArr);
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

function showProduct(data) {
    let text = "";
    for (let i = 0; i < data.length; i++) {
        text += `<tr>
                     <td>${i + 1}</td>
                     <td>${data[i].name}</td>
                     <td>${data[i].price}</td>
                     <td>${data[i].quantity}</td>
                     <td>${data[i].description}</td>
                     <td><img src="../../src/main/resources/static/image/${data[i].image}" style="width: 100px; height: 100px" alt="image"></td>
                     <td>${data[i].brand.name}</td>
                     <td><div id="show_category${i}"></div></td>
                     <td><button class="btn-outline-primary" onclick="showUpdate(${data[i].id})">Update</button></td>
                     <td><button class="btn-outline-warning" onclick="deleteProduct(${data[i].id})">Delete</button></td>
                     </tr>`
    }
    document.getElementById("product_body").innerHTML = text;
    showCategory(data);
    showBrand();
    showCategories()
}
