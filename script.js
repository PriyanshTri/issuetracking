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
  $('#new-issue').trigger('reset');
  addNew(hash,card);
});

function createNewCard() {
  if(localStorage.key(0)==null){
    return;
  }
  $(".newCardAdd").empty();
  $(".devCardAdd").empty();
  $(".qaCardAdd").empty();
  $(".finCardAdd").empty();
  for (let i=0;i< localStorage.length;i++) {
    let details=JSON.parse(localStorage.getItem(localStorage.key(i)));
    let btn_prev=details['state']=='Open'? "Delete": "Previous";
    let btn_next=details['state']=='Finished'? "Delete": "Next";
    let temp = `<br><div class="card">
    <div class="card-body">
      <p class="card-title text-start">Issue Id: ${details['hash']}<button style="float:right;border-radius:25%;" onclick="deleteCard('${details['hash']}')"><i class="fa-sharp fa-solid fa-circle-xmark" ></i></button></p>
      <p class="alert alert-primary">${details['state']}</p>
      <h5 class="card-title alert alert-danger">${details["issue"]}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Assigned To <br> ${details["assigned"]}</h6>
      <p class="card-text alert alert-dark">description: <br>${details["desc"]}</p>
      <h5 class="card-text">Severity: ${details["sev"]}</h5>
      <button type="button" class="btn btn-danger" onclick="deleteIssue('${details['hash']}','${details['state']}')">${btn_prev}</button>
      <button type="button" class="btn btn-primary" onclick="nextIssue('${details['hash']}','${details['state']}')" >${btn_next}</button></div>
  </div><br>`;
  $(".card-add").prepend(temp);
    if(details['state']=="Open"){
    $(".newCardAdd").prepend(temp);
    }
    else if(details['state']=="Development"){
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
function deleteCard(hash){
  localStorage.removeItem(hash);
  $(".newCardAdd").empty();
  $(".devCardAdd").empty();
  $(".qaCardAdd").empty();
  $(".finCardAdd").empty();
  createNewCard();
}
function deleteIssue(hash,state){
  let details=JSON.parse(localStorage.getItem(hash));
  if(state=="Open"){
    localStorage.removeItem(hash);
    $(".newCardAdd").empty();
  }
  else if(state=="Development"){
    details['state']="Open";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    console.log(localStorage.getItem(hash)+" second");
    $(".devCardAdd").empty();
  }
  else if(state=="QA"){
    details['state']="Development";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    $(".qaCardAdd").empty();
  }
  else if(state=='Finished'){
    details['state']="QA";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    $(".finCardAdd").empty();
  }
  $(".card-add").empty();
  createNewCard();
}
function nextIssue(hash, state){
  let details=JSON.parse(localStorage.getItem(hash));
  if(state=='Open'){
    details['state']="Development";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    console.log(localStorage.getItem(hash)+" second");
    $(".newCardAdd").empty();
  }
  else if(state=='Development'){
    details['state']="QA";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    console.log(localStorage.getItem(hash)+" second");
    $(".devCardAdd").empty();
  }
  else if(state=='QA'){
    details['state']="Finished";
    localStorage.removeItem(hash);
    localStorage.setItem(hash,JSON.stringify(details));
    console.log(localStorage.getItem(hash)+" second");
    $(".qaCardAdd").empty();
  }
  else if(state=='Finished'){
    localStorage.removeItem(hash);
    $(".finCardAdd").empty();
  }
  createNewCard();
}

function addNew(hash,card) {
  localStorage.setItem(hash, JSON.stringify(card));
  console.log(card+" "+"done");
  createNewCard();
}