let siteNameInput = document.getElementById("siteName");
let siteURLInput = document.getElementById("siteURL");
let siteContentInput = document.getElementById("siteContentInput");
let urlValidation = document.getElementById("URLValidation");
let NameValidation = document.getElementById("nameValidation");
const SubmitBtn = document.getElementById("submitBtn");
const urlPattern =
    /^(https?:\/\/)?(www\.)+[\da-z\.-]+\.[a-z]{2,6}([\/\w \.-]*)*\/?$/;

let unfocusName = false;
let unfocusURL = false;

let allSites = JSON.parse(localStorage.getItem("allSites")) || [];
SubmitBtn.disabled = true;
function submitBtn() {
    const siteName = siteNameInput.value.trim();
    const siteURL = siteURLInput.value.trim();

    if (!siteName || !siteURL) {
        Swal.fire({
            icon: "error",
            title: "invalid data",
            text: "Please fill in both fields.",
            confirmButtonColor: "#198754",
        });
        return;
    }

    if (!isValidURL(siteURL)) {
        alert("Please enter a valid URL");
        return;
    }

    if (
        allSites.some((s) => s.nameSite === siteName || s.nameURL === siteURL)
    ) {
        Swal.fire({
            title: "This site is already bookmarked.",
            icon: "warning",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `,
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `,
            },
        });
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

    Swal.fire({
        title: "Good job!",
        text: "Bookmark added successfully!",
        icon: "success",
        confirmButtonColor: "#198754",
    });
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
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        iconHtml:
            "<i class='fa-solid fa-trash' style='color: red; font-size: 30px;'></i>",
        iconColor: "transparent",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#198754",
        confirmButtonText: "Yes, delete it!",
        customClass: {
            icon: "swal2-icon swal2-icon-custom",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            allSites.splice(index, 1);
            localStorage.setItem("allSites", JSON.stringify(allSites));
            displaySites();

            Swal.fire({
                title: "Deleted!",
                text: "Your bookmark has been deleted.",
                icon: "success",
                confirmButtonColor: "#198754",
            });
        }
    });
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

function URLValidation() {
    if (unfocusURL) {
        if (!urlPattern.test(siteURLInput.value)) {
            urlValidation.innerText = "Invalid URL";
            SubmitBtn.disabled = true;
        } else {
            urlValidation.innerText = "";
            SubmitBtn.disabled = false;
        }
    }
}
function nameValidation() {
    let siteNameValue = siteNameInput.value.trim();

    if (unfocusName) {
        if (siteNameValue.length < 3) {
            NameValidation.innerText =
                "Invalid Name: Minimum 3 characters required";
            SubmitBtn.disabled = true;
        } else {
            NameValidation.innerText = "";
            SubmitBtn.disabled = false;
        }
    }
}

function isValidURL(url) {
    return urlPattern.test(url);
}

displaySites();
