var xhr = (function(){
  function _doAjax(opt){
    var o;
    if(window.XMLHttpRequest){
      o = new XMLHttpRequest();
    }else{
      o = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(!o){
      throw new Error('您的浏览器不支持AJAX请求');
    }

    var opt = opt || {},
        type = (opt.type || 'GET').toUpperCase(),
        async = (opt.async + '' === 'false') ? false : true,
        dataType = opt.dataType || 'JSON',
        jsonp = opt.jsonp || 'cb',
        jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
        url = opt.url,
        data = opt.data || null,
        timeout = opt.timeout || 30000,
        error = opt.error || function(){},
        success = opt.success || function(){},
        complete = opt.complete || function(){},
        t = null;

    if(!url){
      throw new Error('您没有填写URL');
    }


    function randomNum(){
      var num = '';
      for(var i = 0; i < 20; i++){
        num += Math.floor(Math.random()*10);
      }

      return num;

    }

    if(dataType.toUpperCase() === 'JSONP' && type !== 'GET'){
      throw new Error('如果dataType为JSONP，请您将type设置为GET');
    }

    if(dataType.toUpperCase() === 'JSONP'){
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1 
                  ? url + '?' + jsonp + '=' + jsonpCallback
                  : url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      // 创建jsonpCallback回调函数
      window[jsonpCallback] = function(data){
        success(data);
      }

      return;

    }

    

    o.onreadystatechange = function(){
      if(o.readyState === 4){
        if((o.status >= 200 && o.status < 300) || o.status === 304){
          switch(dataType.toUpperCase()){
            case 'JSON':
              success(JSON.parse(o.responseText));
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText));
          }
          complete();
          clearTimeout(t);
          t = null;
        }
      }
    }

    o.open(url, type, async);
    if(type === 'POST'){
      o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    o.send(formatData(data));


    t = setTimeout(function(){
      complete();
      clearTimeout(t);
      t = null;
      o = null;
    }, timeout);

    function formatData(data){
      var dataStr = '';
      for(key in data){
        dataStr += (key + '=' + data[key] + '&');
      }
      dataStr.replace(/$\&/, '');
      return dataStr;
    }
  }
  return {
    ajax: _doAjax(opt),
    post: function(url, data, callback){
      _doAjax({
        url: url,
        type: 'POST',
        data: data,
        success: callback
      })
    },
    get: function(url, callback){
      _doAjax({
        url: url,
        type: 'GET',
        success: callback
      })
    }
  }
})();