/**
 * Created by gedune on 2017/5/9.
 */

// 观察者构造函数
function Observer(data) {
    //标志
    this.data = data;
    this.walk(data);
    this.eventBus = new Event(data);
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
            // console.log("你访问了：" + key);
            return val;
        },
        set: function (nVal) {
            // console.log('新的' + key + ' = ' + nVal);



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
            _this.eventBus.emit(key, val, nVal);

        }
    })
};


p.$watch = function (key, callback) {

    // 先对对象第一层数据的绑定，更深一层得写一个属性查找函数
    if (this.data.hasOwnProperty(key) && typeof this.data[key] === "object") {

        //this：这里就是假设我们调用了 listen 两次， events  应该有变化，但结果是没变化
        //不关 this什么事，这是因为 nama 有 new Event，而 firstName 没有
        //所以为 firstName 加上 event；
        for (var data1 in this.data[key]) {
            data1.eventBus = new Event();
            this.eventBus.listen(data1, callback);
        }

    } else if (this.data.hasOwnProperty(key)) {
        this.eventBus.listen(key, callback);
    } else {
        // console.log(`对应的属性${key} 没有回调函数`);
    }

};


var Event = function () {
    this.events = {};
    this.parent = this;
}

Event.prototype.listen = function (attr, callback) {
    console.log(" this eventBus " + this.events);

    if (!this.events[attr]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.events[attr] = [];
    }

    this.events[attr].push(callback); // 订阅的消息添加进消息缓存列表
    // console.log(" this " +  this);

}


//发布消息
Event.prototype.emit = function (attr, ...arg) {

    console.log(" this events " + this.events[attr]);

    if (this.events[attr]) {
        this.events[attr].forEach(function (item) {
            item(...arg);
        });
    } else {
        // console.log('属性没有回调函数');
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

let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('firstName', function (newName) {
    console.log('我的姓名发生了变化')
});
app2.$watch('age', function (newName) {
    console.log('我的age发生了变化')
});

app2.data.age = 'hahaha';

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
// app2.data.name.lastName = 'blablabla';

