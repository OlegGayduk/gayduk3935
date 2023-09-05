const update = async ()=>{

    let students = await fetch("/students")
    .then(response => response.json())
    .then(data => {
        return data
    }).catch(err =>{
        console.warn(err)
        return []
    })

    return students
}

const renderStudents = (array)=>{
    let html = ""
    for(let i in array){
        html+=
        `
        <div class="card" style="width: 100%;">
            <div class="card-body" onclick="MsgShow(${i})" group=${array[i].group}>
              ${array[i].name}                             
            </div>
        </div>
        `
    }
    // console.log(html)
    document.getElementById("students").innerHTML = html
}

function getXhrType() {

    var x;
    
    try {
        x = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            x = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            x = 0;
        }
    }
    
    if(!x && typeof XMLHttpRequest != 'undefined') x = new XMLHttpRequest();
    
    return x;
}

function MsgShow(id) {
    var x = getXhrType();

    x.open("POST", "/get_name", true);
        
    var id = {
        id: id,
    };
        
    x.setRequestHeader("Content-Type", "application/json");
        
    x.send(JSON.stringify(id));
        
    x.onload = function() {
        
        if(this.responseText == 0) {
            alert("Error!");
        } else {
            alert(this.responseText);
        }   
        
        x.onerror = function() {
            alert(this.responseText);
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector("[btn]").addEventListener("click", ()=>{
        update().then(data=>{
            console.table(data)
            renderStudents(data)
        })
    })
})