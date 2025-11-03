$(document).ready(function () {
    // alert("starting");
    // Initialization
    var wrapper = $('#wrapper').addClass('editableSection');
    var topBar = $('<div>', { id: 'top-bar', class: 'top-bar' }).insertBefore(wrapper);
    //var imageUpload = $('<input type="file" id="image-upload" class="hidden" accept="image/*" />').appendTo('body');
    $('<form method="post" id="imgForm" action="fuos/" enctype="multipart/form-data">').appendTo('body');
    $('<input type="file" name="imgFile" id="image-upload" autocomplete="off" class="hidden" accept="image/*">').appendTo('#imgForm');
    $('<input id="" type="text" class="hidden formFieldFileName" name="imgFileName" value="">').appendTo('#imgForm');
    $('</form>').appendTo('input');

    // $('<input type="text" class="hidden selectedPageName" name="selectedPageName" value="">').appendTo('body');


    $(document).on('click', '.updateImg', function () {
        var imgName = $(this).attr("src");
        if(imgName.includes("?")) {
            imgName = imgName.split("?")[0]
        }

        //alert("imgName-----"+imgName);
        $(".formFieldFileName").val(imgName);
        // var clientName = "";
        // var clientProjectName = "";

        // $(this).attr("src","assets/images/clients/test/test11") ;  // UPdate
        // $("#image-upload").data('imageElement', this);
        $("#image-upload").click();
    });

    $("#image-upload").on('change', function () {

        // alert("img selected");
        // imageUpload.submit();
        // var imgSrc = $(this).data('imageElement');
        // uploadImgData(imgSrc);
        uploadImgData();

    });
    // function uploadImgData(imgSrc) {
    function uploadImgData() {
        var form = $('#imgForm')[0];
        var formdata = new FormData(form);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "fuos/",
            data: formdata,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                // alert(data);
                // alert("File has been updated successfully.");
                const imgName = $(".formFieldFileName").val();
                $(".updateImg[src='" + imgName + "']").attr("src", imgName + "?" + new Date().getTime());
            },
            error: function (xhr, errmsg, err) {
                alert("Error----"+ xhr.responseText);
                $('#loading-message').remove();
            }
        }
        );
    }

    var isEditingContent = false;
    var isEditingImages = false;

    // Create top bar buttons
    var enableEditMode = $('<button id="enable-editmode">Enable Edit Mode</button>').appendTo(topBar);
    var saveChanges = $('<button id="save-changes" class="hidden" disabled>Save</button>').appendTo(topBar);
    // var generateContent = $('<button id="generate-content" class="hidden">Enable Generate Content</button>').appendTo(topBar);
    var aiBotImageHtml = '<img class="aiBotImage" src="assets/images/AiBot.png" alt="AiBot" title="Generate content with AiBot" />';

    // Toggle editable classes
    function toggleEditableClasses(enable) {
        isEditingContent = enable;
        if (enable) {
            wrapper.find('*').not('.link-to-dropdown-container *').addClass('editable');
            wrapper.find('img').addClass('editable-image');
            wrapper.find('img').addClass('updateImg');
            wrapper.find('a.editable').on('click.editable', handleAnchorEdit);
            $(document).on('click', '.editable', function (e) {
                e.stopPropagation();
                $('.editable').removeClass('activeEditor');
                $(this).addClass('activeEditor');
            });
            $('.section-wrapper').each(function() {
                addActionButtons($(this));
            });

            $('a.edit-site').removeClass('edit-site');

            // generateContent.removeClass('hidden');

                var elementsToUpdate = [];

                $('#wrapper').find('p, h1, h2, h3, h4, h5, h6, span').each(function() {
                    var textContent = $(this).text().trim();
                    if (textContent.length > 200) {
                        var charCount = textContent.length;
                        $(this).addClass('aiContentGeneration');
                        $(this).attr('cntVal', 'char_cnt_' + charCount);
                        elementsToUpdate.push($(this));
                    }
                });

                elementsToUpdate.forEach(function(element) {
                    element.append(aiBotImageHtml);
                });
                    $('.aiBotImage').each(function() {
                    $(this).addClass('jumping');
                });

        } else {
            wrapper.find('*').removeClass('editable');
            wrapper.find('img').removeClass('editable-image').off('click');
            wrapper.find('*').removeAttr('contenteditable');
            wrapper.find('a.editable').off('click.editable');
            $('.link-to-btn').remove();
            $('.link-to-dropdown-container').remove();
            $('.add-section-above, .add-section-below ,.remove-section-btn').remove();
            // generateContent.addClass('hidden');
            $('#wrapper').find('p, h1, h2, h3, h4, h5, h6, span').each(function() {
                $(this).removeClass('aiContentGeneration');
                $(this).removeAttr('cntVal');
                $(this).find('.aiBotImage').remove();
            });
        }
    }

    // generateContent.on('click', function() {
    //     if ($(this).text() === 'Enable Generate Content') {
    //         $(this).text('Disable Generate Content');

    //         // Prepare the elements and append AI Bot images in a batch
    //         var elementsToUpdate = [];

    //         $('#wrapper').find('p, h1, h2, h3, h4, h5, h6, span').each(function() {
    //             var textContent = $(this).text().trim();

    //             if (textContent.length > 200) {
    //                 var charCount = textContent.length;

    //                 $(this).addClass('aiContentGeneration');
    //                 $(this).attr('cntVal', 'char_cnt_' + charCount);
    //                 elementsToUpdate.push($(this)); // Store the elements to update
    //             }
    //         });

    //         // Once all elements are collected, append AI Bot images in one go
    //         elementsToUpdate.forEach(function(element) {
    //             element.append(aiBotImageHtml);
    //         });

    //         // Add animation for the AI Bot image
    //         $('.aiBotImage').each(function() {
    //             $(this).addClass('jumping');
    //         });

    //     } else {
    //         $(this).text('Enable Generate Content');

    //         $('#wrapper').find('p, h1, h2, h3, h4, h5, h6, span').each(function() {
    //             $(this).removeClass('aiContentGeneration');
    //             $(this).removeAttr('cntVal');
    //             $(this).find('.aiBotImage').remove();
    //         });
    //     }
    // });

    // for the AI Bot image tooltip
    var isAudioPlaying = false;
    var tooltipTimeout = null;
    var isTooltipVisible = false;

    $(document).on('mouseenter', '.aiBotImage', function() {
        if (!isAudioPlaying) {
            isAudioPlaying = true;
            var audio = new Audio('assets/aiBotAudio.mp3');
            audio.play();

            audio.onended = function() {
                isAudioPlaying = false;
            };
        }

        if (isTooltipVisible) return;

        var $aiBotImage = $(this);
        var imagePosition = $aiBotImage.offset();

        var $tooltip = $('<div class="ai-tooltip">I am your AiBot</div>');

        $('body').append($tooltip);
        $tooltip.css({
            position: 'absolute',
            top: imagePosition.top - $tooltip.outerHeight() - 40,
            left: imagePosition.left + ($aiBotImage.outerWidth() / 2) - ($tooltip.outerWidth() / 2),
            opacity: 0,
            visibility: 'visible',
            transition: 'opacity 0.3s ease-in-out',
            backgroundColor: '#26C8D0',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            animation: 'jump-tooltip 1s ease-in-out infinite'
        });

        $tooltip.css('opacity', 1);
        isTooltipVisible = true;

        tooltipTimeout = setTimeout(function() {
            if (!isTooltipVisible) {
                $tooltip.remove();
            }
        }, 3000);

        $aiBotImage.on('mouseleave', function() {
            if (tooltipTimeout) {
                clearTimeout(tooltipTimeout);
            }
            isTooltipVisible = false;
            $tooltip.remove();
        });
    });






