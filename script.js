const ADMIN_CODE = "2007";

// 1. قاعدة البيانات (تحميل من الذاكرة أو القائمة الافتراضية)
let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Pringles", code: "QTR1001", cat: "Snacks", aisle: "2", floor: "1", img: "images/pringles.webp" },
    { name: "Water Alshamal", code: "QTR1002", cat: "Drinks", aisle: "2", floor: "1", img: "images/water.webp" },
    { name: "Baked Cake", code: "QTR1003", cat: "Bakery", aisle: "2", floor: "1", img: "images/cake.webp" },
    { name: "Flowers", code: "QTR1004", cat: "Plants", aisle: "2", floor: "1", img: "images/flowers.webp" },
    { name: "Vegetables", code: "QTR1010", cat: "Fruits", aisle: "3", floor: "1", img: "images/fruit-and-vegetables.jpg" },
    { name: "Lays", code: "QTR1011", cat: "Snacks", aisle: "2", floor: "1", img: "images/lays.jpg" }
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");

// دالة الحفظ
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// 2. دالة عرض المنتجات
function renderProducts(list) {
    grid.innerHTML = "";
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <h3>${p.name}</h3>
            <p>القسم: ${p.cat}</p>
            <p>الممر: ${p.aisle} | الطابق: ${p.floor}</p>
            <p><strong>Barcode: ${p.code}</strong></p>
            <button onclick="deleteProduct('${p.code}')" style="background:#dc3545; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; width:100%; margin-top:10px;">حذف المنتج</button>
        `;
        grid.appendChild(card);
    });
}

// 3. دالة الحذف
function deleteProduct(barcode) {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
        products = products.filter(p => p.code !== barcode);
        saveProducts();
        renderProducts(products);
    }
}

// 4. محرك البحث
search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q)
    );
    renderProducts(filtered);
});

// 5. لوحة الإدارة
function openAdmin() {
    const code = prompt("أدخل كود المسؤول:");
    if (code === ADMIN_CODE) {
        document.getElementById("adminPanel").style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        alert("كود خاطئ");
    }
}

function addProduct() {
    const name = document.getElementById("prodName").value;
    const code = document.getElementById("prodCode").value;
    const cat = document.getElementById("prodCat").value;
    const aisle = document.getElementById("prodAisle").value;
    const floor = document.getElementById("prodFloor").value;
    const img = document.getElementById("prodImg").value || "images/default.png";

    if (name && code) {
        products.push({ name, code, cat, aisle, floor, img });
        saveProducts();
        renderProducts(products);
        alert("تمت الإضافة بنجاح!");
        document.querySelectorAll("#adminPanel input").forEach(i => i.value = "");
    } else {
        alert("يرجى تعبئة الاسم والباركود");
    }
}

// 6. الكاميرا الحقيقية (الماسح الضوئي)
let html5QrCode;

function startScan() {
    document.getElementById("reader").style.display = "block";
    document.getElementById("stopBtn").style.display = "inline-block";
    document.getElementById("scanBtn").style.display = "none";

    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 15, qrbox: { width: 250, height: 150 } };

    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            search.value = decodedText;
            search.dispatchEvent(new Event('input'));
            stopScan();
            alert("تم العثور على الباركود: " + decodedText);
        },
        (errorMessage) => {}
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

// تشغيل العرض عند البدء
renderProducts(products);
