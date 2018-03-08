// tests.js
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            chai.assert.equal(-1, [1,2,3].indexOf(5));
            chai.assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}

it('calls the original function', function () {
    var callback = sinon.spy();
    var proxy = once(callback);

    proxy();

    // chai.assert(0);
    chai.assert(callback.called);
});