$(document).on('click', '.aiBotImage', function() {
    var parentElement = $(this).closest('p, h1, h2, h3, h4, h5, h6, span');
    var currentContent = parentElement.contents().filter(function() {
        return this.nodeType === 3;
    }).first().text().trim();

    currentContent = currentContent.replace(/\s+/g, ' ').trim();

    var modalHtml = `
    <div id="aiContentModal" class="ai-modal">
        <div class="ai-modal-content" style="background-image: url('assets/images/ai-modal-bg.png');">
            <span class="ai-close">&times;</span>
            <h1 class="ai-modal-title">Generate Content with AI</h1>

            <p class="ai-instruction">Enter your topic, idea or keyword</p>
            <div class="ai-input-container">
                <input type="text" id="topicInput" class="ai-input-field" placeholder="Enter topic here...">
                <button id="generateContentBtn" class="ai-btn">Generate Content</button>
            </div>

            <div class="textarea-container">
            <textarea id="contentTextArea" class="ai-textarea" rows="6" cols="50">${currentContent}</textarea>
            </div>
            <div class="ai-modal-actions">
                <button id="submitContent" class="ai-btn">Submit</button>
            </div>
        </div>
    </div>
    `;

    $('body').append(modalHtml);

    var modal = document.getElementById("aiContentModal");
    modal.style.display = "block";

    modal.currentElement = parentElement;

    $(".ai-close").on('click', function() {
        modal.style.display = "none";
        $("#aiContentModal").remove();
    });

    $("#submitContent").on('click', function() {
        var updatedContent = $("#contentTextArea").val();

        parentElement.contents().filter(function() {
            return this.nodeType === 3;
        }).first().replaceWith(updatedContent);

        modal.style.display = "none";
        $("#aiContentModal").remove();
    });
});















    // Handle editing
    function handleAnchorEdit(e) {
        e.stopPropagation();
        var anchor = $(this);
        if (!isEditingContent) return;
        e.preventDefault();
        clearPreviousDropdowns();

        if (!anchor.find('.link-to-btn').length) {
            var linkToButton = $('<button class="link-to-btn"><i class="ri-pencil-fill"></i></button>');
            anchor.append(linkToButton);

            linkToButton.on('click', function (e) {
                e.stopPropagation();
                createDropdown(anchor);
            });
        }
    }

    // Clear previous dropdowns
    function clearPreviousDropdowns() {
        $('#wrapper a.editable').find('.link-to-btn').remove();
        $('#wrapper a.editable').next('.link-to-dropdown-container').remove();
    }

    // Create dropdown for editing anchor
    function createDropdown(anchor) {
        var dropdownOptions = generateDropdownOptions();
        var dropdownHTML = `
            <div class="link-to-dropdown-container">
                <div>
                    <h5>Edit Text:</h5>
                    <div id="editor-container"></div>
                </div>
                <div>
                    <h5>Linked to Page:</h5>
                    <select class="link-to-dropdown">${dropdownOptions}</select>
                </div>
                <div class="edit-button-container">
                    <button class="close-anchor-edit">Close</button>
                    <button class="submit-link">Submit</button>
                </div>
            </div>
        `;
        anchor.after(dropdownHTML);
        initializeQuill(anchor);

        var currentHrefCustom = anchor.attr('hrefcustom');
        if (currentHrefCustom) {
            anchor.next('.link-to-dropdown-container').find('.link-to-dropdown').val(currentHrefCustom);
        }
    }

    // Generate dropdown options from dynamic-header
    function generateDropdownOptions() {
        var options = '';
        $('#dynamic-header li a').each(function () {
            var hrefValue = $(this).attr('hrefcustom');
            var linkText = $(this).text();
            options += `<option value="${hrefValue}">${linkText}</option>`;
        });
        return options;
    }

    // Initialize Quill editor
    function initializeQuill(anchor) {
        var quill = new Quill('#editor-container', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image']
                ]
            },
            placeholder: 'Edit your anchor text here...',
        });

        quill.root.innerHTML = anchor.text().trim();
        setDropdownSelectedValue(anchor);

        // Handle submission of changes
        anchor.next('.link-to-dropdown-container').find('.submit-link').on('click', function () {
            var newHref = anchor.next('.link-to-dropdown-container').find('.link-to-dropdown').val();
            var newText = quill.root.innerHTML.trim().replace(/<\/?p>/g, '').trim();

            anchor.attr('hrefcustom', newHref).html(newText);
            anchor.next('.link-to-dropdown-container').remove();
            alert('Anchor updated successfully!');
        });

        // Close button functionality to remove dropdown and the link-to-btn
        anchor.next('.link-to-dropdown-container').find('.close-anchor-edit').on('click', function (e) {
            e.stopPropagation();
            anchor.next('.link-to-dropdown-container').remove();
            anchor.find('.link-to-btn').remove();
        });
    }

    // Set selected value for dropdown
    function setDropdownSelectedValue(anchor) {
        var currentHref = anchor.attr('hrefcustom');
        $('.link-to-dropdown').val(currentHref);
    }

    // Edit mode functionality
    enableEditMode.on('click', function () {
        isEditingContent = true;
        isEditingImages = true;
        toggleEditableClasses(true);
        wrapper.addClass('edit-mode').find('.editable').attr('contenteditable', true);
        //handleImageClick();
        //configureImageUpload();
        $('a').removeClass('edit-site');
        $('a').each(function() {
            var currentHref = $(this).attr('href');
            $(this).attr('hrefcustom', currentHref);
            $(this).removeAttr('href'); // Remove the original href attribute
        });
        enableEditMode.addClass('hidden');
        saveChanges.removeClass('hidden').prop('disabled', false);
        $('a').on('click', function(event) {
            if (isEditingContent) {
                event.preventDefault();
            }
        });
    });



    function displayLoadingMessage() {
        var loadingMessage = document.createElement('div');
        loadingMessage.id = 'loading-message';
        loadingMessage.textContent = "Uploading in progress... Please wait.";
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

    $(document).ready(function() {
        let changesInHeader = false;
        let changesInFooter = false;
        let changesInMainContent = false;

    // Store the original content to compare changes
    let originalHeaderContent = $('#header').html();
    let originalFooterContent = $('#footer').html();

    // Monitor changes in the footer using keypress
    $('#footer').on('input keypress', function() {
        changesInFooter = true;
    });

    // Function to observe changes in header and main content
    function observeChanges() {
        const headerObserver = new MutationObserver(function(mutationsList) {
            mutationsList.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    changesInHeader = true;
                }
            });
        });

        const mainContentObserver = new MutationObserver(function(mutationsList) {
            mutationsList.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    changesInMainContent = true;
                }
            });
        });
        headerObserver.observe(document.getElementById('header'), { childList: true, subtree: true });
        mainContentObserver.observe(document.getElementById('mainPageContent'), { childList: true, subtree: true });
    }
    observeChanges();

    // reset the flags and update original content after save
    function resetChangeFlags() {
        originalHeaderContent = $('#header').html();
        originalFooterContent = $('#footer').html();
        changesInHeader = false;
        changesInFooter = false;
        changesInMainContent = false;
    }

    saveChanges.on('click', function () {
        isEditingContent = false;
        isEditingImages = false;
        toggleEditableClasses(false);


        // Restore original href attributes
        $('a').each(function() {
            var currentHrefCustom = $(this).attr('hrefcustom');
            if (currentHrefCustom) {
                $(this).attr('href', currentHrefCustom);
                $(this).removeAttr('hrefcustom');
            }
        });

        wrapper.find('.editable').removeAttr('contenteditable');
        $('.activeEditor').removeClass('activeEditor');
        wrapper.removeClass('edit-mode');

        // Hide edit buttons and show save changes button
        enableEditMode.removeClass('hidden');
        saveChanges.addClass('hidden').prop('disabled', true);
        topBar.addClass('hidden');
        $('#image-upload').remove();
        // $('a.edit-site').removeClass('edit-site');
        $('a').addClass('edit-site');
        var SliderContentOldHTML = localStorage.getItem('dynamicSliderContent');
        var dynamicSliderWrapper = $('.dynamic-slider-wrapper');
        if (dynamicSliderWrapper.length && SliderContentOldHTML) {
            dynamicSliderWrapper.html(SliderContentOldHTML);
        }

        // Remove unnecessary scripts and styles
        $('script[src="assets/js/custom/editmode.js"]').remove();
        $('link[href="https://cdn.quilljs.com/1.3.6/quill.snow.css"]').remove();
        $('link[href="assets/css/custom/custom.css"]').remove();
        $('script[src="https://cdn.quilljs.com/1.3.6/quill.min.js"]').remove();
        $('script[src="assets/js/custom/main.js"]').remove();
        $('script[src="assets/js/custom/editModeScript.js"]').remove();

        // Clone the HTML and clean up
        var editedHTML = $('html').clone();
        editedHTML.find('a.edit-site').removeClass('edit-site');
        editedHTML.find('#top-bar').remove();

        // Remove unique IDs and buttons from each section-wrapper
        $('.section-wrapper').each(function() {
            $(this).removeAttr('id');
            $(this).find('.add-section-above, .add-section-below').remove();
        });

        const filesDetailsMap = {};

        // Check if the header has changed, and if it has, add it to the filesDetailsMap
        if (changesInHeader && originalHeaderContent !== $('#header').html()) {
            var editedHeader = $('#header').html();
            filesDetailsMap["header.html"] = editedHeader;
            changesInHeader = false; // Reset flag
        }

        // **Fix: Check if footer content has changed using keypress or input**
        if (changesInFooter && originalFooterContent !== $('#footer').html()) {
            var editedFooter = $('#footer').html();
            filesDetailsMap["footer.html"] = editedFooter;
            changesInFooter = false; // Reset flag
        }

        // Check if main content has changed
        if (changesInMainContent) {
            editedHTML.find('#header').html('');
            editedHTML.find('#footer').html('');
            editedHTML.find('input[type="text"].hidden.selectedPageName').remove();

            var pageTitle = $('title').text().trim().toLowerCase();
            if (pageTitle === "home") {
                filesDetailsMap["index.html"] = editedHTML.html();
            } else {
                filesDetailsMap[pageTitle + ".html"] = editedHTML.html();
            }
            changesInMainContent = false;
        }

        // Call the function to save changes
        editClientSite(filesDetailsMap);
        topBar.removeClass('hidden');

        // Reset flags after saving
        resetChangeFlags();
    });

    resetChangeFlags();
});



