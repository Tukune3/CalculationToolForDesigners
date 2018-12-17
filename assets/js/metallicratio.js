$(function(){
    function ratioCalculation(){
        var ratioval = $('input[name="ratioval"]:checked').val();
        var vertical = $('#box-vertical').val();
        var side = $('#box-side').val();
        var round = $('#round').val();
        var numberBox = $('input[name="fixed-check"]:checked').val();
        var ratioCalculationVariable;
        if(vertical && numberBox == 1){
            ratioCalculationVariable = new Decimal(ratioval);
            side = ratioCalculationVariable.times(vertical).toNumber();
            side = Math.floor(side*round)/round;
            $('#box-side').val(side);
        }else if(side && numberBox == 2){
            ratioCalculationVariable = new Decimal(side);
            vertical = ratioCalculationVariable.div(ratioval).toNumber();
            vertical = Math.floor(vertical*round)/round;
            $('#box-vertical').val(vertical);
        }
    }
    
    function fixedChenge(_this){
        if($(_this).attr('id') == 'box-vertical'){
            $('#fixed-check1').attr('checked',true);
        }else if($(_this).attr('id') == 'box-side'){
            $('#fixed-check2').attr('checked',true);
        }
    }
    
    // 比率のラジオボタンの値が変わった時
    //　縦・横のテキストボックスの値が変わった時
    // 表示桁数のセレクトボックスの値が変わった時
    $( 'input[name="ratioval"]:radio,#box-vertical,#box-side,#round' ).change( function() {
        ratioCalculation();
    });
    
    // 縦・横のテキストボックスがフォーカスされた時
    $('#box-vertical,#box-side').focus(function(){
        fixedChenge(this);
    });
    
    // 半角数字とdeleteキーとbackspaceキーとenterキーの入力を検知
    $('#box-vertical,#box-side').keyup(function(e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);
        if (str.match(/[0-9]/) || key == 46 || key == 8 || key == 13){
            ratioCalculation();
        }
    });
});

