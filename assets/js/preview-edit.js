function previewSections() {
    if (!selectedSections.header && !selectedSections.slider && !selectedSections.footer && selectedSections.section.length === 0) {
        alert("You haven't selected any sections yet");
    } else {
        $('[id^="header-"], [id^="slider-"], [id^="footer-"], #middle [id^="section"]').hide();

        function showSelectedSection(sectionId) {
            const sectionElement = $(`#${sectionId}`);
            sectionElement.css('display', 'block');
            sectionElement.find('.radio-holder').remove();
        }

        if (selectedSections.header) {
            showSelectedSection(selectedSections.header);
        }

        if (selectedSections.slider) {
            showSelectedSection(selectedSections.slider);
        }

        if (selectedSections.footer) {
            showSelectedSection(selectedSections.footer);
        }

        if (selectedSections.section.length) {
            selectedSections.section.forEach(sectionId => {
                showSelectedSection(sectionId);
            });
        }

        const previewContent = $('#wrapper').html();
        const newWindow = window.open();
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="Extracted Page">
                <title>Preview</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="css/bootstrap.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">
                <link rel="stylesheet" href="css/plugins.css">
                <link rel="stylesheet" href="style.css">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 200px;
                        height: 85px!important;
                        background: rgba(255, 255, 255, 0.9);
                        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
                        padding: 20px;
                        z-index: 9999;
                        transition: transform 0.3s ease;
                        transform: translateX(0);
                    }
                        #editModal{
margin: 285px -31px;
  padding: 21px;
  padding-right: 21px;
  width: 0;
  position: absolute;
  zindex: 99999999999999999999999;
  border: 1px solid #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 20px;
  z-index: 99999999999999999999999;
  height: 0;
}
                    .sidebar.minimized {
                        transform: translateX(-100%);
                    }
                    .toggle-button {
                        position: absolute;
                        right: -30px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #ffc000;
                        color: #fff;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 5px 10px;
                        font-size: 18px;
                        z-index: 1001;
                        transition: all 0.3s ease;
                    }
                    .edit-icon {
                        cursor: pointer;
                        position: absolute;
                        right: 11px;
                        top: -24px;
                        font-size: 22px;
                        color: #ffc000;
                    }
                    .editable { position: relative; }
                    .modal { position: absolute; }
                    #modalEditTextarea{
                    border-radius:15px 15px 15px 0;}
                </style>
            </head>
            <body>
                <div class="sidebar" id="sidebar">
                    <button id="toggleEditMode" class="btn btn-primary btn-theme">Enable Edit Mode</button>
                    <button id="export-btn" class="btn btn-warning btn-theme" >Export HTML</button>
                </div>
                <div id="wrapper" style="margin-top:85px;">
                    ${previewContent}
                </div>
                <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editModalLabel">Edit Content</h5>
                            </div>
                            <div class="modal-body">
                                <textarea id="modalEditTextarea" rows="5" class="form-control"></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-theme" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-success" id="saveEditBtn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="js/jquery.js"></script>
                <script src="js/plugins.js"></script>
                <script src="js/bootstrap.js"></script>
                <script src="js/jquery.main.js"></script>
                <script src="js/init.js"></script>
                <script>
let editMode = false;
let currentEditingElement = null;

// Toggle Edit Mode
document.getElementById('toggleEditMode').addEventListener('click', function() {
    editMode = !editMode;
    this.textContent = editMode ? 'Disable Edit Mode' : 'Enable Edit Mode';
    toggleEditMode();
});

function toggleEditMode() {
    if (editMode) {
        document.querySelectorAll('.editable').forEach(function(element) {
            if (!element.querySelector('.edit-icon')) {
                const editIcon = document.createElement('span');
                editIcon.innerHTML = '&#9998;';
                editIcon.classList.add('edit-icon');
                editIcon.addEventListener('click', function(event) {
                    startEditing(element, event);
                });
                element.appendChild(editIcon);
            }
        });
    } else {
        document.querySelectorAll('.edit-icon').forEach(function(icon) {
            icon.remove();
        });
    }
}

// Start Editing Function
function startEditing(element, event) {
    currentEditingElement = element;

    // Remove the pencil icon only for the currently editing element
    const editIcon = element.querySelector('.edit-icon');
    if (editIcon) {
        editIcon.style.display = 'none';
    }

    let originalText = '';

    // Check if the element is a dropdown <li> with an <a> tag
    if ($(element).hasClass('dropdown')) {
        // Get the text inside the first <a> element within this <li>
        originalText = $(element).find('a.dropdown-toggle').first().text().trim();
    } else {
        // For other elements, get the full text content
        originalText = element.innerText.trim();
    }

    $('#modalEditTextarea').val(originalText);

    // Position the modal above the clicked element
    const offset = $(element).offset();
    $('#editModal').css({
        top: offset.top - $('#editModal').outerHeight() - 10,
        left: offset.left
    });

    $('#editModal').modal('show');
}


// Save Edited Text
$('#saveEditBtn').on('click', function() {
    const newText = $('#modalEditTextarea').val();
    saveText(currentEditingElement, newText);
    $('#editModal').modal('hide');
});

// Cancel Edit Button
$('#editModal .btn-secondary').on('click', function() {
    $('#editModal').modal('hide');
});

// Save Text Function
function saveText(element, newText) {
    element.innerText = newText;

    // Re-add the pencil icon after saving
    if (editMode) {
        const editIcon = document.createElement('span');
        editIcon.innerHTML = '&#9998;';
        editIcon.classList.add('edit-icon');
        editIcon.addEventListener('click', function() {
            startEditing(element);
        });
        element.appendChild(editIcon);
    }
}

// Hide edit icons when modal is shown
$('#editModal').on('shown.bs.modal', function() {




});








// Show edit icons when modal is hidden
$('#editModal').on('hidden.bs.modal', function() {
    if (editMode) {
        document.querySelectorAll('.edit-icon').forEach(function(icon) {
            icon.style.display = '';
        });
    }
});

// Ensure all text elements are editable
document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li').forEach(function(element) {
    element.classList.add('editable');
});


                </script>
               <script src="js/export-editmode.js"></script>
            </body>
            </html>
        `);
        newWindow.document.close();
    }
}


