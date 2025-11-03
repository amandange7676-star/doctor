const GLOBAL_HEADER_COOKIE = 'globalHeader';
const GLOBAL_FOOTER_COOKIE = 'globalFooter';
const GLOBAL_MIDDLE_SECTIONS_COOKIE = 'middle_sections';
const HEADER_PAGES = "HeaderPages";
const FOOTER_PAGES = "FooterPages";
const PAGE_NAME = 'index.html';
let CURRENT_MODE = '';

// to show alert clients Details Model
$('#createWebsite').on('click', function() {
    $('#clientsDetailsModel').modal('show');
    setCookie("createWebsite", "Yes", 7);

});

$(document).ready(function () {
    var createWebsiteFlag = getCookie("createWebsite");
    $('#multi-filter-container').hide();
    $('#category-filter').hide();
    $('#section-filter').hide();
    $('#overlayID').addClass('overlay');

    $('.accordion-header').each(function() {
        var content = $(this).next('.content');
        var arrow = $(this).find('.arrow');
        if ($(this).hasClass('active')) {
            content.show();
            arrow.html('<i class="ri-arrow-down-s-line"></i>');
        }
    });

    if (getCookie("clientName") && getCookie("projectName") && createWebsiteFlag) {
        $('#createWebsite').hide();
        const clientName = getCookie("clientName");
        const projectName = getCookie("projectName");
        $('.client_Name').text(clientName);
        $('.project_Name').text(projectName);
        $('#clientDetailsDisplay').show();
        $('#page-type-section').show();
        $('#deleteCurrentProject').show();
        $("#page-type-section .accordion-header").trigger("click");
    }

//     // Prepare all sections to load
//     const sections = {
//         "default-middle_section": "MiddleSections/default-middle_section.html",
//         "header": Array.from({ length: 39 }, (_, i) => `Headers/header-${i + 1}.html`),
//         "home": Array.from({ length: 72 }, (_, i) => `MiddleSections/Home/home-${i + 1}.html`),
//         "about": Array.from({ length: 43 }, (_, i) => `MiddleSections/About/about-${i + 1}.html`),
//         "slider": Array.from({ length: 4 }, (_, i) => `MiddleSections/Sliders/slider-${i + 1}.html`),
//         "ourteam": Array.from({ length: 4 }, (_, i) => `MiddleSections/OurTeam/our-team-${i + 1}.html`),
//         "courses": Array.from({ length: 7 }, (_, i) => `MiddleSections/Courses/courses-${i + 1}.html`),
//         "events": Array.from({ length: 5 }, (_, i) => `MiddleSections/Events/events-${i + 1}.html`),
//         "news": Array.from({ length: 6 }, (_, i) => `MiddleSections/News/news-${i + 1}.html`),
//         "testimonial": Array.from({ length: 13 }, (_, i) => `MiddleSections/Testimonial/testimonial-${i + 1}.html`),
//         "pricing": Array.from({ length: 9 }, (_, i) => `MiddleSections/Pricing/pricing-${i + 1}.html`),
//         "contact": Array.from({ length: 16 }, (_, i) => `MiddleSections/Contact/contact-${i + 1}.html`),
//         "blog": [2,6,7,8,9,10,11,12,13,14].map(i => `MiddleSections/Blogs/blog-${i}.html`),
//         "faq": Array.from({ length: 5 }, (_, i) => `MiddleSections/Faq/faq-${i + 1}.html`),
//         "newsletter": Array.from({ length: 5 }, (_, i) => `MiddleSections/Newsletter/newsletter-${i + 1}.html`),
//         "services": Array.from({ length: 23 }, (_, i) => `MiddleSections/Services/services-${i + 1}.html`),
//         "help": Array.from({ length: 2 }, (_, i) => `MiddleSections/Help/help-${i + 1}.html`),
//         "footer": Array.from({ length: 10 }, (_, i) => `Footers/footer-${i + 1}.html`)
//     };

//     //  queue
//     const loadQueue = [];
//     for (const key in sections) {
//         const paths = Array.isArray(sections[key]) ? sections[key] : [sections[key]];
//         paths.forEach((path, index) => {
//             const id = Array.isArray(sections[key]) ? `${key}-${index + 1}` : key;
//             loadQueue.push({id, path: `assets/page_components/${path}`});
//         });
//     }

//     let batchSize = 5; // number of files to load at once
//     let queueIndex = 0;

//     function loadNextBatch() {
//         if (queueIndex >= loadQueue.length) return;

//         const batch = loadQueue.slice(queueIndex, queueIndex + batchSize);
//         queueIndex += batchSize;

//         let promises = batch.map(item => {
//             return new Promise((resolve) => {
//                 loadContent(item.id, item.path);
//                 resolve();
//             });
//         });

//         Promise.all(promises).then(() => {
//             // Load next batch when user scrolls
//             $(window).one('scroll', function() {
//                 if (queueIndex < loadQueue.length) loadNextBatch();
//             });
//         });
//     }

//     // Start first batch
//     loadNextBatch();



    loadAllRequiredContents();




});

