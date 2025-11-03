function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function fetchFileContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}: ${response.statusText}`);
    }
    return await response.blob();
}



function displayLoadingMessage() {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loading-message';
    loadingMessage.textContent = "Downloading in progress... Please wait.";
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loadingMessage.style.color = 'white';
    loadingMessage.style.padding = '20px';
    loadingMessage.style.zIndex = '1000';
    document.body.appendChild(loadingMessage);
}



function createHTMLFilesDataForWebsiteLinks() {

    var imagesNameList = "";
    const globalHeader = getCookie('globalHeader');
    const globalFooter = getCookie('globalFooter');
    const headerPages = JSON.parse(getCookie('HeaderPages'));

    const middleSectionsCookie = getCookie('middle_sections');
    const middleSections = {}
    if(middleSectionsCookie != undefined) {
        const middleSectionsObj = JSON.parse(middleSectionsCookie);
        for(const key in middleSectionsObj){
            middleSections[key] = middleSectionsObj[key]
        }
    }


    const filesDetailsMap = {};



    const footerPagesCookie = getCookie('FooterPages');
    const footerPagesObj = JSON.parse(footerPagesCookie);

    let FooterPages = [];
    footerPagesObj.forEach(footerObj => {
        const footerTitle = Object.keys(footerObj)[0];
        const footerLinks = footerObj[footerTitle];
        FooterPages.push(...footerLinks);
    });

    const filteredFooterPages = FooterPages.filter(page => !headerPages.includes(page));
    if (globalHeader.indexOf("header")!=0 || globalFooter.indexOf("footer")!=0) {
        alert('You forgot to add Header or Footer for your website so please add before proceeding further.');
        return;
    }

    const mainPages = [];
    const subPages = {};

    // Separate main pages and subpages
    headerPages.forEach(page => {
        if (page.includes('_sub_')) {
            const [mainPage, subPage] = page.split('_sub_');
            if (!subPages[mainPage]) {
                subPages[mainPage] = [];
            }
            subPages[mainPage].push(subPage);
        } else {
            mainPages.push(page);
        }
    });
    // Generate Common Header with Menus for all the pages
    const headerSection = $(`#${globalHeader}`);
    headerSection.find('.radio-holder').remove();

    if (globalHeader.includes('header-')) {
        const menuContent = generateMenu(mainPages, subPages);
        headerSection.find('#dynamic-header').html(menuContent);
    }

    // Generate Common Footer with Menus for all the pages
    const footerSection = $(`#${globalFooter}`);
    footerSection.find('.radio-holder').remove();

    if (globalFooter.includes('footer-')) {
        const footerContent = generateFooterLinks();

        // Loop through each nav and update the content
        const existingNavs = $("." + globalFooter + "_old");

        existingNavs.each(function(index) {
            const existingNav = $(this);
            const footerData = footerContent[index];

            if (footerData) {
                existingNav.find("#quick-link-title").text(footerData.title);

                // Replace the links inside the <ul> element
                const ulElement = existingNav.find(".footer-navigation");
                ulElement.empty();  // Clear current list items

                // Add new list items
                footerData.links.forEach(link => {
                    ulElement.append(`
                        <li><a href="${link.url}.html">${link.name}</a></li>
                    `);
                });
            }
        });
    }



    function addImagesToList(imageUrl) {
        const imgName = imageUrl.split("assets/images/")[1];
        if (imgName && !imagesNameList.includes(imgName)) {
            imagesNameList += "," + imgName;
        }
    }
    var clientName = getCookie("clientName");
    var clientProjectName =  getCookie("projectName");
    function processImagesAndRemoveThemeClasses(section, clientName, clientProjectName) {
        // Handle images and background images

        section.find('img').each(function() {
            const oldSrc = $(this).attr("src");
            if (oldSrc && (oldSrc.endsWith(".jpg") || oldSrc.endsWith(".png") || oldSrc.endsWith(".svg"))) {
                // Check if the src contains 'assets/images/' and replace it
                if (oldSrc.includes("assets/images/")) {
                    const newSrc = oldSrc.replace("assets/images/", `assets/clients/${clientName}/${clientProjectName}/images/`);
                    $(this).attr("src", newSrc); // Update the src attribute
                }
                addImagesToList(oldSrc); // Always add the oldSrc to the list
            }
        });

        section.find('*').each(function() {
            const backgroundImage = $(this).css("background-image");
            if (backgroundImage && backgroundImage !== 'none') {
                const imageUrl = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                // Check if the background image URL contains 'assets/images/' and replace it
                if (imageUrl && (imageUrl.endsWith(".jpg") || imageUrl.endsWith(".png") || imageUrl.endsWith(".svg"))) {
                    if (imageUrl.includes("assets/images/")) {
                        const newImageUrl = imageUrl.replace("assets/images/", `assets/clients/${clientName}/${clientProjectName}/images/`);
                        $(this).css("background-image", `url(${newImageUrl})`); // Update the background-image URL
                    }
                    addImagesToList(imageUrl); // Always add the imageUrl to the list
                }
            }

            // Remove theme classes
            const classNames = $(this).attr('class');
            if (classNames) {
                classNames.split(' ').forEach((className) => {
                    if (className.startsWith('theme-')) {
                        $(this).removeClass(className);
                    }
                });
            }
        });
    }


    // Process header and footer sections
    processImagesAndRemoveThemeClasses(headerSection,clientName, clientProjectName);
    processImagesAndRemoveThemeClasses(footerSection,clientName, clientProjectName);

    const headerHTML = headerSection.html();
    const footerHTML = footerSection.html();

    // Save the header.html and footer.html content in the filesDetailsMap
    filesDetailsMap["header.html"] = headerHTML;
    filesDetailsMap["footer.html"] = footerHTML;

    // headerPages.push("default-middle_section");  // Add DUmmy entry to add default middle section
    // Iterate over the pages to generate content for each page
    headerPages.forEach(pageName => {

        const allSectionsOfPage = [];

        // Add header section in the page
        // if (globalHeader) allSectionsOfPage.push(globalHeader);

        // Add mid sections in the page
        if(middleSections[pageName] !== undefined) {

            const availableMiddleSectionsForPage = middleSections[pageName];
            if (availableMiddleSectionsForPage) {
                availableMiddleSectionsForPage.forEach(pageSectionName => {
                        allSectionsOfPage.push(pageSectionName);
                });
            }
        } else {
            allSectionsOfPage.push("default-middle_section");
        }

        // Add footer section in the page
        // if (globalFooter) allSectionsOfPage.push(globalFooter);

        if (allSectionsOfPage.length === 0) {
            alert(`No sections selected for export for ${pageName}`);
            return;
        }

        let fileName = pageName;
        fileName = fileName.replace(/^(header_)/, ''); // Clean up prefix

        if (fileName.includes('_sub_')) {
            fileName = fileName.split('_sub_')[1];
        }

        let pageContent = '';
        allSectionsOfPage.forEach(sectionId => {

            const sectionClone = $(`#${sectionId}`).clone();
            sectionClone.find('.radio-holder').remove();
            // sectionClone.find('img').each(function() {
            //     const oldSrc = $(this).attr("src");
            //     const imgName = oldSrc.split("assets/images/")[1];
            //     $(this).attr("src", "assets/clients/"+clientName+"/"+clientProjectName+"/images/" + imgName);
            //     if(!imagesNameList.includes(imgName)){
            //         imagesNameList = imagesNameList + "," + imgName;
            //     }

            // });
            // sectionClone.find('*').each(function() {
            //     const classNames = $(this).attr('class');
            //     if (classNames) {
            //         classNames.split(' ').forEach((className) => {
            //             if (className.startsWith('theme-')) {
            //                 $(this).removeClass(className);
            //             }
            //         });
            //     }
            // });

        processImagesAndRemoveThemeClasses(sectionClone,clientName, clientProjectName);





sectionClone.find('.company_name').contents().filter(function () {
    return this.nodeType === 3 && this.nodeValue.includes("Company Name");
}).each(function () {
    this.nodeValue = this.nodeValue.replace(/Company Name/g, clientProjectName);
});
            pageContent += `${sectionClone.html()}\n`; // Append the updated HTML

            // pageContent += `${sectionClone.html()}\n`;
            // pageContent += `<div id="${sectionId}">${sectionClone.html()}</div>\n`;
        });

    let headerFont = $("." + globalHeader).css("font-family") || "'Roboto', sans-serif";


        const newPageContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Extracted Page">
            <title>${fileName}</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <link rel="stylesheet" href="assets/css/style.css">
            <link rel="stylesheet" href="assets/css/middle_sections.css">
            <link rel="stylesheet" href="assets/css/components/${globalHeader}.css">
            <link rel="stylesheet" href="assets/css/components/${globalFooter}.css">
            <link rel="stylesheet" href="assets/css/bootstrap.css">
            <link rel="stylesheet" href="assets/css/plugins.css">
	        <link rel="stylesheet" href="assets/css/custom-Imports.css">
            <link rel="stylesheet" href="assets/css/resonsive.css">
            	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
	<link rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">
        <style>
            :root {
                --site-font: ${headerFont};
            }
            body, #wrapper, #wrapper * {
                font-family: var(--site-font) !important;
            }
        </style>
        </head>
        <body class="${selectedThemeClass}">
            <div id="wrapper">
            <div id="header"></div>
            <div id="mainPageContent">${pageContent}</div>
            <div id="footer"></div>
            </div>
            <script src="assets/js/jquery.js"></script>
            <script src="assets/js/init.js"></script>
            <script src="assets/js/plugins.js"></script>
            <script src="assets/js/jquery.main.js"></script>
            <script src="assets/js/gsap.min.js"></script>
            <script src="assets/js/ScrollTrigger.min.js"></script>
            <script src="assets/js/Observer.min.js"></script>
            <script src="assets/js/gsap.effects.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
            <script>
                var fileName = document.title || "index";

                $(document).ready(function () {
                loadHeaderFooter("header", "assets/clients/${clientName}/${clientProjectName}/header.html");
                loadHeaderFooter("footer", "assets/clients/${clientName}/${clientProjectName}/footer.html");
                });

                function loadHeaderFooter(id, file) {
                    $("#" + id).load(file, function (response, status, xhr) {
                        if (status === "error") {
                            console.error("Error loading " + file + ":", xhr.status, xhr.statusText);
                            return;
                        }

                        $("#" + id).find("a").addClass("edit-site");

                        if (id === "header") {
                            if (fileName.toLowerCase() === "index" || fileName.toLowerCase() === "home") {
                                $("#" + id).find(".main-header-section").css("display", "inline-block");
                            } else {
                                $("#" + id).find(".main-header-section").css("display", "none");
                                $("#" + id).find(".header-breadcrumb-section").css("display", "inline-block");
                                $("#" + id).find(".header-breadcrumb-section .Page_name")
                                    .text(fileName.charAt(0).toUpperCase() + fileName.slice(1));
                            }
                        }
                    });
                }
            </script>
                        <script src="assets/js/middle-section.js"></script>

        </body>
        </html>
    `;
    if (fileName.toLowerCase() === "home") {
        fileName = "index";
    }
      filesDetailsMap[`${fileName}.html`] = newPageContent;

    });

    // filteredFooterPages.push("default-middle_section");  // Add DUmmy entry to add default middle section

    filteredFooterPages.forEach(pageName => {
        const allSectionsOfPage = [];
        // Add header section in the page
        // if (globalHeader) allSectionsOfPage.push(globalHeader);

        // Add mid sections in the page
        if(middleSections[pageName] !== undefined) {

            const availableMiddleSectionsForPage = middleSections[pageName];
            if (availableMiddleSectionsForPage) {
                availableMiddleSectionsForPage.forEach(pageSectionName => {
                        allSectionsOfPage.push(pageSectionName);
                });
            }
        } else {
            allSectionsOfPage.push("default-middle_section");
        }

        // Add footer section in the page
        // if (globalFooter) allSectionsOfPage.push(globalFooter);

        if (allSectionsOfPage.length === 0) {
            alert(`No sections selected for export for ${pageName}`);
            return;
        }

        let fileName = pageName;
        fileName = fileName.replace(/^(header_)/, ''); // Clean up prefix

        if (fileName.includes('_sub_')) {
            fileName = fileName.split('_sub_')[1];
        }

        let pageContent = '';
        var clientName = getCookie("clientName");
        var clientProjectName =  getCookie("projectName");


        allSectionsOfPage.forEach(sectionId => {

            const sectionClone = $(`#${sectionId}`).clone();
            sectionClone.find('.radio-holder').remove();
            processImagesAndRemoveThemeClasses(sectionClone);

            sectionClone.find('.company_name').contents().filter(function () {
                return this.nodeType === 3 && this.nodeValue.includes("Company Name");
            }).each(function () {
                this.nodeValue = this.nodeValue.replace(/Company Name/g, clientProjectName);
            });

            pageContent += `${sectionClone.html()}\n`;
        });
    let headerFont = $("." + globalHeader).css("font-family") || "'Roboto', sans-serif";

        const newPageContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Extracted Page">
            <title>${fileName}</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <link rel="stylesheet" href="assets/css/style.css">
            <link rel="stylesheet" href="assets/css/middle_sections.css">
            <link rel="stylesheet" href="assets/css/components/${globalHeader}.css">
            <link rel="stylesheet" href="assets/css/components/${globalFooter}.css">
            <link rel="stylesheet" href="assets/css/bootstrap.css">
            <link rel="stylesheet" href="assets/css/plugins.css">
            <link rel="stylesheet" href="assets/css/custom-Imports.css">
            <link rel="stylesheet" href="assets/css/resonsive.css">


            	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
	<link rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">
                <style>
            :root {
                --site-font: ${headerFont};
            }
            body, #wrapper, #wrapper * {
                font-family: var(--site-font) !important;
            }
        </style>
        </head>
        <body class="${selectedThemeClass}">
            <div id="wrapper">
            <div id="header"></div>
            <div id="mainPageContent">${pageContent}</div>
            <div id="footer"></div>
            </div>
            <script src="assets/js/jquery.js"></script>
            <script src="assets/js/init.js"></script>
            <script src="assets/js/plugins.js"></script>
            <script src="assets/js/jquery.main.js"></script>
            <script src="assets/js/gsap.min.js"></script>
            <script src="assets/js/ScrollTrigger.min.js"></script>
            <script src="assets/js/Observer.min.js"></script>
            <script src="assets/js/gsap.effects.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
            <script>
                var fileName = document.title || "index";

                $(document).ready(function () {
                    loadHeaderFooter("header", "assets/clients/${clientName}/${clientProjectName}/header.html");
                    loadHeaderFooter("footer", "assets/clients/${clientName}/${clientProjectName}/footer.html");
                });

                function loadHeaderFooter(id, file) {
                    $("#" + id).load(file, function (response, status, xhr) {
                        if (status === "error") {
                            console.error("Error loading " + file + ":", xhr.status, xhr.statusText);
                            return;
                        }

                        $("#" + id).find("a").addClass("edit-site");

                        if (id === "header") {
                            if (fileName.toLowerCase() === "index" || fileName.toLowerCase() === "home") {
                                $("#" + id).find(".main-header-section").css("display", "inline-block");
                            } else {
                                $("#" + id).find(".main-header-section").css("display", "none");
                                $("#" + id).find(".header-breadcrumb-section").css("display", "inline-block");
                                $("#" + id).find(".header-breadcrumb-section .Page_name")
                                    .text(fileName.charAt(0).toUpperCase() + fileName.slice(1));
                            }
                        }
                    });
                }
            </script>
            <script src="assets/js/middle-section.js"></script>

        </body>
        </html>
    `;
     filesDetailsMap[`${fileName}.html`] = newPageContent;

    });
    filesDetailsMap["imagesNameList"] = imagesNameList;
    uploadFilesData(filesDetailsMap);
}
function uploadFilesData(filesDetailsMap) {
    displayLoadingMessage();

    filesDetailsMap["clientName"] =  getCookie("clientName");
    filesDetailsMap["clientProjectName"] =  getCookie("projectName");
    // filesDetailsMap["reqFor"] =  "preview";

    $.ajax({
        type: 'POST',
        url: "indexOld/",
        dataType: "text",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(filesDetailsMap),
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
        },
        success: function (data) {
          alert("Uploaded the data");
          $('#loading-message').remove();
        // Clear all cookies
        clearAllCookies();
        location.reload();

        },
        error: function (xhr, errmsg, err) {
            alert("Error----"+ xhr.responseText);
            $('#loading-message').remove();
        }
      });
}
function cleanPageName(pageName) {
    if (pageName.startsWith('header_')) {
        return pageName.replace(/^header_/, '');
    }
    return null;
}
// Generate menu content dynamically based on main and subpages
function generateMenu(mainPages, subPages) {
    let menuContent = '<ul class="nav navbar-nav navbar-right main-navigation text-uppercase font-lato">';
    mainPages.forEach(mainPage => {
        const cleanedMainPage = cleanPageName(mainPage);
        if (cleanedMainPage) {
            if (["home", "index"].includes(cleanedMainPage.toLowerCase())) {
                menuContent += `<li><a href="index.html">Home</a></li>`;
            } else if (subPages[mainPage]) {
                // Generate dropdown for subpages under the main page
                menuContent += `
                    <li class="dropdown">
                        <a href="${cleanedMainPage}.html" class="dropdown-toggle" role="button"
                            aria-haspopup="true" aria-expanded="false">${cleanedMainPage}</a>
                        <ul class="dropdown-menu">
                            ${subPages[mainPage].map(subPage => `<li><a href="${subPage}.html">${subPage}</a></li>`).join('')}
                        </ul>
                    </li>`;
            } else {
                menuContent += `<li><a href="${cleanedMainPage}.html">${cleanedMainPage}</a></li>`;
            }
        }
    });
    menuContent += '</ul>';
    return menuContent;
}


// Clean footer page names by removing the "footer_" prefix
function cleanFooterName(pageName) {
    // Only clean the name if it starts with "footer_"
    if (pageName.startsWith('footer_')) {
        return pageName.replace(/^footer_/, '');
    }
    return null;
}




function generateFooterLinks() {
    const footerPagesCookie = getCookie('FooterPages');
    const footerPagesObj = JSON.parse(footerPagesCookie);

    let footerContent = [];

    footerPagesObj.forEach(footerMenuObj => {
        const footerTitle = Object.keys(footerMenuObj)[0];
        const footerLinks = footerMenuObj[footerTitle];

        const footerData = {
            title: footerTitle,
            links: footerLinks.map(link => {
                return { name: link, url: link };
            })
        };

        footerContent.push(footerData);  // Add footer data to the content array
    });

    return footerContent;
}

let selectedThemeClass = '';

const themes = {
  'theme-1': { primary: '#0f6979', secondary: '#ffc000', tertiary: '#ffffff' },
  'theme-2': { primary: '#283259', secondary: '#1da6a6', tertiary: '#ffffff' },
  'theme-3': { primary: '#1d4d13', secondary: '#f4a300', tertiary: '#ffffff' },
  'theme-4': { primary: '#ffc000', secondary: '#ffffff', tertiary: '#000000' },
  'theme-5': { primary: '#f0f8ff', secondary: '#59bb2c', tertiary: '#000000' },
  'theme-6': { primary: '#0caa85', secondary: '#f4a300', tertiary: '#ffffff' },
};

// Hide the preview initially when the modal is shown
$('#theme-modal').on('show', function() {
  $('#theme-dropdown').val('');
  $('#theme-preview').hide(); // Hide the preview initially
});

// Function to update theme preview colors
function updateThemePreview(theme) {
  let colors;

  if (themes[theme]) {
    colors = themes[theme];
  } else {
    colors = { primary: '#ffffff', secondary: '#000000', tertiary: '#ffffff' };
  }

  // Update the color of each circle in the preview
  $('#theme-preview .primary').css('background-color', colors.primary);
  $('#theme-preview .secondary').css('background-color', colors.secondary);
  $('#theme-preview .tertiary').css('background-color', colors.tertiary);
}

// When a theme is selected from the dropdown
$('#theme-dropdown').change(function() {
  selectedThemeClass = $(this).val();

  if (selectedThemeClass) {
    updateThemePreview(selectedThemeClass);
    $('#theme-preview').show(); // Show the preview once a theme is selected
  } else {
    $('#theme-preview').hide(); // Hide the preview if no theme is selected
  }
});

// Submit button click handler
$('.submit-btn').on('click', function() {
  if (selectedThemeClass === '') {
    alert("Please select a theme.");
    return;
  }

  $('#theme-modal').modal('hide');
  alert("Selected Theme: " + selectedThemeClass);

  const clientName = getCookie("clientName");
  const projectName = getCookie("projectName");

  if (clientName && projectName) {
    createHTMLFilesDataForWebsiteLinks(selectedThemeClass);
  } else {
    alert('Please enter both client and project names.');
  }
});

// Cancel button click handler
$('.cancel-btn').on('click', function() {
  $('#theme-modal').modal('hide');
});

// Export button click handler to show the theme modal
$('#export-btn').on('click', function() {
  $('#theme-modal').modal('show');
});



// $('#export-btn').on('click', function() {
//     $('#theme-modal').modal('show');
//     });



// $('#export-btn').on('click', function () {

//     const clientName = getCookie("clientName");
//     const projectName = getCookie("projectName");
//     if (clientName && projectName) {

//         // $('#exportModal').modal('hide');
//         createHTMLFilesDataForWebsiteLinks();
//     } else {
//         alert('Please enter both client and project names.');
//     }
// });



// Function to clear all cookies
function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = cookieName + "=;expires=" + new Date(0).toUTCString() + ";path=/";
    }
}
// Clear input fields after export
document.getElementById('clientName').value = "";
document.getElementById('projectName').value = "";


