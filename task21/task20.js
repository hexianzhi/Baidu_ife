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
var tagContent = document.getElementById("tag-content");
var tagObj = {
    tags: [],

    MonitorTagInput: function () {
        //监听输入框的状态
        if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
            var data = tagInput.value.trim().split(/[,，;；、。.\s\n]+/);
            var newTag = data[0];

            //去重
            if (tagObj.tags.indexOf(newTag) === -1) {
                tagObj.tags.push(newTag);
                if (tagObj.tags.length > 10) {
                    tagObj.tags.shift();
                }
            }
            tagObj.renderTags();
            tagInput.value = "";
        }


        // if (/\w/.test(tagInput.value)) {
        //     var s2 = s;
        //     if (s.test(/\W$/)) {
        //         //添加tag
        //         tagObj.tags.push(s2);
        //         tagObj.renderTags();
        //     }
        // } else {
        //     tagInput.value = "";
        // }
    },


    deleteTag: function (element) {
        tagObj.tags.splice(tags.indexOf(element.value), 1);
    },

    renderTags: function () {
        var str = "";
        tagContent.innerHTML = "";
        tagObj.tags.forEach(function (p1) {
            str += "<span class='tag'>" + p1 + "</span>"
        });
        tagContent.innerHTML = str;
    }

}


function bindClick() {
    var tag = document.getElementById("tag-content");

    //添加 hover 事件，只能通过 div 父控件来。。
    addEvent(tag, 'mouseover', function (e) {
        if (e.target && e.target.nodeName == "SPAN") {
            e.target.firstChild.insertData(0, '删除');
            e.target.style.background = 'red';
        }
    });

    //添加删除事件
    addEvent(tag, "click", function (e) {
        if (e.target && e.target.nodeName === "SPAN") {
            tagObj.deleteTag(e.target);
        }
    });

    //添加监听 input 事件
    // 当一个按键被释放时，keyup事件被触发。
    addEvent(tagInput, 'keyup', tagObj.MonitorTagInput);


    var interstContent = document.getElementById("interst-content");
    var comfirmInterst = document.getElementById("comfirm-interst");
    var interstContent = document.getElementById("interest-content");

    var arrBtnDel = document.getElementsByClassName("del-btn");


}

bindClick();