function loadAllRequiredContents(){
    loadContent("default-middle_section", "assets/page_components/MiddleSections/default-middle_section.html");
    loadContent("header-1", "assets/page_components/Headers/header-1.html");
    loadContent("header-2", "assets/page_components/Headers/header-2.html");
    loadContent("header-3", "assets/page_components/Headers/header-3.html");
    loadContent("header-4", "assets/page_components/Headers/header-4.html");
    loadContent("header-5", "assets/page_components/Headers/header-5.html");
    loadContent("header-6", "assets/page_components/Headers/header-6.html");
    loadContent("header-7", "assets/page_components/Headers/header-7.html");
    loadContent("header-8", "assets/page_components/Headers/header-8.html");
    loadContent("header-9", "assets/page_components/Headers/header-9.html");
    loadContent("header-10", "assets/page_components/Headers/header-10.html");
    loadContent("header-11", "assets/page_components/Headers/header-11.html");
    loadContent("header-13", "assets/page_components/Headers/header-13.html");
    loadContent("header-14", "assets/page_components/Headers/header-14.html");
    loadContent("header-15", "assets/page_components/Headers/header-15.html");
    loadContent("header-16", "assets/page_components/Headers/header-16.html");
    loadContent("header-17", "assets/page_components/Headers/header-17.html");
    loadContent("header-18", "assets/page_components/Headers/header-18.html");
    loadContent("header-19", "assets/page_components/Headers/header-19.html");
    loadContent("header-20", "assets/page_components/Headers/header-20.html");
    loadContent("header-21", "assets/page_components/Headers/header-21.html");
    loadContent("header-22", "assets/page_components/Headers/header-22.html");
    loadContent("header-23", "assets/page_components/Headers/header-23.html");
    loadContent("header-24", "assets/page_components/Headers/header-24.html");
    loadContent("header-25", "assets/page_components/Headers/header-25.html");
    loadContent("header-26", "assets/page_components/Headers/header-26.html");
    loadContent("header-27", "assets/page_components/Headers/header-27.html");
    loadContent("header-28", "assets/page_components/Headers/header-28.html");
    loadContent("header-29", "assets/page_components/Headers/header-29.html");
    loadContent("header-30", "assets/page_components/Headers/header-30.html");
    loadContent("header-31", "assets/page_components/Headers/header-31.html");
    loadContent("header-32", "assets/page_components/Headers/header-32.html");
    loadContent("header-33", "assets/page_components/Headers/header-33.html");
    loadContent("header-34", "assets/page_components/Headers/header-34.html");
    loadContent("header-35", "assets/page_components/Headers/header-35.html");
    loadContent("header-36", "assets/page_components/Headers/header-36.html");
    loadContent("header-37", "assets/page_components/Headers/header-37.html");
    loadContent("header-38", "assets/page_components/Headers/header-38.html");
    loadContent("header-39", "assets/page_components/Headers/header-39.html");
    loadContent("header-40", "assets/page_components/Headers/header-40.html");


    loadContent("home-1", "assets/page_components/MiddleSections/Home/home-1.html");
    loadContent("home-2", "assets/page_components/MiddleSections/Home/home-2.html");
    loadContent("home-3", "assets/page_components/MiddleSections/Home/home-3.html");
    loadContent("home-4", "assets/page_components/MiddleSections/Home/home-4.html");
    loadContent("home-5", "assets/page_components/MiddleSections/Home/home-5.html");
    loadContent("home-6", "assets/page_components/MiddleSections/Home/home-6.html");
    loadContent("home-7", "assets/page_components/MiddleSections/Home/home-7.html");
    loadContent("home-9", "assets/page_components/MiddleSections/Home/home-9.html");
    loadContent("home-10", "assets/page_components/MiddleSections/Home/home-10.html");
    loadContent("home-11", "assets/page_components/MiddleSections/Home/home-11.html");
    loadContent("home-12", "assets/page_components/MiddleSections/Home/home-12.html");
    loadContent("home-13", "assets/page_components/MiddleSections/Home/home-13.html");
    loadContent("home-14", "assets/page_components/MiddleSections/Home/home-14.html");
    loadContent("home-15", "assets/page_components/MiddleSections/Home/home-15.html");
    loadContent("home-16", "assets/page_components/MiddleSections/Home/home-16.html");
    loadContent("home-17", "assets/page_components/MiddleSections/Home/home-17.html");
    loadContent("home-18", "assets/page_components/MiddleSections/Home/home-18.html");
    loadContent("home-19", "assets/page_components/MiddleSections/Home/home-19.html");
    loadContent("home-20", "assets/page_components/MiddleSections/Home/home-20.html");
    loadContent("home-21", "assets/page_components/MiddleSections/Home/home-21.html");
    loadContent("home-22", "assets/page_components/MiddleSections/Home/home-22.html");
    loadContent("home-23", "assets/page_components/MiddleSections/Home/home-23.html");
    loadContent("home-24", "assets/page_components/MiddleSections/Home/home-24.html");
    loadContent("home-25", "assets/page_components/MiddleSections/Home/home-25.html");
    loadContent("home-26", "assets/page_components/MiddleSections/Home/home-26.html");
    loadContent("home-27", "assets/page_components/MiddleSections/Home/home-27.html");
    loadContent("home-28", "assets/page_components/MiddleSections/Home/home-28.html");
    loadContent("home-29", "assets/page_components/MiddleSections/Home/home-29.html");
    loadContent("home-30", "assets/page_components/MiddleSections/Home/home-30.html");
    loadContent("home-31", "assets/page_components/MiddleSections/Home/home-31.html");
    loadContent("home-32", "assets/page_components/MiddleSections/Home/home-32.html");
    loadContent("home-33", "assets/page_components/MiddleSections/Home/home-33.html");
    loadContent("home-34", "assets/page_components/MiddleSections/Home/home-34.html");
    loadContent("home-35", "assets/page_components/MiddleSections/Home/home-35.html");
    loadContent("home-36", "assets/page_components/MiddleSections/Home/home-36.html");
    loadContent("home-37", "assets/page_components/MiddleSections/Home/home-37.html");
    loadContent("home-38", "assets/page_components/MiddleSections/Home/home-38.html");
    loadContent("home-39", "assets/page_components/MiddleSections/Home/home-39.html");
    loadContent("home-40", "assets/page_components/MiddleSections/Home/home-40.html");
    loadContent("home-41", "assets/page_components/MiddleSections/Home/home-41.html");
    loadContent("home-42", "assets/page_components/MiddleSections/Home/home-42.html");
    loadContent("home-43", "assets/page_components/MiddleSections/Home/home-43.html");
    loadContent("home-44", "assets/page_components/MiddleSections/Home/home-44.html");
    loadContent("home-45", "assets/page_components/MiddleSections/Home/home-45.html");
    loadContent("home-47", "assets/page_components/MiddleSections/Home/home-47.html");
    loadContent("home-48", "assets/page_components/MiddleSections/Home/home-48.html");
    loadContent("home-49", "assets/page_components/MiddleSections/Home/home-49.html");
    loadContent("home-50", "assets/page_components/MiddleSections/Home/home-50.html");
    loadContent("home-51", "assets/page_components/MiddleSections/Home/home-51.html");
    loadContent("home-52", "assets/page_components/MiddleSections/Home/home-52.html");
    loadContent("home-53", "assets/page_components/MiddleSections/Home/home-53.html");
    loadContent("home-54", "assets/page_components/MiddleSections/Home/home-54.html");
    loadContent("home-55", "assets/page_components/MiddleSections/Home/home-55.html");
    loadContent("home-56", "assets/page_components/MiddleSections/Home/home-56.html");
    loadContent("home-57", "assets/page_components/MiddleSections/Home/home-57.html");
    loadContent("home-58", "assets/page_components/MiddleSections/Home/home-58.html");
    loadContent("home-59", "assets/page_components/MiddleSections/Home/home-59.html");
    loadContent("home-60", "assets/page_components/MiddleSections/Home/home-60.html");
    loadContent("home-61", "assets/page_components/MiddleSections/Home/home-61.html");
    loadContent("home-62", "assets/page_components/MiddleSections/Home/home-62.html");
    loadContent("home-63", "assets/page_components/MiddleSections/Home/home-63.html");
    loadContent("home-64", "assets/page_components/MiddleSections/Home/home-64.html");
    loadContent("home-65", "assets/page_components/MiddleSections/Home/home-65.html");
    loadContent("home-66", "assets/page_components/MiddleSections/Home/home-66.html");
    loadContent("home-67", "assets/page_components/MiddleSections/Home/home-67.html");
    loadContent("home-68", "assets/page_components/MiddleSections/Home/home-68.html");
    loadContent("home-69", "assets/page_components/MiddleSections/Home/home-69.html");
    loadContent("home-70", "assets/page_components/MiddleSections/Home/home-70.html");
    loadContent("home-71", "assets/page_components/MiddleSections/Home/home-71.html");
    loadContent("home-72", "assets/page_components/MiddleSections/Home/home-72.html");
    loadContent("home-73", "assets/page_components/MiddleSections/Home/home-73.html");
    loadContent("home-74", "assets/page_components/MiddleSections/Home/home-74.html");

    loadContent("about-1", "assets/page_components/MiddleSections/About/about-1.html");
    loadContent("about-2", "assets/page_components/MiddleSections/About/about-2.html");
    loadContent("about-3", "assets/page_components/MiddleSections/About/about-3.html");
    loadContent("about-4", "assets/page_components/MiddleSections/About/about-4.html");
    loadContent("about-5", "assets/page_components/MiddleSections/About/about-5.html");
    loadContent("about-6", "assets/page_components/MiddleSections/About/about-6.html");
    loadContent("about-7", "assets/page_components/MiddleSections/About/about-7.html");
    loadContent("about-8", "assets/page_components/MiddleSections/About/about-8.html");
    loadContent("about-9", "assets/page_components/MiddleSections/About/about-9.html");
    loadContent("about-10", "assets/page_components/MiddleSections/About/about-10.html");
    loadContent("about-11", "assets/page_components/MiddleSections/About/about-11.html");
    loadContent("about-12", "assets/page_components/MiddleSections/About/about-12.html");
    loadContent("about-13", "assets/page_components/MiddleSections/About/about-13.html");
    loadContent("about-14", "assets/page_components/MiddleSections/About/about-14.html");
    loadContent("about-15", "assets/page_components/MiddleSections/About/about-15.html");
    loadContent("about-16", "assets/page_components/MiddleSections/About/about-16.html");
    loadContent("about-17", "assets/page_components/MiddleSections/About/about-17.html");
    loadContent("about-18", "assets/page_components/MiddleSections/About/about-18.html");
    loadContent("about-19", "assets/page_components/MiddleSections/About/about-19.html");
    loadContent("about-20", "assets/page_components/MiddleSections/About/about-20.html");
    loadContent("about-21", "assets/page_components/MiddleSections/About/about-21.html");
    loadContent("about-22", "assets/page_components/MiddleSections/About/about-22.html");
    loadContent("about-23", "assets/page_components/MiddleSections/About/about-23.html");
    loadContent("about-24", "assets/page_components/MiddleSections/About/about-24.html");
    loadContent("about-25", "assets/page_components/MiddleSections/About/about-25.html");
    loadContent("about-26", "assets/page_components/MiddleSections/About/about-26.html");
    loadContent("about-27", "assets/page_components/MiddleSections/About/about-27.html");
    loadContent("about-28", "assets/page_components/MiddleSections/About/about-28.html");
    loadContent("about-29", "assets/page_components/MiddleSections/About/about-29.html");
    loadContent("about-30", "assets/page_components/MiddleSections/About/about-30.html");
    loadContent("about-31", "assets/page_components/MiddleSections/About/about-31.html");
    loadContent("about-32", "assets/page_components/MiddleSections/About/about-32.html");
    loadContent("about-33", "assets/page_components/MiddleSections/About/about-33.html");
    loadContent("about-34", "assets/page_components/MiddleSections/About/about-34.html");
    loadContent("about-35", "assets/page_components/MiddleSections/About/about-35.html");
    loadContent("about-36", "assets/page_components/MiddleSections/About/about-36.html");
    loadContent("about-37", "assets/page_components/MiddleSections/About/about-37.html");
    loadContent("about-38", "assets/page_components/MiddleSections/About/about-38.html");
    loadContent("about-39", "assets/page_components/MiddleSections/About/about-39.html");
    loadContent("about-40", "assets/page_components/MiddleSections/About/about-40.html");
    loadContent("about-41", "assets/page_components/MiddleSections/About/about-41.html");
    loadContent("about-42", "assets/page_components/MiddleSections/About/about-42.html");
    loadContent("about-43", "assets/page_components/MiddleSections/About/about-43.html");
    loadContent("about-44", "assets/page_components/MiddleSections/About/about-44.html");
    loadContent("about-45", "assets/page_components/MiddleSections/About/about-45.html");
    loadContent("about-46", "assets/page_components/MiddleSections/About/about-46.html");

    loadContent("slider-1", "assets/page_components/MiddleSections/Sliders/slider-1.html");
    loadContent("slider-2", "assets/page_components/MiddleSections/Sliders/slider-2.html");
    loadContent("slider-3", "assets/page_components/MiddleSections/Sliders/slider-3.html");
    loadContent("slider-4", "assets/page_components/MiddleSections/Sliders/slider-4.html");

    loadContent("ourteam-1", "assets/page_components/MiddleSections/OurTeam/our-team-1.html");
    loadContent("courses-1", "assets/page_components/MiddleSections/Courses/courses-1.html");
    loadContent("courses-2", "assets/page_components/MiddleSections/Courses/courses-2.html");
    loadContent("courses-3", "assets/page_components/MiddleSections/Courses/courses-3.html");
    loadContent("courses-4", "assets/page_components/MiddleSections/Courses/courses-4.html");
    loadContent("courses-5", "assets/page_components/MiddleSections/Courses/courses-5.html");
    loadContent("courses-6", "assets/page_components/MiddleSections/Courses/courses-6.html");
    loadContent("courses-7", "assets/page_components/MiddleSections/Courses/courses-7.html");

    loadContent("events-1", "assets/page_components/MiddleSections/Events/events-1.html");
    loadContent("events-2", "assets/page_components/MiddleSections/Events/events-2.html");
    loadContent("events-3", "assets/page_components/MiddleSections/Events/events-3.html");
    loadContent("events-4", "assets/page_components/MiddleSections/Events/events-4.html");
    loadContent("events-5", "assets/page_components/MiddleSections/Events/events-5.html");5
    loadContent("news-1", "assets/page_components/MiddleSections/News/news-1.html");
    loadContent("news-2", "assets/page_components/MiddleSections/News/news-2.html");
    loadContent("news-3", "assets/page_components/MiddleSections/News/news-3.html");
    loadContent("news-4", "assets/page_components/MiddleSections/News/news-4.html");
    loadContent("news-5", "assets/page_components/MiddleSections/News/news-5.html");
    loadContent("news-6", "assets/page_components/MiddleSections/News/news-6.html");
    loadContent("news-7", "assets/page_components/MiddleSections/News/news-7.html");

    loadContent("testimonial-1", "assets/page_components/MiddleSections/Testimonial/testimonial-1.html");
    loadContent("testimonial-2", "assets/page_components/MiddleSections/Testimonial/testimonial-2.html");
    loadContent("testimonial-3", "assets/page_components/MiddleSections/Testimonial/testimonial-3.html");
    loadContent("testimonial-4", "assets/page_components/MiddleSections/Testimonial/testimonial-4.html");
    loadContent("testimonial-5", "assets/page_components/MiddleSections/Testimonial/testimonial-5.html");
    loadContent("testimonial-6", "assets/page_components/MiddleSections/Testimonial/testimonial-6.html");
    loadContent("testimonial-7", "assets/page_components/MiddleSections/Testimonial/testimonial-7.html");
    loadContent("testimonial-8", "assets/page_components/MiddleSections/Testimonial/testimonial-8.html");
    loadContent("testimonial-9", "assets/page_components/MiddleSections/Testimonial/testimonial-9.html");
    loadContent("testimonial-10", "assets/page_components/MiddleSections/Testimonial/testimonial-10.html");
    loadContent("testimonial-11", "assets/page_components/MiddleSections/Testimonial/testimonial-11.html");
    loadContent("testimonial-12", "assets/page_components/MiddleSections/Testimonial/testimonial-12.html");
    loadContent("testimonial-13", "assets/page_components/MiddleSections/Testimonial/testimonial-13.html");

    loadContent("pricing-1", "assets/page_components/MiddleSections/Pricing/pricing-1.html");
    loadContent("pricing-2", "assets/page_components/MiddleSections/Pricing/pricing-2.html");
    loadContent("pricing-3", "assets/page_components/MiddleSections/Pricing/pricing-3.html");
    loadContent("pricing-4", "assets/page_components/MiddleSections/Pricing/pricing-4.html");
    loadContent("pricing-5", "assets/page_components/MiddleSections/Pricing/pricing-5.html");
    loadContent("pricing-6", "assets/page_components/MiddleSections/Pricing/pricing-6.html");
    loadContent("pricing-7", "assets/page_components/MiddleSections/Pricing/pricing-7.html");
    loadContent("pricing-8", "assets/page_components/MiddleSections/Pricing/pricing-8.html");
    loadContent("pricing-9", "assets/page_components/MiddleSections/Pricing/pricing-9.html");

    loadContent("contact-1", "assets/page_components/MiddleSections/Contact/contact-1.html");
    loadContent("contact-2", "assets/page_components/MiddleSections/Contact/contact-2.html");
    loadContent("contact-3", "assets/page_components/MiddleSections/Contact/contact-3.html");
    loadContent("contact-4", "assets/page_components/MiddleSections/Contact/contact-4.html");
    loadContent("contact-5", "assets/page_components/MiddleSections/Contact/contact-5.html");
    loadContent("contact-6", "assets/page_components/MiddleSections/Contact/contact-6.html");
    loadContent("contact-7", "assets/page_components/MiddleSections/Contact/contact-7.html");
    loadContent("contact-8", "assets/page_components/MiddleSections/Contact/contact-8.html");
    loadContent("contact-9", "assets/page_components/MiddleSections/Contact/contact-9.html");
    loadContent("contact-10", "assets/page_components/MiddleSections/Contact/contact-10.html");
    loadContent("contact-11", "assets/page_components/MiddleSections/Contact/contact-11.html");
    loadContent("contact-12", "assets/page_components/MiddleSections/Contact/contact-12.html");
    loadContent("contact-13", "assets/page_components/MiddleSections/Contact/contact-13.html");
    loadContent("contact-14", "assets/page_components/MiddleSections/Contact/contact-14.html");
    loadContent("contact-15", "assets/page_components/MiddleSections/Contact/contact-15.html");
    loadContent("contact-16", "assets/page_components/MiddleSections/Contact/contact-16.html");
    loadContent("contact-17", "assets/page_components/MiddleSections/Contact/contact-17.html");
    loadContent("contact-18", "assets/page_components/MiddleSections/Contact/contact-18.html");

    loadContent("blog-2", "assets/page_components/MiddleSections/Blogs/blog-2.html");
    loadContent("blog-6", "assets/page_components/MiddleSections/Blogs/blog-6.html");
    loadContent("blog-7", "assets/page_components/MiddleSections/Blogs/blog-7.html");
    loadContent("blog-8", "assets/page_components/MiddleSections/Blogs/blog-8.html");
    loadContent("blog-9", "assets/page_components/MiddleSections/Blogs/blog-9.html");
    loadContent("blog-10", "assets/page_components/MiddleSections/Blogs/blog-10.html");
    loadContent("blog-11", "assets/page_components/MiddleSections/Blogs/blog-11.html");
    loadContent("blog-12", "assets/page_components/MiddleSections/Blogs/blog-12.html");
    loadContent("blog-13", "assets/page_components/MiddleSections/Blogs/blog-13.html");
    loadContent("blog-14", "assets/page_components/MiddleSections/Blogs/blog-14.html");
    loadContent("blog-15", "assets/page_components/MiddleSections/Blogs/blog-15.html");

    loadContent("faq-1", "assets/page_components/MiddleSections/Faq/faq-1.html");
    loadContent("faq-2", "assets/page_components/MiddleSections/Faq/faq-2.html");
    loadContent("faq-3", "assets/page_components/MiddleSections/Faq/faq-3.html");
    loadContent("faq-4", "assets/page_components/MiddleSections/Faq/faq-4.html");
    loadContent("faq-5", "assets/page_components/MiddleSections/Faq/faq-5.html");

    loadContent("newsletter-1", "assets/page_components/MiddleSections/Newsletter/newsletter-1.html");
    loadContent("newsletter-2", "assets/page_components/MiddleSections/Newsletter/newsletter-2.html");
    loadContent("newsletter-3", "assets/page_components/MiddleSections/Newsletter/newsletter-3.html");
    loadContent("newsletter-4", "assets/page_components/MiddleSections/Newsletter/newsletter-4.html");
    loadContent("newsletter-5", "assets/page_components/MiddleSections/Newsletter/newsletter-5.html");

    loadContent("services-1", "assets/page_components/MiddleSections/Services/services-1.html");
    loadContent("services-2", "assets/page_components/MiddleSections/Services/services-2.html");
    loadContent("services-3", "assets/page_components/MiddleSections/Services/services-3.html");
    loadContent("services-4", "assets/page_components/MiddleSections/Services/services-4.html");
    loadContent("services-5", "assets/page_components/MiddleSections/Services/services-5.html");
    loadContent("services-6", "assets/page_components/MiddleSections/Services/services-6.html");
    loadContent("services-7", "assets/page_components/MiddleSections/Services/services-7.html");
    loadContent("services-8", "assets/page_components/MiddleSections/Services/services-8.html");
    loadContent("services-9", "assets/page_components/MiddleSections/Services/services-9.html");
    loadContent("services-10", "assets/page_components/MiddleSections/Services/services-10.html");
    loadContent("services-11", "assets/page_components/MiddleSections/Services/services-11.html");
    loadContent("services-12", "assets/page_components/MiddleSections/Services/services-12.html");
    loadContent("services-13", "assets/page_components/MiddleSections/Services/services-13.html");
    loadContent("services-14", "assets/page_components/MiddleSections/Services/services-14.html");
    loadContent("services-15", "assets/page_components/MiddleSections/Services/services-15.html");
    loadContent("services-16", "assets/page_components/MiddleSections/Services/services-16.html");
    loadContent("services-17", "assets/page_components/MiddleSections/Services/services-17.html");
    loadContent("services-18", "assets/page_components/MiddleSections/Services/services-18.html");
    loadContent("services-19", "assets/page_components/MiddleSections/Services/services-19.html");
    loadContent("services-20", "assets/page_components/MiddleSections/Services/services-20.html");
    loadContent("services-21", "assets/page_components/MiddleSections/Services/services-21.html");
    loadContent("services-22", "assets/page_components/MiddleSections/Services/services-22.html");
    loadContent("services-23", "assets/page_components/MiddleSections/Services/services-23.html");
    loadContent("services-24", "assets/page_components/MiddleSections/Services/services-24.html");
    loadContent("services-25", "assets/page_components/MiddleSections/Services/services-25.html");

    loadContent("ourteam-2", "assets/page_components/MiddleSections/OurTeam/our-team-2.html");
    loadContent("ourteam-3", "assets/page_components/MiddleSections/OurTeam/our-team-3.html");
    loadContent("ourteam-4", "assets/page_components/MiddleSections/OurTeam/our-team-4.html");4
    loadContent("help-1", "assets/page_components/MiddleSections/Help/help-1.html");
    loadContent("help-2", "assets/page_components/MiddleSections/Help/help-2.html");
    // loadContent("middle", "middle-content.html");
    loadContent("footer-1", "assets/page_components/Footers/footer-1.html");
    loadContent("footer-2", "assets/page_components/Footers/footer-2.html");
    loadContent("footer-3", "assets/page_components/Footers/footer-3.html");
    loadContent("footer-4", "assets/page_components/Footers/footer-4.html");
    loadContent("footer-5", "assets/page_components/Footers/footer-5.html");
    loadContent("footer-6", "assets/page_components/Footers/footer-6.html");
    loadContent("footer-7", "assets/page_components/Footers/footer-7.html");
    loadContent("footer-8", "assets/page_components/Footers/footer-8.html");
    loadContent("footer-9", "assets/page_components/Footers/footer-9.html");
    loadContent("footer-10", "assets/page_components/Footers/footer-10.html");

    return true;
}




