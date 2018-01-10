// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * 创建一个包含所有卡片的数组
 */
var mycards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
                    "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt",
                    "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
                    "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
var open = new Array();

var moveC=0;
var pairOfCards=0;
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
jQuery(document).ready(function () {
            $(".moves").text(moveC);
    
            mycards = shuffle(mycards);
            $(".card .fa").attr("class", "fa");
            //将原有的类别清除
            var i;
            for (i = 0; i < 16; i++) {
                $($(".card .fa")[i]).addClass(mycards[i]);
            }
    
});


var openCard = function (cardID) {
    $($(".card")[cardID]).addClass("show open");
    /*var CardName=$($(".card i")[cardID]).attr("class");*/
    open.push(cardID);
}

var matchCard=function(){
    $($(".card")[open[0]]).removeClass("show open");
    $($(".card")[open[0]]).addClass("match");
    
    $($(".card")[open[1]]).removeClass("show open");
    $($(".card")[open[1]]).addClass("match");
    
    pairOfCards=pairOfCards+1;
    open.length=0;

}

var resetCard=function(){
    $($(".card")[open[0]]).removeClass("show open");
    $($(".card")[open[1]]).removeClass("show open");
    open.length=0;

}

var moveCounter=function(){
    moveC=moveC+1;
    $(".moves").text(moveC);

}

var gameOver=function(){


}

$(".card").click(function(event) {
    var cardID = $(".deck").find("li").index($(event.target));
    openCard(cardID);
    var openNum=open.length;
    
    if(openNum==2){
        /*如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）*/
        if(mycards[open[0]]==mycards[open[1]]){
            setTimeout(matchCard,500);
            
            /*如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）*/
        }
        else{
            setTimeout(resetCard,500);
            /*如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号*/  
        }  
    }
    /*增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）*/
    moveCounter();
});




/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
