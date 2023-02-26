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
let titleV = document.getElementById('title');
let descriptionV = document.getElementById('description');
let edittitle = document.getElementById('edittitle');
let editdescription = document.getElementById('editdescription');
let idV = document.getElementById('id');
        

// database.ref('announcement').on('value', readdata)
// function readdata(snapshoot){
//     console.log(snapshoot.val());



    database.ref('announcement').on('value', viewdata);
        function viewdata(snapshot){
            let table='';
            let no = 1;
            snapshot.forEach((data)=> {
                table += `
                <tr>
                    <th scope="row">${no}</th>
                    <td>${data.val().title}</td>
                    <td>${data.val().description}</td>  
                    <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    onclick="editRow('${
                        data.key
                    }')">
                    Update
                    </button></td>

                </tr>
            `;     
            no++;         
            });
        tbody.innerHTML = table;
      
}

function editRow(id){
   
    database.ref('announcement/' + id).on('value', function(snapshot){
        edittitle.value = snapshot.val().title;
        editdescription.value = snapshot.val().description;
        idV.value = id;
    });
}

function updateData() {
    let updateData = document.getElementById('updateData')
    let data = {
        title: edittitle.value,
        description: editdescription.value
    };
    database.ref('announcement/'+ idV.value).update(data);
    updateData.setAttribute('data-bs-dismiss', 'modal');
    

}


