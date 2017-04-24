/**
 * Created by gedune on 2017/4/24.
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

var inputs = ["name-input", "password-input", "confirmPas-input", "email-input", "phone-input"];

var form = {
    hintText: {
        pass: "格式正确",
        nameNullError: '姓名不能为空',
        passwordNullError: "密码不能为空",
        passwordRepeat: "请重新输入密码",
        email: "邮箱格式为 xx@xx.com",
        phone: "仅支持中国号码",
        codeError: "请输入长度为4~16位字符"
    },

    hintColor: {
        red: "red",
        gray: "gray",
        Pass_border: '3px solid lightgreen',
        Error_border: '3px solid red'
    },

    Vetify: function (inputElement, hintElement) {
        var inputValue = inputElement.value;
        switch (inputElement) {
            case inputs[0]:
                form.vertifyName(inputElement, hintElement, inputValue);
                break;
            // case inputs[1]:
            //     form.vertifyPassword(inputElement,hintElement,inputValue);
            //     break;
            // case inputs[2]:
            //     hintElement.innerHTML = form.hintText.passwordRepeat;
            //     break;
            // case inputs[3]:
            //     hintElement.innerHTML = form.hintText.email;
            //     break;
            // case inputs[4]:
            //     hintElement.innerHTML = form.hintText.phone;
            //     break;
        }
        ;
    },


    initHint: function (inputElement, hintElement) {
        switch (inputElement) {
            case inputs[0]:
                hintElement.innerHTML = form.hintText.codeError;
                break;
            case inputs[1]:
                hintElement.innerHTML = form.hintText.passwordNullError;
                break;
            case inputs[2]:
                hintElement.innerHTML = form.hintText.passwordRepeat;
                break;
            case inputs[3]:
                hintElement.innerHTML = form.hintText.email;
                break;
            case inputs[4]:
                hintElement.innerHTML = form.hintText.phone;
                break;
        }
        ;
        hintElement.style.color = form.hintColor.gray;
        inputElement.style.border = form.hintColor.gray;
    },

    countLength: function (str) {
        var inputLength = 0;
        for (var i = 0; i < str.length; i++) {
            var countCode = str.charCodeAt(i);
            //利用UTF-8 编码
            if (countCode >= 0 && countCode <= 128) {
                inputLength += 1;
            } else {
                inputLength += 2;
            }
        }
        return inputLength;
    },


    vertifyName: function (inputElement, hintElement, inputValue) {
        if (form.countLength(inputValue) == 0) {
            hintElement.innerHTML = form.hintText.nameNullError;
            hintElement.style.color = form.hintColor.red;
            inputElement.style.border = form.hintColor.Error_border;
        } else if (form.countLength(inputValue) >= 4 && form.countLength(inputValue) <= 16) {
            hintElement.innerHTML = form.hintText.pass;
            hintElement.style.color = form.hintColor.gray;
            inputElement.style.border = form.hintColor.Pass_border;
        } else {
            hintElement.innerHTML = form.hintText.codeError;
            hintElement.style.color = form.hintColor.red;
            inputElement.style.border = form.hintColor.Error_border;
        }
    }

}


function init() {
    var boxes = document.getElementsByClassName("boxes");

    //因为 focus 和 blue 都不冒泡，所有只能一个一个来绑定了
    for (var index = 0; index < boxes.length; index++) {
        var box = boxes[index];

        //遇到闭包问题了，也就是说触发 focus 事件仍然是走这个函数
        addEvent(box.children[1], "focus", function () {
            form.initHint(box.children[1], box.children[2]);
        });
        addEvent(box.children[1], "blur", function () {
            form.Vetify(box.children[1], box.children[2]);
        });
    }

}

init();