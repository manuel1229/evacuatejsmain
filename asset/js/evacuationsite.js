var firebaseConfig = {
    apiKey: "AIzaSyAexoKQd7Mi6Of7cLSLAH7vq7Ymq2ILZPQ",
    authDomain: "evacuateisad.firebaseapp.com",
    databaseURL: "https://evacuateisad-default-rtdb.firebaseio.com",
    projectId: "evacuateisad",
    storageBucket: "evacuateisad.appspot.com",
    messagingSenderId: "880708938906",
    appId: "1:880708938906:web:be4eaf69a49e0b5d99c323",
    measurementId: "G-EKMCWF5M2Z"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let tbody = document.getElementById('tbody');
let nameV = document.getElementById('nameC');
let cityV = document.getElementById('cityC');
let addressV = document.getElementById('addressC');
let editname = document.getElementById('editname');
let editcity = document.getElementById('editcity');
let editaddress = document.getElementById('editaddress');
let idV = document.getElementById('id');
        

// database.ref('announcement').on('value', readdata)
// function readdata(snapshoot){
//     console.log(snapshoot.val());
function clrData(){
    cityV.value=''
    nameV.value=''
    addressV.value=''
    
}
function createData(){
    
    let data = {
        city: cityV.value,
        name: nameV.value,
        address: addressV.value
    };
    database.ref('evacsite').push(data);
    $('#exampleModal1').modal('hide');
    cityV.value=''
    nameV.value=''
    addressV.value=''
}


    database.ref('evacsite').on('value', viewdata);
        function viewdata(snapshot){
            let table='';
            let no = 1;
            snapshot.forEach((data)=> {
                table += `
                <tr>
                    <th scope="row">${no}</th>
                    <td>${data.val().city}</td>
                    <td>${data.val().name}</td>
                    <td>${data.val().address}</td>  
                    <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    onclick="editRow('${
                        data.key
                    }')">
                    Update
                    </button>

                    <button type="button" class="btn btn-danger" onclick="deleteRow('${data.key}')">Delete
                    </button>
                    </td>
                    
                </tr>
            `;     
            no++;         
            });
        tbody.innerHTML = table;
      
}

function editRow(id){
   
    database.ref('evacsite/' + id).on('value', function(snapshot){
        editcity.value = snapshot.val().city;
        editname.value = snapshot.val().name;
        editaddress.value = snapshot.val().address;
        idV.value = id;
    });
}

function updateData() {
    let updateData = document.getElementById('updateData')
    let data = {
        city: editcity.value,
        name: editname.value,
        address: editaddress.value
    };
    database.ref('evacsite/'+ idV.value).update(data);
    $('#exampleModal').modal('hide');
    // updateData.setAttribute('data-bs-dismiss', 'modal');
    

}

function deleteRow(id){
    database.ref('evacsite/'+ id).remove();
}


