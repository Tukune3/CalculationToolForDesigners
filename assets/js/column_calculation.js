$(function(){
    // decimal.jsの計算用変数
    var decimalCalculation;
    function columnMarginCalculation(){
        var contentSize = $('#content-size').val();
        var columnMargin = $('#column-margin').val();
        var totalMargin = $('#total-margin').val();
        var columns = $('#columns').val();
        var round = $('#round').val();
        var fixedFlag = $('input[name="fixed-flag"]:checked').val();
        var columnNumberOneLess = columns - 1;
        // 条件１　マージンの合計値を算出
        if(columnMargin && columns > 1 && columns < 10 && (fixedFlag == 2 || fixedFlag == 4)){
            decimalCalculation = new Decimal(columnMargin);
            totalMargin = decimalCalculation.times(columnNumberOneLess).toNumber();
            totalMargin = Math.floor(totalMargin*round)/round;
            $('#total-margin').val(totalMargin);
            columnCalculation(contentSize,columnMargin,totalMargin,columns,round);
            // 条件２　カラム間のマージンを算出
        }else if(totalMargin && columns && columns > 1  && columns < 10 && (fixedFlag == 3 || fixedFlag == 4)){
            decimalCalculation = new Decimal(totalMargin);
            columnMargin = decimalCalculation.div(columnNumberOneLess).toNumber();
            columnMargin = Math.floor(columnMargin*round)/round;
            $('#column-margin').val(columnMargin);
            columnCalculation(contentSize,columnMargin,totalMargin,columns,round);
            // 条件３　コンテンツサイズを入力した時に
        }else if(contentSize && columns && columns > 1  && columns < 10 && fixedFlag == 1){
            columnCalculation(contentSize,columnMargin,totalMargin,columns,round);
        }
    }
    function columnCalculation(contentSize,columnMargin,totalMargin,columns,round){
        var pxSumValue,percentSumValue,columnSwitchValue,totalPxRemainingColumn,remainingColumns,totalPxColumn;
        var columnSwitchSum = 0;
        var columnSwitch = $('input[name="column-switch"]:checked').map(function(){return Number($(this).val());}).get();
        var columnSwitchLength = columnSwitch.length;
        if(columnSwitchLength > 0 && columns >= columnSwitch[columnSwitchLength - 1] && columns > columnSwitch[columnSwitchLength - 1]){
            $.each(columnSwitch,function(index,val){
                columnSwitchValue = Number($('#column-px' + val).val());
                // 選択されているカラムの合計値を算出
                decimalCalculation = new Decimal(columnSwitchValue);
                columnSwitchSum = decimalCalculation.plus(columnSwitchSum).toNumber();
                // 選択されているカラムの％を算出・出力
                decimalCalculation = new Decimal(columnSwitchValue);
                percentSumValue = decimalCalculation.div(contentSize).toNumber();
                percentSumValue = Math.floor(percentSumValue*round*100)/round;
                $('#column-percent' + val).val(percentSumValue);
            });
            // コンテンツサイズ　- マージンの合計値　＝ 列の合計ピクセル
            decimalCalculation = new Decimal(contentSize);
            totalPxColumn = decimalCalculation.minus(totalMargin).toNumber();
            // 列合計ピクセル - 選択されているカラムの合計値 = 残った列の合計ピクセル
            decimalCalculation = new Decimal(totalPxColumn);
            totalPxRemainingColumn = decimalCalculation.minus(columnSwitchSum).toNumber();
            // 列の合計数　- 選択されているカラム数　= 残った列の合計数
            remainingColumns = columns - columnSwitchLength;
            // = 残ったカラムの各px数（表示桁数の対応済み）
            decimalCalculation = new Decimal(totalPxRemainingColumn);
            pxSumValue = decimalCalculation.div(remainingColumns).toNumber();
            pxSumValue = Math.floor(pxSumValue*round)/round;
            // 残ったカラムの各%数
            decimalCalculation = new Decimal(pxSumValue);
            percentSumValue = decimalCalculation.div(contentSize).toNumber();
            percentSumValue = Math.floor(percentSumValue*round*100)/round;
            
            for (var i = 0; i < 9; i++) {
                if($.inArray(i,columnSwitch) == -1 && columns > i) {
                    $('#column-px'+i).val(pxSumValue);
                    $('#column-percent'+i).val(percentSumValue);
                }else if($.inArray(i,columnSwitch) !== -1){
                }else{
                    $('#column-px'+i).val("");
                    $('#column-percent'+i).val("");
                }
            }
        }else if(columnSwitchLength == 0){
            decimalCalculation = new Decimal(contentSize);
            pxSumValue = decimalCalculation.minus(totalMargin).toNumber();
            decimalCalculation = new Decimal(pxSumValue);
            pxSumValue = decimalCalculation.div(columns).toNumber();
            pxSumValue = Math.floor(pxSumValue*round)/round;
            decimalCalculation = new Decimal(pxSumValue);
            percentSumValue = decimalCalculation.div(contentSize).toNumber();
            percentSumValue = Math.floor(percentSumValue*round*100)/round;
            for(var i = 0; i<9; i++){
                if(columns > i){
                    $('#column-px'+i).val(pxSumValue);
                    $('#column-percent'+i).val(percentSumValue);
                }else{
                    $('#column-px'+i).val("");
                    $('#column-percent'+i).val("");
                }
            }
        }
    }
    
    function fixedChenge(_this){
        switch($(_this).attr('id')){
            case 'content-size':
            $('#fixed-check1').attr('checked',true);
            break;
            case 'column-margin':
            $('#fixed-check2').attr('checked',true);
            break;
            case 'total-margin':
            $('#fixed-check3').attr('checked',true);
            break;
            case 'columns':
            $('#fixed-check4').attr('checked',true);
            break;
        }
    }
    
    function pxFixedChenge(_this){
        switch($(_this).attr('id')){
            case 'column-px0' :
            $('#column-switch0').attr('checked',true);
            break;
            case 'column-px1' :
            $('#column-switch1').attr('checked',true);
            break;
            case 'column-px2' :
            $('#column-switch2').attr('checked',true);
            break;
            case 'column-px3' :
            $('#column-switch3').attr('checked',true);
            break;
            case 'column-px4' :
            $('#column-switch4').attr('checked',true);
            break;
            case 'column-px5' :
            $('#column-switch5').attr('checked',true);
            break;
            case 'column-px6' :
            $('#column-switch6').attr('checked',true);
            break;
            case 'column-px7' :
            $('#column-switch7').attr('checked',true);
            break;
            case 'column-px8' :
            $('#column-switch8').attr('checked',true);
            break;
        }
    }
    
    // 各値が変わった時、
    $( '#content-size,#column-margin,#total-margin,#columns').change( function() {
        columnMarginCalculation();
    });
    // 各テキストボックスがフォーカスされた時
    $('#content-size,#column-margin,#total-margin,#columns').focus(function(){
        fixedChenge(this);
    });
    $('.column-px').focus(function(){
        pxFixedChenge(this);
    });
    // 各inputがフォーカスされ、ラジオボタンの値が変わった時、
    $('#round,.column-switch').change(function(){
        columnMarginCalculation();
    });
    // 半角数字とdeleteキーとbackspaceキーとenterキーの入力を検知
    $('#content-size,#column-margin,#total-margin,#columns,.column-px,.column-percent').keyup(function(e) {
        var key = e.keyCode;
        var str = String.fromCharCode(key);
        if (str.match(/[0-9]/) || key == 46 || key == 8 || key == 13 || key == 38 || key == 40){
            columnMarginCalculation();
        }
    });
});

