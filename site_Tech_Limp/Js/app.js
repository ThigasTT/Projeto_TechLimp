var acc = document.getElementsByClassName("btn-class");

for(var i=0; i<acc.length;i++){
    acc[i].addEventListener("click",function(){

this.classList.toggle("active");
this.parentElement.classList.toggle("active");

var infosText = this.nextElementSibling;
if(infosText.style.display === "block"){
    infosText.style.display = "none";
}else{
    infosText.style.display = "block";
}
    });
}