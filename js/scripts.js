//Business Logic

function Account (name,deposit) {
  this.name = name;
  this.savings = deposit;
  this.checking = 0;
}

Account.prototype.deposit = function (depositAmount, checkingOrSavings) {
  if (checkingOrSavings === "savings") {
    this.savings += depositAmount;
  } else if (checkingOrSavings === "checking") {
      this.checking += depositAmount;
  }
}

Account.prototype.withdrawal = function (withdrawalAmount, checkingOrSavings) {
  if (checkingOrSavings === "savings") {
    if (this.savings >= withdrawalAmount) {
      this.savings -= withdrawalAmount;
    } else if (this.savings < withdrawalAmount) {
      alert("Error, not enough money in savings bank account");
    }
  } else if (checkingOrSavings === "checking") {
    if (this.checking >= withdrawalAmount) {
      this.checking -= withdrawalAmount;
    } else if (this.checking < withdrawalAmount) {
      alert("Error, not enough money in checking bank account");
    }
  }
}


//User Interface Logic
$(document).ready(function () {
  $("form#new-account").submit(function(event) {
    event.preventDefault();

    var nameInput = $("input#new-name").val();
    var initialDepositInput = parseInt($("input#initial-deposit").val());

    var newAccount = new Account (nameInput,initialDepositInput);
    $("#account-info").show();
    $("#savings-balance").text(newAccount.savings);
    $("#checking-balance").text(newAccount.checking);

    $("#new-name").val("");
    $("#initial-deposit").val("");
    $("#new-account").hide();

    $("#deposit-savings").click(function(event){
      event.preventDefault();
      var depositInput = parseInt($("input#deposit").val());
      newAccount.deposit(depositInput,"savings");
      $("#savings-balance").text(newAccount.savings);
      $("#deposit").val("");
    });
    $("#deposit-checking").click(function(event){
      event.preventDefault();
      var depositInput = parseInt($("input#deposit").val());
      newAccount.deposit(depositInput,"checking");
      $("#checking-balance").text(newAccount.checking);
      $("#deposit").val("");
    });

    $("#withdrawal-savings").click(function(event){
      event.preventDefault();
      var withdrawalInput = parseInt($("input#withdrawal").val());
      newAccount.withdrawal(withdrawalInput, "savings");
      $("#savings-balance").text(newAccount.savings);
      $("#withdrawal").val("");
    });
    $("#withdrawal-checking").click(function(event){
      event.preventDefault();
      var withdrawalInput = parseInt($("input#withdrawal").val());
      newAccount.withdrawal(withdrawalInput, "checking");
      $("#checking-balance").text(newAccount.checking);
      $("#withdrawal").val("");
    });
  });
});
