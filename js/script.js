let assessmentChart=null;
async function loadNavbar(){
const response=await fetch("components/navbar.html");
const html=await response.text();
document.getElementById("navbarContainer").innerHTML=html;
initializeNavbar();
}
document.addEventListener("DOMContentLoaded",loadNavbar);
async function loadFooter(){
const response=await fetch("components/footer.html");
const html=await response.text();
document.getElementById("footerContainer").innerHTML=html;
}
document.addEventListener("DOMContentLoaded",loadFooter);
window.addEventListener("load",()=>{
const loader=document.getElementById("loader");
if(loader){
setTimeout(()=>{
loader.classList.add("hidden");
},900);
}
});
const progressBar=document.getElementById("progressBar");
if(progressBar){
window.addEventListener("scroll",()=>{
const total=document.documentElement.scrollHeight-window.innerHeight;
const progress=(window.scrollY/total)*100;
progressBar.style.width=progress+"%";
});
}
const scrollTopBtn=document.getElementById("scrollTop");
if(scrollTopBtn){
window.addEventListener("scroll",()=>{
if(window.scrollY>400){
scrollTopBtn.classList.add("show");
}
else{
scrollTopBtn.classList.remove("show");
}
});
scrollTopBtn.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});
}
function initializeNavbar(){
const menu=document.getElementById("menuToggle");
const links=document.querySelector(".nav-links");
const themeToggle=document.getElementById("themeToggle");

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark");
themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';

}
else{

localStorage.setItem("theme","light");

themeToggle.innerHTML='<i class="fa-solid fa-moon"></i>';

}

});
const currentPage=window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link=>{

const href=link.getAttribute("href");

if(href===currentPage){

link.classList.add("active");

}

});
menu.addEventListener("click",()=>{
menu.classList.toggle("open");
links.classList.toggle("show");
});
window.addEventListener("scroll",()=>{
const navbar=document.querySelector(".navbar");
if(window.scrollY>20){
navbar.classList.add("sticky");
}
else{
navbar.classList.remove("sticky");
}
});
}
document.addEventListener("DOMContentLoaded",initializeServiceFilter);

function initializeServiceFilter(){

const searchInput=document.getElementById("serviceSearch");

const filter=document.getElementById("serviceFilter");

const cards=document.querySelectorAll(".service-card");

if(!searchInput||!filter||cards.length===0){
return;
}

const savedFilter=localStorage.getItem("serviceFilter");

if(savedFilter){
filter.value=savedFilter;
}

filterServices();

searchInput.addEventListener("input",filterServices);

filter.addEventListener("change",()=>{

localStorage.setItem("serviceFilter",filter.value);

filterServices();

});


function filterServices(){

const search=searchInput.value.toLowerCase();

const category=filter.value;

const noServices=document.getElementById("noServicesMessage");

let visibleCards=0;

cards.forEach(card=>{

const title=card.querySelector("h3").textContent.toLowerCase();

const description=card.querySelector("p").textContent.toLowerCase();

const matchesSearch=

title.includes(search)||description.includes(search);

const matchesCategory=

category==="all"||

card.dataset.category===category;

if(matchesSearch&&matchesCategory){

card.style.display="block";

visibleCards++;

}

else{

card.style.display="none";

}

});

if(noServices){

if(visibleCards===0){

noServices.style.display="block";

}

else{

noServices.style.display="none";

}

}

}
}


document.addEventListener("DOMContentLoaded",initializeServiceModal);