function editClientSite(filesDetailsMap) {
        filesDetailsMap["clientName"] = getCookie("clientName");
        filesDetailsMap["clientProjectName"] = getCookie("projectName");
        filesDetailsMap["pageName"] = $(".selectedPageName").val();
        // alert(filename);
        // alert( $(".formFieldFileName").val());
        // filesDetailsMap["currentSelectedPage"] = getCookie("projectName");

        $.ajax({
            type: 'POST',
            url: "ucs/",
            dataType: "text",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(filesDetailsMap),
            success: function (data) {
                alert("Uploaded the data");
                $('#loading-message').remove();
               // location.reload();
                // $('#openIndex').click();
            },
            error: function (xhr, errmsg, err) {
                alert("Error----" + xhr.responseText);
                $('#loading-message').remove();
            }
        });
    }



// Add section part
$('#AddNewSection').click(function() {
    if (isEditingContent) {
        createAndShowModal();
    } else {
        // Create the modal HTML structure dynamically
        var modalHTML = `
        <div id="alertDialog" class="custom-modal" style="display:none;">
            <div class="custom-modal-content">
                <div class="custom-modal-header">
                    <span class="custom-modal-icon">!</span>
                    <h2>Please enable editing mode</h2>
                </div>
                <div class="custom-modal-body">
                    <p>You need to enable editing mode before adding new sections. </p>
                </div>
                <div class="custom-modal-footer">
                    <button id="cancelBtn" class="btn cancel">Close</button>
                </div>
            </div>
        </div>
        `;

        $('body').append(modalHTML);

        $('#alertDialog').fadeIn();

        $('#cancelBtn').click(function() {
            $('#alertDialog').fadeOut(function() {
                $('#alertDialog').remove();
            });
        });

    }
});



