// var a = 1;

// test('jsonp');
(function(document){
  var oInput = document.getElementById('J-input'),
      oList = document.getElementsByClassName('J-list')[0],
      oListWrap = oList.parentNode,
      tpl = document.getElementById('J-tpl').innerHTML;

  
  var  init = function(){
    bindEvent();
  }

  function bindEvent(){
    // 绑定input事件处理函数
    oInput.addEventListener('input', searchInput, false);
  }

  function searchInput(){
    // 获取输入的内容和长度
    var val = trimSpace(this.value),
        len = val.length;

    // 长度大于0就执行获取数据的函数
    if(len > 0){
      getDatas(val, 'setDatas');
    }else{
      oListWrap.style.display = 'none';
      oList.innerHTML = '';
    }
  }

  function getDatas(value, callbackName){
    // 动态创建script节点
    var oScript = document.createElement('script');
    // 引用服务端脚本
    oScript.src =  'https://www.baidu.com/sugrec?prod=pc&wd='+ value +'&cb='+ callbackName;
    // 将script节点挂到DOM树上
    document.body.appendChild(oScript);
    // 移除，由于script节点挂到DOM树上时已经加载好内容，所以不用延迟删除节点
    document.body.removeChild(oScript);

    // 根据传入的参数创建函数
    window[callbackName] = function(data){
      var result = data.g;
      // 执行渲染函数
      renderList(result); 
    }
  }

  function trimSpace(value){
    return value.replace(/\s+/g, '');
  }

  function renderList(data){
    var val = trimSpace(oInput.value);
    if(data.length > 0){
      var list = '';
      oListWrap.style.display = 'block';
      data.forEach(function(item, index){
        if(index < 4){
          list += tpl.replace(/\{\{(.*?)\}\}/gim, function(node, key){
            return {
              wd: item.q,
              keyword: _setWdStyle(val, item.q)
            }[key];
          });
        }
      });

      oList.innerHTML = list;

    }else{
      oListWrap.style.display = 'none';
      oList.innerHTML = '';
    }

  }

  // 给搜索出的结果加样式，关键字为灰色，其余与关键字有关内容为黑色
  function _setWdStyle(value, word){
    return '<span class="font-normal">' + value +'</span>' +  word.replace(value,'');
  }

  init();

})(document);
