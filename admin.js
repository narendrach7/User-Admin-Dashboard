async function fetchdata(){
    let res=await fetch("/Students");
    try{
        if(!res.ok){
            throw new Error("Data not fetching");
        }
        let data=await res.json();
        showdata(data);
    }catch(error){
        console.log(error)
    }
}

function showdata(data){
    let container=document.getElementById("container");
    let item=document.createElement('div');
    item.innerHTML=data.map(student=>{
        return `<p>Id: ${student.id}</p>
        <p>Name: ${student.name}</p>
        <button id='delete${student.id}'>Delete</button>
        <button id='edit${student.id}'>Edit</button>
        `
    }).join("");
    container.appendChild(item);
    data.forEach(student=>{
        let deletebtn=document.getElementById(`delete${student.id}`);
        let editbtn=document.getElementById(`edit${student.id}`);
        deletebtn.onclick=()=>{
            deleteData(student.id);
        }
        editbtn.onclick=()=>{
            editData(student.id);
        }
    });
}

//Deleting the Data
async function deleteData(id) {
    let res=await fetch(`/Students/${id}`,{"method":"DELETE"})
    try {
        if(!res.ok){
            throw new Error("Data Not Deleted");
            
        }
        alert("data Deleted")
    } catch (error) {
        console.log(error);
    }
}

//editing the data
async function editData(id) {
    let studentId=document.getElementById("id");
    let stName=document.getElementById("name");
    let image=document.getElementById("image")
    let res=await fetch(`/Students/${id}`)
    try {
        if(!res.ok){
            throw new Error("Data not getting in inputfields");
            
        }
        let data=await res.json();
        studentId.value=data.id;
        stName.value=data.name;
        image.value=data.image

    } catch (error) {
        console.log(error)
    }
}




//save data

async function savedata(){
   let studentId=document.getElementById("id").value;
   let name=document.getElementById("name").value;
   let image=document.getElementById("image").value;

   let obj={
    "name":name,
    "image":image
   }

   let StudentMethod=studentId?"PUT":"POST";
   const URL=studentId?`/Students/${studentId}`:"/Students"

   let res=await fetch(URL,{
    "method":StudentMethod,
    "headers":{
        "Content-Type":"application/json"
    },
    "body":JSON.stringify(obj)
   })
   try {
    if(!res.ok){
        throw new Error("Data Not Updated");
        
    }
    alert("data Updated Successfully")
   } catch (error) {
    
   }


}

addEventListener("DOMContentLoaded",fetchdata);