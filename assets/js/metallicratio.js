$(function(){
    var vertical = $('#vertical-length');
    var horizontal = $('#horizontal-length');
    var rect = $('#result-rect');
    function ratioCalculation(){
        var ratioval = $('input[name="ratioval"]:checked').val();
        var verticalVal = $('#vertical-length').val();
        var horizontalVal = $('#horizontal-length').val();
        var numberBox = $('input[name="fixed-check"]:checked').val();
        var ratioCalculationVariable;
        if(verticalVal && numberBox == 1){
            ratioCalculationVariable = new Decimal(ratioval);
            horizontalVal = ratioCalculationVariable.times(verticalVal).toNumber();
            horizontalVal = Math.round(horizontalVal);
            $('#horizontal-length').val(horizontalVal);
        }else if(horizontalVal && numberBox == 2){
            ratioCalculationVariable = new Decimal(horizontalVal);
            verticalVal = ratioCalculationVariable.div(ratioval).toNumber();
            verticalVal = Math.round(verticalVal);
            $('#vertical-length').val(verticalVal);
        }
    }
    function valueLengthCheck(){
        vertical.removeClass('input-size1 input-size2 input-size3 input-size4 input-size5');
        horizontal.removeClass('input-size1 input-size2 input-size3 input-size4 input-size5');
        switch(vertical.val().length){
            case 1:
            vertical.addClass('input-size1');
            break;
            case 2:
            vertical.addClass('input-size2');
            break;
            case 3:
            vertical.addClass('input-size3');
            break;
            case 4:
            vertical.addClass('input-size4');
            break;
            default:
            vertical.addClass('input-size5');
            break;
        }
        switch(horizontal.val().length){            
            case 1:
            horizontal.addClass('input-size1');
            break;
            case 2:
            horizontal.addClass('input-size2');
            break;
            case 3:
            horizontal.addClass('input-size3');
            break;
            case 4:
            horizontal.addClass('input-size4');
            break;
            default:
            horizontal.addClass('input-size5');
            break;
        }
    }
    function ratioTypeCheck(_this){
        rect.removeClass();
        switch($(_this).attr('id')){
            case 'radio-box1':
            rect.addClass('rect1');
            break;
            case 'radio-box2':
            rect.addClass('rect2');
            break;
            case 'radio-box3':
            rect.addClass('rect3');
            break;
            case 'radio-box4':
            rect.addClass('rect4');
            break;
            case 'radio-box5':
            rect.addClass('rect5');
            break;
            case 'radio-box6':
            rect.addClass('rect6');
            break;
            case 'radio-box7':
            rect.addClass('rect7');
            break;
            case 'radio-box8':
            rect.addClass('rect8');
            break;
            case 'radio-box9':
            rect.addClass('rect9');
            break;
        }
    }
    function fixedChange(_this){
        if($(_this).attr('id') == 'vertical-length'){
            $('#fixed-check1').attr('checked',true);
            vertical.addClass('fixed-color');
            horizontal.removeClass('fixed-color');
        }else if($(_this).attr('id') == 'horizontal-length'){
            $('#fixed-check2').attr('checked',true);
            horizontal.addClass('fixed-color');
            vertical.removeClass('fixed-color');
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
    $( 'input[name="ratioval"]:radio').change(function(){
        ratioTypeCheck(this);
    });
    // 比率のラジオボタンの値が変わった時
    //　縦・横のテキストボックスの値が変わった時
    // 表示桁数のセレクトボックスの値が変わった時
    $( 'input[name="ratioval"]:radio,#vertical-length,#horizontal-length').change(function(){
        ratioCalculation();
        valueLengthCheck();
    });
    // 縦・横のテキストボックスがフォーカスされた時
    $('#vertical-length,#horizontal-length').focus(function(){
        fixedChange(this);
    });
    
    // 半角数字とdeleteキーとbackspaceキーとenterキーの入力を検知
    $('#vertical-length,#horizontal-length').keyup(function(e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);
        if (str.match(/[0-9]/) || key == 46 || key == 8 || key == 13){
            ratioCalculation();
            valueLengthCheck();
        }
    });
});