function createAndShowModal() {
    if ($('#dynamicModal').length) {
        $('#dynamicModal').modal('show');
        return;
    }

    const modalHtml = `
        <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="dynamicModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="select-section-top-btns">
                            <button type="button" class="btn custombtn" id="saveSection">Save Section</button>
                            <button type="button" class="btn customClosebtn" id="closeModal" data-bs-dismiss="modal">Close</button>
                        </div>
                        <h4 class="modal-title w-100 text-center">Add a New Section</h4>
                    </div>
                    <div class="modal-body" id="modalBodyContent">
                        <div class="container-viewport">
                            <div id="multi-filter-container" class="multi-filter-container">

                                <!-- Category Filter -->
                                <div id="category-filter" class="dropdown category-filter filter-style editmode-filter">
                                    <p>Select Category</p>
                                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" id="categoryDropdownButton">
                                        <span class="selected-category">
                                            <i class="ri-grid-fill" style="margin-right:10px;"></i>All
                                        </span>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-custom" id="categoryDropdownMenu"></ul>
                                </div>

                                <!-- Section Filter -->
                                <div id="section-filter" class="dropdown section-filter filter-style editmode-filter">
                                    <p>Select Section</p>
                                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                                        All <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li class="active"><a tabindex="-1" href="#" data-value="all">All</a></li>
                                        <li><a tabindex="-1" href="#" data-value="home">Home/Dashboard</a></li>
                                        <li><a tabindex="-1" href="#" data-value="about">About</a></li>
                                        <li><a tabindex="-1" href="#" data-value="slider">Slider</a></li>
                                        <li><a tabindex="-1" href="#" data-value="contact">Contact</a></li>
                                        <li><a tabindex="-1" href="#" data-value="courses">Courses</a></li>
                                        <li><a tabindex="-1" href="#" data-value="events">Events</a></li>
                                        <li><a tabindex="-1" href="#" data-value="testimonial">Testimonial</a></li>
                                        <li><a tabindex="-1" href="#" data-value="news">News</a></li>
                                        <li><a tabindex="-1" href="#" data-value="pricing">Pricing</a></li>
                                        <li><a tabindex="-1" href="#" data-value="blog">Blogs</a></li>
                                        <li><a tabindex="-1" href="#" data-value="career">Career</a></li>
                                        <li><a tabindex="-1" href="#" data-value="services">Services</a></li>
                                        <li><a tabindex="-1" href="#" data-value="faq">FAQ</a></li>
                                        <li><a tabindex="-1" href="#" data-value="privacy policy">Privacy Policy</a></li>
                                        <li><a tabindex="-1" href="#" data-value="terms & condition">Terms & Condition</a></li>
                                        <li><a tabindex="-1" href="#" data-value="help">Help</a></li>
                                        <li><a tabindex="-1" href="#" data-value="newsletter">NewsLetter</a></li>
                                        <li><a tabindex="-1" href="#" data-value="Sign Up Section">Sign Up Section</a></li>
                                        <li><a tabindex="-1" href="#" data-value="ourteam">Our Team</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div id="wrapper" class="middle-section-wrapper">
                                <div id="no-components-message">There are no components available that match your selected category and section. Please select another combination.</div>
                                <input id="currentSelectedValueOfPageComponents" type="hidden" value="" />
 			<div class="middle_sections_container" id="middle_sections_container">
				<!-- <div id="home-1" name="Section-1 for Home Page" class="component"></div> -->
				<!-- <div id="ourteam-1" class="component" category="Doctors"></div> -->
				<div id="home-1" class="component" category="Auto Industry"></div>
				<div id="home-2" class="component" category="Auto Industry"></div>
				<div id="home-3" class="component" category="Tutoring Services"></div>
				<div id="home-4" class="component" category="Coaching & Workshops"></div>
				<div id="home-5" class="component" category="Online Courses / LMS"></div>
				<div id="home-6" class="component" category="Online Courses / LMS"></div>
				<div id="home-7" class="component" category="School"></div>
				<!-- <div id="home-8" class="component" category="Hotel"></div> -->
				<div id="home-9" class="component" category="Hotels & Resorts"></div>
				<div id="home-10" class="component" category="Hotels & Resorts"></div>
				<div id="home-11" class="component" category="Hotels & Resorts"></div>
				<div id="home-12" class="component" category="Corporate/Company Site"></div>
				<div id="home-13" class="component" category="Consulting / Coaching"></div>
				<div id="home-14" class="component" category="Personal Website"></div>
				<div id="home-15" class="component" category="Small Business"></div>
				<div id="home-16" class="component" category="Personal Website"></div>
				<div id="home-17" class="component" category="Personal Website"></div>
				<div id="home-18" class="component" category="Personal Website"></div>
				<div id="home-19" class="component" category="Travel Blogs"></div>
				<div id="home-20" class="component" category="Restaurants"></div>
				<div id="home-21" class="component" category="Restaurants"></div>
				<div id="home-22" class="component" category="Pre-school & Daycare"></div>
				<div id="home-23" class="component" category="Pre-school & Daycare"></div>
				<div id="home-24" class="component" category="Pre-school & Daycare"></div>
				<div id="home-25" class="component" category="Music & Performing Arts"></div>
				<div id="home-26" class="component" category="Music & Performing Arts"></div>
				<div id="home-27" class="component" category="Electronic Item Services"></div>
				<div id="home-28" class="component" category="Electronic Item Services"></div>
				<div id="home-29" class="component" category="Social Media Influencer"></div>
				<div id="home-30" class="component" category="Social Media Influencer"></div>
				<div id="home-31" class="component" category="Social Media Influencer"></div>
				<div id="home-32" class="component" category="Small Business"></div>
				<div id="home-33" class="component" category="Small Business"></div>
				<div id="home-34" class="component" category="Real Estate"></div>
				<div id="home-35" class="component" category="Real Estate"></div>
				<div id="home-36" class="component" category="Yoga & Meditation"></div>
				<div id="home-37" class="component" category="Nutrition & Diet"></div>
				<div id="home-38" class="component" category="Mental Health"></div>
				<div id="home-39" class="component" category="Cafes & Bakeries"></div>
				<div id="home-40" class="component" category="Salons & Spas"></div>
				<div id="home-41" class="component" category="Real Estate Agencies"></div>
				<div id="home-42" class="component" category="Property Listings"></div>

				<div id="about-1" class="component" category="Collage"></div>
				<div id="about-2" class="component" category="Corporate/Company Site"></div>
				<div id="about-3" class="component" category="Consulting / Coaching"></div>
				<div id="about-4" class="component" category="Collage"></div>
				<div id="about-5" class="component" category="Consulting / Coaching"></div>
				<div id="about-6" class="component" category="Tutoring Services"></div>
				<div id="about-7" class="component" category="Doctor/Clinic"></div>
				<div id="about-8" class="component" category="Doctor/Clinic"></div>
				<div id="about-9" class="component" category="Hotels & Resorts"></div>
				<div id="about-10" class="component" category="Weddings"></div>
				<div id="about-11" class="component" category="Weddings"></div>
				<div id="about-12" class="component" category="Financial Advisors"></div>
				<div id="about-13" class="component" category="Pre-school & Daycare"></div>
				<div id="about-14" class="component" category="Pre-school & Daycare"></div>
				<div id="about-15" class="component" category="Pre-school & Daycare"></div>
				<div id="about-16" class="component" category="Corporate/Company Site"></div>
				<div id="about-17" class="component" category="Real Estate"></div>
				<div id="about-18" class="component" category="Music & Performing Arts"></div>
				<div id="about-19" class="component" category="Medical Services"></div>
				<div id="about-20" class="component" category="Concerts & Festivals"></div>
				<div id="about-21" class="component" category="Vacation Rentals"></div>



				<div id="courses-1" class="component" category="Corporate/Company Site"></div>
				<div id="courses-2" class="component" category="Tutoring Services"></div>
				<div id="courses-3" class="component" category="Tutoring Services"></div>
				<div id="courses-4" class="component" category="Pre-school & Daycare"></div>
				<div id="events-1" class="component" category="Tutoring Services"></div>
				<div id="events-2" class="component" category="Corporate/Company Site"></div>
				<div id="events-3" class="component" category="Concerts & Festivals"></div>

				<div id="news-1" class="component" category="Financial Advisors"></div>
				<div id="news-2" class="component" category="Coaching & Workshops"></div>
				<div id="news-3" class="component" category="Auto Industry"></div>
				<div id="news-4" class="component" category="Artist/Illustrator"></div>
				<div id="news-5" class="component" category="Party Planning"></div>

				<div id="testimonial-1" class="component"></div>
				<div id="testimonial-2" class="component" category="Photography"></div>
				<div id="testimonial-3" class="component"></div>
				<div id="testimonial-4" class="component" category="Doctor/Clinic"></div>
				<div id="testimonial-5" class="component" category="Corporate/Company Site"></div>
				<!-- <div id="testimonial-6" class="component" category="CA"></div> -->
				<div id="testimonial-8" class="component"></div>
				<div id="testimonial-9" class="component" category="Graphic Design"></div>
				<div id="testimonial-10" class="component" category="Writing/Journalism"></div>
				<div id="testimonial-11" class="component" category="Conferences & Seminars"></div>


				<div id="slider-1" class="component" category="School"></div>
				<div id="slider-2" class="component" category="Electronic Item Services"></div>
				<!-- <div id="slider-3" class="component"></div> -->
				<div id="pricing-1" class="component"></div>
				<div id="pricing-2" class="component" category="Financial Advisors"></div>
				<div id="pricing-3" class="component" category="Musician/Band"></div>
				<div id="pricing-4" class="component" category="Tutoring Services"></div>
				<div id="pricing-5" class="component" category="Coaching & Workshops"></div>
				<div id="pricing-6" class="component" category="Coaching & Workshops"></div>
				<div id="pricing-7" class="component" category="Photography"></div>
				<div id="pricing-8" class="component" category="Ticketing Platforms"></div>

				<div id="contact-1" class="component"></div>
				<div id="contact-2" class="component"></div>
				<div id="contact-3" class="component"></div>
				<div id="contact-4" class="component"></div>
				<div id="contact-5" class="component"></div>
				<div id="contact-6" class="component"></div>
				<div id="contact-7" class="component"></div>
				<div id="contact-8" class="component"></div>
				<div id="contact-9" class="component" category="Real Estate"></div>

				<div id="services-1" class="component" category="Doctor/Clinic"></div>
				<div id="services-2" class="component" category="Doctor/Clinic"></div>
				<div id="services-3" class="component" category="Doctor/Clinic"></div>
				<div id="services-4" class="component" category="Hotels & Resorts"></div>
				<div id="services-5" class="component" category="Hotels & Resorts"></div>
				<div id="services-6" class="component" category="Financial Advisors"></div>
				<div id="services-7" class="component" category="Financial Advisors"></div>
				<div id="services-8" class="component" category="Musician/Band"></div>
				<div id="services-9" class="component" category="Company Secretary"></div>
				<div id="services-10" class="component" category="Company Secretary"></div>
				<div id="services-11" class="component" category="Photography"></div>
				<div id="services-12" class="component" category="Artist/Illustrator"></div>
				<div id="services-13" class="component" category="Nutrition & Diet"></div>
				<div id="services-14" class="component" category="Cafes & Bakeries"></div>
				<div id="services-15" class="component" category="Catering Services"></div>

				<div id="blog-2" class="component"></div>
				<div id="blog-6" class="component" category="Doctor/Clinic"></div>
				<div id="blog-7" class="component" category="Weddings"></div>
				<div id="blog-8" class="component" category="Travel Blogs"></div>
				<div id="blog-9" class="component" category="Travel Blogs"></div>
				<div id="blog-10" class="component" category="Recipe Blogs"></div>
				<div id="blog-11" class="component" category="Vacation Rentals"></div>

				<div id="faq-1" class="component"></div>
				<div id="faq-2" class="component"></div>
				<div id="faq-3" class="component" category="Social Media Influencer"></div>
				<div id="faq-4" class="component" category="Home Staging"></div>

				<div id="newsletter-1" class="component"></div>
				<div id="newsletter-2" class="component" category="Education"></div>
				<div id="newsletter-3" class="component" category="Weddings"></div>
				<div id="newsletter-4" class="component" category="Music & Performing Arts"></div>
				<div id="ourteam-1" class="component" category="Doctor/Clinic"></div>
				<div id="ourteam-2" class="component" category="Fitness & Gym"></div>
				<div id="ourteam-3" class="component" category="Conferences & Seminars"></div>

				<div id="help-1" class="component" category="School"></div>
				<div id="help-2" class="component" category="Coaching & Workshops"></div>

			</div>
                                <span id="back-top" class="text-center fa fa-caret-up"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(modalHtml);
    $('#dynamicModal').modal('show');
    loadAllRequiredContents();

    $('#dynamicModal').on('shown.bs.modal', function () {
        enableRadioButtons();
    });

    $(document).on('click', '#saveSection', handleSaveSection);
    $(document).on('click', '#closeModal', function () {
        $('#dynamicModal').modal('hide');
    });

    $('#dynamicModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });

    let selectedCategory = "all";
    let selectedSection = "all";

    // Categories Data
  const categories = [
    {
      title: 'All',
      icon: 'ri-grid-fill',
      sub: []
    },
    {
      title: 'Business & Corporate',
      icon: 'ri-briefcase-line',
      sub: ['Small Business', 'Corporate/Company Site', 'Consulting / Coaching', 'Advocate Service', 'Chartered Accountant Service', 'Company Secretary Service', 'Corporate/Enterprise', 'Real Estate', 'Construction', 'Auto Industry']
    },
    // {
    //   title: 'E-commerce & Retail',
    //   icon: 'ri-shopping-bag-line',
    //   sub: ['Online Store', 'Fashion & Apparel', 'Electronics', 'Food & Beverage', 'Handmade/Crafts', 'Dropshipping']
    // },
    {
      title: 'Portfolio & Creative',
      icon: 'ri-palette-line',
      sub: ['Photography', 'Graphic Design', 'Artist/Illustrator', 'Writing/Journalism', 'Music & Performing Arts', 'Videographer']
    },
    {
      title: 'Personal & Blog',
      icon: 'ri-user-line',
      sub: ['Personal Website', 'Lifestyle Blog', 'Travel Blog', 'Food Blog', 'Tech Blog', 'Wedding Website', 'Social Media Influencer']
    },
    {
      title: 'Education & Learning',
      icon: 'ri-book-open-line',
      sub: ['Online Courses / LMS', 'Tutoring Services', 'Pre-school & Daycare', 'School', 'Collage', 'University', 'Educational Blogs', 'Language Learning', 'Nonprofit Education', 'Coaching & Workshops']
    },
    {
      title: 'Health & Wellness',
      icon: 'ri-heart-pulse-line',
      sub: ['Fitness & Gym', 'Yoga & Meditation', 'Medical Services', 'Mental Health', 'Nutrition & Diet', 'Doctor/Clinic', 'Therapist/Psychologist']
    },
    {
      title: 'Food & Hospitality',
      icon: 'ri-restaurant-line',
      sub: ['Restaurants', 'Cafes & Bakeries', 'Catering Services', 'Food Delivery', 'Recipe Blogs']
    },
    {
      title: 'Events & Entertainment',
      icon: 'ri-movie-line',
      sub: ['Weddings', 'Concerts & Festivals', 'Conferences & Seminars', 'Party Planning', 'Ticketing Platforms', 'Meetup/Workshop', 'Webinar/Livestream']
    },
    {
      title: 'Nonprofit & Community',
      icon: 'ri-community-line',
      sub: ['Charity/NGO', 'Religious Organizations', 'Community Groups', 'Fundraising Campaigns', 'Volunteer Organizations', 'Political Campaign']
    },
    {
      title: 'Real Estate & Property',
      icon: 'ri-building-line',
      sub: ['Real Estate Agencies', 'Property Listings', 'Vacation Rentals', 'Home Staging', 'Architecture & Design']
    },
    {
      title: 'Technology & SaaS',
      icon: 'ri-macbook-line',
      sub: ['Software Companies', 'Tech Startups', 'App Landing Pages', 'IT Services', 'Cybersecurity']
    },
    {
      title: 'Travel & Tourism',
      icon: 'ri-map-pin-line',
      sub: ['Travel Agencies', 'Tour Operators', 'Hotels & Resorts', 'Travel Blogs', 'Destination Guides']
    },
    {
      title: 'Beauty & Fashion',
      icon: 'ri-star-line',
      sub: ['Salons & Spas', 'Makeup Artists', 'Fashion Brands', 'Beauty Blogs', 'Skincare Products']
    },
    {
      title: 'Automotive & Transportation',
      icon: 'ri-truck-line',
      sub: ['Car Dealerships', 'Auto Repair Shops', 'Car Rentals', 'Logistics & Shipping', 'Rideshare Services']
    },
    {
      title: 'Sports & Recreation',
      icon: 'ri-football-line',
      sub: ['Sports Clubs', 'Outdoor Adventures', 'Sporting Goods Stores', 'Fitness Coaching', 'Esports & Gaming']
    },
    {
      title: 'Pets & Animals',
      icon: 'ri-emotion-happy-line',
      sub: ['Pet Stores', 'Veterinary Clinics', 'Pet Grooming', 'Animal Shelters', 'Pet Blogs']
    },
    {
      title: 'Finance & Insurance',
      icon: 'ri-bank-line',
      sub: ['Financial Advisors', 'Insurance Agencies', 'Investment Firms', 'Accounting Services', 'Cryptocurrency Platforms']
    },
    {
      title: 'Government & Public Services',
      icon: 'ri-government-line',
      sub: ['City/County Websites', 'Public Libraries', 'Emergency Services', 'Community Centers', 'Public Transit']
    },
    {
      title: 'Creative & Media',
      icon: 'ri-mic-line',
      sub: ['Musician/Band', 'DJ', 'Filmmaker', 'Podcast', 'Art Gallery']
    },
    {
      title: 'Repair & Maintenance',
      icon: 'ri-tools-line',
      sub: ['Fabrication', 'Plumbing', 'Civil Work', 'Electrician', 'Carpentar', 'Cleaning Service', 'Electronic Item Services']
    }
  ];

    const $menu = $('#categoryDropdownMenu');
    categories.forEach((cat, index) => {
        const hasSub = cat.sub.length > 0;
        const collapseId = `collapse-${index}`;

        const mainItem = document.createElement('li');
        mainItem.className = 'dropdown-item';
        mainItem.setAttribute('data-collapse', hasSub ? collapseId : '');

        if (hasSub) {
            const itemContent = document.createElement('div');
            itemContent.innerHTML = `<i class="${cat.icon}" style="margin-right:10px;"></i>${cat.title}`;

            const arrow = document.createElement('i');
            arrow.className = 'ri-arrow-right-s-line';

            mainItem.appendChild(itemContent);
            mainItem.appendChild(arrow);
            $menu.append(mainItem);

            const subList = document.createElement('ul');
            subList.id = collapseId;
            subList.style.display = 'none';

            cat.sub.forEach(sub => {
                const subItem = document.createElement('li');
                subItem.innerHTML = `<a href="#" data-value="${sub}">${sub}</a>`;
                subList.appendChild(subItem);
            });

            $menu.append(subList);
        } else {
            mainItem.innerHTML = `
                <a href="#" data-value="${cat.title}" class="all-main-category">
                    <i class="${cat.icon}" style="margin-right:10px;"></i>${cat.title}
                </a>`;
            $menu.append(mainItem);
        }
    });

    // Category Dropdown Behavior
    $(document).on('click', '#categoryDropdownMenu .dropdown-item', function (e) {
        const collapseId = $(this).data('collapse');
        if (collapseId) {
            e.stopPropagation();
            $('#categoryDropdownMenu ul').not('#' + collapseId).slideUp(200);
            $('.dropdown-item .ri-arrow-right-s-line').not($(this).find('.ri-arrow-right-s-line')).removeClass('rotate');
            $('#' + collapseId).slideToggle(200);
            $(this).find('.ri-arrow-right-s-line').toggleClass('rotate');
        }
    });

$(document).on('click', '#categoryDropdownMenu > li', function (e) {
    const $link = $(this).find('a.all-main-category');
    if ($link.length) {
        e.preventDefault();
        const text = $link.text().trim();
        const iconClass = $link.find('i').attr('class');
        $('#categoryDropdownButton').html(`<span class="selected-category"><i class="${iconClass}" style="margin-right:10px;"></i>${text}</span> <span class="caret"></span>`);
        selectedCategory = text;
        filterComponents();
    }
});

    $(document).on('click', '#categoryDropdownMenu ul li a[data-value]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const text = $(this).text().trim();
        const iconClass = $(this).closest('ul').prev('.dropdown-item').find('i').first().attr('class');
        $('#categoryDropdownButton').html(`<span class="selected-category"><i class="${iconClass}" style="margin-right:10px;"></i>${text}</span> <span class="caret"></span>`);
        selectedCategory = text;
        filterComponents();
    });

    // Section Filter Behavior
    $(document).on('click', '#section-filter a', function (e) {
        e.preventDefault();
        selectedSection = $(this).data('value');
        $('#section-filter button').html(`${$(this).text()} <span class="caret"></span>`);
        filterComponents();
    });

    // Filtering Function (Category + Section Dependent)
    function filterComponents() {
        let isAnyComponentVisible = false;

        $('.component').each(function () {
            const componentCategory = ($(this).attr('category') || '').toLowerCase();
            const componentId = $(this).attr('id') || '';
            const componentSection = componentId.split('-')[0].toLowerCase();

            const categoryMatch = (selectedCategory.toLowerCase() === 'all') || (componentCategory.includes(selectedCategory.toLowerCase()));
            const sectionMatch = (selectedSection.toLowerCase() === 'all') || (componentSection === selectedSection.toLowerCase());

            if (categoryMatch && sectionMatch) {
                $(this).show();
                isAnyComponentVisible = true;
            } else {
                $(this).hide();
            }
        });

        $('#no-components-message').toggle(!isAnyComponentVisible);
    }

    // Default trigger both as 'All'
    selectedCategory = 'all';
    selectedSection = 'all';
    filterComponents();

    // Close dropdowns when clicked outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#categoryDropdownMenu').length) {
            $('.dropdown-item .ri-arrow-right-s-line').removeClass('rotate');
            $('#categoryDropdownMenu ul').slideUp(200);
        }
    });
}





    function enableRadioButtons() {
        document.querySelectorAll('.radio-holder').forEach(radioHolder => {
            radioHolder.classList.remove('disabled');
            const inputElement = radioHolder.querySelector('input');
            if (inputElement) {
                inputElement.removeAttribute('disabled');
            }
        });
    }

    $(document).on('click', '.add-section-above, .add-section-below', function() {
        if (isEditingContent) {
            const action = $(this).data('action');
            const targetId = $(this).closest('.section-wrapper').attr('id');
            $('#saveSection').data('target-id', targetId);
            $('#saveSection').data('action', action);
            createAndShowModal();
        }
    });


function handleSaveSection() {
    if (!isEditingContent) return;

    // Get selected section IDs from the cookie
    let selectedIds = JSON.parse(getCookie("middle_sections") || '{}');
    let targetId = $(this).data('target-id');
    let action = $(this).data('action');
    if (!selectedIds || Object.keys(selectedIds).length === 0) return;

    let inserted = false;
    const $mainContainer = $('#mainPageContent');

    // Loop over the selected sections
    for (let section in selectedIds) {
        selectedIds[section].forEach(function (id) {
            let sectionToClone = $('#' + id).find('.section-wrapper').first().clone();
            if (sectionToClone.length === 0) return;

            // Assign a new unique ID
            let newSectionId = generateUniqueId();
            sectionToClone.attr('id', newSectionId);

            // Remove any existing action buttons before appending new ones
sectionToClone.find('.add-section-above, .add-section-below, .remove-section-btn, .remove-section-btn-wrapper').remove();

            // Add fresh action buttons
            addActionButtons(sectionToClone);
        sectionToClone.find('.remove-section-btn-wrapper:empty').remove();

            // Insert inside #mainPageContent above or below the target section
            const $targetWrapper = $(`#${targetId}`);
            if ($targetWrapper.length > 0) {
                if (action === 'above') {
                    $targetWrapper.before(sectionToClone);
                } else if (action === 'below') {
                    $targetWrapper.after(sectionToClone);
                }
            } else {
                // Fallback: append to main container
                $mainContainer.append(sectionToClone);
            }

            inserted = true;
        });
    }

    if (inserted) {
        setCookie("middle_sections", JSON.stringify({}));
        $('#dynamicModal').modal('hide');
        $('.section-wrapper').show();
    }
}

    // Ensure event is attached once to avoid repeated execution
    $(document).ready(function() {
        $('#saveSection').off('click').on('click', handleSaveSection);
    });




    function handleSectionFilter() {
        let selectedSection = $(this).data('value');
        $('#section-filter button').text($(this).text());
        $('#section-filter .dropdown-menu li').removeClass('active');
        $(this).parent().addClass('active');
        let sectionsFound = false;
        if (selectedSection === 'all') {
            $('.middle_sections_container .component').show();
            $('#modalBodyContent').height('auto');
        } else {
            $('.middle_sections_container .component').each(function() {
                let sectionId = $(this).attr('id');
                if (sectionId && sectionId.includes(selectedSection)) {
                    $(this).show();
                    sectionsFound = true;
                } else {
                    $(this).hide();
                }
            });
            if (!sectionsFound) {
                $('.middle_sections_container').html(`<div class="no-sections-message">No sections are available for the "${$(this).text()}" category.</div>`);
                $('#modalBodyContent').height('100vh');
                $('#modalBodyContent').height('auto');
            }
        }
    }


    function handleAddSectionButton() {
        const action = $(this).data('action');
        const targetWrapper = $(this).closest('.section-wrapper');
        const targetId = targetWrapper.attr('id');

        if (!targetId) return;

        $('#saveSection').data('target-id', targetId);
        $('#saveSection').data('action', action);
        createAndShowModal();
    }


