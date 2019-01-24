$(function(){
    // decimal.jsの計算用変数
    var decimalCalculation;
    function columnMarginCalculation(){
        var contentSize = $('#content-size').val();
        var columnMargin = $('#column-margin').val();
        var columns = $('#columns').val();
        var round = $('#round').val();
        var columnsOneLess = columns - 1; 
        if(columnMargin && contentSize && columns > 1  && columns < 10){
            // マージンの合計値を算出
            decimalCalculation = new Decimal(columnMargin);
            columnMargin = decimalCalculation.times(columnsOneLess).toNumber();
            columnCalculation(contentSize,columnMargin,columns,round);
        }
    }
    // 画面幅・カラム間のマージン・カラム数・表示桁数
    function columnCalculation(contentSize,columnMargin,columns,round){
        console.log('test');
        var remainingColumnPx,fixedColumnPercent,fixedColumnPx,totalPxRemainingColumn,
        remainingColumns,totalPxColumns,contentsTotalSize;
        var columnSwitch = $('input[name="column-switch"]:checked').map(function(){return Number($(this).val());}).get();
        var columnSwitchLength = columnSwitch.length;
        var fixedTotalcolumn = 0;
        var contentsTotalPercent = 0;
        if(columnSwitchLength > 0 && columns >= columnSwitch[columnSwitchLength - 1] && columns > columnSwitch[columnSwitchLength - 1]){
            for(var h=0; h<columnSwitchLength; h++){
                fixedColumnPx = Number($('#column-px' + columnSwitch[h]).val());
                // 選択されているカラムの合計値を算出
                decimalCalculation = new Decimal(fixedColumnPx);
                fixedTotalcolumn = decimalCalculation.plus(fixedTotalcolumn).toNumber();
                // 選択されているカラムの％を算出・出力
                decimalCalculation = new Decimal(fixedColumnPx);
                fixedColumnPercent = decimalCalculation.div(contentSize).toNumber();
                fixedColumnPercent = Math.floor(fixedColumnPercent*100*round);
                decimalCalculation = new Decimal(fixedColumnPercent);
                fixedColumnPercent = decimalCalculation.div(round).toNumber();
                decimalCalculation = new Decimal(fixedColumnPercent);
                contentsTotalPercent = decimalCalculation.plus(contentsTotalPercent).toNumber();
                $('#column-percent' + columnSwitch[h]).val(fixedColumnPercent);
            }
            
            if(columnSwitchLength != columns){
                // コンテンツサイズ　- マージンの合計値　＝ 列の合計ピクセル
                decimalCalculation = new Decimal(contentSize);
                totalPxColumns = decimalCalculation.minus(columnMargin).toNumber();
                // 列合計ピクセル - 選択されているカラムの合計値 = 残った列の合計ピクセル
                decimalCalculation = new Decimal(totalPxColumns);
                totalPxRemainingColumn = decimalCalculation.minus(fixedTotalcolumn).toNumber();
                
                // 列の合計数　- 選択されているカラム数　= 残った列の合計数
                remainingColumns = columns - columnSwitchLength;
                // = 残ったカラムの各px数（表示桁数の対応済み）
                decimalCalculation = new Decimal(totalPxRemainingColumn);
                remainingColumnPx = decimalCalculation.div(remainingColumns).toNumber();
                remainingColumnPx = Math.floor(remainingColumnPx*round)/round;
                // 残ったカラムの各%数
                decimalCalculation = new Decimal(remainingColumnPx);
                fixedColumnPercent = decimalCalculation.div(contentSize).toNumber();
                fixedColumnPercent = Math.floor(fixedColumnPercent*100*round);
                decimalCalculation = new Decimal(fixedColumnPercent);
                fixedColumnPercent = decimalCalculation.div(round).toNumber();
                
                for (var i = 0; i < 9; i++) {
                    if($.inArray(i,columnSwitch) == -1 && columns > i) {
                        $('#column-px'+i).val(remainingColumnPx);
                        $('#column-percent'+i).val(fixedColumnPercent);
                    }else if($.inArray(i,columnSwitch) !== -1){
                    }else{
                        $('#column-px'+i).val("");
                        $('#column-percent'+i).val("");
                    }
                }
                // カラムの合計pxを再計算
                decimalCalculation = new Decimal(remainingColumnPx);
                contentsTotalSize = decimalCalculation.times(remainingColumns).toNumber();
                decimalCalculation = new Decimal(fixedTotalcolumn);
                contentsTotalSize = decimalCalculation.plus(contentsTotalSize).toNumber();
                decimalCalculation = new Decimal(columnMargin);
                contentsTotalSize = decimalCalculation.plus(contentsTotalSize).toNumber();
                $('#contents-total-size').val(contentsTotalSize);
                // カラムの合計%を再計算
                decimalCalculation = new Decimal(fixedColumnPercent);
                fixedColumnPercent = decimalCalculation.times(remainingColumns).toNumber();
                decimalCalculation = new Decimal(fixedColumnPercent);
                contentsTotalPercent = decimalCalculation.plus(contentsTotalPercent).toNumber();
                decimalCalculation = new Decimal(columnMargin);
                columnMargin = decimalCalculation.div(10).toNumber();
                decimalCalculation = new Decimal(columnMargin);
                contentsTotalPercent = decimalCalculation.plus(contentsTotalPercent).toNumber();
                $('#contents-total-percent').val(contentsTotalPercent);
            }else{
                // 全部が固定されていた時
                for (var i = 0; i < 9; i++) {
                    if($.inArray(i,columnSwitch) == -1) {
                        $('#column-px'+i).val("");
                        $('#column-percent'+i).val("");
                    }
                }
                // 合計pxの算出・出力
                decimalCalculation = new Decimal(columnMargin);
                fixedTotalcolumn = decimalCalculation.plus(fixedTotalcolumn).toNumber();
                $('#contents-total-size').val(fixedTotalcolumn);
                
                // 合計%の算出・出力
                decimalCalculation = new Decimal(columnMargin);
                columnMargin = decimalCalculation.div(10).toNumber();
                decimalCalculation = new Decimal(columnMargin);
                contentsTotalPercent = decimalCalculation.plus(contentsTotalPercent).toNumber();
                $('#contents-total-percent').val(contentsTotalPercent);
            }
        }else if(columnSwitchLength == 0){
            decimalCalculation = new Decimal(contentSize);
            remainingColumnPx = decimalCalculation.minus(columnMargin).toNumber();
            decimalCalculation = new Decimal(remainingColumnPx);
            remainingColumnPx = decimalCalculation.div(columns).toNumber();
            remainingColumnPx =  Math.floor(remainingColumnPx*round)/round;
            decimalCalculation = new Decimal(remainingColumnPx);
            fixedColumnPercent = decimalCalculation.div(contentSize).toNumber();
            fixedColumnPercent = Math.floor(fixedColumnPercent*100*round);
            decimalCalculation = new Decimal(fixedColumnPercent);
            fixedColumnPercent = decimalCalculation.div(round).toNumber();
            for(var i = 0; i < 9; i++){
                if(columns > i){
                    $('#column-px'+i).val(remainingColumnPx);
                    $('#column-percent'+i).val(fixedColumnPercent);
                }else{
                    $('#column-px'+i).val("");
                    $('#column-percent'+i).val("");
                }
            }
            decimalCalculation = new Decimal(remainingColumnPx);
            contentsTotalSize = decimalCalculation.times(columns).toNumber();
            decimalCalculation = new Decimal(contentsTotalSize);
            contentsTotalSize = decimalCalculation.plus(columnMargin).toNumber();
            $('#contents-total-size').val(contentsTotalSize);
            
            decimalCalculation = new Decimal(fixedColumnPercent);
            contentsTotalPercent = decimalCalculation.times(columns).toNumber();
            decimalCalculation = new Decimal(columnMargin);
            columnMargin = decimalCalculation.div(10).toNumber();
            decimalCalculation = new Decimal(columnMargin);
            contentsTotalPercent = decimalCalculation.plus(contentsTotalPercent).toNumber();
            $('#contents-total-percent').val(contentsTotalPercent);
        }
    }
    function pxFixedChange(_this){
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
    
    // 各値が変わった時、
    // $( '#content-size,#column-margin,#total-margin,#columns,#round').change( function() {
    //     columnMarginCalculation();
    // });
    $( '#round').change( function() {
        columnMarginCalculation();
    });
    $('.column-px').focus(function(){
        pxFixedChange(this);
    });
    // 各inputがフォーカスされ、ラジオボタンの値が変わった時、
    $('.column-switch').change(function(){
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

