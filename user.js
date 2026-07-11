async function displayData(){
    let res=await fetch("/Students")
    try{
        if(!res.ok){
            throw new Error("Data not getting");
        }
        let data=await res.json();
        showdata(data);
    }catch(error){
        console.log(error);
    }
}

let container=document.getElementById("container");
function showdata(data){
    data.forEach(element => {
        let item=document.createElement('div');
        item.className="inner_container";
        item.innerHTML=`
        <p>Name: ${element.name}</p>
        <img src='${element.image}'>`
        container.appendChild(item);
    });
}

addEventListener("DOMContentLoaded",displayData);