function addActionButtons(sectionWrapper) {
    // Ensure section has an ID
    if (!sectionWrapper.attr('id')) {
        sectionWrapper.attr('id', generateUniqueId());
    }

    const sectionId = sectionWrapper.attr('id');

    // 🧹 Remove all old buttons and wrappers first
    sectionWrapper.find('.add-section-above, .add-section-below, .remove-section-btn-wrapper, .remove-section-btn').remove();

    // ✅ Create all button HTML (only add wrapper if it contains the button)
    const addAboveButtonHtml = `
        <button class="add-section-above" style="position:absolute; left:47%; top:25px; z-index:999;"
            data-target-id="${sectionId}" data-action="above">
            Add Section Above
            <span><img src="assets/images/arrow_up.png" style="width:20px; height:20px;"/></span>
        </button>
    `;
    const addBelowButtonHtml = `
        <button class="add-section-below" style="position:absolute; left:47%; bottom:22px; z-index:999;"
            data-target-id="${sectionId}" data-action="below">
            Add Section Below
            <span><img src="assets/images/arrow_down.png" style="width:20px; height:20px;"/></span>
        </button>
    `;
    const removeButtonHtml = `
        <button class="remove-section-btn" data-target-id="${sectionId}"
            style="position:absolute; top:5px; right:10px; z-index:999;">&times;</button>
    `;

    // 🧩 Append only meaningful elements — no blank wrapper
    sectionWrapper.append($(addAboveButtonHtml));
    sectionWrapper.append($(addBelowButtonHtml));
    sectionWrapper.append($(removeButtonHtml));

    // 🧹 Double-check no empty wrappers exist
    sectionWrapper.find('.remove-section-btn-wrapper:empty').remove();

    // 🔗 Rebind events
    sectionWrapper.find('.add-section-above, .add-section-below').off('click').on('click', handleAddSectionButton);
    sectionWrapper.find('.remove-section-btn').off('click').on('click', handleRemoveSection);
}


function handleRemoveSection(e) {
    e.stopPropagation();
    const sectionId = $(this).data('target-id');
    const section = $('#' + sectionId);

    if (confirm('Are you sure you want to remove this section?')) {
        section.remove();
    }
}

// Generate Unique ID
function generateUniqueId() {
    return 'section-' + Math.random().toString(36).substring(2, 15);
}

});