function initializeServiceModal(){

const modal=document.getElementById("serviceModal");

if(!modal){
return;
}

const title=document.getElementById("modalTitle");

const description=document.getElementById("modalDescription");

const featureList=document.getElementById("modalFeatures");

const icon=document.getElementById("modalIcon");

const closeButton=document.getElementById("closeModal");

const buttons=document.querySelectorAll(".service-btn");

const services={

consulting:{
icon:"fa-solid fa-lightbulb",
title:"AI Consulting",
description:"Identify business opportunities where Artificial Intelligence can improve efficiency, automate workflows, and support better decision making.",
features:[
"Business Analysis",
"AI Strategy Planning",
"Digital Transformation",
"Implementation Roadmap"
]
},

automation:{
icon:"fa-solid fa-robot",
title:"Workflow Automation",
description:"Automate repetitive tasks using intelligent digital workflows designed to improve productivity and operational efficiency.",
features:[
"Process Automation",
"Workflow Optimization",
"Productivity Improvement",
"Operational Efficiency"
]
},

analytics:{
icon:"fa-solid fa-chart-line",
title:"Predictive Analytics",
description:"Analyze historical data to discover trends, forecast outcomes, and support informed business decisions.",
features:[
"Data Visualization",
"Trend Analysis",
"Forecast Reports",
"Business Insights"
]
},

chatbot:{
icon:"fa-solid fa-comments",
title:"AI Chatbots",
description:"Develop conversational AI interfaces that provide quick responses and improve customer engagement.",
features:[
"Customer Support",
"Instant Responses",
"Conversation Flow",
"Knowledge Base"
]
},

vision:{
icon:"fa-solid fa-camera",
title:"Computer Vision",
description:"Create image recognition solutions capable of identifying objects, patterns, and visual information.",
features:[
"Image Recognition",
"Object Detection",
"Pattern Analysis",
"Visual Automation"
]
},

cloud:{
icon:"fa-solid fa-cloud",
title:"Cloud AI Solutions",
description:"Build scalable AI applications using cloud technologies that support flexibility, performance, and future growth.",
features:[
"Cloud Integration",
"Scalable Architecture",
"Secure Deployment",
"High Availability"
]
}

};
buttons.forEach(button=>{

button.addEventListener("click",event=>{

event.preventDefault();

const key=button.dataset.service;

const service=services[key];

title.textContent=service.title;

description.textContent=service.description;

icon.innerHTML=`<i class="${service.icon}"></i>`;

featureList.innerHTML="";

service.features.forEach(feature=>{

const li=document.createElement("li");

li.textContent=feature;

featureList.appendChild(li);

});

modal.classList.add("show");

});

});
closeButton.addEventListener("click",()=>{

modal.classList.remove("show");

});

modal.addEventListener("click",event=>{

if(event.target===modal){

modal.classList.remove("show");

}

});

document.addEventListener("keydown",event=>{

if(event.key==="Escape"){

modal.classList.remove("show");

}

});

}

document.addEventListener("DOMContentLoaded",initializeCalculator);


function initializeCalculator(){

const form=document.getElementById("calculatorForm");

if(!form){
return;
}

const estimatedCost=document.getElementById("estimatedCost");

form.addEventListener("submit",event=>{

event.preventDefault();

const type=parseFloat(document.getElementById("projectType").value);

const industry=parseFloat(document.getElementById("industry").value);

const size=parseFloat(document.getElementById("projectSize").value);

const timeline=parseFloat(document.getElementById("projectTimeline").value);

const users=parseFloat(document.getElementById("projectUsers").value);

const budget=parseFloat(document.getElementById("budget").value);

let featureCost=0;

document.querySelectorAll(".feature:checked").forEach(feature=>{

featureCost+=parseFloat(feature.value);

});

let total=type;

total*=industry;

total*=size;

total*=timeline;

total*=users;

total*=budget;

total+=featureCost;

animateCost(total);

showToast();

const panel=document.querySelector(".calculator-result");

panel.classList.remove("result-highlight");

void panel.offsetWidth;

panel.classList.add("result-highlight");

updateProjectSummary(total);

generateProjectSummary(total);

saveEstimate(total);

renderEstimateHistory();

});

}

function formatCurrency(value){

return new Intl.NumberFormat("en-IN",{

style:"currency",

currency:"INR",

maximumFractionDigits:0

}).format(value);

}

function updateProjectSummary(total){

const timeline=document.getElementById("estimatedTimeline");

const complexity=document.getElementById("projectComplexity");

const team=document.getElementById("teamSize");

if(total<150000){

timeline.textContent="4-6 Weeks";

complexity.textContent="Low";

team.textContent="2 Members";

}

else if(total<300000){

timeline.textContent="8-10 Weeks";

complexity.textContent="Medium";

team.textContent="3 Members";

}

else{

timeline.textContent="12-16 Weeks";

complexity.textContent="High";

team.textContent="4-5 Members";

}

}
function saveEstimate(total){

const history=JSON.parse(localStorage.getItem("estimateHistory"))||[];

const project=document.getElementById("projectType").options[document.getElementById("projectType").selectedIndex].text;

let complexity="Low";

if(total>=300000){

complexity="High";

}
else if(total>=150000){

complexity="Medium";

}

history.unshift({

project,

cost:formatCurrency(total),

complexity

});

if(history.length>5){

history.pop();

}

localStorage.setItem("estimateHistory",JSON.stringify(history));

}
function renderEstimateHistory(){

const body=document.getElementById("historyBody");

if(!body){
return;
}

const history=JSON.parse(localStorage.getItem("estimateHistory"))||[];

if(history.length===0){

body.innerHTML=`
<tr>
<td colspan="3">No estimates generated yet.</td>
</tr>
`;

return;

}

body.innerHTML="";

history.forEach(item=>{

body.innerHTML+=`
<tr>
<td>${item.project}</td>
<td>${item.cost}</td>
<td>${item.complexity}</td>
</tr>
`;

});

}
function initializeEstimateHistory(){

const button=document.getElementById("clearHistory");

if(!button){
return;
}

renderEstimateHistory();

button.addEventListener("click",()=>{

localStorage.removeItem("estimateHistory");

renderEstimateHistory();

});

}

