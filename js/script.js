document.addEventListener("DOMContentLoaded",function(){
const menuIcon=document.querySelector(".menu-icon");
const navLinks=document.querySelector(".nav-links");
if(menuIcon){
menuIcon.addEventListener("click",function(){
navLinks.classList.toggle("active");
});
}
const contactForm=document.querySelector(".contact-form form");
if(contactForm){
contactForm.addEventListener("submit",function(event){
event.preventDefault();
const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const message=document.getElementById("message").value.trim();
if(name===""){
alert("Please enter your name");
return;
}
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailPattern.test(email)){
alert("Enter valid email");
return;
}
if(message===""){
alert("Message required");
return;
}
alert("Message sent successfully");
contactForm.reset();
});
}
});