function loadContent(elementId, fileName) {
    $(`#${elementId}`).load(fileName, function () {
        applyDynamicFonts();
        addCheckbox(elementId);
        initScrollAnimations();
    });
}



// to show export project button after checking globalHeader & globalFooter available in cookies
function checkCookiesAndShowButton() {
    if (getCookie(GLOBAL_HEADER_COOKIE) && getCookie(GLOBAL_FOOTER_COOKIE)) {
        $('#export-btn').show();
        $('#preview-site').show();

    }

}
checkCookiesAndShowButton();
const checkInterval = setInterval(function () {
    if (getCookie(GLOBAL_HEADER_COOKIE) && getCookie(GLOBAL_FOOTER_COOKIE)) {
        $('#export-btn').show();
          $('#preview-site').show();
        clearInterval(checkInterval);
    }
}, 100);



var $overlay = $('#overlayID');
var $wrapper = $('#wrapper');
$('#overlayID').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    // do not hide overlay on click
});
// Show/hide overlay based on status
if ($('#overlayStatus').val() === 'enabled') {
    $overlay.show();
    $('#headerMenuActionButtons').hide();
    $wrapper.css('pointer-events', 'none');
} else {
    $overlay.hide();
    $('#headerMenuActionButtons').show();
    $wrapper.css('pointer-events', 'auto');
}

// Open modal on button click
$('#createWebsite').on('click', function () {
    $('#clientsDetailsModel').modal('show');
    setCookie("createWebsite", "Yes", 7);
});

// Submit form
$('#submitclientsDetails').on('click', function () {
    var clientName = $('#clientName').val().trim();
    var projectName = $('#projectName').val().trim();

    if (clientName && projectName) {
        setCookie("clientName", clientName, 7);
        setCookie("projectName", projectName, 7);

        $('#clientsDetailsModel').modal('hide');
        $('#createWebsite').hide();

        $('.client_Name').text(clientName);
        $('.project_Name').text(projectName);
        $('#clientDetailsDisplay').show();
        $('#deleteCurrentProject').show();
        $('#page-type-section').show();
        $("#page-type-section .accordion-header").trigger("click");
        $('.pages-for[value="header"]').prop('checked', true).trigger('click');

        // Hide overlay after success
        $overlay.hide();
        $('#overlayStatus').val('disabled');
        $wrapper.css('pointer-events', 'auto');
        $('#headerMenuActionButtons').show();

        // $('#category-filter .dropdown-menu li[data-value="All"]').trigger('click');

    } else {
        alert("Please fill out both fields.");
    }
});

// If modal is closed *without submitting*, restore overlay
$('#clientsDetailsModel').on('hidden.bs.modal', function () {
    if ($('#overlayStatus').val() === 'enabled') {
        $overlay.show();
        $wrapper.css('pointer-events', 'none');
        $('#headerMenuActionButtons').hide();
    }
});


// to delete all the cookies data to start fresh project
$('#deleteCurrentProject').on('click', function() {
    const projectName = getCookie("projectName");
    $('#alertDialog').fadeIn();
    $('.currentProjectName').html(projectName);
});

$('#cancelBtn').on('click', function () {
    $('#alertDialog').fadeOut();
});
$('#confirmBtn').on('click', function () {
    document.cookie.split(";").forEach(function (cookie) {
        const cookieName = cookie.split("=")[0].trim();
        deleteCookie(cookieName);
$('#clientsDetailsModel input').val("");
    });
    $('#clientDetailsDisplay').hide();
    $('#createWebsite').show();
    $('#deleteCurrentProject').hide();
    $('#page-type-section').hide();
    $('#alertDialog').fadeOut();
});

function ChoosePagesForHeaderFooter(selectedValue) {
    CURRENT_MODE = selectedValue;

    $('#headerMenuActionButtons').hide();
    $('#overlayID').removeClass("overlay");

    // Hide all components initially
    $('.component').hide();

    // Show only header or footer components
    $('#wrapper .component').each(function () {
        const id = $(this).attr('id');
        if (id && id.startsWith(selectedValue + '-')) {
            $(this).show();
        }
    });

    // Show only category filter
    $('#multi-filter-container').show();
    $('#category-filter').show();
    $('#section-filter').hide();

    if (selectedValue === 'header') {
        $("#displayMessageId").html("Please select one of the Headers from the available options given below");
        const cookieCurrentHeader = getCookie(GLOBAL_HEADER_COOKIE);
        if (cookieCurrentHeader) {
            populateMainAndSubPages();
            $('#header-menu-details').show();
            $('#selHeaderName').text(cookieCurrentHeader);
            $('#header-menu-details .accordion-header').addClass('active');
            $('#header-menu-details .content').css('display', 'block');
        }
        $('#footer-menu-details').hide();
          const componentsHeaders = $('.headers_container .component');
         paginateComponents(componentsHeaders, 10);

    } else if (selectedValue === 'footer') {
        $("#displayMessageId").html("Please select one of the Footers from the available options given below");
        const cookieCurrentFooter = getCookie(GLOBAL_FOOTER_COOKIE);
        if (cookieCurrentFooter) {
            populateFooterDropdowns();
            $('#footer-menu-details').show();
            $('#selFooterName').text(cookieCurrentFooter);
            $('#footer-menu-details .accordion-header').addClass('active');
            $('#footer-menu-details .content').css('display', 'block');
        }
        $('#header-menu-details').hide();
           const componentsFooters = $('.footers_container .component');
           paginateComponents(componentsFooters, 10);
    }
}


$('.pages-for').unbind().click(function() {
    const selectedValue = $(this).val();
    ChoosePagesForHeaderFooter(selectedValue);
});

$(document).ready(function() {
    const selectedValue = $('.pages-for:checked').val();
    if (selectedValue) {
        ChoosePagesForHeaderFooter(selectedValue);

    }
});



let isSidebarCollapsed = false;

$("#toggle-sidebar").on("click", function () {
    if (isSidebarCollapsed) {
        // Expand sidebar
        $("#sidebar").css("width", "400px");
        $("#wrapper").css({
            "width": "calc(100% - 400px)",
            "margin-left": "400px"
        });

        $("#sidebar-content").css({
            "visibility": "visible",
            "display": "block"
        });
        $("#wrapper .component").css({
            "margin-top": "40px",
            "margin-left": "-114px",
            "scale": "0.73"
        });

        $("#toggle-sidebar").css("left", "409px");
    } else {
        // Collapse sidebar
        $("#sidebar").css("width", "50px");
        $("#wrapper").css({
            "width": "97%",
            "margin-left": "0px"
        });
        $("#sidebar-content").css({
            "visibility": "hidden",
            "display": "none"
        });
        $("#toggle-sidebar").css({
            "position": "fixed",
            "left": "10px",
            "top": "10px"
        });
        $("#wrapper .component").css({
            "width": "max-content",
            "margin-top": "80px",
            "margin-left": "120px",
            "scale": "0.98"
        });
        $("#wrapper .headers_container").css({
            "margin-top": "50px",
        });

    }
    isSidebarCollapsed = !isSidebarCollapsed;
});



let scrollObserver; // Declare globally to reuse

function initScrollAnimations() {
    if (scrollObserver) scrollObserver.disconnect(); // Remove old observers

    scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add("animate");
            } else {
                el.classList.remove("animate"); // Reset when out of view
            }
        });
    }, { threshold: 0.1 });

    // Observe all .effect elements (new + existing)
    document.querySelectorAll('.effect').forEach(el => {
        scrollObserver.observe(el);
    });
}

// ✅ Run after all content (images + layout) is loaded
window.addEventListener("load", () => {
    initScrollAnimations();
});


function loadPreSelectedData(){
    const clientName = getCookie("clientName");
   // alert("clientName----"+clientName);
    if(clientName != undefined){
        const headerSelectedVal =  getCookie(GLOBAL_HEADER_COOKIE);
        if(headerSelectedVal != undefined){
            $('#overlayID').hide();
            // alert(headerSelectedVal);
            // alert("comp---"+$("#header-2_component").val())
            // alert($("#"+headerSelectedVal+"_component").val());
            $("#"+headerSelectedVal+"_component").prop("checked", true);

        }

    }
}

// Apply dynamic fonts
function applyDynamicFonts() {
    const dynamicFontElements = document.querySelectorAll('[class*="dynamic-font("]');
    dynamicFontElements.forEach((element) => {
        const dynamicFontClass = Array.from(element.classList).find(cls => cls.startsWith('dynamic-font('));
        if (dynamicFontClass) {
            const content = dynamicFontClass.slice(13, -1);
            const [fontFamily, fontSize, fontWeight] = content.split(',');
            if (fontFamily) element.style.fontFamily = fontFamily.trim();
            if (fontSize) element.style.fontSize = `${fontSize.trim()}px`;
            if (fontWeight) element.style.fontWeight = fontWeight.trim();
        }
    });
}

