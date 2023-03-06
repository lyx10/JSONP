// 历史上的今天JSONP API
// https://api.asilu.com/today/?callback=jQuery191015391240878762824_1548487987902&&_=1548487987909

;(function(doc){
  var oDate = doc.getElementsByClassName('J_date')[0],
      oBtn = doc.getElementsByClassName('J_searchBtn')[0],
      oList = doc.getElementsByClassName('J-list')[0],
      oTpl = doc.getElementById('J_tpl').innerHTML;

  var init = function(){
    addDate();
    bindEvent();
  }

  function bindEvent(){
    addEvent(oBtn, 'click', dataRequest);
  }

  function dataRequest(){
    xhr.ajax({
      url: 'https://api.asilu.com/today',
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'callback',
      jsonpCallback: 'query',
      success: function(res){
        var data = res.data;
        renderList(data);
      }
    });
  }

  function renderList(data){
    if(data && data.length > 0){
      var list = '';
      data.forEach(function(item){
        list += oTpl.replace(/\{\{(.*?)\}\}/gim, function(node, key){
          return {
            link: item.link,
            year: item.year,
            title: item.title
          }[key];
        })
      });

      oList.innerHTML = list;

    }else{
      oList.innerHTML = '暂无数据~';
    }
  }

  function addDate(){
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate();

      oDate.textContent = `${y}年${m}月${d}日`;
  }

  init();

})(document);