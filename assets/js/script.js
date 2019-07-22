          
          var firebaseConfig = {
            apiKey: "AIzaSyD6R8viiiaTOmRpZs0YyRz3GS8GvgOFGWo",
            authDomain: "databse-project-bfbed.firebaseapp.com",
            databaseURL: "https://databse-project-bfbed.firebaseio.com",
            projectId: "databse-project-bfbed",
            storageBucket: "databse-project-bfbed.appspot.com",
            messagingSenderId: "372408428015",
            appId: "1:372408428015:web:b9b1f9afc5f7c677"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          var database = firebase.database();
          // Assume the following situations.
      
          // (TEST 1)
          // First Train of the Day is 3:00 AM
          // Assume Train comes every 3 minutes.
          // Assume the current time is 3:16 AM....
          // What time would the next train be...? (Use your brain first)
          // It would be 3:18 -- 2 minutes away
      
          // (TEST 2)
          // First Train of the Day is 3:00 AM
          // Assume Train comes every 7 minutes.
          // Assume the current time is 3:16 AM....
          // What time would the next train be...? (Use your brain first)
          // It would be 3:21 -- 5 minutes away
      
      
          // ==========================================================
      
          // Solved Mathematically
          // Test case 1:
          // 16 - 00 = 16
          // 16 % 3 = 1 (Modulus is the remainder)
          // 3 - 1 = 2 minutes away
          // 2 + 3:16 = 3:18
      
          // Solved Mathematically
          // Test case 2:
          // 16 - 00 = 16
          // 16 % 7 = 2 (Modulus is the remainder)
          // 7 - 2 = 5 minutes away
          // 5 + 3:16 = 3:21
        // Your web app's Firebase configuration
         // Assumptions
         var tFrequency = $("#frequency").val(); //#frequency
      
         // Time is 3:30 AM
         var firstTime = $("#militaryTime").val();

         var firstTimeConverted;

         var diffTime; 

         var tMinutesTillTrain;

         var trainName;

         var destination;

         var nextTrain

         var i = 1;
         // Current Time
         var currentTimeUnformated = moment();//get current time
         var currentTime =moment(currentTimeUnformated).format("hh:mm");
         console.log("CURRENT TIME: " + currentTime);

        
        $("#addNewTrain").on("click",function(){
            event.preventDefault();
            //debugger;

            
            tFrequency = ($("#frequency").val())*1;
            firstTime = $("#militaryTime").val();
            
            trainName = $("#trainName").val();
            destination = $("#destination").val();
            fireBase();
            getTrainInfo();
        //     $("#trainSchdeule").append(`<tr>
        //     <th scope="row">${i}</th>
        //     <td>${trainName}</td>
        //     <td>${destination}</td>
        //     <td>${tFrequency}</td>
        //     <td>${nextTrain}</td>
        //     <td>${tMinutesTillTrain}</td>
        //   </tr>`);
        //   i++;

        });
        function fireBase(){
              database.ref().push({
                  trainName : trainName,
                  destination : destination,
                  frequency : tFrequency,
                  dateAdded : firebase.database.ServerValue.TIMESTAMP
              });
        }
          
         
          function getTrainInfo(){

          // First Time (pushed back 1 year to make sure it comes before current time)
          firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
          console.log(firstTimeConverted);
      
          // Difference between the times
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);
      
          // Time apart (remainder)
          var tRemainder = diffTime % tFrequency;
          console.log(tRemainder);
      
          // Minute Until Train
          tMinutesTillTrain = tFrequency - tRemainder; 
          console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);//mintus away
      
          // Next Train
          var nextTrainUnformated = moment().add(tMinutesTillTrain, "minutes");
         nextTrain = moment(nextTrainUnformated).format("hh:mm");
          console.log("ARRIVAL TIME: " + nextTrain);//next time

        }
        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val().trainName);
            var name = childSnapshot.val().trainName;
            console.log(name);
            var destination = childSnapshot.val().destination;
            console.log(destination);
            var frequency = childSnapshot.val().frequency;
            getTrainInfo();
            $("#trainSchdeule").append(`<tr>
            <th scope="row">${i}</th>
            <td>${name}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${nextTrain}</td>
            <td>${tMinutesTillTrain}</td>
        </tr>`);
        i++
        });