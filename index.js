function addData(){
    var username = document.getElementById("username");
    var message = document.getElementById("message");
    postData(username.value , message.value);
    username.value = ""
    message.value = ""
}

function postData(username,message){
    var url = "https://sample-json-curd-data.onrender.com/users";
    var options = {
        "method" : "POST",
        "headers" : {
            "Content-Type" : "application/json"
        },
        "body" : JSON.stringify({
            username,
            message
        })
    }

    fetch(url , options)
        .then(response => {
            if(response.ok){
                alert("Data Added Successfully...");
                displayData();
            }
        })
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
        })
}

function displayData(){
    var container = document.getElementById("container");
    fetch("https://sample-json-curd-data.onrender.com/users")
        .then(res => res.json())
        .then(data => {
            for(var obj of data){
                var item = document.createElement("div"); //<div> </div>
                item.className = "item text-uppercase fs-5 border border-3 border-warning rounded rounded-2 my-2 p-3";                    //<div class="item" > </div>
                var usernamePara = document.createElement("p");//<p> </p>
                var messagePara = document.createElement("p"); //<p> </p>
                
                //adding data into paragraph
                var {username , message} = obj;
                usernamePara.innerText = username; //<p> Ameer </p>
                messagePara.innerText = message;   //<p> Never give up </p>

                //adding paragraphs into item <div class = "item"> </div>
                item.appendChild(messagePara);
                item.appendChild(usernamePara);
                /**
                 * <div class="item">
                 *      <p>Never give up</p>
                 *      <p>Ameer</p>
                 * </div>
                 */
                container.appendChild(item);
            }
        })
}
displayData();