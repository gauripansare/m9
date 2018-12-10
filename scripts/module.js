
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var ipad = !!navigator.platform && /iPad|iPod/.test(navigator.platform);
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIEEdge = /Edge/.test(navigator.userAgent);
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (isIE11version) {
            if ($(this).attr("type") != undefined && $(this).attr("type") == "radio")
                return;
            $(this).removeAttr("disabled")
        }
        return;
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            
            var pageData = this.GetPageDetailData();
            var reviewData = this.GetPageReviewData();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                }
                else {
                    if (pageData.ImageHotSpots != undefined) {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            fdkurl = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                            break;
                        }
                    }
                }
                if (fdkurl != undefined) {
                    fdkurl = _Settings.dataRoot + "feedbackdata/" + fdkurl;
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");
                    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                        //this.SetFeedbackTop()
                        //$('html,body').animate({ scrollTop: 0 }, 0, function () { });
                    });
                }
            }
        },
        DisplayInstructorReviewMode: function () {
            
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                if (currentPageData.pageId == "p9") {
                    this.InstructorReviewModeForCheckbox();
                }
                else {
                    this.InstructorReviewModeForTextEntry();
                }
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    for (var i = 0; i < reviewData.Positions.length; i++) {
                        var posObj = reviewData.Positions[i];
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.height();
                        if (ht < 597)
                            ht = 597;
                        while ((posObj.posY + 40) > ht) {
                            posObj.posY = posObj.posY - 2;
                        }
                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_div);


                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                            appendImage.append(_divI);
                        }
                    }
                }

            }
            if (!_Navigator.IsPresenterMode()) {
                this.ShowFeedbackReviewMode();
            }
            $(".divHotSpot").k_disable();
            $(".divHotSpotdbl").k_disable();



        },
        InstructorReviewModeForCheckbox: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            var checklist = $("#EmbededChecklist");
            //var reviewData = ITSimModule.GetReviewDataForPage();
            $("input").k_disable();
            if (_Navigator.IsPresenterMode()) {
                for (var i = 0; i < pageDetailData.EmbedSettings.validatearray.length; i++) {
                    var chkId = pageDetailData.EmbedSettings.validatearray[i];
                    $("input#" + chkId).prop('checked', true);
                }
                this.ShowCorrectIncorrectCheckItems("#EmbededChecklist");
                $('#EmbededChecklist input').attr('disabled', 'disabled');
            }
            if (reviewData != undefined) {
                var k_box = checklist.closest(".k-element-box");

                if (reviewData.selectedOptions != undefined && reviewData.selectedOptions.length > 0) {
                    for (var i = 0; i < reviewData.selectedOptions.length; i++) {
                        var chkId = reviewData.selectedOptions[i];

                        $("input#" + chkId).prop('checked', true);


                    }

                    this.ShowCorrectIncorrectCheckItems("#EmbededChecklist");
                    $('#EmbededChecklist input').attr('disabled', 'disabled');
                }
                /* $("#k-element-checklist1120").find("input[type='checkbox']").each(function () {
                      $(this).prop('disabled', true);
                  });*/

            }
        },
        InstructorReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (_Navigator.IsPresenterMode()) {
                if (pageDetailData.EmbedSettings.validatearray.length > 0) {
                    $(".textentryreview1").html("<div class='OpenSansFont greenspan' style='font-weight:bold;font-size: 13px; ' ><span aria-hidden='true'>" + pageDetailData.EmbedSettings.validatearray[0] + "</span></div>")
                    $(".textentryaccessibility").text("Correct password " + pageDetailData.EmbedSettings.validatearray[0]);
                    $(".textentryreview1").show();
                }
            }
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        var tEntry = reviewData.textEntry[i].trim();
                        if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $(".textentryreview1").html("<div class='OpenSansFont greenspan' style='font-weight:bold;font-size: 13px; ' ><span aria-hidden='true'>" + reviewData.textEntry[i] + "</span></div>")
                                $(".textentryaccessibility").text("Correct password " + reviewData.textEntry[i]);
                            }
                            else {
                                $(".textentryreview2").html("<div class='OpenSansFont greenspan'  style='font-weight:bold;font-size: 13px;padding-left:5px; ' ><span aria-hidden='true'>" + reviewData.textEntry[i] + "</span></div>");
                                $(".textentryreview2").show();
                            }
                        }
                        else {
                            $(".textentryreview1").html("<div class='OpenSansFont redspan'  style='font-weight:bold;font-size: 13px; ' ><span aria-hidden='true'>" + reviewData.textEntry[i] + "</span></div>")
                        }
                    }
                    if (i == 1) {

                        $(".textentryaccessibility").text("Incorrect password entered " + reviewData.textEntry[i - 1] + " correct password is " + reviewData.textEntry[i]);

                    }
                }
                $(".textentryreview1").show();
            }
        },
        DisplayUserReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {

                this.DisplayReviewModeForTextEntry();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                    var appendImage = $(".wrapperimage");
                    var ht = appendImage.height();
                    while ((posObj.posY + 40) > ht) {
                        posObj.posY = posObj.posY - 2;
                    }
                    if (posObj.isCorrect) {
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_div);


                    } else {
                        var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                        appendImage.append(_divI);
                    }

                }
            }
            this.ShowFeedbackReviewMode();


        },
        DisplayReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {

                if (reviewData.textEntry[reviewData.textEntry.length - 1] != undefined && reviewData.textEntry[reviewData.textEntry.length - 1] != "") {
                    var tEntry = reviewData.textEntry[reviewData.textEntry.length - 1].trim().toLowerCase();
                    if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                        $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[reviewData.textEntry.length - 1] + "</span>")
                    }

                }
                $(".textentryreview1").show();
            }
        },
        AddHotspotClick: function (hotspotObj, event, isCorrect) {
            //$(".divHotSpot").remove();
            
            if (_Navigator.IsAnswered()) {
                return;
            }
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX;
            var rposY;
            if (event != undefined && event.pageX != undefined) {
                rposX = (event.pageX - posX);
                rposY = (event.pageY - posY);
            }
            if (rposX < 0 || rposY < 0 || rposX == undefined || rposY == undefined) {//gp if module is attmpted using accessibility
                rposX = hotspotObj.position().left + 20;
                rposY = hotspotObj.position().top + 20;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined) {

            }
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {

                    var sameclick = false;
                    var posindex = 0;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                                sameclick = true;
                                posindex = i;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                        else {
                            if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                                reviewData[r].Positions[posindex].isCorrect = isCorrect;
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }

        },
        AddEditPropertiesClick: function (event) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData.EmbedSettings != undefined)
                return;
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX = (event.pageX - posX);
            var rposY = (event.pageY - posY);
            if (isNaN(rposX) || isNaN(rposY))
                return;

            var currentPageData = _Navigator.GetCurrentPage();
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                                sameclick = true;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: false };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: false };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }

        },
        OnPageLoad: function () {
            
            var currentPageData = _Navigator.GetCurrentPage();
            this.LoadHotSpot();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            if (_Navigator.IsAnswered()) {
                this.DisplayInstructorReviewMode();
            }
            if (_Navigator.IsPresenterMode()) {
                $(".startbtn").k_disable();
                $("#linknext").k_enable();
                this.PresenterMode();
            }
        },
        PresenterMode: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
            var appendImage = $(".wrapperimage");
            if (pageData != undefined) {
                if (currentPageData.pageId == "p17" && pageData.EmbedSettings != undefined) {
                    $("input[type='text']").addClass("greenspan");
                    $("input[type='text']").val(pageData.answerset[0]);
                    $("input[type='text']").k_disable();
                }
                else if (pageData.ImageHotSpots != undefined) {
                    var posObj = pageData.ImageHotSpots.Hotspots[0];
                    var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                    if (currentPageData.pageId == "p3") {
                        $(".divHotSpotdbl").addClass("hotspotclicked");
                        $(".divHotSpotdbl").addClass("disabled");
                        $(".divHotSpot").addClass("disabled");
                        appendImage.append(_div);
                    }
                    else {
                        $(".divHotSpot").addClass("hotspotclicked");
                        $(".divHotSpot").addClass("disabled");
                        appendImage.append(_div);
                    }
                }
            }
            //}
            $("#linknext").k_enable();
            if (currentPageData.pageId != "p10") {
                _Navigator.SetPageStatus(true);
            }
            _Navigator.UpdateProgressBar();
        },
        LoadCountDown: function () {
            $("#counterdiv").attr("aria-hidden", "true");
            if (myCounter != undefined) {
                myCounter.end();
                instance.stop();
                myCounter = null;
            }
            myCounter = $.knowdlCountDown({
                seconds: 30,  // number of seconds to count down
                onUpdateStatus: function (sec) {
                    $("#counterdiv").css({ "text-align": "right", "font-size": "26px", "font-family": "comic sans ms", "color": "#f4f8fc" });
                    var lsec = "";
                    if ((sec + "").length > 1) {
                        lsec = "00:" + sec;
                    }
                    else {
                        lsec = "00:0" + sec;
                    }
                    $("#counterdiv").html(lsec)
                    $("#counterdiv").parent().attr("aria-label", "timer " + sec + " seconds");
                },
                onCounterEnd: function () {
                    if ($("#counterdiv").text() == "00:00") {//$(".SimPageStepByStepBtn").trigger("click");         
                        //ITSimModule.IncorrectPopup();
                    }
                }
            });

            myCounter.start();
        },
        LoadHotSpot: function () {

            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            //ATUL 
            if (currentPageData.pageId == "p3") {
                // if (_Navigator.IsAnswered()) {
                $("#counterdiv").css("display", "none");
                //}
                //else {
                // this.LoadCountDown();
                //}
            }
            if (pageData != undefined) {

                var hotspotdata = pageData.ImageHotSpots;
                var htmlForDivHotspotImage = "";
                if (pageData.ImageHotSpots != undefined) {
                    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                        var currImg = $("img")
                        var orw = currImg.width();
                        var orh = currImg.height();

                        var hsId = hotspotdata.Hotspots[i].HotspotId;

                        var pwdth = hotspotdata.Hotspots[i].width;
                        var phight = hotspotdata.Hotspots[i].height;
                        var pleft = hotspotdata.Hotspots[i].left;
                        var ptop = hotspotdata.Hotspots[i].top;
                        var accessText = hotspotdata.Hotspots[i].accessText;
                        if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                            pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                            ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                        }

                        var eventname = hotspotdata.Hotspots[i].eventName;
                        if (eventname != undefined && !isAndroid && !isIOS) {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpotdbl divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "'  aria-label='" + accessText + "'></button>";
                        }
                        else {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "'  aria-label='" + accessText + "'></button>";
                        }
                    }
                    $(".wrapperimage").append(htmlForDivHotspotImage)
                }

            }
        },
        /*PresenterMode: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();


            if (currentPageData.pageId == "p3" && pageData.EmbedSettings != undefined) {
                $("input[type='text']").addClass("greenspan");
                $("input[type='text']").val(pageData.EmbedSettings.validatearray[0]);
                $("input[type='text']").k_disable();

            }
            $(".divHotSpot").addClass("hotspotclicked");
            $(".divHotSpot").k_disable();


            $("#linknext").k_enable();
        },*/
        ApplycontainerWidth: function () {

            var innerWidth = $(window).width();

            $("#header-title img").attr("src", "assets/images/logo.png")

            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))

                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }

        },
        OrientationChange: function () {

            this.ApplycontainerWidth();

        },
        HotspotClick: function (_hotspot, event) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Hotspot click.")
            }
            if (_Navigator.IsAnswered())
                return;
            var action = _hotspot.attr("action")

            var score = 0;
            var pageData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            var isCorrect = true;
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        //score = parseInt(pageData.ImageHotSpots.Hotspots[i].score);
                        if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined) {
                            isCorrect = parseInt(pageData.ImageHotSpots.Hotspots[i].isCorrect);
                        }
                    }
                }
            }

            this.AddHotspotClick(_hotspot, event, isCorrect);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    _Navigator.SetPageStatus(true);
                    this.HotspotNext();
                    break;
                case "feedback":
                    if (isCorrect) {
                        _Navigator.SetPageStatus(true);
                    }
                    this.HotspotFeedback(_hotspot, isCorrect);
                    break;
                case "inputcheck":
                    _ModuleCommon.InputEnter($("input.EmbededElement"));
                    break;
                case "checkboxcheck":
                    _ModuleCommon.checkboxcheck($("input.EmbededElement"));
                    break;
                default:
                    break;
            }
            _Navigator.GetBookmarkData();
        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        InputFeedback: function () {

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()
                if (isIOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                $("#div_feedback p:first").attr("tabindex", "-1")
                // $('html,body').animate({ scrollTop: document.body.scrollHeight }, animeTime, function () {
                //     $("#div_feedback p:first").focus();
                // });
                window.scrollTo(0, document.body.scrollHeight)
                $("#div_feedback p:first").focus();
            });
            $("input").k_disable();
            this.EnableNext();
        },
        HotspotFeedback: function (_hotspot, isCorrect) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {

                        if (pageData.ImageHotSpots.Hotspots[i].isIncorrect != undefined && pageData.ImageHotSpots.Hotspots[i].isIncorrect) {
                            url = pageData.ImageHotSpots.Hotspots[i].incorrectfeedbackurl;
                        }
                        else {
                            url = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                        }
                    }
                }
            }
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop() 
                if (isIOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                $("#div_feedback p:first").attr("tabindex", "-1")
                // $('html,body').animate({ scrollTop: document.body.scrollHeight }, animeTime, function () {
                //     $("#div_feedback p:first").focus();
                // });
                window.scrollTo(0, document.body.scrollHeight)
                $("#div_feedback p:first").focus();

            });
            $(".divHotSpot").k_disable();
            this.EnableNext();
        },
        HotspotNext: function () {
            _Navigator.Next();
        },
        InputNext: function () {
            _Navigator.Next();
        },
        checkboxcheck: function (inputtext) {

        },
        OnContinue: function () {

            $("input[type='checkbox']").k_enable();
            $("input[type='checkbox']").removeAttr("checked");
            //    $("input[type='checkbox']:checked").each(function(){
            //         if($(this).attr("iscorrect") != undefined && $(this).attr("iscorrect") == "Correct")
            //         {
            //             $(this).k_disable();
            //         }
            //         else
            //         {
            //             $(this).removeAttr("checked");
            //         }
            //    })
            $(".divHotSpot").k_enable();
            $(".hotspotclicked").removeClass("hotspotclicked");
            $("#div_feedback .div_fdkcontent").html("");
            $("#div_feedback").hide();
            $(".pageheading").attr("tabindex", "-1")
            // $('html,body').animate({ scrollTop: document.body.scrollHeigh }, 500, function () {
            //     $(".pageheading").focus()
            // });
            window.scrollTo(0, document.body.scrollHeight)
            $(".pageheading").focus();
        },
        checkboxcheckAns: function () {
            var checkboxVal = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            }).get();
            if (checkboxVal.length > 0) {
                var pageData = this.GetPageDetailData();
                var vtextarr = pageData.EmbedSettings.validatearray;
                var isVRequired = true;
                for (var i = 0; i < vtextarr.length; i++) {
                    if (($.trim(vtextarr[i])).toLowerCase() != checkboxVal[i]) {
                        isVRequired = false;
                        break;
                    }
                }
                if (checkboxVal.length > 3) {
                    isVRequired = false;
                }

                var found = false;
                // var reviewData = ITSimModule.GetReviewData();
                var currentPageData = _Navigator.GetCurrentPage();

                if (reviewData != undefined) {

                    if (reviewData != undefined && reviewData.length > 0) {
                        for (var i = 0; i < reviewData.length; i++) {
                            if (reviewData[i].pageId == currentPageData.pageId) {
                                if (reviewData[i].selectedOptions != undefined)
                                    reviewData[i].selectedOptions = reviewData[i].selectedOptions.concat(checkboxVal);
                                else
                                    reviewData[i].selectedOptions = checkboxVal;
                                found = true;
                            }
                        }
                    }

                }

                if (!found) {
                    var _obj = {};
                    _obj.pageId = currentPageData.pageId;
                    _obj.selectedOptions = checkboxVal;
                    reviewData.push(_obj);
                    pageReviewData = _obj
                }

            }
            if (isVRequired) {
                //var score = pageData.EmbedSettings.score;
                //_Navigator.SetPageScore(score)              
                this.InputFeedback();
                _Navigator.SetPageStatus(true);
                this.EnableNext();
                this.ShowCorrectIncorrectCheckItems();
            }
            else {
                if (currentPageData.pageId == "p9") {
                    var pageData = this.GetPageDetailData();
                    url = pageData.EmbedSettings.incorrectfeedbackurl;
                    var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");
                    $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                        if (isIOS) {
                            $("#div_feedback p:first").attr("role", "text")
                        }
                        $("#div_feedback p:first").attr("tabindex", "-1")
                        // $('html,body').animate({ scrollTop: document.body.scrollHeight }, animeTime, function () {
                        //     $("#div_feedback p:first").focus();
                        // });
                        window.scrollTo(0, document.body.scrollHeight)
                        $("#div_feedback p:first").focus();
                    });
                    $(".submitdata").k_disable();
                    $("input[type='checkbox']").k_disable();
                    $("#linknext").k_disable();
                }
            }

        },
        InputEnter: function (inputtext) {
            if (_Navigator.IsAnswered())
                return;
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Input Enter click.")
            }
            if ($.trim(inputtext.val()) != "") {
                var pageData = this.GetPageDetailData();
                var vtextarr = pageData.EmbedSettings.validatearray;
                var isVRequired = false;
                for (var i = 0; i < vtextarr.length; i++) {
                    if (($.trim(vtextarr[i])) == ($.trim(inputtext.val()))) {
                        isVRequired = true;
                        break;
                    }
                }

                var found = false;
                var str = $.trim(inputtext.val());
                var currentPageData = _Navigator.GetCurrentPage();
                if (reviewData != undefined && reviewData.length > 0) {
                    for (var i = 0; i < reviewData.length; i++) {
                        if (reviewData[i].pageId == currentPageData.pageId) {
                            if (reviewData[i].textEntry != undefined) {
                                if (reviewData[i].textEntry.length < 2) {
                                    reviewData[i].textEntry.push(str);
                                } else {
                                    reviewData[i].textEntry.splice(0, 1);
                                    reviewData[i].textEntry.push(str);
                                }
                            }
                            else {
                                reviewData[i].textEntry = [str];
                            }

                            found = true;
                        }
                    }
                }

                if (!found) {
                    var _obj = {};
                    _obj.pageId = currentPageData.pageId;
                    _obj.textEntry = [str];
                    _obj.isCorrect = true;
                    reviewData.push(_obj);

                }

            }
            if (isVRequired) {
                var score = pageData.EmbedSettings.score;
                _Navigator.SetPageScore(score)
                var action = pageData.EmbedSettings.action;
                _Navigator.SetPageStatus(true);
                switch (action) {
                    case "next":
                        this.InputNext();
                        break;
                    case "feedback":
                        this.InputFeedback();
                        break;
                    default:
                        break;
                }
            }
            else {
                $(".divHotSpot").removeClass("disabled");
                $(".divHotSpot").removeClass("hotspotclicked");
                $(".divHotSpot").k_enable();
            }
            _Navigator.GetBookmarkData();
        },
        ShowCorrectIncorrectCheckItems: function (checklistid) {

            $("input[type='checkbox']:checked").each(function () {
                var iscorrect = $(this).attr("iscorrect");
                if (iscorrect == undefined) iscorrect = "Incorrect";
                var arialabel = $("#" + $(this).attr("id") + "_span").html();
                if (iscorrect == "Correct") {
                    $(this).before("<div class='cchkitem' ></div>");
                    $(this).attr("aria-label", " correct option selected " + arialabel);
                    $("label[for='" + $(this).attr("id") + "']").attr("aria-hidden", "true");
                }
                else {
                    $(this).before("<div class='icchkitem'></div>");
                    $(this).attr("aria-label", " incorrect option selected " + arialabel);
                    $("label[for='" + $(this).attr("id") + "']").attr("aria-hidden", "true");
                }
            })

            this.SetCorrectIncorrectItemStyle(checklistid)
            //$(".cchkitem").next().hide().attr("aria-hidden","true");
            //$(".icchkitem").next().hide().attr("aria-hidden","true");
        },
        SetCorrectIncorrectItemStyle: function (checklistid) {
            var selector = ".k-element-checklist";
            if (checklistid != undefined && checklistid != "")
                selector = checklistid = "#" + checklistid.replace("#", "");

            $("input[type='checkbox']").each(function () {
                var iscorrect = $(this).attr("iscorrect");
                if (iscorrect == undefined) iscorrect = "Incorrect";
                if (iscorrect == "Correct") {
                    //$("label[for='"+$(this).attr("id")+"']").css({ "font-weight": "bold" });

                }
                else {
                    $("label[for='" + $(this).attr("id") + "']").css({ "font-weight": "normal", "color": "#999999" });

                }
            });
        },
        AppendFooter: function () {
            if ($(".presentationModeFooter").length == 0) {
                var str = '<div class="presentationModeFooter">Presentation Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
            else {
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
        AppendScormReviewFooter: function () {
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
    }
})();
function AppendFooter() {
    if ($(".levelfooterdiv").length == 0) {
        var str = '<div class="levelfooterdiv"><div class="navBtn prev" onClick="GoToPrev()" role="button" tabindex = 195 aria-label="Previous"><a href="#"></a></div><div style="display: inline-block;width: 2px;"></div><div class="boxleveldropdown" style="width: 150px;"  role="button" tabindex = 196 aria-label="Scorecard"><span class="leftarrow"></span><ul class="levelmenu"><li class="uparrow" style = "width: 100px; margin-left: -8px;"><span class="menutitle" >Scorecard</span><div class="levelsubMenu" tabindex = 197 role="text">Total Score - <br>Activity Score - </div><a class="menuArrow"></a></div><div style="display: inline-block;width: 2px;"></div><div class="navBtn next" onClick="GoToNext()" role="button" tabindex = 198 aria-label="Next"><a href="#"></a></div></div>';
        $("#wrapper").append($(str));
        $(".navBtn.prev").css({
            "opacity": ".5",
            "pointer-events": "none"
        });
        $(".navBtn.prev").attr("aria-disabled", "true")
    }
}

function DisplaySubmenu() {
    if ($(".levelsubMenu").is(":visible")) {
        $(".levelsubMenu").hide();
        $('.rightarrow').removeClass('fa-chevron-up').addClass('fa-chevron-right');
    } else {
        $(".levelsubMenu").show();
        $('.rightarrow').removeClass('fa-chevron-right').addClass('fa-chevron-up');
    }
}
var mTreeObj = {
    Goto: function (pageid) {
        _Navigator.LoadPage(pageid);
    },
    GoToPrev: function () {
        try {
            if ($(".navBtn.prev").css("pointer-events") == "none") {
                return;
            }
            else {
                _Navigator.Prev();
                if (_Navigator.GetCurrentPage().nextPageId != undefined && _Navigator.GetCurrentPage().nextPageId != "") {
                    enableobj($(".navBtn.next"));
                } else {
                    disableobj($(".navBtn.next"));
                }
                if (_Navigator.GetCurrentPage().PrevPageId != undefined && _Navigator.GetCurrentPage().PrevPageId != "") {
                    enableobj($(".navBtn.prev"));
                } else {
                    disableobj($(".navBtn.prev"));
                }
            }
        } catch (expn) {
            //menuNodeIndex++;
            alert(expn.message);
        }
    },
    GoToNext: function () {
        try {
            if ($(".navBtn.next").css("pointer-events") == "none") {
                return;
            }
            else {
                _Navigator.Next();
                if (_Navigator.GetCurrentPage().nextPageId != undefined && _Navigator.GetCurrentPage().nextPageId != "") {
                    enableobj($(".navBtn.next"));
                } else {
                    disableobj($(".navBtn.next"));
                }
                if (_Navigator.GetCurrentPage().prevPageId != undefined && _Navigator.GetCurrentPage().prevPageId != "") {
                    enableobj($(".navBtn.prev"));
                } else {
                    disableobj($(".navBtn.prev"));
                }
            }

        } catch (expn) {
            //menuNodeIndex--;
            alert(expn.message);
        }
    }
};



function disableobj(obj) {
    obj.css({
        "opacity": ".5",
        "pointer-events": "none"
    });
    obj.attr("aria-disabled", "true");
}
function enableobj(obj) {
    obj.css({
        "opacity": "1",
        "pointer-events": ""
    });
    obj.attr("aria-disabled", "false");
}

$.knowdlCountDown = function (options) {
    var timer,
        instance = this,
        seconds = options.seconds || 30,
        updateStatus = options.onUpdateStatus || function () { },
        counterEnd = options.onCounterEnd || function () { };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function () {
        clearInterval(timer);
        onCounterEnd();
    };
    function onCounterEnd() {
        if ($("#counterdiv").text() == "00:00") {

            var _hotspot = $(".divHotSpot");
            var pageData = _ModuleCommon.GetPageDetailData();
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        pageData.ImageHotSpots.Hotspots[i].isIncorrect = true;
                    }
                }
            }
            _Navigator.SetPageStatus(false);
            _ModuleCommon.HotspotFeedback(_hotspot);
        }
    }

    return instance;

}

$(document).ready(function () {

    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});