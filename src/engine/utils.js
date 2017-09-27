var Utils = {
    copyObject: function (object) {
        return JSON.parse(JSON.stringify(object));
    },
    randomNumber: function (start, end) {
        /*
        * Return a random number within the range [start, end)
        * @param {int} start Left most boundary
        * @param {int} end Right most boundary and not inclusive
        */
        if (start > end) {
            throw "Start must be less than end";
        } else {
            var r = Math.floor(Math.random() * (end - start)) + start;

            return r;
        }
    },
    shuffle: function (a) {
        /**
         * Shuffles array in place.
         * @param {Array} a items The array containing the items.
         */
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}


