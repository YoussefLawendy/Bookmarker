var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var siteContentInput = document.getElementById("siteContentInput");

var allSites = JSON.parse(localStorage.getItem("allSites")) || [];

function submitBtn() {
    var Sites = {
        nameSite: siteNameInput.value,
        nameURL: siteURLInput.value,
    };

    allSites.push(Sites);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    displaySites();
    clearForm();
}

function displaySites() {
    var cartoona = "";

    for (var i = 0; i < allSites.length; i++) {
        cartoona += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${allSites[i].nameSite}</td>
                    <td>
                        <a href="${allSites[i].nameURL}" class="btn btn-success" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i> Visit</a>
                        
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </td>
                </tr>
                `;
    }

    siteContentInput.innerHTML = cartoona;
}

function deleteSite(index) {
    allSites.splice(index, 1);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    displaySites();
}

function visitSite(index) {
    var url = allSites[index].nameURL;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    window.open(url, "_blank");
}

function clearForm() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}
