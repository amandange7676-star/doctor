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
                <link rel="stylesheet" href="../../assets/css/bootstrap.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">
                <link rel="stylesheet" href="../../assets/css/plugins.css">
                <link rel="stylesheet" href="../../assets/css/style.css">
            </head>
            <body>
                <div id="wrapper">
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

                <script src="../../assets/js/jquery.js"></script>
                <script src="plugins.js"></script>
                <script src="bootstrap.js"></script>
                <script src="query.main.js"></script>
                <script src="init.js"></script>
               <script src="export-editmode.js"></script>
            </body>
            </html>
        `);
        newWindow.document.close();
    }
}


