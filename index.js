var container = document.getElementById("container");

function addData() {
    var username = document.getElementById("username");
    var message = document.getElementById("message");
    postData(username, message);
}

function postData(username, message) {
    if (username.value == "" || message.value == "") {
        alert("Enter username or message properly");
    }
    else {
        var url = "https://sample-json-curd-data.onrender.com/users";
        var options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "username": username.value,
                "message": message.value
            })
        }
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    alert("Data added Successfully");
                    displayData();
                    username.value = '';
                    message.value = '';
                }
            })
    }
}

function displayData(){
    container.innerHTML = '';
    fetch("https://sample-json-curd-data.onrender.com/users")
        .then(res => res.json())
        .then(data => {
            for(var obj of data){
                var element = document.createElement("div");
                element.className = "element d-flex";
                element.innerHTML = `
                    <div class='item border border-3 border-warning p-2 m-2 rounded rounded-3 text-uppercase fs-5'>
                        <p>${obj.message}</p>
                        <p>${obj.username}</p>
                    </div>
                    <button class='btn btn-close' onclick=deleteData('${obj.id}')></button>
                `
                container.appendChild(element);

            }
        })
}
displayData();

function deleteData(id){
    var options = {
        "method" : "DELETE"
    }
    fetch(`https://sample-json-curd-data.onrender.com/users/${id}`,options)
        .then(response => {
            if(response.ok){
                alert("Data Deleted Successfully");
                displayData();
            }
        })
}