function addCheckbox(elementId) {
    const isHeader = elementId.startsWith('header-');
    const isFooter = elementId.startsWith('footer-');
    // const sectionName = $("#"+elementId).attr("name");
    // if(elementId=="home-1") {
    //     alert(sectionName);
    // }

    const Checkbox = `
        <label class="radio-holder ${(!isHeader && !isFooter) ? 'disabled' : ''}">
            <input type="checkbox" name="${elementId.split('-')[0]}" value="${elementId}"
            id="${elementId}_component"
            class="section-checkbox" ${(!isHeader && !isFooter) ? 'disabled' : ''}>
            ${elementId}
        </label>
    `;
    $("#" + elementId).prepend(Checkbox);

    // Onlick event of Checkbox related to headers, footers or mid-sections
    $("#" + elementId + "_component").change(function () {

        const checkbox = $(this);
        const category = isHeader ? 'header-' : isFooter ? 'footer-' : null;

        if (category) {
            $(`input.section-checkbox[id^="${category}"]:checked`).not(checkbox).prop('checked', false);
        }
        handleSectionSelection(checkbox);
        setGlobalVariablesInLocalStorage(checkbox.val());
    });

}

function handleSectionSelection(currentID) {
    // $("#selectheaderwrapper").hide();
    // $("#headerMenuActionButtons").show();
    const selectedId = currentID.val();

    if (selectedId.indexOf("header") === 0) {
        // $('#selected-header-name').html("Header Menu in " + selectedId);
        pickHeadersMenuFromSelectedHeader(selectedId);
        populateMainAndSubPages();
        displayAreaForSelectedThemesofHeadersMenu(selectedId);
        $("#selHeaderName").html(selectedId);
        $('#header-menu-details').show();
        $('#header-menu-details .accordion-header').removeClass('active');
        $('#header-menu-details .accordion-header').addClass('active');
        $('#header-menu-details .content').css('display', 'block');

    } else if (selectedId.indexOf("footer") === 0) {
        // $('#selected-footer-name').html("Footer Links in " + selectedId);
        pickFooterlinksFromSelectedFooter(selectedId);
        populateFooterDropdowns();
        $("#selFooterName").html(selectedId);
        $('#footer-menu-details').show();
        $('#footer-menu-details .accordion-header').removeClass('active');
        $('#footer-menu-details .accordion-header').addClass('active');
        $('#footer-menu-details .content').css('display', 'block');
    }


}

function setGlobalVariablesInLocalStorage(selectedId) {
        const middleSectionCategories = [];
        $('#section-filter .dropdown-menu li a').each(function () {
            const category = $(this).data('value');
            if (category) {
                middleSectionCategories.push(category);
            }
        });
    const isChecked = $(`#${selectedId}_component`).is(':checked');
    function showCustomAlert(message, type) {
        const alert = $('<div></div>').addClass(`custom-alert ${type}`).html(`${message} <button class="close">&times;</button>`);
        $('#alert-container').append(alert);
        alert.find('.close').on('click', function () {
            alert.remove();
        });
        setTimeout(() => {
            alert.fadeOut(500, function () {
                $(this).remove();
            });
        }, 1000);
    }
    if (selectedId.indexOf("header") === 0) {
        const selectedHeader = getCookie(GLOBAL_HEADER_COOKIE) || null;
        if (isChecked) {
            setCookie(GLOBAL_HEADER_COOKIE, selectedId, 7);
            const headerMessage = `"${selectedId}" template is selected.`;
            showCustomAlert(headerMessage, 'success');
        } else if (selectedHeader === selectedId) {
            deleteCookie(GLOBAL_HEADER_COOKIE);
        }
    } else if (selectedId.indexOf("footer") === 0) {
        let selectedFooter = getCookie(GLOBAL_FOOTER_COOKIE) || null;
      if (isChecked) {
            setCookie(GLOBAL_FOOTER_COOKIE, selectedId, 7);
            const footerMessage = `"${selectedId}" template is selected.`;
            showCustomAlert(footerMessage, 'success');
        } else if (selectedFooter === selectedId) {
            deleteCookie(GLOBAL_FOOTER_COOKIE);
        }
    } else if (middleSectionCategories.some(category => selectedId.startsWith(category))) {
        let selectedPage = $('#localStorageTagName').val();
        // const lastPartOfPage = selectedPage.split('_').pop();
        const selectedMiddleSections = getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || "{}";
        let middleSectionsObject = JSON.parse(selectedMiddleSections);
        const newVal = selectedId;
        // alert(selectedId);
        if (isChecked) {
            if (!middleSectionsObject[selectedPage]) {
                middleSectionsObject[selectedPage] = [selectedId];
            } else {
                middleSectionsObject[selectedPage].push(selectedId);
            }
            const successMessage = `The ${selectedId} section has been added to the middle section of ${selectedPage}.`;
            showCustomAlert(successMessage, 'success');
        }else {
            if (middleSectionsObject[selectedPage]) {
                middleSectionsObject[selectedPage] = middleSectionsObject[selectedPage].filter(id => id !== selectedId);
                if (middleSectionsObject[selectedPage].length === 0) {
                    delete middleSectionsObject[selectedPage];
                }
            }
            const errorMessage = `The ${selectedId} section has been removed from the middle section of ${selectedPage}.`;
            showCustomAlert(errorMessage, 'danger');
        }
        setCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE, JSON.stringify(middleSectionsObject), 7);

    }
}






