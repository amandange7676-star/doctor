let selectedSections = [
  `<div class="preview-section"><h3>Header Section</h3><p>Header Section.</p></div>`,
  `<div class="preview-section"><h3>Middle Section</h3><p>Middle Section</p></div>`,
  `<div class="preview-section"><h3>Footer Section</h3><p>Footer Section.</p></div>`
];
$('#preview-site').on('click', function() {
      $("#preview-content").html(selectedSections.join(""));

  $('#previewModal').modal('show');
});

