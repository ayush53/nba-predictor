function ebAd_19729964() { this.fVideoStrip = ("10" == "20"); this.fSExpBanner = false;  this.fPushdown = ("0" == "1");   this.nFreqTimes = 6; this.nFreqPeriod = 4;     this.nUponShow = 1; this.fShowSinglePanel = 1; this.strDefaultImage = ebResourcePath + "Site-48144/Type-0/b7e36347-8f1d-4444-87e4-6be2127c8ff1.jpg"; this.strDefaultFlash = ebResourcePath + "Site-2/Type-2/85bbe21e-15f7-4c68-8cd6-886a7113c9a7.swf"; this.nDefaultFlashWeight = 41222; this.nDefaultFlashWidth = 728; this.nDefaultFlashHeight = 90; this.nFSMute = 3; this.fEnableFS = 1; this.flFlashVer = "9"; this.strXML = ""; this.isSVSVP = false; this.AcIconPosition=0; this.AcIncludeMarker = 0; this.fPreLoadPanels = 0;  this.fHideDropDowns = ("0" == "1"); this.fHideIframes = ("0" == "1"); this.fHideFlash = ("0" == "1"); this.fHhideApplet = ("0" == "1"); if ("1" == "0")  this.nHideIframeIn = 0xffffffff; else  this.nHideIframeIn = 0x1 | 0x40 | 0x8 | 0x10 | 0x20; this.fAutoSetDHTML = 0;  this.fManipulateRelativeElements = ("0" != "0");  this.fPanelsClickable = ("1" == "1"); this.fShouldLoadPosition = ("0" == "1"); this.fABSPosMSNHPTemp = ("0" == "1");  this.nDelayedExpInterval = 500;  this.nDelayedExpMaxV = 0.6;  this.additionalAssetsArray = new Object(); var gEBvideoTypes ={ "WMV" : 0, "FLV8" : 1, "FLV7" : 2, "SWF" : 3, "MP4" : 4, "F4V" : 5, "WebM" : 6, "OGG" :7 }; var asset=this.additionalAssetsArray["ebMovie1"]=new Array();var index=0;var currentType=1;if(!asset[currentType]){asset[currentType]=new Array();}else index=asset[currentType].length;var info=asset[currentType][index]=new Object();info.strURL="Site-48144/Type-12/0bca2342-ea63-4f86-9b9c-f363b8a30ce2.flv";info.nWidth=600;info.nHeight=338;info.fEnableFS=1;info.nBitRate=-1;info.nAssetID=70392665; function NVAssetObj(url) { this.url=url; } var NVArr=new Array(); this.nonVideoAssets = NVArr; var DCArr=new Array(); this.DynamicContentResources = DCArr; initPanels(this); function initPanels(objRef) {   var arrWmodeVals = new Array("transparent","opaque","window");  var arr = new Array(); arr[0] = new Array();arr[0][0] = "Panel1";arr[0][1] = "Site-2/Type-2/43b82c0e-1331-4995-822f-24d703d38580.swf";arr[0][2] = "728";arr[0][3] = "270";arr[0][4] = "1";arr[0][5] = "0";arr[0][6] = "0";arr[0][7] = "1";arr[0][8] = "0";arr[0][9] = "69651059";arr[0][10] = "2632686";arr[0][11] = "1";arr[0][12] = "67920";arr[0][13] = "0";arr[0][14] = "3";arr[0][15] = "1";arr[0][16] = "0";arr[0][17] = "";arr[0][18] = "50";arr[0][19] = "100";arr[0][20] = "0";arr[0][21] = "0";arr[0][22] = "0";arr[0][23] = "0";                   objRef.panels = new Object();  if ((typeof(ebCPanel) == "undefined")&&(typeof(ebCSinglePanel) == "undefined") ) return; for (var i=0; i< arr.length; i++) { var strName = arr[i][0]; var lowerName = strName.toLowerCase();  var panel = new ebCPanel(strName); panel.src = ebResourcePath + arr[i][1]; panel.nWidth = arr[i][2]; panel.nHeight = arr[i][3];     if("0" == "1") { panel.nPosType = 0;  panel.nXPos = 100; panel.nYPos = 0; } else { panel.nPosType = arr[i][4];  panel.nXPos = parseFloat(arr[i][5]);panel.nYPos = parseFloat(arr[i][6]);  if (panel.nPosType != 1) objRef.fShouldLoadPosition = true; }   panel.nCorner = arr[i][7]; panel.fScroll = false;  panel.strAdditionalRes = objRef.strAdditionalRes;  var fTransparent; if(typeof(arr[i][11]) == "undefined")  fTransparent = true;  else  fTransparent = (arr[i][11] == "1"); if(fTransparent) panel.strWmode = "transparent"; else panel.strWmode = "window"; panel.fAutoExpand = (arr[i][13] == 1); panel.fRetractOffAd = (arr[i][14] == 1); panel.fRetractOffThisPanel = ((arr[i][14] == 2)); panel.nWeight = arr[i][12];  panel.streaming = null; if(arr[i][15] == "1") { panel.streaming = new Object(); panel.streaming.fAutoBuffer = (arr[i][16] == "1"); panel.streaming.nMovieDuration = arr[i][17]; panel.streaming.nHighBWBuffer = arr[i][18]; panel.streaming.nLowBWBuffer = arr[i][19]; } panel.fPushDown = (arr[i][20] == "1"); panel.fVideoStrip = (arr[i][22] == "1");  panel.fDelayedExpansion = (arr[i][23] == "1"); panel.nDuration = -1;      if((lowerName == "videoloader") && ("0" == "1")) { panel.nPosType = 1;  panel.nXPos = 0; panel.nYPos = 0; panel.nCorner = "1";  panel.nDuration = -1;  } objRef.panels[lowerName] = panel; } } this.playRS = new ebCRemoteServers(); this.interactions = new Object(); this.clickTrackingURLs = []; setDefaultInteraction(this); setInteractions(this); function setDefaultInteraction(objRef) { objRef.interactions["_eyeblaster"] = new ebCInteraction("_eyeblaster"); var inter = objRef.interactions["_eyeblaster"]; inter.fCloseFlag = 1; inter.strJumpUrl = "www.facebook.com/Snickers"; if (inter.strJumpUrl != "") objRef.fLink = true; else objRef.fLink = false; inter.strTarget = "_blank"; inter.RS.strNUrl = ""; inter.RS.strAUrl = ""; inter.fCountAsClick = 1; inter.jumpWin.strPosX = ""; inter.jumpWin.strPosY = ""; inter.jumpWin.strWidth = ""; inter.jumpWin.strHeight = ""; inter.jumpWin.strAddressBar = "1"; inter.jumpWin.strMenuBar = "1"; } function setInteractions(objRef) { buildIntList(objRef,"godzilla",1,"http://www.godzillamovie.com/","","","","","1","1","","","1",1,0,1);buildIntList(objRef,"see_more",1,"www.facebook.com/Snickers","","","","","1","1","","","1",1,0,1); } function buildIntList(objRef,name,fClose,jumpURL,XPos,YPos,width,height,fAddress,fMenu,NUrl,AUrl,target,fClick,type,nInitiated) {   objRef.interactions[name] = new ebCInteraction(name,type); var tempInter = objRef.interactions[name]; tempInter.fCloseFlag = fClose; tempInter.strJumpUrl = jumpURL; tempInter.jumpWin.strPosX = XPos; tempInter.jumpWin.strPosY = YPos; tempInter.jumpWin.strWidth = width; tempInter.jumpWin.strHeight = height; tempInter.jumpWin.strAddressBar = fAddress; tempInter.jumpWin.strMenuBar = fMenu; tempInter.RS.strNUrl = NUrl; tempInter.RS.strAUrl = AUrl; var target = parseInt(target); switch (target) { case 0 : tempInter.strTarget = "_self";  break; case 1 : tempInter.strTarget = "_blank";  break; case 2 : tempInter.strTarget = "_top";  break; default : tempInter.strTarget = "_blank"; } tempInter.fCountAsClick = fClick; tempInter.nInitiated = nInitiated;  } } if(typeof(gnEbAd_19729964WasLoaded) == "undefined") gnEbAd_19729964WasLoaded = 1; else gnEbAd_19729964WasLoaded++; if (typeof(ebScriptLoaded) != "undefined") ebScriptLoaded("ebAd_19729964"); if (typeof(ebDoOnBannerScriptLoad) != "undefined") ebDoOnBannerScriptLoad(); 