function pickHeadersMenuFromSelectedHeader(selectedId){


    // Handle dynamic header creation
    const dynamicHeader = $("#" + selectedId + " #dynamic-header");
    if (dynamicHeader.length > 0) {
            let pagesData = { mainPages: [], subPages: {} };
            const previousSelectedVal = $("#currentSelectedValueOfPageComponents").val();
            if(previousSelectedVal!= selectedId) {
                const cookieVal = getCookie(HEADER_PAGES);
                if(cookieVal!=undefined){
                    document.cookie = "HeaderPages=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }

            }


            dynamicHeader.find('.main-navigation .main_page').each(function () {
                const mainPage = $(this).find('a').first().text().trim();
                const normalizedMainPage = mainPage.toLowerCase();

                if (!pagesData.mainPages.some(page => page.toLowerCase() === normalizedMainPage)) {
                    pagesData.mainPages.push(mainPage);
                    // Add coockie value for the heder menu option
                    createCookiesForSelectedHeaderMenu(`header_${mainPage}`);
                }
                const subMenu = $(this).find('.dropdown-menu');
                if (subMenu.length > 0) {
                    const subPages = [];
                    subMenu.find('li').each(function () {
                        const subPage = $(this).find('a').text().trim();
                        subPages.push(subPage);
                        // Add coockie value for the heder submenu option
                       createCookiesForSelectedHeaderMenu(`header_${mainPage}_sub_${subPage}`);
                    });
                    pagesData.subPages[mainPage] = subPages;
                }

            });

            $("#currentSelectedValueOfPageComponents").val(selectedId);

        }
}

// pick header with Limit no. of pages functionality
// function pickHeadersMenuFromSelectedHeader(selectedId) {
// const numberOfPages = parseInt(getCookie("numberofPages"), 10);
//     const dynamicHeader = $("#" + selectedId + " #dynamic-header");
//     if (dynamicHeader.length === 0) return;

//     // clear previous cookies if the header changed
//     const previousSelectedVal = $("#currentSelectedValueOfPageComponents").val();
//     if (previousSelectedVal !== selectedId) {
//         document.cookie = "HeaderPages=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     }

//     const pagesData = { mainPages: [], subPages: {} };

//     dynamicHeader.find(".main-navigation .main_page").each(function () {
//         const mainPage = $(this).find("a").first().text().trim();

//         // main page
//         if (!pagesData.mainPages.includes(mainPage)) {
//             pagesData.mainPages.push(mainPage);
//         }

//         // its sub‑pages (if any)
//         const subs = [];
//         $(this).find(".dropdown-menu li").each(function () {
//             subs.push($(this).find("a").text().trim());
//         });
//         if (subs.length) {
//             pagesData.subPages[mainPage] = subs;
//         }
//     });

//     let pagesAdded = 0;

//     // main pages first
//     for (const main of pagesData.mainPages) {
//         if (pagesAdded >= numberOfPages) break;
//         createCookiesForSelectedHeaderMenu(`header_${main}`);
//         pagesAdded++;
//     }

//     // sub‑pages only if space is left
//     if (pagesAdded < numberOfPages) {
//         for (const main of pagesData.mainPages) {
//             const subs = pagesData.subPages[main] || [];
//             for (const sub of subs) {
//                 if (pagesAdded >= numberOfPages) break;
//                 createCookiesForSelectedHeaderMenu(`header_${main}_sub_${sub}`);
//                 pagesAdded++;
//             }
//             if (pagesAdded >= numberOfPages) break;
//         }
//     }
//     $("#currentSelectedValueOfPageComponents").val(selectedId);
// }

// number of Pages
    // const select = document.getElementById("numberofPages");
    // for (let i = 1; i <= 25; i++) {
    //     const option = document.createElement("option");
    //     option.value = i;
    //     option.textContent = i;
    //     select.appendChild(option);
    // }


// Function to create pages and store in cookies
function createCookiesForSelectedHeaderMenu(pageVal, src) {
const HeaderPages = getCookie(HEADER_PAGES) ? JSON.parse(getCookie(HEADER_PAGES)) : [];

//alert(pageVal);
if(!HeaderPages.includes(pageVal)) {
    HeaderPages.push(pageVal);
} else {

    // Below condition will work only while creating a new page or subpage
    if(src=="createNewPage") {
        alert(" Page Name already exists.");
    }
}

//HeaderPages.unshift(pageVal.trim());
//HeaderPages.reverse();
setCookie(HEADER_PAGES, JSON.stringify(HeaderPages), 7);
}



function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `expires=${date.toUTCString()};`;
    }
    document.cookie = `${name}=${value}; ${expires} path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function populateMainAndSubPages() {
    const allPages = getCookie(HEADER_PAGES);
    const allPagesListContainer = $('#AllPagesList');
    allPagesListContainer.empty();

    const allPagesArr = JSON.parse(allPages);
    const mainPages = [];
    const subPages = [];

    allPagesArr.forEach(pageName => {
        if (pageName !== "") {
            if (!pageName.includes('_sub')) {
                mainPages.push(pageName);
            } else {
                subPages.push(pageName);
            }
        }
    });

    const mainContainer = $('<ul id="all-pages-container" class="mainPagesList"></ul>');

    // Populate the list
    const addNewPageDiv = $(`
            <div class="mainPageHeadingcontainer">
                <h3>Auto-generated pages for the menu of the selected Header "<span id="selHeaderName"></span>"</h3>
                <button class="newpagebtn" role="button" id="addNewPage">Add New Page</button>
                    <div id="inputContainerMainPage" style="display: none;">
                        <input type="text" id="pageNameInput" class="custom-input" placeholder="Enter page name" />
                        <button id="savePage" src="header_" class="custom-btn-style SaveChangesBtn"><i class="ri-check-line"></i></button>
                        <button id="closePage" class="custom-btn-style" style="display: inline-block; color:red;"><i class="ri-close-line"></i></button>
                    </div>
            </div>
        `);
    mainContainer.append(addNewPageDiv);
    mainPages.forEach(mainPage => {
        const mainPageName = mainPage.replace('header_', '');
        const relatedSubPages = subPages.filter(subPage => subPage.includes(mainPageName));

        // Create main page list
        const mainPageLi = $(`<div class="mainPageContainer page-item">
                            <li value="${mainPage}"></li>`);

        const mainPageSpan = $(`<div class="pageEditwrapper ">
                                    <div>
                                        <center>
                                            <span class="pageTitle_${mainPageName}">${mainPageName}</span>
                                             <button src="${mainPageName}" id="save-header-page_${mainPageName}" class="save-header-page custom-btn-style SaveChangesBtn" style="display: none;" title="Save Page name">
                                                <i class="ri-check-line"></i>
                                        </button>
                                        </center>
                                    </div>
                                    <div>
                                        <button id="${mainPage}" class="delete-page-btn custom-btn-style deleteBtnColor"
											title="Delete selected page" data-toggle="tooltip" data-placement="top">
											<i class="ri-delete-bin-fill"></i>
										</button>
                                             <button class="rename-pagetitle-btn custom-btn-style renameBtnColor" src="${mainPageName}" title="Edit selected Page">
                                                <i class="ri-pencil-fill"></i>
                                             </button>
                                        <a class="design-selected-page" name="${mainPage}"  title="Design a page" data-toggle="tooltip" data-placement="top">
											Design Page
										</a>
                                    </div>
                                 </div>`);



        mainPageLi.append(mainPageSpan);

        // Add subpages only if they exist
        if (relatedSubPages.length > 0) {
            const addNewSubPageDiv = $(`
                <div class="subpageHeadingcontainer" style="display:none;">
                <div style="display: block ruby;">
                    <h3>Sub Pages</h3>
                    <button class="newpagebtn addNewSubPage" role="button" id="addNewSubPage" src="${mainPage}">Add New SubPage</button>

                    <div id="inputContainerSubPage_${mainPage}" class="addsubpageinputarea" style="display: none;">
                        <input type="text" id="subPageNameInput_${mainPage}" class="custom-input addsubpageinput" placeholder="Enter page name" />
                        <button src="${mainPage}" class="custom-btn-style saveSubPage SaveChangesBtn"><i class="ri-check-line"></i></button>
                        <button id="closeSubPage" class="custom-btn-style" style="display: inline-block; color:red;"><i class="ri-close-line"></i></button>

                        </div>
                </div>
                `);
            mainPageLi.append(addNewSubPageDiv);

            const subPageUl = $('<ul class="subpages"></ul>');
            relatedSubPages.forEach(subPage => {
                const subPageName = subPage.replace(`header_${mainPageName}_sub_`, '');
                const subPageLi = $(`<div class="SubPageContainer">
                                     <li value="${subPage}"></li>
                                            <div class="pageEditwrapper">
                                                <div>
                                                    <center>

                                                    <span class="pageTitle_${subPageName}">${subPageName}</span>
                                                        <button src="${subPageName}" id="save-header-page_${subPageName}" class="save-header-page custom-btn-style SaveChangesBtn" style="display: none;" title="Save Page name">
                                                            <i class="ri-check-line"></i>
                                                    </button>

                                                    </center>
                                                </div>
                                                <div style="text-align:center;">
                                                    <button id="${subPage}" class="delete-subpage-btn custom-btn-style deleteBtnColor"
                                                        title="Delete selected page" data-toggle="tooltip" data-placement="top">
                                                        <i class="ri-delete-bin-fill"></i>
                                                    </button>
                                                    <button class="rename-pagetitle-btn custom-btn-style renameBtnColor"
                                                    src="${subPageName}" name="${subPage}" title="Edit selected Page">
                                                       <i class="ri-pencil-fill"></i>
                                                    </button>
                                                    <a class="design-selected-page" name="${subPage}" title="Design a page" data-toggle="tooltip" data-placement="top">
                                                        Design Page
                                                    </a>
                                                </div>
                                            </div>
                                        </div>`);

                subPageUl.append(subPageLi);
            });

            const toggleButton = $(`
                <button class="toggle-arrow subPagesDropdown_${mainPage}">
                    <span>Subpages</span>
                    <span class="arrow-icon"><i class="ri-arrow-right-s-line"></i></span>
                </button>
            `);

            mainPageLi.append(toggleButton, subPageUl);
            mainContainer.append(mainPageLi);

            // collapsible functionality
            toggleButton.click(function () {
                const currentButton = $(this);
                const currentSubPages = currentButton.siblings('.subpages');
                const currentSubPageContainer = currentButton.siblings('.subpageHeadingcontainer');

                // Hide all other subpages and reset arrows
                $('.subpages').not(currentSubPages).slideUp();
                $('.subpageHeadingcontainer').not(currentSubPageContainer).slideUp();
                $('.toggle-arrow').not(currentButton).removeClass('open');

                // Toggle current subpages, subpageHeadingcontainer and arrow
                currentSubPages.slideToggle();
                currentSubPageContainer.slideToggle();
                currentButton.toggleClass('open');


            });
        } else {
            mainContainer.append(mainPageLi);
        }
    });


    allPagesListContainer.append(mainContainer);
    $('.delete-page-btn').on('click', function () {
        $('.mainPageContainer, .SubPageContainer').removeClass('currentSelectedPage');
        $(this).closest('.mainPageContainer, .SubPageContainer').addClass('currentSelectedPage');
        const pageName = $(this).attr("id");
        deleteSelectedPage(pageName);

    });
    $('.delete-subpage-btn').on('click', function () {
        $('.mainPageContainer, .SubPageContainer').removeClass('currentSelectedPage');
        $(this).closest('.mainPageContainer, .SubPageContainer').addClass('currentSelectedPage');
        const pageName = $(this).attr("id");
        deleteSelectedPage(pageName);
    });



    $('.rename-pagetitle-btn').on('click', function () {
        $('.mainPageContainer, .SubPageContainer').removeClass('currentSelectedPage');
        $(this).closest('.mainPageContainer, .SubPageContainer').addClass('currentSelectedPage');
        const localStorageTagName = $(this).attr("name");
        $('#localStorageTagName').val(localStorageTagName);
        const selPageVal = $(this).attr("src");
        $("[class='pageTitle_"+selPageVal+"']").html(`<input type="text" class="pageNameUpdatedVal_${selPageVal}"  value="${selPageVal}">`);
        $(this).hide();
        $("[id='save-header-page_"+selPageVal+"']").show();

        const subPageName = $(this).attr("name");
        // alert("subPageName-----"+subPageName.indexOf("_sub_"));
        if(subPageName.indexOf("_sub_") > 0) {
            $('#localStorageTagName').val(subPageName);
        }
        $(this).closest('.mainPageContainer, .SubPageContainer').find('.design-selected-page').trigger('click');
    });

    $('.save-header-page').on('click', function () {
        const selPageVal = $(this).attr("src");

        const newPageName =  $("[class='pageNameUpdatedVal_"+selPageVal+"']").val().trim();

        const oldPageName = selPageVal;
       // alert("oldPageName----"+ oldPageName + "---newPageName----"+ newPageName);
        if (newPageName === "") {
            alert("Page Name cannot be empty.");
            return;
        }

        const localStorageTagName = $('#localStorageTagName').val();
        // alert("localStorageTagName----"+ localStorageTagName);

        const createdPages = JSON.parse(getCookie(HEADER_PAGES) || "[]");

        if (!oldPageName || !newPageName) {
            alert('Please select a page and provide a new name.');
            return;
        }
        if (createdPages.includes(newPageName)) {
            alert(`A page with the name "${newPageName}" already exists.`);
            return;
        }


        createdPages.forEach((element, index) => {
            if (element === "header_" + oldPageName) { // Condition to rename main page
                createdPages[index] = "header_" + newPageName;
            } else if (element.includes("header_" + oldPageName + "_sub_")) { // Condition to rename subpages related to main page
                const subPageVal = element.split("header_" + oldPageName + "_sub_")[1];
                createdPages[index] = "header_" + newPageName + "_sub_" + subPageVal;
            } else if (element === localStorageTagName) {  // Condition to rename SubPages
                const preVal = element.split("_sub_")[0];
                createdPages[index] = preVal + "_sub_" + newPageName;
            }
        });

        // Save updated array to cookie
        saveCreatedPagesToCookie(createdPages);



    // Update middle_sections
    let middleSections = JSON.parse(getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || "{}");

    let updatedMiddleSections = Object.fromEntries(
        Object.entries(middleSections).map(([key, value]) => {
            if (key === `header_${selPageVal}`) {
                return [`header_${newPageName}`, value]; // Rename main page
            }
            if (key.startsWith(`header_${selPageVal}_sub_`)) {
                return [`header_${newPageName}_sub_${key.split(`header_${selPageVal}_sub_`)[1]}`, value]; // Rename subpages of the main page
            }
            // Rename the subpage
            if (key === localStorageTagName) {

                const preVal = key.split("_sub_")[0];
                return [`${preVal}_sub_${newPageName}`, value];
            }
            return [key, value]; // Keep othervalues
        })
    );

    // Save updated middle_sections
    document.cookie = `${GLOBAL_MIDDLE_SECTIONS_COOKIE}=${JSON.stringify(updatedMiddleSections)}; path=/`;


        // Repopulate dropdown with updated values
        populateMainAndSubPages();
        const currentHeader = getCookie(GLOBAL_HEADER_COOKIE);
        $('#selHeaderName').text(currentHeader);




        // open and close subpages accordian
        var splitparentPageName = localStorageTagName.split('_');
        var parentPageName = splitparentPageName[0] + '_' + splitparentPageName[1];
            if (localStorageTagName.includes('_sub_')) {
                const toggleArrowButton = $('.toggle-arrow.subPagesDropdown_' + parentPageName).first();
                toggleArrowButton.trigger('click');
            }


        // Alert success
        alert(`Page "${oldPageName}" has been renamed to "${newPageName}".`);


    });



$('.design-selected-page').on('click', function () {
    CURRENT_MODE = 'design'; // ✅ Reset mode to design

    $("#displayMessageId").html("Please add one or more sections to the selected page as per your requirement");

    $('#multi-filter-container').show();
    $('#category-filter').show();
    $('#section-filter').show(); // ✅ show both filters
    $('#overlayID').removeClass("overlay");

    $('.mainPageContainer, .SubPageContainer').removeClass('currentSelectedPage');
    $(this).closest('.mainPageContainer, .SubPageContainer').addClass('currentSelectedPage');

    enableRadioButtons();

    // Hide all components initially
    $('.component').hide();
    $('#middle-submenu-container').show();

    // Collect all dropdown values and show corresponding middle components
    const dropdownValues = [];
    $('#section-filter .dropdown-menu li a').each(function () {
        dropdownValues.push($(this).data('value'));
    });

    dropdownValues.forEach(value => {
        $('#wrapper [id^="' + value + '-"]').show();
    });

    const localStorageTagName = $(this).attr("name");
    $('#localStorageTagName').val(localStorageTagName);

    const selectedMiddleSections = getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || "{}";
    let middleSectionsObject = JSON.parse(selectedMiddleSections);

    $('.middle_sections_container .radio-holder input.section-checkbox').prop('checked', false);

    if (localStorageTagName in middleSectionsObject) {
        const selectedSections = middleSectionsObject[localStorageTagName];
        selectedSections.forEach(element => {
            $("#" + element + "_component").prop('checked', true);
        });
    }
});





//  Create Main Page
$("#addNewPage").on("click", function () {
    $("#inputContainerMainPage").show();
    $(this).hide();
    $("#closePage").show();
    $("#savePage").hide();
});

$("#closePage").on("click", function () {
    $("#inputContainerMainPage").hide();
    $("#addNewPage").show();
    $(this).hide();
});

$("#pageNameInput").on("input", function () {
    const enteredPageName = $(this).val().trim();

    // Show the "Save" button when user starts typing
    if (enteredPageName) {
        $("#savePage").show();
        $("#closePage").hide();
    } else {
        $("#savePage").hide();
        $("#closePage").show();
    }
});

$("#savePage").on("click", function () {
    const enteredPageName = $("#pageNameInput").val().trim();
    const requestFor = $(this).attr("src");

    if (!enteredPageName) {
        alert("Please enter a valid page name.");
        return;
    }

    // Call the function to create cookies for the selected header menu
    createCookiesForSelectedHeaderMenu(requestFor + enteredPageName, "createNewPage");

    // Call function to populate pages
    populateMainAndSubPages();
    const currentHeader = getCookie(GLOBAL_HEADER_COOKIE);
    $('#selHeaderName').text(currentHeader);
    // Reset input field and hide input container
    $("#pageNameInput").val("");
    $("#inputContainerMainPage").hide();
    $("#addNewPage").show();
    $("#closePage").hide();
});



//  Create Subpage
    $(".addNewSubPage").on("click", function () {
        var src = $(this).attr("src");
        $(".addsubpageinputarea").show();
        $(".addsubpageinput").show();
        $(this).hide();
        $("#closeSubPage").show();
        $(".saveSubPage").hide();
      });

      $("#closeSubPage").on("click", function () {
        $(".addsubpageinput").hide();
        $(".addNewSubPage").show();
        $(this).hide();
    });

    $(".addsubpageinput").on("input", function () {
        const enteredSubpageName = $(this).val().trim();

        // Show the "Save" button when user starts typing
        if (enteredSubpageName) {
            $(".saveSubPage").show();
            $("#closeSubPage").hide();
        } else {
            $(".saveSubPage").hide();
            $("#closeSubPage").show();
        }
    });

      $(".saveSubPage").on("click", function () {
        var src = $(this).attr("src");
      const enteredSubpageName = $("#subPageNameInput_"+src).val().trim();

      if (!enteredSubpageName) {
        alert("Please enter a valid page name.");
        return;
      }

      var subpageName = src + "_sub_" + enteredSubpageName;


      createCookiesForSelectedHeaderMenu(subpageName , "createNewPage")

      populateMainAndSubPages();
      const toggleArrowButton = $(`.toggle-arrow`).first();
       toggleArrowButton.trigger('click');

      $("#pageNameInput").val("");
      $("#inputContainer").hide();
      $("#addNewPage").show();


      $(".addNewSubPage").show();
      $("#closeSubPage").hide();
    });



}



var previous;
$("#created-pages-dropdown").on('focus', function () {
    previous = this.value;
}).change(function() {

    $('select[id^="created-pages-dropdown"] option[value="'+previous+'"]').attr("selected",null);

    $('select[id^="created-pages-dropdown"] option[value="'+$(this).val()+'"]').attr("selected","selected");

    previous = this.value;
});


    // Handle the filter dropdown selection

    // $('.dropdown-toggle').dropdown('toggle');

    // $('#section-filter .dropdown-menu a').on('click', function (e) {
    //     e.preventDefault();

    //     const filterValue = $(this).data('value');
    //     const prefix = filterValue === 'all' ? '' : filterValue;
    //     $('#wrapper .component').hide();
    //     if (filterValue === 'all') {
    //         $('#wrapper .component').show();
    //     } else {
    //         $(`#wrapper [id^="${prefix}-"]`).show();
    //     }
    // });
    // $('.dropdown-toggle').dropdown('toggle');