document.addEventListener("DOMContentLoaded",initializeEstimateHistory);

function generateProjectSummary(total){

const cards=document.querySelectorAll(".summary-card p");

if(cards.length===0){
return;
}

const project=document.getElementById("projectType").options[document.getElementById("projectType").selectedIndex].text;

const industry=document.getElementById("industry").options[document.getElementById("industry").selectedIndex].text;

let timeline="4-6 Weeks";
let complexity="Low";
let team="2 Members";

if(total>=150000){
timeline="8-10 Weeks";
complexity="Medium";
team="3 Members";
}

if(total>=300000){
timeline="12-16 Weeks";
complexity="High";
team="4-5 Members";
}

cards[0].textContent=project;
cards[1].textContent=industry;
cards[2].textContent=formatCurrency(total);
cards[3].textContent=timeline;
cards[4].textContent=complexity;
cards[5].textContent=team;

}
function showToast(){

const toast=document.getElementById("toast");

if(!toast){
return;
}

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}
function animateCost(total){

const element=document.getElementById("estimatedCost");

if(!element){
return;
}

let current=0;

const duration=1200;

const increment=total/(duration/16);

const timer=setInterval(()=>{

current+=increment;

if(current>=total){

current=total;

clearInterval(timer);

}

element.textContent=formatCurrency(Math.round(current));

},16);

}

document.addEventListener("DOMContentLoaded",initializeAssessment);

function initializeAssessment(){

const container=document.getElementById("questionContainer");

if(!container){
return;
}

const questions=[

"Does your organization have digital business processes?",

"Is business data stored digitally?",

"Does your organization use cloud-based software?",

"Are employees comfortable using digital tools?",

"Do you regularly analyze business data?",

"Do you have clearly defined business workflows?",

"Does your organization maintain secure customer data?",

"Are repetitive tasks identified for automation?",

"Is management interested in AI adoption?",

"Do you currently use analytics dashboards?",

"Do you have sufficient digital infrastructure?",

"Is your internet and network infrastructure reliable?",

"Does your organization invest in employee training?",

"Are technology upgrades performed regularly?",

"Are you planning AI implementation within the next year?"

];

questions.forEach((question,index)=>{

container.innerHTML+=`

<div class="assessment-card">

<h3>Question ${index+1}</h3>

<p>${question}</p>

<div class="assessment-options">

<label>

<input type="radio" name="q${index}" value="2" required>

Yes

</label>

<label>

<input type="radio" name="q${index}" value="1">

Partially

</label>

<label>

<input type="radio" name="q${index}" value="0">

No

</label>

</div>

</div>

`;

});
const form=document.getElementById("assessmentForm");

form.addEventListener("submit",function(e){

e.preventDefault();

calculateAssessment();

});
}

function calculateAssessment(){

const form=document.getElementById("assessmentForm");

const data=new FormData(form);

let score=0;

for(let value of data.values()){

score+=Number(value);

}

const percentage=Math.round((score/30)*100);

updateAssessmentResult(percentage);

}

