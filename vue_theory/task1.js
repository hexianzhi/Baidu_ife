/**
 * Created by gedune on 2017/5/9.
 */

// 观察者构造函数
function Observer(data) {
    //标志
    this.data = data;
    this.eventBus = new Event();
    this.walk(data);
};

var p = Observer.prototype;

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter
p.walk = function (obj) {
    let val;
    for (let key in obj) {

        // 过滤掉原型属性
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            // 这里进行判断，如果还没有遍历到最底层，继续new Observer
            if (typeof val === "object") {
                new Observer(val);
            }
            this.convert(key, val);
        }
    }
}

p.convert = function (key, val) {
    let _this = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log("你访问了：" + key);

            return val;
        },
        set: function (nVal) {

            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + nVal);


            _this.eventBus.emit(key, val, nVal);

            if (nVal === val) {
                return;
            }

            // 这里 val 不是形参吗？如何影响到属性的？
            // 答案： 闭包
            val = nVal;

            //递归。之前纠结在如何添加称为原来的对象上面，实际上根本不用考虑，本来在修改定义中已经添加了
            // 我们所要考虑的只是给这个对象添加 cnvert 方法而已
            if (typeof nVal === 'object') {
                new Observer(val);
            }
        }
    })
};


p.$watch = function (key, callback) {
    this.eventBus.listen(key, callback);
};


var Event = function () {
    this.events = {};
}

Event.prototype.listen = function (attr, callback) {
    if (!this.events[attr]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.events[attr] = [];
    }
    this.events[attr].push(callback); // 订阅的消息添加进消息缓存列表

}


//发布消息
Event.prototype.emit = function (attr,...arg
)
{
    if (this.events[attr]) {
        this.events[attr].forEach(function (item) {
            item(...arg
            )
            ;
        });
    } else {
        console.log("对应的 ${attr} 没有回调函数");
    }
}

//移除消息
Event.prototype.remove = function (key, fn) {
    var fns = this.events[key];
    if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返回
        return false;
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        fns && ( fns.length = 0 );
    } else {
        for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
            var _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l, 1); // 删除订阅者的回调函数
            }
        }
    }
}


let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

// 你需要实现 $watch 这个 API
app1.$watch('age', function (oldVal, newVal) {
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
});


app1.$watch('age', function (oldVal, newVal) {
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
});

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'