$(document).ready(function () {
    // Default selection
    $('#category-filter .dropdown-menu li[data-value="All"]').addClass('active');
    $('#category-filter .dropdown-toggle').html('All <span class="caret"></span>');

    $('#section-filter .dropdown-menu li[data-value="All"]').addClass('active');
    $('#section-filter .dropdown-toggle').html('All <span class="caret"></span>');

    // CATEGORY FILTER
// Handle clicks on category filter items
$('#category-filter .dropdown-menu li').on('click', function (e) {
    const $anchor = $(this).find('a');
    const categoryValue = $anchor.data('value').toLowerCase();

    // If it's not "all", let only the <a> handle the event
    if (categoryValue !== 'all' && !$(e.target).is('a')) {
        return; // Ignore clicks on <li> if it's not "all"
    }

    e.preventDefault();
    const categoryText = $anchor.text();
    $('#category-filter .dropdown-menu li').removeClass('active');
    $(this).addClass('active');
    $('#category-filter .dropdown-toggle').html(categoryText + ' <span class="caret"></span>');

    $('#middle_sections_container .component, .component').hide();
    let foundComponents = false;

    if (CURRENT_MODE === 'design') {
        const sectionValue = ($('#section-filter .dropdown-menu li.active a').data('value') || 'All').toLowerCase();

        if (categoryValue === 'all') {
            if (sectionValue === 'all') {
                $('#middle_sections_container .component').not('#default-middle_section').show();
                foundComponents = true;
            } else {
                $(`#middle_sections_container [id^="${sectionValue}-"]`).not('#default-middle_section').show();
                foundComponents = true;
            }
        } else {
            $('#middle_sections_container .component[category]').each(function () {
                const id = $(this).attr('id');
                const categories = $(this).attr('category').toLowerCase().split(',');
                if (categories.includes(categoryValue)) {
                    if (sectionValue === 'all' || id.toLowerCase().startsWith(sectionValue + '-')) {
                        $(this).show();
                        foundComponents = true;
                    }
                }
            });
        }
    } else if (CURRENT_MODE === 'header' || CURRENT_MODE === 'footer') {
        const componentTypePrefix = CURRENT_MODE;

        if (categoryValue === 'all') {
            $(`#wrapper [id^="${componentTypePrefix}-"]`).show();
            foundComponents = true;
        } else {
            $(`#wrapper [id^="${componentTypePrefix}-"][category]`).each(function () {
                const categories = $(this).attr('category').toLowerCase().split(',');
                if (categories.includes(categoryValue)) {
                    $(this).show();
                    foundComponents = true;
                }
            });
        }
    }

    if (!foundComponents) {
        $('#no-components-message').show();
    } else {
        $('#no-components-message').hide();
    }
});


    // SECTION FILTER
    $('#section-filter .dropdown-menu a').on('click', function (e) {
        e.preventDefault();
        const sectionValue = $(this).data('value').toLowerCase();
        const sectionText = $(this).text();
        $('#section-filter .dropdown-menu li').removeClass('active');
        $(this).parent().addClass('active');
        $('#section-filter .dropdown-toggle').html(sectionText + ' <span class="caret"></span>');

        $('#middle_sections_container .component').hide();
        let foundComponents = false;
        const categoryValue = ($('#category-filter .dropdown-menu li.active a').data('value') || 'All').toLowerCase();

        if (CURRENT_MODE === 'design') {
            if (categoryValue === 'all') {
                if (sectionValue === 'all') {
                    $('#middle_sections_container .component').not('#default-middle_section').show();
                    foundComponents = true;
                } else {
                    $(`#middle_sections_container [id^="${sectionValue}-"]`).not('#default-middle_section').show();
                    foundComponents = true;
                }
            } else {
                $('#middle_sections_container .component[category]').each(function () {
                    const id = $(this).attr('id');
                    const categories = $(this).attr('category').toLowerCase().split(',');
                    if (categories.includes(categoryValue)) {
                        if (sectionValue === 'all' || id.toLowerCase().startsWith(sectionValue + '-')) {
                            $(this).show();
                            foundComponents = true;
                        }
                    }
                });
            }

            if (!foundComponents) {
                $('#no-components-message').show();
            } else {
                $('#no-components-message').hide();
            }
        }
    });
});








var $overlay = $('#overlayID');
var $wrapper = $('#wrapper');

// Show/hide overlay based on status
if ($('#overlayStatus').val() === 'enabled') {
    $overlay.show();
    $('#headerMenuActionButtons').hide();
    $wrapper.css('pointer-events', 'none');
} else {
    $overlay.hide();
    $('#headerMenuActionButtons').show();
    $wrapper.css('pointer-events', 'auto');
}

$('#select-header').click(function() {
    if ($('#overlayStatus').val() === 'enabled') {
        $('#overlayStatus').val('disabled');
        $overlay.hide();

        $('#headerMenuActionButtons').show();
        $wrapper.css('pointer-events', 'auto');
    } else {
        $('#overlayStatus').val('enabled');
        $overlay.show();
        $('#headerMenuActionButtons').hide();
        $wrapper.css('pointer-events', 'none');

    }
});




function enableRadioButtons() {
    $('.radio-holder.disabled input[type="checkbox"]:disabled').prop('disabled', false);
    $('.radio-holder.disabled').removeClass('disabled');
}

function displayAreaForSelectedThemesofHeadersMenu(selectedId) {
    // alert(selectedId);
    const listSelector = '#selected-sections-list';
    const clearButtonSelector = '#clear-all-btn';
   // const displayAreaForSelectedThemesofHeadersMenu =

   const val =   $('#selected-sections-list').html();

    if(selectedId.indexOf("header") == 0 || selectedId.indexOf("footer") == 0) {

        const constantID = $("#selected-sections-list").find("."+selectedId.split("-")[0]+"-").attr('id');
        // alert(constantID);
        if(constantID==undefined) {
            $('#selected-sections-list').html("<li><a id='displayAreaLinks-"+selectedId+"' class='"+selectedId.split("-")[0]+"-'>"+val + "<br/>" + selectedId+"</a></li>");
        } else {
            $("#"+constantID).html(selectedId);
        }

    } else {
        // alert("other")
        $('#selected-sections-list').html("<li><a id='displayAreaLinks' class='"+selectedId.split("-")[0]+"-'>"+val + "<br/>" + selectedId+"</a></li>");
    }


}


function saveSelectedSectionsToCookie(pageName) {
    const dataToSave = {
        slider: selectedSections.slider,
        section: selectedSections.section
    };
    if (pageName != '' && pageName != undefined) {
        setCookie(`selectedSections_${pageName}`, JSON.stringify(dataToSave), 7);
    }
    setCookie(GLOBAL_HEADER_COOKIE, selectedSections.header, 7);
    setCookie(GLOBAL_FOOTER_COOKIE, selectedSections.footer, 7);
}
function loadSelectedSectionsFromCookie(pageName) {
    const cookieData = getCookie(`selectedSections_${pageName}`);
    const sliderAndSections = cookieData ? JSON.parse(cookieData) : { slider: null, section: [] };
    const header = getCookie(GLOBAL_HEADER_COOKIE);
    const footer = getCookie(GLOBAL_FOOTER_COOKIE);
    return {
        header: header || null,
        slider: sliderAndSections.slider,
        footer: footer || null,
        section: sliderAndSections.section
    };

}








function deleteSelectedPage(pageName) {
    const createdPages = JSON.parse(getCookie(HEADER_PAGES) || "[]");
    if (!pageName) {
        alert('Please select a page to delete.');
        return;
    }

    // Identify subpages associated with the selected page
    const subPages = createdPages.filter(p => p.startsWith(`${pageName}_sub_`));

    const confirmMessage = `Are you sure you want to delete the page: "${pageName}"? This page ${
        subPages.length > 0 ? "and its subpages" : ""
    } will be deleted if you submit.`;

    if (confirm(confirmMessage)) {
        // Delete the main page and its subpages
        deletePage(pageName, createdPages);
        subPages.forEach(subPage => {
            deletePage(subPage, createdPages);
        });

        // Also remove references from middle_sections for both main page and subpages
        deleteFromMiddleSections(pageName);
        subPages.forEach(subPage => {
            deleteFromMiddleSections(subPage);
        });

        saveCreatedPagesToCookie(createdPages);

        if (subPages.length > 0) {
            alert(`Page "${pageName}" and its subpages have been deleted successfully.`);
        } else {
            alert(`Page "${pageName}" has been deleted successfully.`);
        }

        // Repopulate
        populateMainAndSubPages();
        // open and close subpages accordian
        var splitparentPageName = localStorageTagName.split('_');
        var parentPageName = splitparentPageName[0] + '_' + splitparentPageName[1];
            if (localStorageTagName.includes('_sub_')) {
                const toggleArrowButton = $('.toggle-arrow.subPagesDropdown_' + parentPageName).first();
                toggleArrowButton.trigger('click');
            }

    }
}

function deletePage(pageName, pagesArray) {
    const pageIndex = pagesArray.indexOf(pageName);
    if (pageIndex !== -1) {
        pagesArray.splice(pageIndex, 1);
    }

    deleteCookie(`selectedSections_${pageName}`);
}

function deleteFromMiddleSections(pageName) {
    let middleSections = JSON.parse(getCookie("middle_sections") || "{}");

    if (middleSections[pageName]) {
        delete middleSections[pageName]; // Remove the entry
        setCookie("middle_sections", JSON.stringify(middleSections), 365);
    }
}


function deleteSelectedFooterLink(linkName) {
    let footerPages = getFooterPagesFromCookie();

    if (!linkName) {
        alert('Please select a footer link to delete.');
        return;
    }

    let found = false; // if the link is found and deleted

    footerPages.forEach((footerPage, index) => {
        const footerTitle = Object.keys(footerPage)[0]; // Get the footer title
        const footerLinks = footerPage[footerTitle];

        // Check if the link exists in the footer links
        if (footerLinks.includes(linkName)) {
            found = true;

            const confirmMessage = `Are you sure you want to delete the link: "${linkName}" from the footer "${footerTitle}"?`;

            if (confirm(confirmMessage)) {
                // Remove the link from the footer links
                const linkIndex = footerLinks.indexOf(linkName);
                if (linkIndex !== -1) {
                    footerLinks.splice(linkIndex, 1);
                }

                // If there are no links left in this footer, remove the whole object
                if (footerLinks.length === 0) {
                    footerPages.splice(index, 1);
                }

                // Also remove references from middle_sections
                deleteFromMiddleSections(linkName);

                // Save the updated footerPages cookie
                updateFooterPagesCookie(footerPages);

                alert(`Link "${linkName}" has been deleted successfully.`);

                // Repopulate footer
                populateFooterDropdowns();
                const toggleArrowButton = $(`.toggle-arrow`).first();
                toggleArrowButton.trigger('click');
            }
        }
    });

    if (!found) {
        alert('Link not found in any footer.');
    }
}

function deleteFromMiddleSections(pageName) {
    let middleSections = JSON.parse(getCookie("middle_sections") || "{}");

    if (middleSections[pageName]) {
        delete middleSections[pageName]; // Remove the entry
        setCookie("middle_sections", JSON.stringify(middleSections), 365);
    }
}



function saveCreatedPagesToCookie(pagesArray) {
    setCookie(HEADER_PAGES, JSON.stringify(pagesArray), 7);
}

// Function to pick footer links from all selected dynamic footers
function pickFooterlinksFromSelectedFooter(selectedId) {
    let footerData = [];
    $.each($('.'+selectedId+'_old'), function() {

        const dynamicFooter = $(this);

            if (dynamicFooter.length > 0) {
                let footerLinksPages = [];

                const footerTitle = dynamicFooter.find('#quick-link-title').text().trim();

                dynamicFooter.find('.footer-navigation li').each(function () {
                    const linkText = $(this).find('a').first().text().trim();
                    footerLinksPages.push(linkText);
                });

                let footerObj = {};
                footerObj[footerTitle] = footerLinksPages;
                footerData.push(footerObj);

          }
    });
    // Save the footer data in a cookie
    updateFooterPagesCookie(footerData);

}

