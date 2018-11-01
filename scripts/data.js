﻿var myCounter;
ColorCodes = {
    black: "#00000",
    white: "#FFFFFF",
    red: "#B22222",
    green: "#01662C",
    blue: "#4E7092",
}

var _Settings = {
    dataRoot: "pagedata/",
    assetsRoot: "assets/",
    enableCache: true,
    topMargin: 144,
    minHeight: 437
}


var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isIpad = userAgentCustom.match(/iPad/i)
var isIphone = (navigator.userAgent.match(/iPhone/i))
var isIEEdge = /Edge/.test(navigator.userAgent)
var Firefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)
var deleteIdList = ["row2", "row3", "row4", "row7", "row9", "row11", "row12"];
var readIdList = ["row1", "row5", "row6", "row8", "row10"];
var checkMail1, checkMail2, checkMail3, checkMail4, checkMail5, checkMail6, checkMail7, obj, k_box, gpName, gpScore, g_ReadRowId, g_delRowId;
var allRead = false;
var allRead1 = false;
var tempRowID = "";

var animeTime = 1000;
if(isIphone != null){
    animeTime = 2500;
}

var _PData = {
    "p3": {
        ImageHotSpots: {
            "Hotspots": [
                {

                    HotspotId: 1,
                    width: "5.778894472361809%",
                    height: "10.720268006700168%",
                    top: "29.64824120603015%",
                    left: "0.8165829145728644%",
                    widthPX: "46px",
                    heightPX: "68px",
                    topPX: "177px",
                    leftPX: "6.5px",
                    eventName: "dblclick",
                    action: "feedback",
                    feedbackurl:"feedbackp3.htm",
                    incorrectfeedbackurl:"icfeedbackp3.htm",
                    accessText: "To do list",
                    "GroupName": "grp3s",
                    
                }
            ]
        }
    },
    "p4": {
        ImageHotSpots: {
            "Hotspots": [
                {
                  HotspotId: 1,
                  width: "3.015075376884422%",
                  height: "4.690117252931323%",
                  top: "94%",
                  left: "85.11306532663316%",
                  widthPX: "24px",
                  heightPX: "28px",
                  topPX: "568px",
                  leftPX: "677.5px",
                  action: "feedback",
                  feedbackurl:"feedbackp4.htm",
                  accessText: "check available network connection",
                  "GroupName": "grp4",
                  "ActionName": "click"
                }
              ]
        }        
    },
    "p5": {
        ImageHotSpots: {
            "Hotspots": [
                {
                  HotspotId: 1,
                  width: "22.236180904522612%",
                  height: "5.8626465661641545%",
                  top: "28.14070351758794%",
                  left: "65.95087939698493%",
                  widthPX: "177px",
                  heightPX: "39px",
                  topPX: "168px",
                  leftPX: "524.96875px",
                  action: "feedback",
                  feedbackurl:"feedbackp5.htm",
                  accessText: "Network TCR",
                  "GroupName": "grp5",
                  "ActionName": "click"
                },
                {
                  HotspotId: 2,
                  width: "22.36180904522613%",
                  height: "7.035175879396985%",
                  top: "36.18090452261307%",
                  left: "66.07839195979899%",
                  widthPX: "178px",
                  heightPX: "46px",
                  topPX: "216px",
                  leftPX: "525.96875px" ,
                  action:"feedback",
                  feedbackurl:"feedbackip9.htm",
                  accessText: "Network linksys_SES_17641",   
                  isCorrect:false,             
                },
                {
                  HotspotId: 3,
                  width: "21.984924623115578%",
                  height: "7.537688442211055%",
                  top: "44.89112227805695%",
                  left: "66.20603015075378%",
                  widthPX: "175px",
                  heightPX: "49px",
                  topPX: "268px",
                  leftPX: "527px"  ,
                  action:"feedback",
                  feedbackurl:"feedbackip9.htm",
                  accessText: "Network Joe",  
                  isCorrect:false,              
                }
              ]
        }
    },
    "p6": {
        ImageHotSpots: {
            "Hotspots": [
                {
                  HotspotId: 1,
                  width: "2.386934673366834%",
                  height: "3.015075376884422%",
                  top: "26.298157453936348%",
                  left: "69.28391959798995%",
                  widthPX: "19px",
                  heightPX: "22px",
                  topPX: "157px",
                  leftPX: "551.5px",
                  action: "next",
                  accessText: "Connect automatically",
                  "GroupName": "grp6",
                  "ActionName": "click"
                }
              ]
        }
    },
    "p7": {
        ImageHotSpots: {
            "Hotspots": [
                {
                  HotspotId: 1,
                  width: "14.195979899497488%",
                  height: "5.192629815745393%",
                  top: "30.318257956448914%",
                  left: "84.23366834170855%",
                  widthPX: "113px",
                  heightPX: "35px",
                  topPX: "181px",
                  leftPX: "670.5px",
                  action: "feedback",
                  feedbackurl:"feedbackp6.htm",
                  accessText: "Connect",
                  "GroupName": "grp7",
                  "ActionName": "click"
                }
              ]
        }
    },
    "p8": {
        ImageHotSpots: {
            "Hotspots": [
                {
                  HotspotId: 1,
                  width: "14.321608040201006%",
                  height: "4.522613065326634%",
                  top: "38.358458961474035%",
                  left: "69.15829145728644%",
                  widthPX: "114px",
                  heightPX: "31px",
                  topPX: "229px",
                  leftPX: "550.5px",
                  action: "inputcheck",
                  accessText: "next",
                  "GroupName": "grpName",
                  "ActionName": "grpName"
                }
              ]
        },
        EmbedSettings: {
            validatearray: ["CoffeeRules!"],
            action: "feedback",
            feedbackurl: "feedbackp8.htm",
            score: ""
            
        }
    },
    "p9": {
        // ImageHotSpots: {
        //     "Hotspots": [
        //         {
        //             HotspotId: 1,
        //             width: "27.010050251256278%",
        //             height: "2.0460358056265986%",
        //             top: "89.83546462063086%",
        //             left: "34.983542713567836%",
        //             widthPX: "215px",
        //             heightPX: "28px",
        //             topPX: "1053.765625px",
        //             leftPX: "278.46875px",
        //             action: "checkboxcheck",
        //             feedbackurl: "feedbackp9.htm",
        //             incorrectfeedbackurl:"icfeedbackp3.htm",
        //             "GroupName": "grp4",
        //             "ActionName": "click"
        //         }
        //     ]
        // },
        EmbedSettings: {
            validatearray: ["c1","c3","c5"],
            action: "feedback",
            feedbackurl: "feedbackp9.htm",
            incorrectfeedbackurl:"icfeedbackp3.htm",
            score: ""
            
        }
    }
}

