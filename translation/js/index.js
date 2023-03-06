// 有道翻译JSONP API
// http://fanyi.youdao.com/openapi.do?keyfrom=Skykai521&key=977124034&type=data&doctype=jsonp&version=1.1&callback=jQuery1910&q=关键词&_=1548487987913
;(function(doc){
  var oSearchInput = doc.getElementsByClassName('J_searchInput')[0],
      oList = doc.getElementsByClassName('J-list')[0];

  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    oSearchInput.addEventListener('input', debounce(searchInput, 800, false), false);
  }

  function searchInput(){
    var keyword = oSearchInput.value,
        len = trimSpace(keyword).length;

    if(len > 0){
      dataRequest(keyword, 'renderList');
    }else{
      oList.innerHTML = '';
    }
  }

  function dataRequest(keyword, callbackName){
    
    var oScript = doc.createElement('script');
    oScript.src = 'http://fanyi.youdao.com/openapi.do?keyfrom=Skykai521&key=977124034&type=data&doctype=jsonp&version=1.1&callback='+ callbackName +'&q='+ keyword +'&_=1548487987913';
    doc.body.appendChild(oScript);
    doc.body.removeChild(oScript);

    window[callbackName] = function(data){
      var datas = data.translation,
          len = datas.length;

      if(len > 0){
        oList.innerHTML = '';
        datas.forEach(function(elem){
          render(elem);
        });
      }
    }
  }

  function render(data){
    var oLi = doc.createElement('li');
    oLi.className = 'list-item';
    oLi.textContent = data;
    oList.appendChild(oLi);
  }
  init();
})(document);