let count = 1;
$(document).ready(function () {
  createNewCard();
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }
  });
});
let mybutton = document.getElementById("scroll-to-top");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topScroll() {
  document.documentElement.scrollTop = 0;
}
$("#add").click(function (event) {
  event.preventDefault();
  let hash = "id" + Math.random().toString(16).slice(2);
  let issue = $("#issue").val();
  let assigned = $("#assigned-to").val();
  let desc = $("#exampleFormControlTextarea1").val();
  let sev = $("#sev").find(":selected").val();
  let card = {
    'hash': hash,
    'issue': issue,
    'assigned': assigned,
    'desc': desc,
    'sev': sev,
    'state': "Open",
  };
  addNew(hash,card);
});

function createNewCard() {
  if(localStorage.key(0)==null){
    return;
  }
  $(".newCardAdd").empty();
  $(".card-add").empty();
  for (let i=0;i< localStorage.length;i++) {
    let details=JSON.parse(localStorage.getItem(localStorage.key(i)));
    let btn_prev=details['state']=='Open'? "Delete": "Previous";
    let btn_next=details['state']=='Finished'? "Delete": "Next";
    let temp = `<br><div class="card">
    <div class="card-body">
      <p class="card-title text-start">Issue Id: ${details['hash']}</p>
      <p class="alert alert-primary">${details['state']}</p>
      <h5 class="card-title alert alert-danger">${details["issue"]}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Assigned To <br> ${details["assigned"]}</h6>
      <p class="card-text alert alert-dark">description: <br>${details["desc"]}</p>
      <h5 class="card-text">Severity: ${details["sev"]}</h5>
      <button type="button" class="btn btn-danger" onclick="deleteIssue()">${btn_prev}</button>
      <button type="button" class="btn btn-primary" onclick="nextIssue()" >${btn_next}</button></div>
  </div><br>`;
  $(".card-add").prepend(temp);
    if(details['state']=="Open"){
    $(".newCardAdd").prepend(temp);
    }
    else if(details['state']=="development"){
      $(".devCardAdd").prepend(temp);
    }
    else if(details['state']=="QA"){
      $(".qaCardAdd").prepend(temp);
    }
    else if(details['state']=='Finished'){
      $(".finCardAdd").prepend(temp);
    }
  }
}
function deleteIssue(hash){
  console.log(hash);
  // localStorage.removeItem(hash);
  $(".newCardAdd").empty();
  $(".card-add").empty();
  createNewCard();
}
function addNew(hash,card) {
  localStorage.setItem(hash, JSON.stringify(card));
  console.log(card+" "+"done");
  createNewCard();
}
