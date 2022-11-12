let startTime = 120;
let minutes = (startTime >= 60) && ((startTime % 60) === 0) ? Math.floor(startTime / 60) - 1 : Math.floor(startTime / 60);
let seconds = ((startTime % 60) === 0) ? (startTime % 60) + 60 : startTime % 60;
let secondString = (seconds <= 10) ? `0${seconds}` : seconds;
let minutString = (minutes <= 10) ? `0${minutes}` : minutes;
let timeinterval;
let opeenCollaps = 0;
// let baseUrl = "http://fampayment.com/"
let baseUrl = "http://localhost/"
let onSubmit = true;
$(document).ready(function() {
    let countfalse = true;
    $("#navbar-toggler-btn").click(function() {
        $("body").addClass("body-overflow");
        $(".mobile-nav-wrapper").toggleClass("show")
    })
    $("#mobile-menu-close").click(function() {
        $(".mobile-nav-wrapper").removeClass("show")
        $("body").removeClass("body-overflow");
    });

    // $(window).on('scroll', function() {
    //     if ($(window).scrollTop() >= 250) {
    //         $(".mobile-call-to-action-box").removeClass("scroll");
    //     } else if ($(window).scrollTop() <= 250) {
    //         $(".mobile-call-to-action-box").addClass("scroll");
    //     }
    // })

    $(".register-or-login-btn").on("click", function() {
        // $('#register-or-login-modal').modal('show')
    })

    function toggleMenuMobile(event) {
        $(event).children("ul").slideToggle();
        $(event).children("a").toggleClass("up-li-mobile-menu", "down-li-mobile-menu")
    }
    $(".link-mobile-main-menu").click(function() {
        toggleMenuMobile($(this).parent());
    })
    $(".link-sub-main-menu-mobile").click(function() {
        toggleMenuMobile($(this).parent());
    });

    // if ($(window).scrollTop() >= 80) {
    //     $("#main-nav-bar-id").addClass("scroll");
    //     $(".navbar-brand").css({
    //         width: "75px"
    //     })
    // }
    // var top = 0;
    // let socialBtnOffsetTop = $("#social-sidebar").offset();
    // $(window).on('scroll', function() {

    //     if ($(window).scrollTop() >= 80) {
    //         $("#main-nav-bar-id").addClass("scroll");
    //         $(".navbar-brand").css({
    //             width: "75px"
    //         })
    //     } else if ($("#main-nav-bar-id").hasClass("scroll") && $(window).scrollTop() <= 80) {
    //         $("#main-nav-bar-id").removeClass("scroll");
    //         $(".navbar-brand").css({
    //             width: "100px"
    //         })
    //     }
    //     $("#main-nav-bar-id").toggleClass("hide", $(window).scrollTop() > top);
    //     top = $(window).scrollTop();



    // });
    // $(".btn-menu").click(function(){
    //     $(".main-menu-header").slideToggle();
    // })
    //$P$BSjgIoEijb

    // $(".view-awards").on("click", function() {
    //     let collapsWapper = $(".fum-description-img").offset()
    //     console.log("collapsWapper.top", collapsWapper.top)
    //     window.scrollTo({
    //         top: collapsWapper.top,
    //         left: collapsWapper.left,
    //         behavior: 'smooth'
    //     });
    // });
    // $(".download-fam-fixed").on("click", function() {
    //     let collapsWapper = $(".fam-bus-stations-head-section").offset()
    //     window.scrollTo({
    //         top: collapsWapper.top,
    //         left: collapsWapper.left,
    //         behavior: 'smooth'
    //     });
    //     setTimeout(() => {
    //         $("#fullName").focus();
    //     }, 1100);
    // });


    $(".collaps-head").on("click", function() {
            setTimeout(() => {
                let hasCollapsed = $(this).hasClass("collapsed");
                let $iconCollaps = $(this).children(".collaps-head-icon")
                $(".collaps-head-icon").each(function() {
                    $(this).animate({
                        deg: 0
                    }, {
                        duration: 200,
                        step: function(now) {
                            $(this).css({
                                transform: 'rotate(' + now + 'deg)'
                            });
                        }
                    });
                })
                if (hasCollapsed) {
                    $iconCollaps.animate({
                        deg: 0
                    }, {
                        duration: 200,
                        step: function(now) {
                            $(this).css({
                                transform: 'rotate(' + now + 'deg)'
                            });
                        }
                    });
                } else {
                    $iconCollaps.animate({
                        deg: 180
                    }, {
                        duration: 200,
                        step: function(now) {
                            $(this).css({
                                transform: 'rotate(' + now + 'deg)'
                            });
                        }
                    });
                }
            }, 300);
            console.log("opeenCollaps", opeenCollaps === 0)
                // setTimeout(() => {
                //     if (opeenCollaps === 0) {
                //         let collapsWapper = $("#accordion").offset()
                //         console.log("collapsWapper.top", collapsWapper.top)
                //         window.scrollTo({
                //             top: collapsWapper.top,
                //             left: collapsWapper.left,
                //             behavior: 'smooth'
                //         });
                //     }
                // }, 1000);

            opeenCollaps++;
        })
        // $('html, body').animate({
        //     scrollTop: $(".collaps-head").offset().top
        // }, 1000);
        // $('.collapse').on('shown.bs.collapse', function(e) {
        //     var $card = $(this).closest('.card');
        //     $('html,body').animate({
        //         scrollTop: $card.offset().top
        //     }, 500);
        // });

    $("#campaign-btn").on("click", function(e) {
        e.preventDefault();
        if (checkIsValidInputValue("#campaign-form") === 0) {
            $(this).attr("disabled", true)
            $('#loding-icon').addClass('loader');
            let data = {};
            data.fullName = $("#fullName").val();
            data.mobile = faNumberConvertToEn($("#mobile").val());
            $(".sim-type").each(function() {
                if ($(this).is(':checked')) {
                    data.simType = $(this).val();
                };
            });
            let userReferralCode = getParamtrsInUrl(["referralCode"]);
            console.log("userReferralCode =>", userReferralCode)
            data.referralCode = userReferralCode.referralCode ? userReferralCode.referralCode : "";

            $("#campaign-form .show-error-row").empty();
            $.ajax({
                async: false,
                type: "POST",
                url: baseUrl + "wp-json/campaign/v1/save-data",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    console.log("response =>", response);
                    // $("#campaign-btn .btn-text").text("درحال انتقال برای دانلود فام ...")
                    if (response.success) {
                        $("#campaign-form .show-error-row").append(createAlertMsg(response.message, "success"))
                        setTimeout(() => {
                            $('#loding-icon').removeClass('loader');
                        }, 2000);
                        if (response.famResultCode === 101 || response.famResultCode === 103) {
                            setTimeout(() => {
                                $("#success-popup").modal('show')
                            }, 2500);
                        } else {
                            // setTimeout(() => {
                            //     window.location.replace('https://trc.metrix.ir/azzwo3/');
                            // }, 6000);
                        }

                    } else {
                        $(this).attr("disabled", false)
                        $("#campaign-form .show-error-row").append(createAlertMsg(response.message, "error"))
                        response.validate_error.forEach(element => {
                            $(`input[name='${element.type}']`).parents(".form-group").children(".input-msg-row").append(createErrorBox(element.message))
                        });
                    }
                },
                error: function(error) {
                    $(this).attr("disabled", false)
                    $("#campaign-form .show-error-row").append(createAlertMsg("در زمان ارسال اطلاعات خطایی رخ داده است", "error"))
                }
            });
        }
    });
});

