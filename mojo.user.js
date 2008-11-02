// ==UserScript==
// @name        miwa_mojo_p
// @description annotate whether Akihiro Miwa has a tommy or not
// @namespace   http://dzfl.jp/mojo/
// @include     *
// @author      klm
// ==/UserScript==

(function () {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://dzfl.jp/mojo/",
        onload : function (req) {
            eval("var ret = " + req.responseText);
            var mojo = ret.miwa ? "(チンコあり)" : "(チンコなし)";
            $X("//text()[contains(., '美輪')]").forEach(function (e) {
                var str = $X("string(.)", e).replace(/美輪 ?明宏/g, function(c) { return c + mojo; });
                e.parentNode.replaceChild(document.createTextNode(str), e);
            });
        }
    });

    // From: http://lowreal.net/logs/2006/03/13/3
    function $X (exp, context) {
        if (!context) context = document;
        var resolver = function (prefix) {
            var o = document.createNSResolver(context)(prefix);
            return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
        }
        var exp = document.createExpression(exp, resolver);

        var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
            case XPathResult.STRING_TYPE : return result.stringValue;
            case XPathResult.NUMBER_TYPE : return result.numberValue;
            case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
                result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var ret = [];
                for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                    ret.push(result.snapshotItem(i));
                }
                return ret;
            }
        }
        return null;
    }
})();

