
function registration() {
    let email = $('#email').val();
    let password = $('#password').val();
    let again = $('#again').val();
    if (password != again) {
        alert("Mật khẩu không trùng khớp");
        return;
    }
    let otp = createRandomFourDigitNumber();
    localStorage.setItem("otp",otp);
    let sdi = {
        name: otp ,
        username: email,
         email : email ,
    }

    let acc = {
        username : email ,
        password : password,
        role :{
            id :2
        }
    }


    localStorage.setItem("acc" , JSON.stringify(acc))  ;

    var settings = {
        "url": "http://localhost:8080/api/client/create",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(sdi),
    };
    $.ajax(settings).done(function (response) {
    });

    alert("Mã xác nhận đã được gửi vui lòng kiểm tra hộp thư của bạn");
    window.location.href = "checkMail.html";

}



function checkMail() {
    let password = $('#checkMail').val();
    if (password == localStorage.getItem("otp")) {
        alert("Đăng ký thành công");
        register();
    } else {
        alert("Mã xác nhận không đúng vui lòng nhập lại")
    }
}
function createRandomFourDigitNumber() {
    const min = 100000; // Số nguyên dương nhỏ nhất có 4 chữ số
    const max = 999999; // Số nguyên dương lớn nhất có 4 chữ số
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function register() {
    let user = localStorage.getItem("acc")
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/api/auth/register",
        type: "POST",
        data: JSON.stringify(JSON.parse(user)),
        success: function (data) {
            alert(data)
            window.location.href = "login.html"
        }
    })
}


