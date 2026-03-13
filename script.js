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
let html5QrCode;

function startScan() {
    // إظهار حاوية الكاميرا والأزرار
    document.getElementById("reader").style.display = "block";
    document.getElementById("stopBtn").style.display = "inline-block";
    document.getElementById("scanBtn").style.display = "none";

    html5QrCode = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 250, height: 150 } };

    html5QrCode.start(
        { facingMode: "environment" }, // استخدام الكاميرا الخلفية
        config,
        (decodedText) => {
            // ماذا يحدث عند قراءة الباركود بنجاح:
            document.getElementById("searchInput").value = decodedText;
            
            // تشغيل الفلترة تلقائياً
            search.dispatchEvent(new Event('input'));
            
            // إيقاف الكاميرا بعد القراءة لراحة المستخدم
            stopScan();
            
            // تنبيه بسيط (اختياري)
            alert("تم قراءة الباركود: " + decodedText);
        },
        (errorMessage) => {
            // خطأ في القراءة (يتم تجاهله لكي يستمر المسح)
        }
    ).catch((err) => {
        alert("خطأ في تشغيل الكاميرا: " + err);
    });
}

function stopScan() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById("reader").style.display = "none";
            document.getElementById("stopBtn").style.display = "none";
            document.getElementById("scanBtn").style.display = "inline-block";
        });
    }
}
}
