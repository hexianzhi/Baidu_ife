/**
 * Created by gedune on 2017/4/21.
 */

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

var tagInput = document.getElementById("tag-input");

var tagOb = {

    tagContent: document.getElementById("tag-content"),
    tags: [],


    MonitorTagInput: function () {
        //监听输入框的状态
        var s = tagOb.tagInput.value;
        if (s.match(/\w/)) {
            var s2 = s;
            if (s.match(/\W$/)) {
                //添加tag
                tagOb.tags.push(s2);
                tagOb.renderTags();
            }
        } else {
            tagOb.tagInput.value = "";
        }
    },


    deleteTag: function (element) {
        tagOb.tags.splice(tags.indexOf(element.value), 1);
    },

    renderTags: function () {
        var str = "";
        tagOb.tagContent.innerHTML = "";
        tagOb.tags.forEach(function (p1) {
            str += "<span class='tag'>" + p1 + "</span>"
        });
        tagOb.tagContent.innerHTML = str;
    }

}


function bindClick() {
    var tag = document.getElementById("tag");

    //添加 hover 事件，只能通过 div 父控件来。。
    addEvent(tag, 'mouseover', function (e) {
        if (e.target && e.target.nodeName == "SPAN") {
            e.target.innerHTML.insertData(0, '删除');
            e.target.style.background = 'red';
        }
    });

    //添加删除事件
    addEvent(tag, "click", function (e) {
        if (e.target && e.target.nodeName === "SPAN") {
            tagOb.deleteTag(e.target);
        }
    });

    //添加监听 input 事件
    addEvent(tagInput, 'keyup', tagOb.MonitorTagInput());


    var interstContent = document.getElementById("interst-content");
    var comfirmInterst = document.getElementById("comfirm-interst");
    var interstContent = document.getElementById("interest-content");

    var arrBtnDel = table.getElementsByClassName("del-btn");


}

bindClick();
