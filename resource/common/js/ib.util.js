/**
 * ib 공통 API
 * @namespace   util
 * @memberof    ib
 */
var ib = ib || {};

(function() {
    (function(ib) {
        ib["util"] = (function() {
            var date_separator = "-";

            return {
                init: function() {
                    if (typeof ib.comm === "object" && typeof ib.comm.util === "undefined") {
                        ib.comm.util = this;
                    }

                    return this;
                },

                /**
                 * form에 필수입력을 체크한다.
                 * 필수 입력인 경우 required , 필수 입력 메시지 타이틀은 data-req-title에 정의한다.
                 * @memberOf   ib.util#
                 * @method     isRequired
                 * @public
                 * @param      {object}    form     필수입력에 필요한 form object 
                 * @param      {boolean}   [focus = true] 첫번째 발생 엘리먼트에 focus 처리 여부
                 * @returns    {boolean}    		필수입력에 공백이 아니면 true
                 * @example
                 * ```
                 * 	ib.util.isRequired(document.frm)
                 * ```
                 */
                isRequired: function(form, focus) {
                    var i = 0,
                        len = 0,
                        type,
                        frmchild = null,
                        value = "",
                        idx = 0,
                        max = 0,
                        title;

                    if (typeof focus === "undefined") {
                        // default 설정
                        focus = true;
                    } else {
                        focus = !!focus;
                    }

                    if (typeof form != "object" || form.tagName != "FORM") {
                        return false;
                    }
                    for (i = 0, len = form.elements.length; i < len; i++) {

                        if (form.elements[i].getAttribute("required") !== null) {
                            type = form.elements[i].type;
                            frmchild = null;
                            value = "";
                            switch (type) {
                                case "radio":
                                case "checkbox":
                                    frmchild = form[IBS_getName(form.elements[i])];
                                    for (idx = 0, max = frmchild.length; idx < max; idx++) {
                                        if (frmchild[idx].checked) {
                                            value = "on";
                                            break;
                                        }
                                    }
                                    break;
                                default:
                                    value = form.elements[i].value;
                                    break;
                            }
                            if (value === "") {
                                title = form.elements[i].getAttribute("data-req-title");
                                ib.comm.messageBox("COW1001" , title );

                                if (focus) {
                                    this.setElemFocus(form.elements[i]);
                                }

                                return false;
                            }
                        }
                    }
                    return true;
                },



                /**
                 * 입력값이 null 인지 체크, msg 가 있으면 null 일때 메시지 처리
                 * @memberOf   ib.util#
                 * @method     isNull
                 * @public 
                 * @param 	{object}  	input   대상 jquery object
                 * @param 	{string}  	[msg]   메시지
                 * @returns 	{boolean) 			null 이면 true
                 * @example 
                 * ```
        		 *	ib.util.isNull($("#isnull"));
        		 * 	ib.util.isNull($("#isnull"), "테스트");
                 * ```
                 */
                isNull: function(input, msg) {
                    // id인 경우 jquery seletor 로 변경 처리
                    if (typeof input === "string") {
                        input = $("#" + input);
                    }

                    if (input.val() === null || this.trim(input.val()) === "" || input.val() === "null") {
                        if (msg) {
                            ib.comm.messageBox("COW1002" , msg );
                            this.setElemFocus(input);
                        }

                        input.val("");
                        return true;
                    }
                    return false;
                },

                /**
                 * 자릿수만큼 입력값을 자르고 '...'붙여서 치환
                 * @memberOf   ib.util#
                 * @method     isClipToString
                 * @public
                 * @param 	{object}  input     대상 jquery object
                 * @param 	{number}  cipher    자리수
                 * @returns 	{string} 			자릿수로 짜른 입력값 + ...
                 * @example 
                 * ``` 
                 * 	ib.util.isClipToString(input,3)
                 * ```
                 */
                isClipToString: function(input, cipher) {
                    var retValue = this.getValue(input);
                    if (retValue === "") return "";
                    if (retValue.length <= cipher) return retValue;
                    return retValue.substring(0, cipher) + "...";
                },

                /**
                 * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크 , msg 존재시 alert
                 * @memberOf   ib.util#
                 * @method     isEmpty
                 * @public
                 * @param 	{object}   input  	대상 jquery object
                 * @param 	{string}   [msg]    메시지
                 * @returns 	{boolean} 			'' 이면 true 
                 * @example
                 * ```
                 * 	ib.util.isEmpty($("#empty"));
                 * 	ib.util.isEmpty($("#empty") , "테스트");
                 * ```
                 */
                isEmpty: function(input, msg) {
                    var val = this.getValue(input),
                        res = false;

                    if (this._isEmpty(val)) {
                        if (msg) {
                            ib.comm.messageBox("COW1002" ,msg );
                        }
                        if (typeof(input) == "object") {
                            this.setElemFocus(input);
                        }

                        res = true;
                    }

                    return res;
                },

                /**
                 * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
                 * @memberOf   ib.util#
                 * @method     _isEmpty
                 * @public
                 * @param   {object}   input    대상 jquery object
                 * @param   {string}   [msg]    메시지
                 * @returns     {boolean}           '' 이면 true 
                 * @example
                 * ```
                 *  ib.util.isEmpty($("#empty"));
                 *  ib.util.isEmpty($("#empty") , "테스트");
                 * ```
                 */
                _isEmpty: function(val) {
                    var res = false;

                    if (val == null || (typeof val === "string" && this.trim(val) === "")) {
                        res = true;
                    }

                    return res;
                },

                /**
                 * 입력값에 특정 문자(chars)가 있는지 체크 특정 문자를 허용하지 않으려 할 때 사용
                 * @memberOf   ib.util#
                 * @method     isContainsChars
                 * @public
                 * @param 	{object} input	 	대상 jquery object
                 * @param 	{string} chars	 	허용하지 않는 문자
                 * @returns 	{boolean}  			허용하지 않는 문자가 존재하는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isContainsChars($("#contains") , "!,*&^%$#@~;");
    			 * ```
                 */
                isContainsChars: function(input, chars) {
                    var retValue = this.getValue(input),
                        i = 0,
                        len = 0;

                    for (i = 0, len = retValue.length; i < len; i++) {
                        if (chars.indexOf(retValue.charAt(i)) != -1) {
                            return true;
                        }
                    }
                    return false;
                },

                /**
                 * 입력값이 특정 문자(chars)만으로 되어있는지 체크 특정 문자만 허용하려 할 때 사용
                 * @memberOf   ib.util#
                 * @method     isContainsCharsOnly
                 * @public
                 * @param {object} input	 대상 jquery object
                 * @param {string} chars	 허용할 문자
                 * @returns {boolean} 허용하는 문자만 존재하는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isContainsCharsOnly($("#charOnly") , "ABCDEF01234");
    			 * ```
                 */
                isContainsCharsOnly: function(input, chars) {
                    var retValue = this.getValue(input),
                        i = 0,
                        len = 0;
                    for (i = 0, len = retValue.length; i < len; i++) {
                        if (chars.indexOf(retValue.charAt(i)) == -1) {
                            return false;
                        }
                    }
                    return true;
                },

                /**
                 * 입력값이 알파벳 + 공백 인지 체크한다
                 * @memberOf   ib.util#
                 * @method     isAlphabet
                 * @public
                 * @param {object}  	input	대상 jquery object
                 * @param {string}   	[msg]   메시지
                 * @returns {boolean} 			알파벳+공백만 존재하는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isAlphabet($("#alphabet"));
        		 *  ib.util.isAlphabet($("#alphabet") , "TEST");
    			 * ```
                 */
                isAlphabet: function(input, msg) {
                    var retValue = this.getValue(input),
                        res = false;

                    if (/^[a-zA-Z ]+$/.test(retValue)) {
                        res = true;
                    } else {
                        if (msg) {
                            ib.comm.messageBox("COW1003" , msg );
                            /*if (input.jquery == undefined) {
                                input.value = "";
                            } else {
                                input.val("");
                            }*/
                            this.setElemFocus(input);
                        }
                        res = false;
                    }

                    return res;
                },
                /**
                 * 입력값이 알파벳 대문자 +  공백 인지 체크
                 * @memberOf   ib.util#
                 * @method     isUpperCase
                 * @public
                 * @param 	{object}   input	대상 jquery object
                 * @returns 	{boolean} 			알파벳 대문자+ 공백만 존재하는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isUpperCase($("#alphabet"));
    			 * ```
                 */
                isUpperCase: function(input) {
                    var retValue = this.getValue(input);
                    return /^[A-Z ]+$/.test(retValue);
                },

                /**
                 * 입력값이 알파벳 소문자 + 공백 인지 체크
                 * @memberOf   ib.util#
                 * @method     isLowerCase
                 * @public
                 * @param 	{object}   input	대상 jquery object
                 * @returns 	{boolean}  			알파벳 소문자+ 공백만 존재하는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isLowerCase($("#alphabet"));
    			 * ```
                 */
                isLowerCase: function(input) {
                    var retValue = this.getValue(input);
                    return /^[a-z ]+$/.test(retValue);
                },

                /**
                 * 입력값이 숫자 인지 체크
                 * @memberOf   ib.util#
                 * @method     isNumber
                 * @public
                 * @param 	{object}   input	대상 jquery object
                 * @returns 	{boolean} 			숫자인 경우 true
                 * @example
                 * ```
        		 *	ib.util.isNumber($("#number"));
    			 * ```
                 */
                isNumber: function(input) {
                    var retValue = this.getValue(input);
                    return /^[0-9]+$/.test(retValue);
                },

                /**
                 * 입력값이 알파벳,숫자로 되어있는지 체크
                 * @memberOf   ib.util#
                 * @method     isAlphaNum
                 * @public
                 * @param {object}  input  	대상 jquery object
                 * @param {string}  [msg]  	메시지
                 * @returns {boolean}		알파벳,숫자 인경우 true
                 * @example
                 * ```
        		 *	ib.util.isAlphaNum($("#alphaNum"));
        		 *  ib.util.isAlphaNum($("#alphaNum") , "테스트");
    			 * ```
                 */
                isAlphaNum: function(input, msg) {
                    var retValue = this.getValue(input);
                    if (/^[0-9a-zA-Z ]+$/.test(retValue)) {
                        return true;
                    } else {
                        if (msg) {
                            ib.comm.messageBox("COW1008" , msg );
                            /*if (input.jquery == undefined) {
                                input.value = "";
                            } else {
                                input.val("");
                            }*/
                            this.setElemFocus(input);
                        }
                        return false;
                    }
                },

                /**
                 * 입력값이 사용자가 정의한 포맷 형식인지 체크 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
                 * @memberOf   ib.util#
                 * @method     isValidFormat
                 * @private
                 * @param {object} input 		대상 jquery object
                 * @param {string} reqular 		정규식 포멧
                 * @returns {boolean}
                 */
                isValidFormat: function(input, format) {
                    if (input.val().search(format) != -1) {
                        return true; // 올바른 포맷 형식
                    }
                    return false;
                },

                /**
                 * 입력값이 이메일 형식인지 체크 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
                 * @memberOf   ib.util#
                 * @method     isEmail
                 * @public
                 * @param {object} input 대상 jquery object
                 * @param {boolean} [alert]  메시지 활성 여부  
                 * @param {string}  [msg]    메시지
                 * @returns {boolean} 메일 형식인 경우 true
                 * @example
                 * ```
        		 *	ib.util.isEmail($("#validEmail"));
        		 *  ib.util.isEmail($("#validEmail") , true);
        		 *  ib.util.isEmail($("#validEmail") , true , "테스트");
    			 * ```
                 */
                isEmail: function(input, alert, msg) {
                    if (alert) {
                        if (this.isEmpty(input, 'e-mail')) {
                            return false;
                        }
                    }
                    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
                    if (this.isValidFormat(input, format)) {
                        return true;
                    } else {
                        if (alert) {
                            if (msg) {
                                ib.comm.messageBox("COW1015" , msg );
                            } else {
                                ib.comm.messageBox("COW0011");
                            }
                        }
                        this.setElemFocus(input);

                        return false;
                    }
                },

                /**
                 * 문자열 길이 check
                 * @memberOf   ib.util#
                 * @method     isMaxByte
                 * @public
                 * @param {object} input 	대상 jquery object
                 * @param {number} maxLen 	최대길이
                 * @param {string} [msg] 	메시지
                 * @returns {boolean} 최대 길이 초과하지 않는 경우 true
                 * @example
                 * ```
        		 *	ib.util.isMaxByte($("#maxLen") , 3);
        		 *  ib.util.isMaxByte($("#maxLen") , 3 , "테스트");
    			 * ```
                 */
                isMaxByte: function(obj, maxLen, msg) {
                    var len = this.getByteLength(obj); // 문자열의 실제길이 구함
                    // 길이 확인
                    if (typeof(maxLen) == "string")
                        maxLen = parseInt(maxLen, 10);
                    if (maxLen < len) {
                        if (msg) {
                            ib.comm.messageBox("COW1013" , msg );
                        }
                        return false;
                    }
                    return true;
                },

                /**
                 * 유효한(존재하는) 일(日)인지 체크
                 * @memberOf   ib.util#
                 * @method     isMaxByte
                 * @private
                 * @param {string} yyyy 년
                 * @param {string} mm 월
                 * @param {string} dd 일
                 * @returns {boolean} 유효일 true
                 */
                isValidDate: function(yyyy, mm, dd) {
                    var m = parseInt(mm, 10) - 1;
                    var d = parseInt(dd, 10);

                    var end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    if ((yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0) {
                        end[1] = 29;
                    }
                    return (d >= 1 && d <= end[m]);
                },

                /**
                 * 문자열이 날짜형식에 맞는지 체크한
                 * @memberOf   ib.util#
                 * @method     isDate
                 * @public
                 * @param {object}      input                   대상 jquery object
                 * @param {boolean}     [alertYn = false]       메시지 출력 여부
                 * @returns {boolean} 유효날이면 true
                 * @example
                 * ```
        		 *	ib.util.isDate($("#dat"));
        		 *  ib.util.isDate($("#dat") , true);
    			 * ```
                 */
                isDate: function(obj, alertYn) {
                    var dat,
                        year,
                        month,
                        day;
                    if (!this.isEmpty(obj)) {
                        dat = this.getValue(obj);
                        // alert(dat);
                        dat = dat.replace(/\/|\-|\./g, ""); // 특수문자 제거

                        if (this.isNumber(dat) === false) {
                            if (alertYn) {
                                ib.comm.messageBox("COW0012");
                            }
                            if (typeof(obj) == "object") {
                                this.setElemFocus(obj);
                            }
                            return false; // 특수문자 제거된 문자열이 숫자만으로 구성되어 있어야함
                        }

                        if (this.getByteLength(dat) != 8) {
                            if (alertYn) {
                            	ib.comm.messageBox("COW0012");
                            }
                            if (typeof(obj) == "object") {
                                this.setElemFocus(obj);
                            }
                            return false;
                        }
                        year = dat.substring(0, 4);
                        month = dat.substring(4, 6);
                        day = dat.substring(6, 8);

                        if (!this.isValidDate(year, month, day)) {
                            if (alertYn) {
                            	ib.comm.messageBox("COW0012");
                            }
                            if (typeof(obj) == "object") {
                                this.setElemFocus(obj);
                            }
                            return false;
                        }
                    }
                    return true;
                },

                /**
                 * 문자열이 년월형식에 맞는지 체크한다
                 * @memberOf   ib.util#
                 * @method     isDateYm
                 * @public
                 * @param {object}      input                   대상 jquery object
                 * @param {boolean}     [alertYn = false]       메시지 출력 여부
                 * @returns {boolean} 유효날이면 true
                 * @example
                 * ```
                 *  ib.util.isDateYm($("#dat"));
                 *  ib.util.isDateYm($("#dat") , true);
                 * ```
                 */
                isDateYm: function(obj, alertYn) {
                    var data; 
                    if (!this.isEmpty(obj)) {
                        data = this.getValue(obj);
                        data = data.replace(/\/|\-|\./g, ""); // 특수문자 제거

                        return this.isDate(data + "01", alertYn);
                    }
                },

                /**
                 * 날자 비교 ( fromdate , todate 의 적합성은 체크하지 않음 )
                 * @memberOf   ib.util#
                 * @method     isDateDiff
                 * @public
                 * @param       {object}    formDate                시작일자
                 * @param       {object}    toDate                  종료일자
                 * @param       {boolean}   [alertYn = false]       메시지 출력 여부
                 * @returns     {boolean}   시작일자 <= 종료일자 true 
                 * @example
                 * ```
        		 *	ib.util.isDateDiff($("#dat"));
        		 *  ib.util.isDateDiff($("#dat") , true);
    			 * ```
                 */
                isDateDiff: function(fromdate, todate, alertYn) {
                    var fdate = this.getValue(fromdate),
                        tdate = this.getValue(todate);

                    fdate = fdate.replace(/\/|\-|\./g, ""); // 특수문자 제거
                    tdate = tdate.replace(/\/|\-|\./g, ""); // 특수문자 제거

                    if (fdate > tdate) {
                        if (alertYn) {
                            ib.comm.messageBox("COW0021");
                        }                        
                        return false;
                    } else {
                        return true;
                    }
                },

                /**
                 * 년월 비교 ( fromdate , todate 의 적합성은 체크하지 않음 )
                 * @memberOf   ib.util#
                 * @method     isDateYmDiff
                 * @public
                 * @param       {object}    formDate                시작년월 객체
                 * @param       {object}    toDate                  종료년월 객체
                 * @param       {boolean}   [alertYn = false]       메시지 출력 여부
                 * @returns     {boolean}   시작일자 <= 종료일자 true 
                 * @example
                 * ```
                 *  ib.util.isDateDiff($("#dat"));
                 *  ib.util.isDateDiff($("#dat") , true);
                 * ```
                 */
                isDateYmDiff: function(fromdate, todate, alertYn) {
                    var fdate = this.getValue(fromdate),
                        tdate = this.getValue(todate);

                    return this.isDateDiff(fdate + "01", tdate + "01", alertYn);
                },

                /**
                 * 입력값의 바이트 길이를 구한다.
                 * @memberOf   ib.util#
                 * @method     getByteLength
                 * @public
                 * @param {object}  input   대상 jquery object
                 * @returns {number} 		바이트 길이
                 * @example
                 * ```
                 * 	if (ib.util.getByteLength($("#id") > 100) { 
                 *  	ib.comm.alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다."); 
                 *  }
                 * ```
                 */
                getByteLength: function(input) {

                    var retValue = this.getValue(input),
                        byteLength = 0,
                        oneChar;
                    for (var inx = 0, len = retValue.length; inx < len; inx++) {
                        oneChar = escape(retValue.charAt(inx));
                        if (oneChar.length == 1) {
                            byteLength++;
                        } else if (oneChar.indexOf("%u") != -1) {
                            byteLength += 2;
                        } else if (oneChar.indexOf("%") != -1) {
                            byteLength += oneChar.length / 3;
                        }
                    }
                    return byteLength;
                },


                /**
                 * Time 스트링을 자바스크립트 Date 객체로 변환
                 * @memberOf   ib.util#
                 * @method     toTimeObject
                 * @private
                 * @param {string} Time 형식의 String
                 * @returns {object} date Object
                 */
                toTimeObject: function(time) { // parseTime(time)
                    var year = time.substr(0, 4),
                        month = time.substr(4, 2) - 1, // 1월=0,12월=11
                        day = time.substr(6, 2),
                        hour = time.substr(8, 2),
                        min = time.substr(10, 2);

                    return new Date(year, month, day, hour, min);
                },



                /**
                 * 두 Time이 몇 개월 차이나는지 구함
                 * @memberOf   ib.util#
                 * @method     getMonthInterval
                 * @public
                 * @param {object | string} time1  	form 일자
                 * @param {object | string} time2  	to 일짜
                 * @returns {number}					time1이 time2보다 크면(미래면) minus(-)
                 * @example
                 * ```
                 * 	ib.util.getMonthInterval('200510061231' , '200610211100')
                 *  ib.util.getMonthInterval($("#formDate"), $("#toDate"))
                 * ```
                 */
                getMonthInterval: function(time1, time2) {
                    var date1,
                        date2,
                        years,
                        months,
                        days;
                    time1 = this.getValue(time1);
                    time2 = this.getValue(time2);

                    date1 = this.toTimeObject(time1.replace(/\/|\-|\./g, ""));
                    date2 = this.toTimeObject(time2.replace(/\/|\-|\./g, ""));

                    years = date2.getFullYear() - date1.getFullYear();
                    months = date2.getMonth() - date1.getMonth();
                    days = date2.getDate() - date1.getDate();

                    return (years * 12 + months + (days >= 0 ? 0 : -1));
                },

                /**
                 * 두 Time이 몇일 차이나는지 구함
                 * @memberOf   ib.util#
                 * @method     getDayInterval
                 * @public
                 * @param {object | string} time1  	form 일자
                 * @param {object | string} time2  	to 일자
                 * @returns {number} 				time1이 time2보다 크면(미래면) minus(-)
                 * @example
                 * ```
                 * 	ib.util.getDayInterval('200510061231' , '200610211100')
                 *  ib.util.getDayInterval($("#formDate"), $("#toDate"))
                 * ```
                 */
                getDayInterval: function(time1, time2) {
                    var date1,
                        date2,
                        day;
                    time1 = this.getValue(time1);
                    time2 = this.getValue(time2);

                    date1 = this.toTimeObject(time1.replace(/\/|\-|\./g, ""));
                    date2 = this.toTimeObject(time2.replace(/\/|\-|\./g, ""));
                    day = 1000 * 3600 * 24; // 24시간

                    return parseInt((date2 - date1) / day, 10);
                },

                /**
                 * 현재 시각을 Time 형식으로 리턴
                 * @memberOf   ib.util#
                 * @method     getCurrentTime
                 * @public
                 * @param
                 * @returns {string} time 형식의 string (Client 기준의 현재시각)
                 * @example
                 * ```
                 * 	ib.util.getCurrentTime()
                 * ```
                 */
                getCurrentTime: function() {
                    return this.toTimeString(new Date());
                },

                /**
                 * 자바스크립트 Date 객체를 Time 스트링으로 변환
                 * @memberOf   ib.util#
                 * @method     toTimeString
                 * @private
                 * @param 	{object} 	date Object
                 * @returns 	{string} 	tiem 형식의 string , format 이 있는 경우 해당 format
                 */
                toTimeString: function(date) { // formatTime(date)
                    var year = date.getFullYear(),
                        month = date.getMonth() + 1, // 1월=0,12월=11이므로 1 더함
                        day = date.getDate(),
                        hour = date.getHours(),
                        min = date.getMinutes();

                    if (("" + month).length == 1) {
                        month = "0" + month;
                    }
                    if (("" + day).length == 1) {
                        day = "0" + day;
                    }
                    if (("" + hour).length == 1) {
                        hour = "0" + hour;
                    }
                    if (("" + min).length == 1) {
                        min = "0" + min;
                    }

                    return ("" + year + month + day + hour + min);

                },

                /**
                 * 현재 年을 YYYY형식으로 리턴
                 * @memberOf   ib.util#
                 * @method     getYear
                 * @private
                 * @param
                 * @returns {string} year
                 */
                getYear: function() {
                    return this.getCurrentTime().substr(0, 4);
                },

                /**
                 * 현재 月을 MM형식으로 리턴
                 * @memberOf   ib.util#
                 * @method     getMonth
                 * @private
                 * @param
                 * @returns {string} month
                 */
                getMonth: function() {
                    return this.getCurrentTime().substr(4, 2);
                },

                /**
                 * 현재 日을 DD형식으로 리턴
                 * @memberOf   ib.util#
                 * @method     getDay
                 * @private
                 * @param
                 * @returns {string} day
                 */
                getDay: function() {
                    return this.getCurrentTime().substr(6, 2);
                },

                /**
                 * 현재 날짜를 format , separator 로 구분하여 리턴
                 * @memberOf   ib.util#
                 * @method     getToday
                 * @public
                 * @param {string} format='ymd'  날짜 포멧 option : ymd , ym , md
                 * @param {string} [separator='-'] 구분자
                 * @returns {string} yyyy-MM-dd    format 기준
                 * @example
                 * ```
                 * 	ib.util.getToday()
                 * 	ib.util.getToday("ym")
                 * 	ib.util.getToday("md")
                 * ```
                 */
                getToday: function(format, separator) {

                    if (format === undefined || format === 'undefined') format = "ymd";
                    if (separator === undefined || separator === 'undefined')
                        separator = date_separator;
                    if (format == "ym") {
                        return this.getYear() + separator + this.getMonth();
                    } else if (format == "md") {
                        return this.getMonth() + separator + this.getDay();
                    } else {
                        return this.getYear() + separator + this.getMonth() + separator + this.getDay();
                    }
                },

                /**
                 * 문자열에 있는 특정문자패턴을 다른 문자패턴으로 바꾸는 함수.
                 * @memberOf   ib.util#
                 * @method     replace
                 * @private
                 * @param {string} target 	대상 문자열
                 * @param {string} search 	특정문자 패턴
                 * @param {string} relace 	대처 문자
                 * @returns {string) 	 	변경된 문자열
                 */
                replace: function(targetStr, searchStr, replaceStr) {
                    var len, i, tmpstr = "";

                    for (i = 0, len = targetStr.length; i < len; i++) {
                        if (targetStr.charAt(i) != searchStr) {
                            tmpstr = tmpstr + targetStr.charAt(i);
                        } else {
                            tmpstr = tmpstr + replaceStr;
                        }
                    }
                    return tmpstr;
                },


                /**
                 * 문자열에서 ch 문자를 제거한다. 예) , - 등등
                 * @memberOf   ib.util#
                 * @method     removeChar
                 * @public
                 * @param  {string} val  	대상 문자열
                 * @param  {string} ch  	패턴문자
                 * @returns {string} 	  	패턴이 삭제된 문자열
                 * @example
                 * ```
                 * 	ib.util.removeChar('afsda afdaf  aasdf  ', 'a')
                 * 	ib.util.removeChar($("#removestr").val() , ',')
                 * ```
                 */
                removeChar: function(val, ch) {
                    var len,
                        ret = "",
                        i = 0;

                    if (val === undefined || val === 'undefined' || ch === undefined || ch === 'undefined'){
                        return val;
                    }

                    for (i = 0, len = val.length; i < len; ++i) {
                        if (val.substring(i, i + 1) != ch)
                            ret = ret + val.substring(i, i + 1);
                    }
                    return ret;
                },


                /**
                 * 문자열에서 좌우 공백제거
                 * @memberOf   ib.util#
                 * @method     trim
                 * @public
                 * @param {string}  val 	대상 문자열
                 * @returns {string} 		좌우 공백 제거한 문자열
                 * @example
                 * ```
                 * 	ib.util.trim('  abcdefghig  ')
                 * 	ib.util.trim($("#trimStr").val())
                 * ```
                 */
                trim: function(val) {

                    if (typeof val === "undefined") {
                        return "";
                    }

                    val = this.getValue(val);
                    val = val.replace(/^\s+/g, '').replace(/\s+$/g, '');

                    return val;
                },

                /**
                 * 입력이 object 이면 object 에 value 를 리턴하고 그 외에는 해당 입력값을 리턴한다
                 * @memberOf   ib.util#
                 * @method     getValue
                 * @private
                 * @param      {object}     object 
                 * @returns    {string}     object value
                 */
                getValue: function(obj) {
                    if (obj === null || obj === 'null') return "";

                    if (typeof(obj) == "object") {
                        if (obj.jquery === undefined || obj.jquery === 'undefined') {
                            return obj.value;
                        }
                        if( obj.prop("nodeName") === "DIV"){
                    		return obj.IBMultiCombo("selectedCode"); 
                    	} else {
                    		if( obj.attr("class") === "ckeditor"){
                            	return CKEDITOR.instances[obj.attr("id")].getData();
                            } else {
                            	return obj.val();
                            }
                    	}
                    } else {
                        return obj;
                    }
                },

                /**
                 * 해당하는 객체에 값을 가져옴
                 * @memberOf   ib.util#
                 * @method     getMaskValue
                 * @public
                 * @param {object}  대상 jquery object
                 * @returns
                 * text : 일반 값 
                 * text : 금액의 경우 return value가 100,000->100000으로 변환되어서 return;
                 * combobox : 현재 선택된 option 객체의 값이 return;
                 * radio, checkbox : 체크된 객체의 값을 return ; 아무것도 체크되지 않으면 "" 를 return; checkbox의 경우
                 * 다중선택인 경우 "01|02" 형태로 return; 
                 * @example
                 * ```
                 * 	ib.util.getMaskValue($("#getsel")) 
                 * ```
                 */
                getMaskValue: function(obj) {
                    var retVal, name,
                        type = obj.attr("type") === undefined ? "" : obj.attr("type");
                    if (type.toLowerCase() == "radio" || type.toLowerCase() == "checkbox") {
                        retVal = "";
                        name = obj.attr("name");

                        $('[name="' + name + '"]').each(function() {
                            if ($(this).prop('checked') === true || $(this).prop('checked') === 'true') {
                                retVal += "|" + $(this).val();
                            }
                        });
                        if (retVal === "")
                            return "";
                        return retVal.substring(1);
                    } else {
                    	if( obj.prop("nodeName") === "DIV"){
                    		return obj.IBMultiCombo("selectedCode"); 
                    	} else {
                    		return obj.IBMaskEdit('value');
                    	}
                    }
                },

                /**
                 * array 여부를 확인 한다.
                 * @memberOf   ib.util#
                 * @method     isArray
                 * @private
                 * @param      {object}     target      대상 객체
                 * @returns    {boolean}                array 여부
                 */
                isArray: function(target) {
                	if(typeof target === "undefined") return false;
                    var res = false;

                    if (Array.isArray) {
                        res = Array.isArray(target);
                    } else {
                        res = Object.prototype.toString.call(target) === "[object Array]";
                    }

                    return res;
                },


                /**
                 * 오른쪽에 ch문자로 채우기
                 * @memberOf   ib.util#
                 * @method     rpad
                 * @public
                 * @param {string} value	대상 문자열
                 * @param {string} len  	전체길이
                 * @param {string} ch   	대체문자
                 * @returns {string} 	    오른쪽에 대체문자료 채워진 문자열
                 * @example
                 * ```
                 * 	ib.util.rpad('aaaaa' , 7 , 'b') 
                 * ```
                 */
                rpad: function(newValue, len, ch) {
                    if (arguments.length < 3)
                        ch = ' ';

                    var strlen = this.trim(newValue).length;
                    var ret = "";
                    var alen = len - strlen;
                    var astr = "";

                    // 부족한 숫자만큼 len 크기로 ch 문자로 채우기
                    for (i = 0, len = alen; i < len; ++i) {
                        astr = astr + ch;
                    }
                    ret = this.trim(newValue) + astr; // 뒤에서 채우기
                    return ret;
                },

                /**
                 * 왼쪽에 ch 문자 채우기
                 * @memberOf   ib.util#
                 * @method     lpad
                 * @public
                 * @param {string} value 	대상 문자열
                 * @param {string} len  	전체길이
                 * @param {string} ch   	대체문자
                 * @returns {string} 		왼쪽에 대체문자료 채워진 문자열
                 * @example
                 * ```
                 * 	ib.util.lpad('aaaaa' , 7 , 'b') 
                 * ```
                 */
                lpad: function(newValue, len, ch) {
                    if (arguments.length < 3)
                        ch = ' ';

                    var strlen = this.trim(newValue).length;
                    var ret = "";
                    var alen = len - strlen;
                    var astr = "";

                    // 부족한 숫자만큼 len 크기로 ch 문자로 채우기
                    for (i = 0, len = alen; i < len; ++i) {
                        astr = astr + ch;
                    }

                    // 앞에서 채우기
                    ret = astr + this.trim(newValue);
                    return ret;
                },

                /**
                 * null 일 경우, 값 대체
                 * @memberOf   ib.util#
                 * @method     nvl
                 * @public
                 * @param {string} value 	대상문자열
                 * @param {string} replacer 대체문자열
                 * @returns {string} 	  	null 인경우 대채문자로 채운 문자열
                 * @example
                 * ```
                 * 	ib.util.nvl( null , 'abcde')
                 * 	ib.util.nvl( 'null' , 'abcde') 
                 * ```
                 */
                nvl: function(value, replacer) {
                    if (value === null || value === "null") {
                        return replacer;
                    } else {
                        return value;
                    }
                },

                /**
                 * 문자열에서 모든 공백제거
                 * @memberOf   ib.util#
                 * @method     trimAll
                 * @public
                 * @param {string} str		대상 문자열
                 * @returns {string} 		모든 공백제거 문자열
                 * @example
                 * ```
                 * 	ib.util.trimAll( ' 하나 둘 셋 ' )
                 * ```
                 */
                trimAll: function(str) {
                    return this.replace(str, " ", "");
                },


                /**
                 * 문자열 왼쪽에 존재하는 화이트스페이스 제거
                 * @memberOf   ib.util#
                 * @method     ltrim
                 * @public
                 * @param  {string} str 	대상 문자열
                 * @returns {string} 	 	왼쪽 공백이 제거된 문자열
                 * @example
                 * ```
                 * 	ib.util.ltrim( ' 하나 둘 셋 ' )
                 * ```
                 */
                ltrim: function(str) {
                    var i;
                    i = 0;
                    while (str.substring(i, i + 1) == ' ' || str.substring(i, i + 1) == '　')
                        i = i + 1;
                    return str.substring(i);
                },

                /**
                 * 문자열 오른쪽에 존재하는 화이트스페이스 제거
                 * @memberOf   ib.util#
                 * @method     rtrim
                 * @public
                 * @param  {string} 	str 대상 문자열
                 * @returns {string}  		오른쪽 공백이 제거된 문자열
                 * @example
                 * ```
                 * 	ib.util.rtrim( ' 하나 둘 셋 ' )
                 * ```
                 */
                rtrim: function(str) {
                    var i = str.length - 1;
                    while (i >= 0 && (str.substring(i, i + 1) == ' ' || str.substring(i, i + 1) == '　'))
                        i = i - 1;
                    return str.substring(0, i + 1);
                },

                /**
                 * 폼의 문자길이를 체크한다. 값이 없는경우 리턴 최소, 최대길이보단 큰 경우 false리턴 정상일경우 true리턴
                 * @memberOf   ib.util#
                 * @method     isValidSize
                 * @public
                 * @param {object} 	obj  	대상 jquery object
                 * @param {integer} min 	최소 자릿수
                 * @param {integer} max 	최대 자릿수
                 * @param {string} 	[msg]	메시지
                 * @returns {boolean} 		최소 최대 사이인경우 true
                 * @example
                 * ```
                 * 	ib.util.isValidSize($("#minmax") , 3 , 7 ) 
                 * 	ib.util.isValidSize($("#minmax") , 3 , 7 , "테스트") 
                 * ```
                 */
                isValidSize: function(obj, min, max, msg) {
                    var str = this.trim(this.getValue(obj));

                    if (!(this.getByteLength(str) >= min && this.getByteLength(str) <= max)) {
                        if (msg) {
                            if (min == max)
                                ib.comm.messageBox("COW1010" , [msg , min]);
                            else
                                ib.comm.messageBox("COW1012" , [msg , min , max]);

                            /*  if (obj.jquery == undefined) {
                                  obj.value = "";
                              } else {
                                  obj.val("");
                              }*/
                        } else {
                            if (min == max)
                                ib.comm.messageBox("COW1016" , min );
                            else
                                ib.comm.messageBox("COW1017" , max );
                        }
                        this.setElemFocus(obj);

                        return false;
                    }

                    return true;
                },

                /**
                 * Object 인 경우 포커스를 보낸다
                 * @memberOf   ib.util#
                 * @method     setElemFocus
                 * @private
                 * @param {object} form element object
                 */
                setElemFocus: function(obj) {
                    if (typeof obj === "object" && typeof obj.focus === "function") {
                        obj.focus();
                    }
                },

                /**
                 * 영문과 숫자의 조합 여부 체크
                 * @memberOf   ib.util#
                 * @method     isNumString
                 * @public
                 * @param  {object}  input 	대상 jquery object
                 * @returns {boolean} 		혼합일경우 true
                 * @example
                 * ```
                 * 	ib.util.isNumString($("#mumstr")) 
                 * ```
                 */
                isNumString: function(obj) {
                    var val = this.getValue(obj);

                    if (val === "") {
                        return true;
                    }
                    val = this.trimAll(val);

                    if (this.isNumber(val) === true) {
                        ib.comm.messageBox("COW0003");
                        this.setElemFocus(obj);
                        return false;
                    } else {
                        return true;
                    }
                },

                /**
                 * array 를 json 형태로 바꾼다
                 * @memberOf   ib.util#
                 * @method     arrayToJson
                 * @private
                 * @param {object}  array object
                 * @returns {object}  json object
                 */
                _arrayToJson: function(array) {
                    var i, len, jsonObj = {};
                    if (!this.isArray(array)) return jsonObj;
                    for (i = 0, len = array.length; i < len; i++) {
                        jsonObj[array[i]] = true;
                    }
                    return jsonObj;
                }
            };
        })().init();
    })(ib);
})();