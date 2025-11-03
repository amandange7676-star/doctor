$(document).ready(function () {



    $(document).on('click', '.edit-site', function(event,clientname , clientproject) {
        var filename = $(this).attr("href");
        console.log('filename: ', filename)
        var requestFrom = $(this).attr("src");
        // $(".selectedPageName").val(filename);

        // alert(2222);
         //  $(".formFieldFileName").val(filename);
        // if($(".formFieldFileName").val()== undefined){
        //     alert(111);
        //     $(".formFieldFileName").val("index.html");
        // }
        // alert("tformext--------"+$(".formFieldFileName").val());

        var clientName = "";
        var clientProjectName = "";
        if (requestFrom == "dashboardPage") {
            // clientName = $("#editClientId").val();
            // clientProjectName = $("#editClientProjectId").val();
             clientName = getCookie('clientName');
            console.log('clientName: ', clientName)
            clientProjectName = getCookie('projectName');
            console.log('clientProjectName: ', clientProjectName)
        } else {
            clientName = getCookie('clientName');
            console.log('clientName: ', clientName)
            clientProjectName = getCookie('projectName');
            console.log('clientProjectName: ', clientProjectName)
        }
       // Override only if provided by trigger
        if (clientname) clientName = clientname;
        if (clientproject) clientProjectName = clientproject;


        // alert("fileName----"+ $(".formFieldFileName").val())

        $.ajax({
            type: 'POST',
            url: "es/",
            data: {
            'clientName': clientName,
            'clientProjectName': clientProjectName,
            'srcReq': filename
            },
            headers: {
                 "X-Requested-With": "XMLHttpRequest",
            //     "X-CSRFToken": getCookie("csrftoken"),
            },
            success: function (data) {
                console.log('data: ', data)


                setCookie("clientName", clientName, 7);
                setCookie("projectName", clientProjectName, 7);

                var Slidercontent = $('<div>').html(data).find('.dynamic-slider-wrapper').html();
                if (Slidercontent) {
                    localStorage.setItem('dynamicSliderContent', Slidercontent);
                }

              var newTab = window.open("", "_self");
              if (requestFrom == "dashboardPage") {
                var newTab = window.open("test", "_blank");
              }

              newTab.document.write(data);
              newTab.document.close();
                newTab.onload = function () {
                    function appendElement(tag, attributes, toBody) {
                        var element;
                if (tag === 'link') {
                    element = newTab.document.querySelector('link[href="' + attributes.href + '"]');
                    if (!element) {
                        element = newTab.document.createElement(tag);
                        for (var attr in attributes) {
                            element[attr] = attributes[attr];
                        }
                        if (toBody) {
                            newTab.document.body.appendChild(element);
                        } else {
                            newTab.document.head.appendChild(element);
                        }
                    }
                } else if (tag === 'script') {
                    element = newTab.document.querySelector('script[src="' + attributes.src + '"]');
                    if (!element) {
                        element = newTab.document.createElement(tag);
                        for (var attr in attributes) {
                            element[attr] = attributes[attr];
                        }
                        if (toBody) {
                            newTab.document.body.appendChild(element);
                        } else {
                            newTab.document.head.appendChild(element);
                        }
                    }
                }
            }


              appendElement('link', { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css' }, false);
              appendElement('link', { rel: 'stylesheet', href: 'assets/css/custom/editmode.css' }, false);
              appendElement('link', { rel: 'stylesheet', href: 'assets/css/custom/custom.css' }, false);
              appendElement('script', { src: 'https://cdn.quilljs.com/1.3.6/quill.min.js', type: 'text/javascript' }, true);
              appendElement('script', { src: 'assets/js/custom/main.js', type: 'text/javascript' }, true);
              appendElement('script', { src: 'assets/js/custom/editmode.js', type: 'text/javascript' }, true);
              appendElement('script', { src: 'assets/js/custom/editModeScript.js', type: 'text/javascript' }, true);

              $('<input>', {type: 'hidden',class: 'hidden selectedPageName',name: 'selectedPageName',value: filename}).appendTo(newTab.document.body);


                var anchorTags = newTab.document.querySelectorAll('a');
                  anchorTags.forEach(function(anchor) {
                  anchor.classList.add('edit-site');
              });


            };
            },
            error: function (data, errmsg, err) {
                alert(data.responseJSON.errorMessage);
            }
          });
          return false;
      });
 });