function updateAssessmentResult(score){

const scoreElement=document.getElementById("readinessScore");

const levelElement=document.getElementById("readinessLevel");

const recommendation=document.getElementById("recommendationText");

scoreElement.textContent=score+"%";

let level="";

let message="";

if(score>=80){

level="High";

message="Your organization has a strong digital foundation and is well prepared to adopt AI solutions. Focus on automation, analytics, and advanced AI applications.";

}
else if(score>=50){

level="Medium";

message="Your organization has a good starting point for AI adoption. Strengthen digital processes, improve data quality, and train employees before implementing advanced AI solutions.";

}
else{

level="Low";

message="Your organization should first improve its digital infrastructure, data management, and employee readiness before investing in AI initiatives.";

}

levelElement.textContent=level;

levelElement.className="level-badge";

if(level==="High"){
levelElement.classList.add("level-high");
}
else if(level==="Medium"){
levelElement.classList.add("level-medium");
}
else{
levelElement.classList.add("level-low");
}

recommendation.textContent=message;

saveAssessment(score,level,message);

drawAssessmentChart(score);

document.getElementById("assessmentResult").scrollIntoView({

behavior:"smooth"

});

}
function updateAssessmentResult(score){

const scoreElement=document.getElementById("readinessScore");

const levelElement=document.getElementById("readinessLevel");

const recommendation=document.getElementById("recommendationText");

scoreElement.textContent=score+"%";

let level="";

let message="";

if(score>=80){

level="High";

message="Your organization has a strong digital foundation and is well prepared to adopt AI solutions. Focus on automation, analytics, and advanced AI applications.";

}
else if(score>=50){

level="Medium";

message="Your organization has a good starting point for AI adoption. Strengthen digital processes, improve data quality, and train employees before implementing advanced AI solutions.";

}
else{

level="Low";

message="Your organization should first improve its digital infrastructure, data management, and employee readiness before investing in AI initiatives.";

}

levelElement.textContent=level;

recommendation.textContent=message;

saveAssessment(score,level,message);

drawAssessmentChart(score);

document.getElementById("assessmentResult").scrollIntoView({

behavior:"smooth"

});

}


function saveAssessment(score,level,message){

const result={

score,

level,

message,

date:new Date().toLocaleDateString()

};

localStorage.setItem(

"assessmentResult",

JSON.stringify(result)

);

}

function drawAssessmentChart(score){

const canvas=document.getElementById("assessmentChart");

if(!canvas){
return;
}

if(assessmentChart){
assessmentChart.destroy();
}

assessmentChart=new Chart(canvas,{

type:"doughnut",

data:{

labels:["Ready","Remaining"],

datasets:[{

data:[score,100-score],

backgroundColor:[
"#4f46e5",
"#e5e7eb"
],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{
position:"bottom"
}

},

cutout:"72%"

}

});

}
document.addEventListener("DOMContentLoaded",initializeDashboard);

function initializeDashboard(){

if(!document.getElementById("totalEstimates")){
return;
}

const history=JSON.parse(localStorage.getItem("calculatorHistory"))||[];

const assessment=JSON.parse(localStorage.getItem("assessmentResult"));

document.getElementById("totalEstimates").textContent=history.length;

if(assessment){

document.getElementById("dashboardScore").textContent=assessment.score+"%";

document.getElementById("dashboardLevel").textContent=assessment.level;

document.getElementById("dashboardAssessment").innerHTML=`
<div class="history-item">
<strong>Score:</strong> ${assessment.score}%<br>
<strong>Level:</strong> ${assessment.level}<br>
<strong>Date:</strong> ${assessment.date}
</div>
`;

}

document.getElementById("dashboardTheme").textContent=document.body.classList.contains("dark")?"Dark":"Light";

const container=document.getElementById("dashboardHistory");

if(history.length===0){

container.innerHTML="No estimate history available.";

return;

}

container.innerHTML="";

history.slice().reverse().forEach(item=>{

container.innerHTML+=`
<div class="history-item">
<strong>${item.project}</strong><br>
Cost : ${item.cost}<br>
Date : ${item.date}
</div>
`;

});

}
document.addEventListener("DOMContentLoaded",initializeContact);

function initializeContact(){

const form=document.getElementById("contactForm");

if(!form){
return;
}

form.addEventListener("submit",function(e){

e.preventDefault();

const data={

name:document.getElementById("contactName").value,

company:document.getElementById("company").value,

email:document.getElementById("contactEmail").value,

project:document.getElementById("contactProject").value,

budget:document.getElementById("contactBudget").value,

message:document.getElementById("contactMessage").value,

date:new Date().toLocaleDateString()

};

const messages=JSON.parse(localStorage.getItem("contactMessages"))||[];

messages.push(data);

localStorage.setItem("contactMessages",JSON.stringify(messages));

showToast();

form.reset();

});

}
document.addEventListener("DOMContentLoaded",()=>{

const main=document.querySelector("main");

if(main){

main.classList.add("page-animation");

}

});