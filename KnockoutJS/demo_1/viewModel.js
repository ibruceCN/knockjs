/**
 * Created by jwbzhang on 3/22/15.
 */

var ViewModel = {
    firstName : ko.observable("Stephen"),
    lastName : ko.observable("Earth"),
    price: ko.observable('0')
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

ko.applyBindings(ViewModel);