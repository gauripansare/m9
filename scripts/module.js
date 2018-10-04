jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        return this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
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
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
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
                fdkurl = _Settings.dataRoot + "feedbackdata/" + fdkurl;
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    $('html,body').animate({ scrollTop: 0 }, 0, function () { });
                });
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
                        if(ht < 597)
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
            this.ShowFeedbackReviewMode();
            $(".divHotSpot").addClass("disabled")
           


        },
        InstructorReviewModeForCheckbox: function () {
            debugger;
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            var checklist = $("#EmbededChecklist");
            //var reviewData = ITSimModule.GetReviewDataForPage();
            $("input").k_disable();

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
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        var tEntry = reviewData.textEntry[i].trim();
                        if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $(".textentryreview1").html("<span class='OpenSansFont greenspan' style='font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[i] + "</span>")
                            }
                            else {
                                $(".textentryreview2").html("<span class='OpenSansFont greenspan'  style='font-weight:bold;font-size: 13px;padding-left:5px; '>" + reviewData.textEntry[i] + "</span>");
                                $(".textentryreview2").show();
                            }
                        }
                        else {
                            $(".textentryreview1").html("<span class='OpenSansFont redspan'  style='font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[i] + "</span>")
                        }
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
        AddHotspotClick: function (hotspotObj, event,isCorrect) {
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
            if(rposX <0 || rposY <0){//gp if module is attmpted using accessibility
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

            this.LoadHotSpot();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            if (_Navigator.IsAnswered()) {
                this.DisplayInstructorReviewMode();
            }
        },
        LoadCountDown: function () {
            $("#counterdiv").attr("aria-hidden", "true");
            if(myCounter !=undefined)
            {
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
                        if(eventname!=undefined )
                        {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpotdbl divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                        else
                        {
                        htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                    }
                    $(".wrapperimage").append(htmlForDivHotspotImage)
                }

            }
        },
        PresenterMode:function(){
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
           

            if(currentPageData.pageId == "p3" && pageData.EmbedSettings!=undefined)
            {
                $("input[type='text']").addClass("greenspan");
                $("input[type='text']").val(pageData.EmbedSettings.validatearray[0]);
                $("input[type='text']").k_disable();

            }
            $(".divHotSpot").addClass("hotspotclicked");
            $(".divHotSpot").addClass("disabled");
           
            
            $("#linknext").k_enable();
        },
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
                        if(pageData.ImageHotSpots.Hotspots[i].isCorrect !=undefined)
                        {
                            isCorrect = parseInt(pageData.ImageHotSpots.Hotspots[i].isCorrect);
                        }
                    }
                }
            }
            
            this.AddHotspotClick(_hotspot, event,isCorrect);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    _Navigator.SetPageStatus(true);
                    this.HotspotNext();
                    break;
                case "feedback":
                    if(isCorrect)
                    {
                        _Navigator.SetPageStatus(true);
                    }
                    this.HotspotFeedback(_hotspot,isCorrect);
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

            var pageData = this.GetPageDetailData();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            });
            $("input").k_disable();
            this.EnableNext();
        },
        HotspotFeedback: function (_hotspot,isCorrect) {
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
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            });
            if(isCorrect)
            {
                this.EnableNext();
            }
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
            $('html,body').animate({ scrollTop: document.body.scrollHeigh }, 500, function () { });
        },
        checkboxcheckAns: function () {
            debugger;
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
                
            }
            else {
                if (currentPageData.pageId == "p9") {
                    var pageData = this.GetPageDetailData();
                    url = pageData.EmbedSettings.incorrectfeedbackurl;
                    var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");
                    $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                         $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
                    });
                    $(".submitdata").k_disable();
                    $("input[type='checkbox']").k_disable();
                    $("#linknext").k_disable();
                }
            }

        },
        InputEnter: function (inputtext) {
            debugger;
            if (_Navigator.IsAnswered())
                return;
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
                            if(reviewData[i].textEntry!=undefined)
                            {
                            if (reviewData[i].textEntry.length < 2) {
                                reviewData[i].textEntry.push(str);
                            } else {
                                reviewData[i].textEntry.splice(0, 1);
                                reviewData[i].textEntry.push(str);
                            }
                            }
                            else
                            {
                                reviewData[i].textEntry =[str];
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
        },
         ShowCorrectIncorrectCheckItems: function(checklistid) {
           
            $("input[type='checkbox']:checked").each(function () {
                var iscorrect = $(this).attr("iscorrect");
                if (iscorrect == undefined) iscorrect = "Incorrect";
                if (iscorrect == "Correct") {
                    $(this).before("<div class='cchkitem'></div>")
                }
                else {
                    $(this).before("<div class='icchkitem'></div>")
                }
            })
        
            this.SetCorrectIncorrectItemStyle(checklistid)
            $(".cchkitem").next().hide();
            $(".icchkitem").next().hide();
        },
        SetCorrectIncorrectItemStyle: function(checklistid) {
            var selector = ".k-element-checklist";
            if (checklistid != undefined && checklistid != "")
                selector = checklistid = "#" + checklistid.replace("#", "");
        
                $("input[type='checkbox']").each(function () {
                var iscorrect = $(this).attr("iscorrect");
                if (iscorrect == undefined) iscorrect = "Incorrect";
                if (iscorrect == "Correct") {
                    $("label[for='"+$(this).attr("id")+"']").css({ "font-weight": "bold" });
                   
                }
                else {
                    $("label[for='"+$(this).attr("id")+"']").css({ "font-weight": "normal", "color": "#999999" });
                  
                }
            });
        }
    }
})();
function AppendFooter() {
    debugger;
    if ($(".levelfooterdiv").length == 0) {
        var str = '<div class="levelfooterdiv"><div class="navBtn prev" onClick="GoToPrev()" role="button" tabindex = 195 aria-label="Previous"><a href="#"></a></div><div style="display: inline-block;width: 2px;"></div><div class="boxleveldropdown" style="width: 150px;"  role="button" tabindex = 196 aria-label="Scorecard"><span class="leftarrow"></span><ul class="levelmenu"><li class="uparrow" style = "width: 100px; margin-left: -8px;"><span class="menutitle" >Scorecard</span><div class="levelsubMenu" tabindex = 197 role="text">Total Score - <br>Activity Score - </div><a class="menuArrow"></a></div><div style="display: inline-block;width: 2px;"></div><div class="navBtn next" onClick="GoToNext()" role="button" tabindex = 198 aria-label="Next"><a href="#"></a></div></div>';
        $("#wrapper").append($(str));
        $(".navBtn.prev").css({
            "opacity": ".5",
            "pointer-events": "none"
        });
        $(".navBtn.prev").attr("aria-disabled","true")
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
        debugger;
        try {
            if ($(".navBtn.prev").css("pointer-events") == "none") {
                return;
            }
            else
            {
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
            debugger;
            if ($(".navBtn.next").css("pointer-events") == "none") {
                return;
            } 
            else{
                _Navigator.Next();
                    if (_Navigator.GetCurrentPage().nextPageId != undefined && _Navigator.GetCurrentPage().nextPageId != "") {
                        enableobj($(".navBtn.next"));
                    } else {
                        disableobj($(".navBtn.next"));
                    }
                    if (_Navigator.GetCurrentPage().prevPageId != undefined &&_Navigator.GetCurrentPage().prevPageId != "") {
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
    _Navigator.Start();
    
    //if (_Settings.enableCache) {
    //    _Caching.InitAssetsCaching();
    //    _Caching.InitPageCaching();
    //}
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});