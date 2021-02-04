/**
 * Created by Administrator on 2018/1/5.
 */
;(function($){

    $.fn.timeLine = function(opt) {
        //���� Ĭ��ֵ
        var defaults = {
            w: 0,   //ÿһ��li�Ŀ���
            n:0,    //����ƶ��Ĵ���
            btnPrev:"#btnLeft",      //��һ����ť
            btnNext: "#btnRight",  //��һ����ť
            dateBox:"#yearList", //���ڵ�ul����
            dateArr: "#yearList li", //����ÿһ�����ڵ�����
            conBox:"#cUl",  //�����л����ݵ�ul����
            conArr:"#cUl li" //����ÿһ�����ݵ�����
            //init:function(){
            //    var _this=this;
            //}
        };

        opt = $.extend({}, defaults, opt);
        return this.each(function() {
            opt.btnPrev=$(opt.btnPrev);
            opt.btnNext=$(opt.btnNext);
            opt.dateBox=$(opt.dateBox);
            opt.dateArr=$(opt.dateArr);
            opt.conBox=$(opt.conBox);
            opt.conArr=$(opt.conArr);
            var liNum=opt.conArr.length;
            //��ʼ��li��λ��
            opt.conArr.each(function(i){
                $(this).css("left",opt.w*i+"px");
            })
            //���ұߵ���¼�
            opt.btnNext.on("click",function(){
                if(opt.n<liNum){
                    opt.n++;
                    (opt.n>=liNum)&&(opt.n=0);
                    updata();
                }
            })
            //����ߵ���¼�
            opt.btnPrev.on("click",function(){
                opt.n--;
                (opt.n<0)&&(opt.n=liNum-1);
                updata();
            })

            function updata(){
                opt.conBox.stop().animate({left:-(opt.w*opt.n)+'px'},300);
                opt.dateBox.stop().animate({left:-((90)*opt.n)+'px'},300);
                $(opt.dateArr[opt.n]).addClass("year-active").siblings().removeClass("year-active");
                $(opt.conArr[opt.n]).addClass("year-active").siblings().removeClass("year-active");
               
            }
        });
    }



})(jQuery);