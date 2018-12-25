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
            sizeRatioValue = Math.floor(sizeRatioValue*100*round);
            sizeConversionVariable = new Decimal(sizeRatioValue);
            sizeRatioValue = sizeConversionVariable.div(round).toNumber();
            $('#size-ratio-body').val(sizeRatioValue);
        }else if(contentSize && sizeRatio && numberBox == 3){
            sizeConversionVariable = new Decimal(contentSize);
            boxSizeValue = sizeConversionVariable.times(sizeRatio).toNumber();
            boxSizeValue = Math.floor(boxSizeValue*round)/round;
            sizeConversionVariable = new Decimal(boxSizeValue);
            boxSizeValue = sizeConversionVariable.div(100).toNumber();
            $('#box-size-body').val(boxSizeValue);
        }
    }
    function fixedChange(_this){
        switch($(_this).attr('id')){
            case 'content-size-body':
            $('#fixed-check1').attr('checked',true);
            break;
            case 'box-size-body':
            $('#fixed-check2').attr('checked',true);
            break;
            case 'size-ratio-body':
            $('#fixed-check3').attr('checked',true);
            break;
        }
    }
    function copyToClipboard(_this){
        var copyVal = $(_this).val();
        // コピー対象をJavaScript上で変数として定義する
        var copyTarget = document.getElementById(copyVal);
        // コピー対象のテキストを選択する
        copyTarget.select();
        // 選択しているテキストをクリップボードにコピーする
        document.execCommand("copy");
    }
    $('.copy').on('click',function(){
        copyToClipboard(this);
    });
    //　行間・Line-heightのテキストボックスの値が変わった時
    // 表示桁数のセレクトボックスの値が変わった時
    $('#content-size-body,#box-size-body,#size-ratio-body').change(function(){
        sizeConversion();
    });
    
    // 縦・横のテキストボックスがフォーカスされた時
    $('#content-size-body,#box-size-body,#size-ratio-body').focus(function(){
        fixedChange(this);
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

