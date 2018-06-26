

var bsjflash = function () {
    console.log("j3.3")
    var t = 28800; //8h
    var jsoncbStr = "?jsoncallback=?";
    var flashId;
    var flashobj;
    var selectedVId;
    var jsCallback;
    var isLive;

    $(function () {
        $(window).resize(function () {
            setLayout(-1, isLive);
        });
    });

    function UnixToDate(unixDate) {
        if (!unixDate) return new Date();
        return new Date(unixDate * 1000)
    }

    function getDateUnix(inDate) {
        if (inDate == undefined)
            inDate = new Date();
        return Math.round(inDate.getTime() / 1000);
    }

    function toFileList(result) {
        var resultArr = result.split(":");
        if (resultArr.length == 2) {
            var fileListStr = resultArr[0];
            var fileResStr = resultArr[1];
            if (fileListStr.startsWith("{") && fileListStr.endsWith("}")) {
                var fileListArr = fileListStr.slice(1, fileListStr.length - 1).split(",");
            }
            if (fileResStr.startsWith("{") && fileResStr.endsWith("}")) {
                var fileResArr = fileResStr.slice(1, fileResStr.length - 1).split(";");
            }

            var searchFileListObj = { pageCount: fileListArr[0], pageSize: fileListArr[1], total: fileListArr[2], page: fileListArr[3], count: fileListArr[4], res: fileListArr[5] };
            searchFileListObj.files = [];
            if (searchFileListObj.count <= 0) {
                fileResArr = [];
            }
            for (var index = 0; index < fileResArr.length; index++) {
                var tempArr = fileResArr[index].split(",");
                var fileResObj = { filename: tempArr[0], lIP: tempArr[1], channel: tempArr[2], type: tempArr[3], rev: tempArr[4], stime: tempArr[5], etime: tempArr[6], size: tempArr[7] };
                searchFileListObj.files[index] = fileResObj;
            }
            return searchFileListObj;
        }
        return null;
    }

    function getJSON(src, param, donecb, failcb) {
        param.u = getDateUnix() + param.devChn + param.cmdType + parseInt((Math.random() * 10));
        var data = {
            url: src,
            data: param,
            dataType: 'jsonp',
            cache: false,
            jsonp: "jsoncallback",
            timeout: 0,
            headers: {
                Connection: "close"
            },
            //beforeSend: function (xhr) {
            //    xhr.setRequestHeader("connection", "close");
            //},
        };

        //$.ajaxSetup({
        //    chche: false
        //});
        data.jsonpCallback = "jQuery" + param.sessionID;
        //if (param.cmdType === 1 || param.cmdType === 2) {
        //    data.jsonpCallback += param.devChn;
        //}
        if (param.cmdType === 3 || param.cmdType === 9) {
            data.timeout = 3 * 1000;
            //data.jsonpCallback += param.cmdType + param.devChn;
        }

        $.ajax(data).done(function (res, textStatus, xhr) {
            if (donecb) {
                donecb(res);
            }
        });

        //    .fail(function (xhr, textStatus, errorThrown) {
        //    console.log(xhr);
        //    if (xhr.status != 200 && failcb) {
        //        failcb(xhr, textStatus, errorThrown);
        //    }
        //});

    }

    // begin flash
    function embedFlash(elemId, flashId, flashPath) {
        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = flashPath + "playerProductInstall.swf";
        var flashvars = {};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#f6f6f6";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        var attributes = {};
        attributes.id = flashId;
        attributes.name = flashId;
        attributes.align = "middle";
        swfobject.embedSWF(
            flashPath + "BSJVideoMonitor.swf", elemId,
            "100%", "100%",
            swfVersionStr, xiSwfUrlStr,
            flashvars, params, attributes);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        swfobject.createCSS("#" + elemId, "display:block;text-align:left;");
    }

    function initFlash(cbName, videoCount, mode) {
        var starttime = getDateUnix();
        var h = setInterval(function () {
            if (flashobj && flashobj.initFlash) {
                flashobj.initFlash(cbName, videoCount, mode);
                clearInterval(h);
            } else {
                if (getDateUnix() - starttime > 10) {
                    clearInterval(h);
                }
            }

        }, 500);
    }
    function setLayout(videoCount, mode) {
        var starttime = getDateUnix();
        var h = setInterval(function () {
            if (flashobj && flashobj.setLayout) {
                flashobj.setLayout(videoCount, mode > 0 ? mode : 0);
                clearInterval(h);
            } else {
                if (getDateUnix() - starttime > 10) {
                    clearInterval(h);
                }
            }

        }, 500);
    }

    function init(elemId, videoCount, cb, flashPath, mode) {
        //playEndCB = peCB;
        //continuePlayCB = cpCB;
        var cbName = "";
        if (cb) {
            var cbStr = cb.toString();
            var re = /function\s*(\w*)/i;
            cbName = re.exec(cbStr)[1];
        }
        isLive = mode;
        // jsCallback = cb;
        if (document.getElementById(elemId)) {
            flashId = "bsjFlash" + getDateUnix();
            embedFlash(elemId, flashId, flashPath ? flashPath : "");
            var startTime = getDateUnix();
            var h = setInterval(function () {
                flashobj = document.getElementById(flashId);
                if (flashobj) {
                    if (videoCount > 0) {
                        initFlash(cbName, videoCount, mode);
                        // setLayout(videoCount, mode);
                    }
                    clearInterval(h);
                } else {
                    if (getDateUnix() - startTime > 10) {
                        clearInterval(h);
                    }
                }
            }, 500);
        }
    }

    function getNextPlayVId(videoId) {
        if (videoId > 0) {
            selectedVId = videoId;
        }
        //console.log(selectedVId);
        return selectedVId;
    }

    function flashCallback(type, param, videoId, data) {
        switch (type) {
            case "playEnd":
                break;
            case "continuePlay":
                break;
            case "selectedVideoId":
                break;
            case "openFail":
                break;
            case "openOk":
                break;

        }
        if (jsCallback) {
            jsCallback(type, param, videoId, data);
        }
    }
    // end


    function openLive(src, p, vehNo, max) {
        //���󲥷�ʵʱ��ַ
        var param = { simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 1 };
        flashobj.open(src, param, vehNo, max);
    }

    function searchFile(src, p, cb, count) {
        var param = { simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: Math.pow(2, p.devChn - 1), cmdType: 4, beginTime: p.beginTime, endTime: p.endTime, page: p.page };
        param.beginTime = param.beginTime + t;
        param.endTime = param.endTime + t;
        getJSON(src + jsoncbStr, param, function (result) {
            console.log(result);
            if (cb) {
                var fileobj = toFileList(result);
                count = count == undefined ? 3 : count;
                if (count > 0 && !(fileobj && fileobj.files)) {
                    let tth = setTimeout(() => {
                        searchFile(src, p, cb, --count);
                        clearTimeout(tth);
                    }, 3000);
                    return;
                }
                cb(fileobj);
            }
        }, function (xhr, textStatus, errorThrown) {
            alert(textStatus);
        });
    }

    function openPlayback(src, p, vehNo) {
        //���󲥷Żطŵ�ַ
        var param = { simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 5, beginTime: p.beginTime, endTime: p.endTime, page: p.page, curTime: p.curTime, fileName: p.fileName };
        flashobj.open(src, param, vehNo, 1);
    }

    function close(videoId) {
        flashobj.close(videoId);
    }

    return {
        flashCallback: flashCallback,
        getJSON: getJSON,
        UnixToDate: UnixToDate,
        getDateUnix: getDateUnix,
        init: init,
        setLayout: setLayout,
        live: {
            open: openLive,
            close: close
        },
        playback: {
            searchFiles: searchFile,
            open: openPlayback,
            close: close
        }
    }
};

var bsjflashobj = new bsjflash();




//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 1 };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 2 };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 3 };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 4, beginTime: p.beginTime, endTime: p.endTime, page: p.page };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 5, beginTime: p.beginTime, endTime: p.endTime, page: p.page, curTime: p.curTime, fileName: p.fileName };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 6 };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 7, curTime: p.curTime };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 8 };
//{ simID: p.simID, sessionID: p.sessionID, devType: p.devType, devChn: p.devChn, cmdType: 9 };
