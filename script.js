const ADMIN_CODE="2007";

let products = JSON.parse(localStorage.getItem("products")) || [

{name:"Pringles",code:"QTR1001",cat:"Snacks",aisle:"2",floor:"1",img:"images/pringles.webp"},
{name:"Water Alshamal",code:"QTR1002",cat:"Drinks",aisle:"2",floor:"1",img:"images/water.webp"},
{name:"Baked Cake",code:"QTR1003",cat:"Bakery",aisle:"2",floor:"1",img:"images/cake.webp"},
{name:"Flowers",code:"QTR1004",cat:"Plants",aisle:"2",floor:"1",img:"images/flowers.webp"},
{name:"Vegetables",code:"QTR1010",cat:"Fruits",aisle:"3",floor:"1",img:"images/fruit-and-vegetables.jpg"},
{name:"Lays",code:"QTR1011",cat:"Snacks",aisle:"2",floor:"1",img:"images/lays.jpg"}

];

const grid=document.getElementById("productGrid");
const search=document.getElementById("searchInput");

function saveProducts(){
localStorage.setItem("products",JSON.stringify(products));
}

function renderProducts(list){

grid.innerHTML="";

list.forEach(p=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`
<img src="${p.img}">
<h3>${p.name}</h3>
<p>القسم: ${p.cat}</p>
<p>الممر: ${p.aisle}</p>
<p>الطابق: ${p.floor}</p>
<p>Barcode: ${p.code}</p>
`;

grid.appendChild(card);

});

}

renderProducts(products);

search.addEventListener("input",()=>{

const q=search.value.toLowerCase();

const filtered=products.filter(p=>

p.name.toLowerCase().includes(q)||
p.code.toLowerCase().includes(q)||
p.cat.toLowerCase().includes(q)

);

renderProducts(filtered);

});

function openAdmin(){

const code=prompt("Admin Code");

if(code===ADMIN_CODE){

document.getElementById("adminPanel").style.display="block";

}else{

alert("كود خاطئ");

}

}

function addProduct(){

const name=document.getElementById("prodName").value;
const code=document.getElementById("prodCode").value;
const cat=document.getElementById("prodCat").value;
const aisle=document.getElementById("prodAisle").value;
const floor=document.getElementById("prodFloor").value;

const img="images/default.png";

products.push({name,code,cat,aisle,floor,img});

saveProducts();

renderProducts(products);

alert("تم إضافة المنتج");

}