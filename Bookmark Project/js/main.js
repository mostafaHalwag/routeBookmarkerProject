var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var siteList
if (localStorage.getItem("siteList") == null) {
    siteList =[];
}
else{
    siteList = JSON.parse(localStorage.getItem("siteList"));
    display()
}





function addSite(){
    if (siteUrl.classList.contains('is-invalid') || siteName.classList.contains('is-invalid')) {
        document.getElementById('overlay').classList.replace('d-none', 'd-flex');
    }
    else{
    var site={
        name:siteName.value,
        url:siteUrl.value
    }

    siteList.push(site);
    localStorage.setItem("siteList",JSON.stringify(siteList));
    display();
    clearInput();
    }
}

function clearInput(){
    siteName.value = "";
    siteUrl.value = "";
}

function display(){
    var cartoona = ``
    var urlRegex = /[A-Za-z0-9]+\.[A-Za-z]+/i;
    for (var i = 0; i < siteList.length; i++) {
        cartoona += `
        <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td>
                    <button class="btn btn-visit" onclick="visitSite(${i})" data-index="${i}">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger btn-delete pe-2" onclick="deleteSite(${i})" data-index="${i}">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>`
        document.getElementById('siteList').innerHTML = cartoona
    }

}

function deleteSite(index){
    siteList.splice(index, 1);
    localStorage.setItem("siteList",JSON.stringify(siteList));
    display();
}

function visitSite(index){
    open(`https://${siteList[index].url}`);
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
});

function closeModal() {
    document.getElementById('overlay').classList.replace("d-flex","d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

document.getElementById("closeBtn").addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});