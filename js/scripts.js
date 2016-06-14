//Business Logic

var checkIfNumber = function(input) {
  return (parseInt(input));
}

function Account (name,deposit) {
  this.name = name;
  this.savings = deposit;
  this.checking = 0;
}

Account.prototype.deposit = function (depositAmount, checkingOrSavings) {
  if (parseInt(depositAmount)>0) {
    if (checkingOrSavings === "savings") {
      this.savings += depositAmount;
    } else if (checkingOrSavings === "checking") {
      this.checking += depositAmount;
    }
  } else alert ("Please enter a valid amount.")
}

Account.prototype.withdrawal = function (withdrawalAmount, checkingOrSavings) {
  if (parseInt(withdrawalAmount)>0) {
    if (checkingOrSavings === "savings") {
      if (this.savings >= withdrawalAmount) {
        this.savings -= withdrawalAmount;
      } else if (this.savings < withdrawalAmount) {
        alert("Error, not enough money in savings bank account");
        return false;
      }
      return true;
    } else if (checkingOrSavings === "checking") {
      if (this.checking >= withdrawalAmount) {
        this.checking -= withdrawalAmount;
      } else if (this.checking < withdrawalAmount) {
        alert("Error, not enough money in checking bank account");
        return false;
      }
      return true;
    }
  } else alert ("Please enter a valid amount.")
}

Account.prototype.transfer = function(transferAmount, fromAccount, toAccount) {
  if (this.withdrawal(transferAmount,fromAccount)) {
    this.deposit(transferAmount,toAccount);
  }
}


//User Interface Logic
$(document).ready(function () {
  $("#new-account form").submit(function(event) {
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
      var depositInput = parseInt($("input#savings").val());
      newAccount.deposit(depositInput,"savings");
      $("#savings-balance").text(newAccount.savings);
      $("#savings").val("");
    });
    $("#deposit-checking").click(function(event){
      event.preventDefault();
      var depositInput = parseInt($("input#checking").val());
      newAccount.deposit(depositInput,"checking");
      $("#checking-balance").text(newAccount.checking);
      $("#checking").val("");
    });

    $("#withdrawal-savings").click(function(event){
      event.preventDefault();
      var withdrawalInput = parseInt($("input#savings").val());
      newAccount.withdrawal(withdrawalInput, "savings");
      $("#savings-balance").text(newAccount.savings);
      $("#savings").val("");
    });
    $("#withdrawal-checking").click(function(event){
      event.preventDefault();
      var withdrawalInput = parseInt($("input#checking").val());
      newAccount.withdrawal(withdrawalInput, "checking");
      $("#checking-balance").text(newAccount.checking);
      $("#checking").val("");
    });

    $("#transfer-to-checking").click(function(event){
      event.preventDefault();
      var transferInput = parseInt($("input#savings").val());
      newAccount.transfer(transferInput, "savings","checking");
      $("#checking-balance").text(newAccount.checking);
      $("#savings-balance").text(newAccount.savings);
      $("#savings").val("");
    });
    $("#transfer-to-savings").click(function(event){
      event.preventDefault();
      var transferInput = parseInt($("input#checking").val());
      newAccount.transfer(transferInput, "checking","savings");
      $("#checking-balance").text(newAccount.checking);
      $("#savings-balance").text(newAccount.savings);
      $("#checking").val("");
    });
  });
});
