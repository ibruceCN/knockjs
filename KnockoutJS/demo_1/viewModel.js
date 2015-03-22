/**
 * Created by jwbzhang on 3/22/15.
 */
var michelle = {
    name: "陳研希", height: 160, weight: 45
};

var guilunmei = {
    name: "桂綸鎂", height: 164, weight: 46
};

var ViewModel = {
    firstName : ko.observable("Stephen"),
    lastName : ko.observable("Earth"),
    price: ko.observable('0'),
    acceptedValue : ko.observable(123),
    lastInputWasValid: ko.observable(true),

    name : ko.observable("林志玲"),
    height : ko.observable(174),
    weight : ko.observable(52),

    changeModel: function() {
        this.name(guilunmei.name);
        this.height(guilunmei.height);
        this.weight(guilunmei.weight);
    }
}

ViewModel.otherFullName = ko.dependentObservable({
    read: function () {
        return this.firstName() + ' ' + this.lastName();
    },

    write:function(value) {
        var lastSpacePos = value.lastIndexOf(" ");
        if (lastSpacePos > 0) {
            this.firstName(value.substring(0, lastSpacePos));
            this.lastName(value.substring(lastSpacePos+1));
        }
    },

    owner: ViewModel
});

ViewModel.fomarttedPrice = ko.dependentObservable({
        read: function () {
            return "$" +  this.price();
        },

        write:function(value) {
            value = parseFloat(value.replace(/[^\.\d]/g, ""));
            this.price(isNaN(value) ? 0 : value);
        },

        owner:ViewModel
    }
);

ViewModel.attemptedValue = ko.dependentObservable({
    read: ViewModel.acceptedValue,

    write: function(value) {
        if(isNaN(value))
            this.lastInputWasValid(false);
        else {
            this.lastInputWasValid(true);
            this.acceptedValue(value);
        }
    },

    owner:ViewModel
});

ko.applyBindings(ViewModel);