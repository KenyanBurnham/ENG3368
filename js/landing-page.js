
Parse.initialize("lu2wn7m838wzGanrsTSUpiyZb7nB1zIGcYSpetbu", "Juyu0Q7PvhRm0lJ10mRHUKe0ubTdbJ3MzxkeivIP");

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function collapseError() {
  setTimeout(  function() { $("#emailSubmitError").collapse("hide"); }, 2000);
}

function saveEmailWithParse(email, shouldContact, message) {

  var EmailList = Parse.Object.extend("EmailList");
  var emailList = new EmailList();

  emailList.set("shouldContact", shouldContact);
  emailList.set("email", email);
  emailList.set("isCurrentUser", false);
  emailList.set("comment", message);
  emailList.save(null, {
        success: function (emailList) {
        },
        error: function (emailList, error) {
        }
  });
}

$(document).ready(function() {

  $('#lh-why-signup-btn').focus(function() {this.blur()});

$('#lh-feelgood-signup-btn').focus(function() {this.blur()});

  $("#modalForm").on("submit", function (event) {
    event.preventDefault();

    var address = $("#emailAddress2").val();
    var shouldContact = $("#shouldContact").prop("checked");
    if(IsEmail(address)){
      saveEmailWithParse(address, shouldContact, "");
      $("#myModal").modal('hide');
    } else {
      $("#emailSubmitError").collapse("show");
      collapseError();
    }

  });

  // Listen for the question form submission.
  $("#questionsForm").on("submit", function(event) {
    event.preventDefault();
    // Get the form content.
    var emailAddress = $("#emailAddress3").val(),
        message = $("#questionsTextArea").val();
    // Validate the form content (email address).
    if(IsEmail(emailAddress)) {
      // Check that there is some text in the box.
      if(message) {

        saveEmailWithParse(emailAddress, true, message);

        // Send the email using cloud code.
        Parse.Cloud.run("sendQuestionEmail",
            {
              emailAddress: $("#emailAddress3").val(),
              message: $("#questionsTextArea").val()
            },
            {
              success: function (response) {
                emailAddress: $("#emailAddress3").val("");
                message: $("#questionsTextArea").val("");

                $("#submissionSuccessAlert").collapse("show");
                setTimeout(function() {
                  $("#submissionSuccessAlert").collapse("hide")
                }, 3000);
              },
              error: function(error) {
                $("#serverErrorAlert").collapse("show");
                setTimeout(function() {
                  $("#serverErrorAlert").collapse("hide")
                }, 3000);
              }
            }
        );
        // Indicate to the user that the form was submitted succesfully.
        // Add the user to the emailList.
      } else {
        $("#invalidMessageAlert").collapse("show");
        setTimeout(function() {
          $("#invalidMessageAlert").collapse("hide")
        }, 3000);
      }
    } else {
        // Indicate an invalid email.
        $("#invalidEmailAlert").collapse("show");
        setTimeout(function() {
          $("#invalidEmailAlert").collapse("hide")
        }, 3000);
    }

  });

});
