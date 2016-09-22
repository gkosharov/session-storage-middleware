/**
 * Created by g.kosharov on 21.9.2016
 */


export default store => next => action => {
    if (!isObject(action) || action.type !== "SET_IN_SESSION") {
        return next(action)
    }
    var fileReader = new FileReader();

    fileReader.onload = function (evt) {

        var result = evt.target.result;

        try {
            sessionStorage.setItem(action.payload.key, result);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    };

    fileReader.readAsDataURL(action.payload.value);
}

