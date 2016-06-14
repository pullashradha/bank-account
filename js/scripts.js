//Business Logic

function Account (name,deposit) {
  this.name = name;
  this.balance = deposit;
}

Account.prototype.deposit = function (depositAmount) {
  this.balance += depositAmount;
}

Account.prototype.withdrawal = function (withdrawalAmount) {
  this.balance -= withdrawalAmount;
}


//User Interface Logic
$(document).ready(function () {
  $("form#new-account").submit(function(event) {
    event.preventDefault();

    var nameInput = $("input#new-name").val();
    var initialDepositInput = parseInt($("input#initial-deposit").val());

    var newAccount = new Account (nameInput,initialDepositInput);
    $("#account-info").show();
    $("#account-balance").text(newAccount.balance);

    $("#new-name").val("");
    $("#initial-deposit").val("");
  });
  $("#deposit-form").submit(function(event){
    event.preventDefault();



    $("#deposit").val("");
  });
  $("#withdrawal-form").submit(function(event){
    event.preventDefault();

    $("#withdrawal").val("");
  });
});
