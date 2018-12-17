$(function(){
    function sizeConversion(){
        var contentSize = $('#content-size-body').val();
        var boxSize = $('#box-size-body').val();
        var sizeRatio = $('#size-ratio-body').val();
        var round = $('#round').val();
        var numberBox = $('input[name="fixed-check"]:checked').val();
        var sizeConversionVariable;
        var boxSizeValue;
        var sizeRatioValue;
        if(contentSize > 1 && boxSize && (numberBox == 1 || numberBox == 2)){
            sizeConversionVariable = new Decimal(boxSize);
            sizeRatioValue = sizeConversionVariable.div(contentSize).toNumber();
            sizeRatioValue = Math.floor(sizeRatioValue*round)/round;
            $('#size-ratio-body').val(sizeRatioValue);
        }else if(contentSize && sizeRatio && numberBox == 3){
            sizeConversionVariable = new Decimal(contentSize);
            boxSizeValue = sizeConversionVariable.times(sizeRatio).toNumber();
            boxSizeValue = Math.floor(boxSizeValue*round)/round;
            $('#box-size-body').val(boxSizeValue);
        }
    }
    
    function fixedChenge(_this){
        if($(_this).attr('id') == 'content-size-body'){
            $('#fixed-check1').attr('checked',true);
        }else if($(_this).attr('id') == 'box-size-body'){
            $('#fixed-check2').attr('checked',true);
        }else if($(_this).attr('id') == 'size-ratio-body'){
            $('#fixed-check3').attr('checked',true);
        }
    }
    
    //　行間・Line-heightのテキストボックスの値が変わった時
    // 表示桁数のセレクトボックスの値が変わった時
    $('#content-size-body,#box-size-body,#size-ratio-body,#round').change(function(){
        sizeConversion();
    });
    
    // 縦・横のテキストボックスがフォーカスされた時
    $('#content-size-body,#box-size-body,#size-ratio-body').focus(function(){
        fixedChenge(this);
    });
    
    // deleteキーとbackspaceキーとenterキーの入力を検知
    $('#content-size-body,#box-size-body,#size-ratio-body').keyup(function(e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);
        if (str.match(/[0-9]/) || key == 46 || key == 8 || key == 13){
            sizeConversion();
        }
    });
});

