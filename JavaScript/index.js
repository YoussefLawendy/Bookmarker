const siteNameInput = document.getElementById("siteName");
const siteURLInput = document.getElementById("siteURL");
const siteContentInput = document.getElementById("siteContentInput");

let allSites = JSON.parse(localStorage.getItem("allSites")) || [];

function submitBtn() {
    const siteName = siteNameInput.value.trim();
    const siteURL = siteURLInput.value.trim();

    if (!siteName || !siteURL) {
        alert("Please fill in both fields.");
        return;
    }

    if (!isValidURL(siteURL)) {
        alert("Please enter a valid URL");
        return;
    }

    if (
        allSites.some((s) => s.nameSite === siteName || s.nameURL === siteURL)
    ) {
        alert("This site is already bookmarked.");
        return;
    }

    const site = {
        nameSite: siteName,
        nameURL: siteURL,
    };
    allSites.push(site);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    displaySites();
    clearForm();
    alert("Bookmark added successfully!");
}

function displaySites() {
    let cartoona = "";

    allSites.forEach((site, index) => {
        cartoona += `
            <tr>
                <td>${index + 1}</td>
                <td>${site.nameSite}</td>
                <td>
                    <a href="${
                        site.nameURL
                    }" class="btn btn-success" onclick="visitSite(${index}); return false;"><i class="fa-solid fa-eye"></i> Visit</a>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteSite(${index})"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            </tr>
        `;
    });

    siteContentInput.innerHTML = cartoona;
}

function deleteSite(index) {
    if (confirm("Are you sure you want to delete this bookmark?")) {
        allSites.splice(index, 1);
        localStorage.setItem("allSites", JSON.stringify(allSites));
        displaySites();
        alert("Bookmark deleted successfully!");
    }
}

function visitSite(index) {
    let url = allSites[index].nameURL;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    window.open(url, "_blank");
}

function clearForm() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}

function isValidURL(url) {
    const urlPattern =
        /^(https?:\/\/)?(www\.)?[\da-z\.-]+\.[a-z]{2,6}([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
}

displaySites();
