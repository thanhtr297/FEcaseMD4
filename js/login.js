function login() {
    let username = $("#username").val()
    let password = $("#password").val()

    let user = {
        username: username,
        password: password
    }

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
        }
    })
}