// Function to get FooterPages data from the cookie
function getFooterPagesFromCookie() {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)FooterPages\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        try {
            return JSON.parse(cookieValue);
        } catch (e) {
            console.error("Error parsing FooterPages cookie:", e);
            return [];
        }
    }
    return [];
}

// Function to update the FooterPages cookie with the selected footer data
function updateFooterPagesCookie(footerData) {
    document.cookie = `FooterPages=${JSON.stringify(footerData)}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function populateFooterDropdowns() {
    const footerPages = getFooterPagesFromCookie();
    const footerListContainer = $('#footer-dropdown-populate-area');

    footerListContainer.empty();

    if (footerPages && footerPages.length > 0) {
        const footerContainer = $('<ul id="footer-pages-container" class="mainPagesList"></ul>');

        const headerDiv = `
            <div class="mainPageHeadingcontainer">
                <h3>Auto-generated link sections & their respective pages for the selected Footer "<span id="selFooterName"></span>"</h3>
            </div>
        `;
        footerContainer.append(headerDiv);

        footerPages.forEach((footerObj, index) => {
            const footerTitle = Object.keys(footerObj)[0];
            const footerLinksPages = footerObj[footerTitle];

            const footerLi = $(`
                <div class="mainPageContainer footer-item">
                    <li value="${footerTitle}"></li>
                        <div class="pageEditwrapper">
                            <div>
                                <center>
                                    <span class="footer-title">${footerTitle}</span>
                                    <button class="save-footer-title-btn custom-btn-style SaveChangesBtn" style="display: none;" data-index="${index}" title="Save footer title">
                                        <i class="ri-check-line"></i>
                                    </button>
                                </center>
                            </div>
                            <div>
                                <input type="text" class="footer-input" value="${footerTitle}" style="display: none;">
                                <button class="edit-footer-title-btn custom-btn-style renameBtnColor" title="Edit selected footer">
                                   <i class="ri-pencil-fill"></i>
                                </button>

                            </div>
                            </div>
                </div>
            `);



            if (footerLinksPages && footerLinksPages.length > 0) {
                const subFooterDiv = `
                    <div class="subpageHeadingcontainer" style="display:none;">
                        <h3>Footer Pages</h3>
                        <button class="newpagebtn addNewFooterPage" src="${footerTitle}" role="button" >Add New Page</button>
                        <div id="inputContainerFooterPage_${footerTitle}" class="addFooterpageinputarea" style="display: none;">
                            <input type="text" id="footerpageNameInput_${footerTitle}" class="custom-input addFooterpageinput" placeholder="Enter page name" />
                            <button  src="${footerTitle}" class="saveFooterPage custom-btn-style SaveChangesBtn"><i class="ri-check-line"></i></button>
                            <button id="closeFooterPage" class="custom-btn-style" style="display: inline-block; color:red;"><i class="ri-close-line"></i></button>
                        </div>
                    </div>
                `;
                const footerLinksPagesUl = $('<ul class="subpages"></ul>');
                footerLinksPages.forEach((link) => {
                    const footerLinkLi = $(`
                        <div class="SubPageContainer" >
                            <li value="${link}"></li>
                                   <center>
                                        <span class="footer-page-title">${link}</span>
                                        <button class="save-link-btn custom-btn-style SaveChangesBtn" style="display: none;" title="Save link name">
                                                <i class="ri-check-line"></i>
                                        </button>
                                    </center>
                                    <input type="text" class="edit-link-input " value="${link}" style="display: none;">
                                    <button class="edit-link-btn custom-btn-style renameBtnColor" title="Edit selected link">
                                       <i class="ri-pencil-fill"></i>
                                    </button>

                                    <button id="${link}" class="delete-footer-page-btn custom-btn-style deleteBtnColor" title="Delete selected link">
                                        <i class="ri-delete-bin-fill"></i>
                                    </button>
                                    <a class="design-selected-page" name="${link}" title="Design a link">
                                        Design Page
                                    </a>
                         </div>
                    `);



                    footerLinksPagesUl.append(footerLinkLi);
                });

                const toggleButton = $(`
                    <button class="toggle-arrow">
                        <span>Pages</span>
                        <span class="arrow-icon"><i class="ri-arrow-right-s-line"></i></span>
                    </button>
                `);

                footerLi.append(subFooterDiv, toggleButton, footerLinksPagesUl);

                toggleButton.click(function () {
                    const currentButton = $(this);
                    const currentSubPages = currentButton.siblings('.subpages');
                    const currentSubPageContainer = currentButton.siblings('.subpageHeadingcontainer');

                    $('.subpages').not(currentSubPages).slideUp();
                    $('.subpageHeadingcontainer').not(currentSubPageContainer).slideUp();
                    $('.toggle-arrow').not(currentButton).removeClass('open');

                    currentSubPages.slideToggle();
                    currentSubPageContainer.slideToggle();
                    currentButton.toggleClass('open');
                });
            }

            footerContainer.append(footerLi);
        });

        footerListContainer.append(footerContainer);

        // Event listeners
        // $('.delete-page-btn').on('click', function () {
        //     deleteSelectedPage($(this).attr("id"));
        // });

        $('.delete-footer-page-btn').on('click', function () {
            deleteSelectedFooterLink($(this).attr("id"));
        });

        // Edit and Save functionality for footer title
        $(document).on('click', '.edit-footer-title-btn', function () {
            const parent = $(this).closest('.footer-item');
            const footerTitle = parent.find('.footer-title').text();
            parent.find('.footer-title').html(`<input type="text" class="footer-input" value="${footerTitle}">`);
            parent.find('.edit-footer-title-btn').hide();
            parent.find('.save-footer-title-btn').show();
        });

        $(document).on('click', '.save-footer-title-btn', function () {
            const parent = $(this).closest('.footer-item');
            const footerInput = parent.find('.footer-input').val().trim();
            const oldFooterTitle = parent.find('.footer-input').attr('value');
            const index = $(this).data('index');

            if (footerInput === "") {
                alert("Footer title cannot be empty.");
                return;
            }

            // Update the displayed footer title
            parent.find('.footer-title').text(footerInput);
            parent.find('.save-footer-title-btn').hide();
            parent.find('.edit-footer-title-btn').show();

            // Update the footer title in the cookie
            let footerPages = getFooterPagesFromCookie();
            if (footerPages && footerPages.length > 0) {
                const footerObj = footerPages[index];
                if (footerObj) {
                    const footerLinksPages = footerObj[oldFooterTitle];
                    delete footerObj[oldFooterTitle];
                    footerObj[footerInput] = footerLinksPages;
                }
                // Save the updated cookie
                updateFooterPagesCookie(footerPages);
            }
        });

// rename and Save footer Pages
$(document).on('click', '.edit-link-btn', function () {
    const parent = $(this).closest('.SubPageContainer');
    const linkTitle = parent.find('.footer-page-title').text();
    parent.find('.footer-page-title').html(`<input type="text" class="edit-link-input" value="${linkTitle}">`);
    parent.find('.edit-link-btn').hide();
    parent.find('.save-link-btn').show();
});

$(document).on('click', '.save-link-btn', function () {
    const parent = $(this).closest('.SubPageContainer');
    const linkInput = parent.find('.edit-link-input').val().trim();
    const oldLinkTitle = parent.find('.edit-link-input').attr('value');
    const footerTitle = parent.closest('.footer-item').find('.footer-title').text();

    if (linkInput === "") {
        alert("Link title cannot be empty.");
        return;
    }

    parent.find('.footer-page-title').text(linkInput);
    parent.find('.save-link-btn').hide();
    parent.find('.edit-link-btn').show();

    let footerPages = getFooterPagesFromCookie();

    if (footerPages && footerPages.length > 0) {
        const footerObj = footerPages.find(obj => obj[footerTitle]);

        if (footerObj) {
            const footerLinksPages = footerObj[footerTitle];
            const linkIndex = footerLinksPages.indexOf(oldLinkTitle);

            if (linkIndex !== -1) {
                footerLinksPages[linkIndex] = linkInput;
            }
        }

        // Save the updated FooterPages cookie
        updateFooterPagesCookie(footerPages);
    }

    // Update middle_sections cookie if oldLinkTitle exists in the cookie
    let middleSections = getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || "{}";
    middleSections = JSON.parse(middleSections);

    if (middleSections.hasOwnProperty(oldLinkTitle)) {
        middleSections[linkInput] = middleSections[oldLinkTitle];
        delete middleSections[oldLinkTitle];

        setCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE, JSON.stringify(middleSections), 365);
    }
});






$('.design-selected-page').on('click', function () {
    CURRENT_MODE = 'design';
    $("#displayMessageId").html(
        "Please add one or more sections to the selected page as per your requirement"
    );

    $('#multi-filter-container, #category-filter, #section-filter').show();
    $('#overlayID').removeClass('overlay');

    $('.mainPageContainer, .SubPageContainer').removeClass('currentSelectedPage');
    $(this).closest('.mainPageContainer, .SubPageContainer')
           .addClass('currentSelectedPage');

    enableRadioButtons();


    $('#category-filter .dropdown-menu li[data-value="all"]').trigger('click');
    $('#section-filter  .dropdown-menu li[data-value="all"]').trigger('click');

    $('.component').hide();
    $('#middle-submenu-container').show();
    $('#middle_sections_container .component').show();
     $('#default-middle_section').hide();
    $('#headers_container .component, #footers_container .component').hide();

    const localStorageTagName = $(this).attr('name');
    $('#localStorageTagName').val(localStorageTagName);

    const savedMiddle = JSON.parse(getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || '{}');

    $('#middle_sections_container .radio-holder input.section-checkbox')
        .prop('checked', false);
    if (savedMiddle.hasOwnProperty(localStorageTagName)) {
        savedMiddle[localStorageTagName].forEach(id => {
            $('#' + id + '_component').prop('checked', true);
        });
    }
});





        $(".addNewFooterPage").on("click", function () {
            var src = $(this).attr("src");
            $(".addFooterpageinputarea").show();
            $(".addFooterpageinput").show();
            $(this).hide();
            $("#closeFooterPage").show();
            $(".saveFooterPage").hide();
        });

      $("#closeFooterPage").on("click", function () {
        $(".addFooterpageinput").hide();
        $(".addNewFooterPage").show();
        $(this).hide();
    });

    $(".addFooterpageinput").on("input", function () {
        const enteredSubpageName = $(this).val().trim();

        // Show the "Save" button when user starts typing
        if (enteredSubpageName) {
            $(".saveFooterPage").show();
            $("#closeFooterPage").hide();
        } else {
            $(".saveFooterPage").hide();
            $("#closeFooterPage").show();
        }
    });
        $(".saveFooterPage").on("click", function () {
            var src = $(this).attr("src");
            const pageNameInput = $("[id='footerpageNameInput_"+src+"']").val().trim();
            if (!pageNameInput) {
                alert("Page name cannot be empty.");
                return;
            }

            const footerTitle = $(this).closest(".footer-item").find(".footer-title").text().trim();
            let footerPages = getFooterPagesFromCookie();
            let middleSections = JSON.parse(getCookie(GLOBAL_MIDDLE_SECTIONS_COOKIE) || "{}");

            if (footerPages && footerPages.length > 0) {
                const footerObj = footerPages.find(obj => obj[footerTitle]);
                if (footerObj) {
                    const footerLinksPages = footerObj[footerTitle];
                    if (!footerLinksPages.includes(pageNameInput)) {
                        footerLinksPages.push(pageNameInput);
                        updateFooterPagesCookie(footerPages);
                        alert(`Page "${pageNameInput}" added successfully.`);
                        $("[id='footerpageNameInput_"+src+"']").val("");
                        populateFooterDropdowns();
                        const toggleArrowButton = $(`.toggle-arrow`).first();
                        toggleArrowButton.trigger('click');
                        const currentFooter = getCookie(GLOBAL_FOOTER_COOKIE);
                        $('#selFooterName').text(currentFooter);
                    } else {
                        alert(`Page "${pageNameInput}" already exists.`);
                    }
                } else {
                    alert(`Footer "${footerTitle}" not found.`);
                }
            }
            $("[id='inputContainerFooterPage_"+src+"']").hide();
            $(".addNewFooterPage").show();
            $(".addFooterpageinput").hide();
            $("#closeFooterPage").hide();
        });



    }
}

$('.accordion-header').click(function() {
    var content = $(this).next('.content');
    var arrow = $(this).find('.arrow');

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        content.slideUp(500);
        arrow.html('<i class="ri-arrow-right-s-line"></i>');
    } else {
        $(this).addClass('active');
        content.slideDown(500);
        arrow.html('<i class="ri-arrow-down-s-line"></i>');
    }
});

//   const categories = [
//     {
//       title: 'All',
//       icon: 'ri-grid-fill',
//       sub: []
//     },
//     {
//       title: 'Business & Corporate',
//       icon: 'ri-briefcase-line',
//       sub: ['Small Business', 'Corporate/Company Site', 'Consulting / Coaching', 'Advocate Service', 'Chartered Accountant', 'Company Secretary', 'Corporate/Enterprise', 'Real Estate', 'Construction', 'Auto Industry']
//     },

//     {
//       title: 'Portfolio & Creative',
//       icon: 'ri-palette-line',
//       sub: ['Photography', 'Graphic Design', 'Artist/Illustrator', 'Writing/Journalism', 'Music & Performing Arts', 'Videographer']
//     },
//     {
//       title: 'Personal & Blog',
//       icon: 'ri-user-line',
//       sub: ['Personal Blog', 'Lifestyle Blog', 'Travel Blog', 'Food Blog', 'Tech Blog', 'Wedding Website', 'Social Media Influencer']
//     },
//     {
//       title: 'Education & Learning',
//       icon: 'ri-book-open-line',
//       sub: ['Online Courses / LMS', 'Tutoring Services', 'Pre-school & Daycare', 'School', 'Collage', 'University', 'Educational Blogs', 'Language Learning', 'Nonprofit Education', 'Coaching & Workshops']
//     },
//     {
//       title: 'Health & Wellness',
//       icon: 'ri-heart-pulse-line',
//       sub: ['Fitness & Gym', 'Yoga & Meditation', 'Medical Services', 'Mental Health', 'Nutrition & Diet', 'Doctor/Clinic', 'Therapist/Psychologist']
//     },
//     {
//       title: 'Food & Hospitality',
//       icon: 'ri-restaurant-line',
//       sub: ['Restaurants', 'Cafes & Bakeries', 'Catering Services', 'Food Delivery', 'Recipe Blogs']
//     },
//     {
//       title: 'Events & Entertainment',
//       icon: 'ri-movie-line',
//       sub: ['Weddings', 'Concerts & Festivals', 'Conferences & Seminars', 'Party Planning', 'Ticketing Platforms', 'Meetup/Workshop', 'Webinar/Livestream']
//     },
//     {
//       title: 'Nonprofit & Community',
//       icon: 'ri-community-line',
//       sub: ['Charity/NGO', 'Religious Organizations', 'Community Groups', 'Fundraising Campaigns', 'Volunteer Organizations', 'Political Campaign']
//     },
//     {
//       title: 'Real Estate & Property',
//       icon: 'ri-building-line',
//       sub: ['Real Estate Agencies', 'Property Listings', 'Vacation Rentals', 'Home Staging', 'Architecture & Design']
//     },
//     {
//       title: 'Technology & SaaS',
//       icon: 'ri-macbook-line',
//       sub: ['Software Companies', 'Tech Startups', 'App Landing Pages', 'IT Services', 'Cybersecurity']
//     },
//     {
//       title: 'Travel & Tourism',
//       icon: 'ri-map-pin-line',
//       sub: ['Travel Agencies', 'Tour Operators', 'Hotels & Resorts', 'Travel Blogs', 'Destination Guides']
//     },
//     {
//       title: 'Beauty & Fashion',
//       icon: 'ri-star-line',
//       sub: ['Salons & Spas', 'Makeup Artists', 'Fashion Brands', 'Beauty Blogs', 'Skincare Products']
//     },
//     {
//       title: 'Automotive & Transportation',
//       icon: 'ri-truck-line',
//       sub: ['Car Dealerships', 'Auto Repair Shops', 'Car Rentals', 'Logistics & Shipping', 'Rideshare Services']
//     },
//     {
//       title: 'Sports & Recreation',
//       icon: 'ri-football-line',
//       sub: ['Sports Clubs', 'Outdoor Adventures', 'Sporting Goods Stores', 'Fitness Coaching', 'Esports & Gaming']
//     },
//     {
//       title: 'Pets & Animals',
//       icon: 'ri-emotion-happy-line',
//       sub: ['Pet Stores', 'Veterinary Clinics', 'Pet Grooming', 'Animal Shelters', 'Pet Blogs']
//     },
//     {
//       title: 'Finance & Insurance',
//       icon: 'ri-bank-line',
//       sub: ['Financial Advisors', 'Insurance Agencies', 'Investment Firms', 'Accounting Services', 'Cryptocurrency Platforms']
//     },
//     {
//       title: 'Government & Public Services',
//       icon: 'ri-government-line',
//       sub: ['City/County Websites', 'Public Libraries', 'Emergency Services', 'Community Centers', 'Public Transit']
//     },
//     {
//       title: 'Creative & Media',
//       icon: 'ri-mic-line',
//       sub: ['Musician/Band', 'DJ', 'Filmmaker', 'Podcast', 'Art Gallery']
//     },
//     {
//       title: 'Repair & Maintenance',
//       icon: 'ri-tools-line',
//       sub: ['Fabrication', 'Plumbing', 'Civil Work', 'Electrician', 'Carpentar', 'Cleaning Service', 'Electronic Item Services']
//     }
//   ];

const categories = [
  {
    title: 'All',
    icon: 'ri-grid-fill',
    sub: []
  },
  {
    title: 'Local Businesses',
    icon: 'ri-store-line',
    sub: ['Salon & Spa', 'Gym', 'Clinic', 'Café', 'Restaurant', 'Real Estate Agencies', 'Travel Agencies']
  },
  {
    title: 'Service Provider',
    icon: 'ri-service-line',
    sub: ['Architect', 'Interior Designer', 'Photographer/Videographer', 'Event Planner', 'Chartered Accountant', 'Company Secretary', 'Advocate', 'Music Coach', 'Makeup Artists', 'Financial Advisors']
  },
  {
    title: 'Education & Learning',
    icon: 'ri-book-line',
    sub: ['Coaching Center', 'Tutor', 'Pre-school & Daycare', 'School', 'College']
  },
  {
    title: 'Professional Showcase',
    icon: 'ri-user-line',
    sub: ['Portfolio', 'Influencer', 'Blogger/Vlogger']
  },
  {
    title: 'Health & Wellness',
    icon: 'ri-heart-line',
    sub: ['Fitness & Gym', 'Yoga & Meditation', 'Nutritionist', 'Clinic', 'Pharmacy', 'Fitness Coach']
  },
  {
    title: 'Food & Hospitality',
    icon: 'ri-restaurant-line',
    sub: ['Restaurants', 'Cafes & Bakeries', 'Catering Services', 'Hotel/Lounges']
  },
  {
    title: 'Events & Entertainment',
    icon: 'ri-calendar-line',
    sub: ['Event Planner', 'Event Booking Platform']
  },
  {
    title: 'Nonprofit & Community',
    icon: 'ri-hand-heart-line',
    sub: ['Charity/NGO', 'Religious Organizations']
  },
  {
    title: 'Automotive & Transportation',
    icon: 'ri-car-line',
    sub: ['Car Dealerships', 'Auto Repair Shops', 'Car Rentals', 'Logistics & Shipping', 'Rideshare Services']
  },
  {
    title: 'Sports & Recreation',
    icon: 'ri-football-line',
    sub: ['Sports Clubs', 'Sporting Goods Stores', 'Game Zone']
  },
  {
    title: 'Pets & Animals',
    icon: 'ri-paw-line',
    sub: ['Pet Store', 'Pet Grooming', 'Animal Shelters']
  },
  {
    title: 'Repair & Maintenance',
    icon: 'ri-tools-line',
    sub: ['Fabrication', 'Plumbing', 'Civil Work', 'Electrician', 'Carpenter', 'Cleaning Service', 'Electronic Item Services']
  }
];


 const dropdownMenu = document.getElementById('categoryDropdownMenu');

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
    dropdownMenu.appendChild(mainItem);

    const subList = document.createElement('ul');
    subList.id = collapseId;
    subList.style.display = 'none';

    cat.sub.forEach(sub => {
      const subItem = document.createElement('li');
      subItem.innerHTML = `<a href="#" data-value="${sub}">${sub}</a>`;
      subList.appendChild(subItem);
    });

    dropdownMenu.appendChild(subList);
  } else {
    mainItem.innerHTML = `
      <a href="#" data-value="${cat.title}" class="all-main-category">
        <i class="${cat.icon}" style="margin-right:10px;"></i>${cat.title}
      </a>`;
    dropdownMenu.appendChild(mainItem);
  }
});

// jQuery dropdown handling
$(document).ready(function () {
// Toggle submenus (only one open at a time)
$('#categoryDropdownMenu').on('click', '.dropdown-item', function (e) {
  const collapseId = $(this).data('collapse');
  if (collapseId) {
    e.stopPropagation();

    // Close all other submenus
    $('#categoryDropdownMenu ul').not('#' + collapseId).slideUp(200);
    $('.dropdown-item .ri-arrow-right-s-line').not($(this).find('.ri-arrow-right-s-line')).removeClass('rotate');

    // Toggle current one
    $('#' + collapseId).slideToggle(200);
    $(this).find('.ri-arrow-right-s-line').toggleClass('rotate');
  }
});


  // Handle "All" click (no subcategories)
  $('#categoryDropdownMenu').on('click', '.all-main-category', function (e) {
    e.preventDefault();

    const $this = $(this);
    const text = $this.text().trim();
    const iconClass = $this.find('i').attr('class');

    // Update button label with icon
    $('#categoryDropdownButton').html(
      `<span class="selected-category"><i class="${iconClass}" style="margin-right:10px;"></i>${text}</span> <span class="caret"></span>`
    );

    runCategoryFilter(text, text);

    // Remove all highlights
    $('#categoryDropdownMenu ul li').removeClass('active-sub');
    $('#categoryDropdownMenu .dropdown-item').removeClass('active-parent');

    // Add active-orange to All
    $('.all-main-category').removeClass('active-orange');
    $this.addClass('active-orange');

    $('#category-filter').removeClass('open');
  });

  // Handle subcategory click
  $('#categoryDropdownMenu').on('click', 'ul li a[data-value]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $this = $(this);
    const value = $this.data('value');
    const text = $this.text().trim();
    const iconClass = $this.closest('ul').prev('.dropdown-item').find('i').first().attr('class');

    // Update button label with icon
    $('#categoryDropdownButton').html(
      `<span class="selected-category"><i class="${iconClass}" style="margin-right:10px;"></i>${text}</span> <span class="caret"></span>`
    );

    runCategoryFilter(value, text);

    // Highlight selected submenu
    $('#categoryDropdownMenu ul li').removeClass('active-sub');
    $this.parent().addClass('active-sub');

    // Highlight parent category
    $('#categoryDropdownMenu .dropdown-item').removeClass('active-parent');
    $this.closest('ul').prev('.dropdown-item').addClass('active-parent');

    // Remove orange from "All"
    $('.all-main-category').removeClass('active-orange');

    $('#category-filter').removeClass('open');
  });
});

// Dummy filter function
function runCategoryFilter(value, label) {
  console.log("Filtering for:", value);
}


function paginateComponents(componentsArray, itemsPerPage = 10) {
    const $pagination = $('#pagination-container .pagination');
    const totalItems = componentsArray.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        $('.component').hide(); // hide all
        componentsArray.hide();
        componentsArray.slice((page - 1) * itemsPerPage, page * itemsPerPage).show();

        // Update pagination UI
        $pagination.find('li').removeClass('active disabled');
        $pagination.find(`li[data-page="${page}"]`).addClass('active');

        if (page === 1) $pagination.find('.prev-page').addClass('disabled');
        if (page === totalPages) $pagination.find('.next-page').addClass('disabled');
    }

    $pagination.empty();

    if (totalPages <= 1) {
        $('#pagination-container').hide();
        $('#no-components-message').toggle(totalItems === 0);
        return;
    }

    $('#pagination-container').show();
    $('#no-components-message').hide();

    // Previous Button
    $pagination.append(`<li class="page-item prev-page disabled"><a class="page-link" href="#">Previous</a></li>`);

    for (let i = 1; i <= totalPages; i++) {
        $pagination.append(`<li class="page-item" data-page="${i}"><a class="page-link" href="#">${i}</a></li>`);
    }

    // Next Button
    $pagination.append(`<li class="page-item next-page"><a class="page-link" href="#">Next</a></li>`);

    // Click handler
    $pagination.find('li').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('disabled') || $(this).hasClass('active')) return;

        let currentPage = parseInt($pagination.find('li.active').data('page')) || 1;

        if ($(this).hasClass('prev-page')) {
            if (currentPage > 1) showPage(currentPage - 1);
        } else if ($(this).hasClass('next-page')) {
            if (currentPage < totalPages) showPage(currentPage + 1);
        } else {
            const selectedPage = parseInt($(this).data('page'));
            showPage(selectedPage);
        }
    });

    showPage(1);
}






