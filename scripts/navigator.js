//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [14];
    var totalsimscore = 18;
    var presentermode = false;
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,

        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p3",
            dataurl: "p2.htm",
            hasActivity: false,
            accessText: "Coffee Rack Cafe",
        },
        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4",
            dataurl: "p3.htm",
            hinturl: "hintp3.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop",
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p3",
            nextPageId: "p5",
            dataurl: "p4.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            accessText: "windows desktop todo list open. Things to do today Answer email to friends, pay credit card - online, check email for confirmation of purchase made earlier today, answer email about current budget issues with corporate accountant(remember to attach the list of current purchases including invoice numbers), search for a hotel for the conference in denver next month check checking account balance - online, transfer money from savings to checking (if needed) - online",
        },
        "p5": {
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p6",
            dataurl: "p5.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Wireless network setting window open",
        },
        "p6": {
            pageId: "p6",
            prevPageId: "p5",
            nextPageId: "p7",
            dataurl: "p6.htm",
            hinturl: "hintp6.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Wireless network setting window open",
        },
        "p7": {
            pageId: "p7",
            prevPageId: "p6",
            nextPageId: "p8",
            dataurl: "p7.htm",
            hinturl: "hintp7.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Wireless network setting window open",
        },
        "p8": {
            pageId: "p8",
            prevPageId: "p7",
            nextPageId: "p9",
            dataurl: "p8.htm",
            hinturl: "hintp8.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Wireless network setting window open",
        },
        "p9": {
            pageId: "p9",
            prevPageId: "p8",
            nextPageId: "p10",
            dataurl: "p9.htm",
            hinturl: "hintp9.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Things to Do Today note open",
        },
        "p10":{
            pageId: "p10",
            prevPageId: "p9",
            nextPageId: "",
            dataurl: "p10.htm",
            hasActivity: true,
            isLastPage:true,
            isAssessment:true,
            hideHint:true,
        }
    }
    var _StateData = {}

    function OnPageLoad() {

        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        _ModuleCommon.OnPageLoad();
        if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
            $('#footer-navigation').css('display', 'table');
        }
        if (_currentPageObject.accessText != undefined) {
            $(".activityimg").attr("alt", _currentPageObject.accessText);
        }
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            this.LoadPage("p1");
        },
        LoadPage: function (pageId, jsonObj) {
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;
            _currentPageObject = _NData[_currentPageId]
            if(_currentPageObject.hasActivity == undefined || _currentPageObject.hasActivity == false)
            {
                this.SetPageStatus(true);
            }
            this.UpdateProgressBar();
           
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();

            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
            }
            if (this.IsAnswered()) {
                $("#linknext").k_enable();

            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
           

            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();
            if (_currentPageObject.pageId == "p3") { // temporary fix
                $("#progressdiv").css("margin-left", "-20px")
            }
            else
            {
                $("#progressdiv").css("margin-left", "-15px")
            }
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();                   
                    setReader("header1");    

                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        
                        OnPageLoad();
                        if(_currentPageId=="p10")//  change to assessment id
                        {
                            showQuestion();
                        }
                        if(_currentPageId=="p9")
                        {
                            $(".submitdata").k_disable();
                        }
                        
                        if(_currentPageId == "p2")
                        {
                            $("#titleheader").focus();
                        }
                        else
                        {
                            $("#progressdiv").focus();
                        }
                        $("#hintdiv").show();
                        if(_currentPageObject.hideHint !=undefined && _currentPageObject.hideHint)
                        {
                            $("#hintdiv").hide();
                        }
                            if(presentermode)
                            {
                                _ModuleCommon.PresenterMode();
                            }
                        if( _currentPageObject.hinturl !=undefined)
                        {
                            $(".hintlink").k_enable();
                            $(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });
                        }
                        else
                        {
                            $(".hintlink").k_disable();
                        }
                        _NData[_currentPageObject.pageId].isLoaded = true;
                        //$("h2.pageheading").focus();
                    });
                })
            }
        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            if ( _currentPageObject.pageId == "p10" && typeof(currentQuestionIndex) !='undefined'  &&  currentQuestionIndex > 0   ) {
				$("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex  = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
				showQuestion();				
            }
            else{
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            $("#linkprevious").k_enable();
            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                var custFunction = new Function(_currentPageObject.customNext.jsFunction);
                custFunction();
            }
            if ( _currentPageObject.pageId == "p10")
            {
               
             if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) < gRecordData.Questions.length ) {
                    currentQuestionIndex  = currentQuestionIndex + 1
                    $("#Questioninfo").show();
                    showQuestion()
                    
                    //this.UpdateProgressBar();
                    if(gRecordData.Status !="Completed")
                        {
                            $("#linknext").k_disable();    
                            $("#linkprevious").k_disable();
                        }
    
                }

              else  if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) == gRecordData.Questions.length ) {
                    //this.UpdateProgressBar();
                    // Show review instruction
                    
                        $(".intro-content-question").hide();
                        $(".questionwrapper").hide();
                        currentQuestionIndex  = currentQuestionIndex + 1;
                        $("#Summary").show();
                        $("#Questioninfo").hide();
				        $("#Summary").load("pagedata/Summary.htm",function(){
                            showSummary()                           
                            $("#linkprevious").k_enable();
                            
                        })
                        $("#climate-deal").css("margin-left","23%");
                        $("#linknext").k_disable();
                        

                }                
          
			}
            else {

                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                    visitpage++;
                }
            }
            visitpage += this.GetAnswerCount() ;
            return visitpage;
        },
        GetAnswerCount:function(){
          var cnt =  (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length  ) 
            cnt+= gRecordData.Status == "Completed" ? 1:0;
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressDiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");


        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;

            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var score = (ObtainPoint / totalsimscore) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }
            
        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;

            return false;

        },
        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;

            return false;

        },
        SetPresenterMode:function(val){
            presentermode = val;
        },
        IsPresenterMode:function(){
            return presentermode;
        }
    };
})();


function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}


function removeCSS(cssFileToRemove) {
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToRemove) != -1 ) {
			document.styleSheets[w].disabled = true;
		}
	}
}
function addCSS(cssFileToAdd) {
	var isCSSAlreadyAdded = false;
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToAdd) != -1 ) {
			isCSSAlreadyAdded = false;
		}
	}
	console.log(isCSSAlreadyAdded + " --")
	if(! isCSSAlreadyAdded){
		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFileToAdd);
		document.getElementsByTagName("head").item(0).appendChild(newlink);
	}
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
