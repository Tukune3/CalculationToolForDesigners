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
            lineHeightValue = Math.floor(lineHeightValue*round);
            lineSpacingConversionVariable = new Decimal(lineHeightValue);
            lineHeightValue = lineSpacingConversionVariable.div(round).toNumber();            
            lineHeight.val(lineHeightValue);
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

// document.querySelector("#copy").addEventListener("click", copy);