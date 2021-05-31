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
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_tag = "<h3>" + name + "<img class='user_tick' src='tick.png'> <br>";
         message_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'";
         span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

         output = name_tag + message_tag + like_button + span_tag;
         document.getElementById("output").innerHTML += output;
} 
});  
}); 
}

getData();

function updateLike(message_id)
{
  likes = document.getElementById(message_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes
  });

}
function send()
{
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
        name : username,
        message : msg,
        like : 0
    });

    document.getElementById("msg").value = "";
}

function logout()
{
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

function back()
{
    window.location = "kwitter_room.html";
}
