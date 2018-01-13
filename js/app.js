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
var stars=3;
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

var begin=function (){
            
            $("#dialog").remove();
            moveC=0;
            pairOfCards=0;
            stars=3;
            $(".moves").text(moveC);
    
            mycards = shuffle(mycards);
            $(".card .fa").attr("class", "fa");
            //将原有的类别清除
            var i;
            for (i = 0; i < 16; i++) {
                $($(".card .fa")[i]).addClass(mycards[i]);
                $($(".card")[i]).removeClass("show match open");
            }
            $($(".stars .fa.fa-star")[1]).show();
            $($(".stars .fa.fa-star")[2]).show();
}

var openCard = function (cardID) {
    $($(".card")[cardID]).addClass("show open");
    $($(".card")[cardID]).animate({},function(){$($(".card")[cardID]).css("transform: rotateY(0);background: #02b3e4;cursor: default;")});
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
    
    if(pairOfCards==8){

    gameProcess();
    
    }
    

}

var resetCard=function(){


    $($(".card")[open[0]]).removeClass("show open");
    $($(".card")[open[1]]).removeClass("show open");
    open.length=0;

}

var moveCounter=function(){
    moveC=moveC+1;
    $(".moves").text(moveC);
    if(moveC==33){
        $($(".stars .fa.fa-star")[2]).hide();
        stars=2;
    }
    if(moveC==49){
        $($(".stars .fa.fa-star")[1]).hide();
        stars=1;
    }
    console.log(moveC);
}

var gameProcess=function(){
    $("body").append("<div id=\"dialog\" title=\"Congratulations!\"></div>");
    $("#dialog").append("<h1><i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i></h1><h1>Congratulations!</h1><h1>You Won!</h1><span id=\"yourStars\">You scored </span>  with <span id=\"totalStep\">%data%</span> steps. ");
    $("#totalStep").replaceWith(moveC);
    var i;
    for (i = 0; i < stars; i++) {
        $("#yourStars").append("<li><i class=\'fa fa-star\'></i></li>");
    }

    $("#dialog").dialog({

        modal: true,
        title: "Congratulations!",
        position: "center",
        closeOnEscape: true,
        show: {
            effect: "blind",
            duration: 1000
        },
        buttons: {
            "Play Again": function () {
                $(this).dialog("close");
                begin();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        autoOpen: false
    });

    $("#dialog").dialog("option", "width", window.screen.width / 2);
    $("#dialog").dialog("option", "height", window.screen.height - 100);
    $("#dialog").dialog("open");
}

jQuery(document).ready(begin());

$(".card").click(function(event) {
    var cardID = $(".deck").find("li").index($(event.target));
    openCard(cardID);
    var openNum=open.length;
    moveCounter();
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

});

$(".restart").click(function(event){
    begin();

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
