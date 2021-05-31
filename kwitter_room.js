var firebaseConfig = {
    apiKey: "AIzaSyCm3T0EMfKdNJyN7O4tLSnbk6Ozs1nQDU4",
    authDomain: "kwitter-12dfd.firebaseapp.com",
    databaseURL: "https://kwitter-12dfd-default-rtdb.firebaseio.com",
    projectId: "kwitter-12dfd",
    storageBucket: "kwitter-12dfd.appspot.com",
    messagingSenderId: "463553680858",
    appId: "1:463553680858:web:4efff1f4535879cfb41ce3",
    measurementId: "G-31544TNP5G"
  };

  firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");

document.getElementById("username").innerHTML = "Welcome " + username + "!";

function addRoom()
{
  room = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room).update({
    purpose : "Room Added!"
  });

  localStorage.setItem("room_name", room);

  window.location = "kwitter_chat.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    Room_names = childKey;

    console.log("Room Name is " + Room_names);

    output = "<div class='room_name' id='" + Room_names + "' onclick='navigateToRoomName(this.id)'>#" + Room_names + " <br> <hr> </div>";

    document.getElementById("output").innerHTML += output;

});
});

}

getData();

function navigateToRoomName(room_name)
{
  console.log(room_name);

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_chat.html";
}

function logout()
{
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