function isValedRadio(selector) {
    let isValid = false;
    $(`[name='${selector}']`).each(function() {
        if ($(this).is(":checked")) {
            isValid = true;
        }
    });
    return isValid;
}

function checkIsValidInputValue(formSelector) {
    let emptyInput = 0;
    let inputSelector = [];
    $(formSelector + " input").each(function() {
        $(this).val(faNumberConvertToEn($(this).val()))
        let inputName = $(this).attr("name");
        let inputValue = $(this).val();
        $(this).parents(".form-group").children(".input-msg-row").empty();
        switch (true) {
            case inputValue === "":
                if (IsValidFullName(inputValue)) {
                    $(this).removeClass("input-error-auth");
                    $(this).parent().removeClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").empty();
                } else {
                    emptyInput++;
                    $(this).addClass("input-error-auth");
                    $(this).parent().addClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").append(createErrorBox("مقدار این فیلد اجباری است"));
                    inputSelector.push("#" + $(this).attr("id"))
                }
                break;
            case inputName === "fullName":
                if (IsValidFullName(inputValue)) {
                    $(this).removeClass("input-error-auth");
                    $(this).parent().removeClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").empty();
                } else {
                    emptyInput++;
                    $(this).addClass("input-error-auth");
                    $(this).parent().addClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").append(createErrorBox("نام و نام خانوادگی وارد شده اشتباه است "))
                    inputSelector.push("#" + $(this).attr("id"))
                }
                break;
            case inputName === "mobile":
                $(this).parent().siblings(".input-icons-group").empty()
                if (IsValidPhoneNumber(inputValue)) {
                    $(this).removeClass("input-error-auth");
                    $(this).parent().removeClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").empty();
                } else {
                    emptyInput++;
                    $(this).addClass("input-error-auth");
                    $(this).parent().addClass("group-error-auth");
                    $(this).parent().siblings(".input-icons-group").empty()
                    $(this).parents(".form-group").children(".input-msg-row").append(createErrorBox("شماره موبایل وارد شده اشتباه است"))
                    inputSelector.push("#" + $(this).attr("id"))
                }
                break;
            case inputName === "simType":
                if (isValedRadio(inputName)) {
                    $(this).removeClass("input-error-auth");
                    $(this).parent().removeClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").empty();
                    $(this).siblings(".input-info-wrapper").remove()
                } else {
                    emptyInput++;
                    $(this).addClass("input-error-auth");
                    $(this).parent().addClass("group-error-auth");
                    $(this).parents(".form-group").children(".input-msg-row").append(createErrorBox("لطفا نوع سیم کارت را انتخاب نمایید"))
                    inputSelector.push("#" + $(this).attr("id"))
                }
                break;

            default:

                break;
        }


    })
    return emptyInput
}



