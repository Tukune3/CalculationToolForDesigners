$(function(){
    function lineSpacingConversion(){
        var lineSpacing = $('#line-spacing-body').val();
        var lineFeed = $('#line-feed-body').val();
        var lineHeight = $('#line-height-body');
        var round = $('#round').val();
        var lineSpacingConversionVariable;
        var lineHeightValue;
        if(lineSpacing && lineFeed){
            lineSpacingConversionVariable = new Decimal(lineFeed);
            lineHeightValue = lineSpacingConversionVariable.div(lineSpacing).toNumber();
            lineHeightValue = Math.floor(lineHeightValue*round)/round;
            lineHeight.val(lineHeightValue);
        }
    }
    //　行間・Line-heightのテキストボックスの値が変わった時
    // 表示桁数のセレクトボックスの値が変わった時
    $('#line-spacing-body,#line-feed-body,#round').change(function(){
        lineSpacingConversion();
    });
    
    // deleteキーとbackspaceキーとenterキーの入力を検知
    $('#line-spacing-body,#line-feed-body').keyup(function(e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);
        if (str.match(/[0-9]/) || key == 46 || key == 8 || key == 13){
            lineSpacingConversion();
        }
    });
});

