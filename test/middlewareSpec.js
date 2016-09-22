/**
 * Created by g.kosharov on 8.4.2016
 */
import "babel-polyfill"
import Middleware from '../src/index'

var scope = {};
scope.server = sinon.fakeServer.create();
describe('Middleware', ()=> {

    beforeEach(()=> {
        scope.sandbox = sinon.sandbox.create();
        scope.doDispatch = () => {
        };
        scope.doGetState = () => {
        };
        scope.nextHandler = Middleware({dispatch: scope.doDispatch, getState: scope.doGetState});
    });

    afterEach(()=> {
        scope.sandbox.restore();
        scope.server.restore();
    });

    it('should return a function to handle next', () => {
        expect(scope.nextHandler).toBeFunction();
        expect(scope.nextHandler.length).toEqual(1);
    });

    it('should return a function to handle action', () => {
        var actionHandler = scope.nextHandler();
        expect(actionHandler).toBeFunction();
        expect(actionHandler.length).toEqual(1);
    });


    it(' should pass actions to the next handler', done => {
        var action = {
            type: "NOT_SET_IN_SESSION",
            payload: {}
        };
        var doNext = (action) => {
            expect(action).toBeDefined();
            done();
        };
        var actionHandler = scope.nextHandler(doNext);

        actionHandler(action).then(done);
    });
});