function convertArrayToString(array) {
    return array.join(",").replace(/,/g, "");
}

function faNumberConvertToEn(phonnumber) {
    let mobilearray = phonnumber.split(''); // empty string separator
    let number_P_E = {
        '۰': 0,
        '۱': 1,
        '۲': 2,
        '۳': 3,
        '۴': 4,
        '۵': 5,
        '۶': 6,
        '۷': 7,
        '۸': 8,
        '۹': 9
    };
    let EnArrayNumber = []
    mobilearray.map((number) => {
        if (number_P_E[number] !== undefined) {
            EnArrayNumber.push(number_P_E[number])
        } else {
            EnArrayNumber.push(number)
        }
    });
    return convertArrayToString(EnArrayNumber)
}

function createErrorBox(textErorr) {
    let row = ` <div class="input-error-wrapper">
                          <small class="error-msg">${textErorr}</small>
                        </div>`;
    return row;
}

function createInfoBox(textErorr) {
    let row = ` <div class="input-info-wrapper">
                          <small class="info-msg">${textErorr}</small>
                        </div>`;
    return row;
}

function createSuccessBox(textErorr) {
    let row = ` <div class="input-info-wrapper">
                          <small class="success-msg">${textErorr}</small>
                        </div>`;
    return row;
}

function createAlertMsg(msgText, msgType) {
    let alertClass = "";
    let row = ``;
    switch (true) {
        case msgType === "success":
            alertClass = "alert-success"
            break;
        case msgType === "error":
            alertClass = "alert-danger"
            break;
        case msgType === "warning":
            alertClass = "alert-warning"
            break;
        default:
            alertClass = "alert-info"
            break;
    }
    return row = `<div class="alert ${alertClass} text-center">${msgText}</div>`
}


function IsValidPhoneNumber(value) {
    return /09[0-9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/g.test(
        value,
    );
};

function IsValidPassword(value) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value);
}

function IsValidEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm.test(value);
}

function IsValidFullName(value) {
    return /^[a-zA-Z پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/g.test(value);
}

function cuonUpFunction() {
    $('.counter').each(function() {
        var $this = $(this);
        var countTo = $this.attr('data-count');

        $({
            countNum: $this.text()
        }).animate({
                countNum: countTo
            },

            {

                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum + " + ");
                    //alert('finished');
                }

            });
    });
}


function generateRandomNumber() {
    return Math.floor(Math.random() * 100000);
}

function createCommandBox() {
    let commentWapperId = "comment-form-" + generateRandomNumber();

    let row = `<div class="comment-form-replay contact-form" id="${commentWapperId}">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <label class="write-comment-lable" for="fname">نام و نام خانوادگی</label>
                        <input type="text" class="form-control-custom" id="fname" placeholder="مثال : افشین زندی" name="fname">
                    </div>
                    <div class="col-12 col-md-6">
                        <label class="write-comment-lable " for="email">ایمیل</label>
                        <input type="email" class="form-control-custom" id="email" placeholder="name@domain.com" name="email">
                        <small class="input-info-text"> پاسخ نظر شما از طریق ایمیل برای شما ارسال میگردد</small>
                    </div>
                </div>
                <div class="col-12 p-0">
                    <label class="write-comment-lable" for="comment">متن پيغام شما</label>
                    <textarea class="form-control-custom" placeholder="در اينجا متن پيغام خود را وارد نماييد." rows="5" id="comment"></textarea>
                </div>
                <div class="form-group pt-4">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn-custom analytips-orange py-2">ارسال دیدگاه</button>
                        <button class="btn-custom analytips-border mx-2 coment-btn-close" data-parentid="#${commentWapperId}"><span>بستن</span></button>
                    </div>
                </div>
              </div>`;
    return row;
}

function getParamtrsInUrl(arrayParams) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let paramsObj = {};
    arrayParams.forEach((params) => {
        paramsObj[`${params}`] = urlParams.get(`${params}`);
    });
    return paramsObj;
};