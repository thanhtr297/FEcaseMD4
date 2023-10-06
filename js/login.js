function login() {
    let username = $("#username").val()
    let password = $("#password").val()

    let user = {
        username: username,
        password: password
    }
    localStorage.setItem("account", username)
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/api/auth/login",
        type: "POST",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem("token", data.token)
            window.location.href = "index.html"
            getAcc()
        }
    })
}

function getAcc (){
    let acc = localStorage.getItem("acc");
    var settings = {
        "url": `http://localhost:8080/api/homes/findAcc/${acc}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
    });
}