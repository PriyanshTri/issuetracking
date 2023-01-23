if(localStorage.key(0)==null){
  localStorage.setItem("new",JSON.stringify([]));
  localStorage.setItem("development",JSON.stringify([]));
  localStorage.setItem("qa", JSON.stringify([]));
  localStorage.setItem("finished",JSON.stringify([]));
  }
  $(document).ready(function(){
      createNewCard();
      $(window).scroll(function(){
          if(this.scrollY > 20){
              $('.navbar').addClass("sticky");
          }else{
              $('.navbar').removeClass("sticky");
          }
      });}); 
  let mybutton = document.getElementById("scroll-to-top");
  window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  function topScroll() {
    document.documentElement.scrollTop = 0;
  }
  $("#add").click(
    function(event){
      event.preventDefault();
      let r ="id" + Math.random().toString(16).slice(2);
      let issue=$('#issue').val();
      let assigned=$('#assigned-to').val();
      let desc=$('#exampleFormControlTextarea1').val();
      let sev=$('#sev').find(":selected").val();
      let card={
        "hash":r,
        "issue":issue,
        "assigned":assigned,
        "desc":desc,
        "sev":sev
      };
      addNew(card);
    }
  );
  let hash;
  function createNewCard(){
  let newOut=JSON.parse(localStorage.getItem('new'));
  $('.cardAdd').empty();
  $('.card-add').empty();
  for(var x of newOut){
    hash=x['hash'];
    let temp=`<br><div class="card">
    <div class="card-body">
      <p class="card-title text-start">Issue Id: ${x['hash']}</p>
      <p class="alert alert-primary">OPEN</p>
      <h5 class="card-title alert alert-danger">${x['issue']}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Assigned To <br> ${x['assigned']}</h6>
      <p class="card-text alert alert-dark">description: <br>${x['desc']}</p>
      <h5 class="card-text">Severity: ${x['sev']}</h5>
      <button type="button" class="btn btn-danger" onclick="deleteIssue(hash)">Delete</button>
      <button type="button" class="btn btn-primary" >Next</button></div>
  </div><br>`;
  $('.cardAdd').prepend(temp);
  $('.card-add').prepend(temp);
  }
  };
  function deleteIssue(hash){
    let newIssue=localStorage.getItem('new');
    console.log(newIssue+" "+typeof(newIssue));
    // for(let i =0;i<newIssue.length;i++){
    //   if(newIssue[i]['hash']==hash){
    //     break;
    //   }
    // // }
    // newArray=newArray(newIssue);
    newIssue.split(',');
  
    console.log(JSON.parse(newIssue)+typeof(newIssue))
  }
  function newArray(newIssue){
     
  }
  // function nextIssue(){
  
  // }
  function addNew(card){
    let item=localStorage.getItem('new');
    item=JSON.parse(item);
    item.push(card);
    localStorage.setItem('new',JSON.stringify(item));
    console.log(localStorage.getItem('new'));
    createNewCard();
  }