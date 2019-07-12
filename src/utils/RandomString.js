
export const randomString = ()=>{
    var randomTextArray = [];
    for(var j=0; j<100;j++){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        randomTextArray.push(text);
    }

    return randomTextArray
}