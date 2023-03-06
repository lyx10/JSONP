//https://api.douban.com/v2/music/search?q=关键字&callback=回调函数&count=返回条数

;(function(doc){
  
  var oInput = doc.getElementById('J_searchInput'),
      searchItemTpl = doc.getElementById('J_searchItemTpl').innerHTML,
      oList = doc.getElementsByClassName('J_list')[0],

      musicCount = 7;

  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    oInput.addEventListener('input', debounce(musicSearch, 500, false), false);
  }

  function showList(show){
    if(show){
      oList.style.display = 'block';
    }else{
      oList.innerHTML = '';
      oList.style.display = 'none';
    }
  }

  function renderList(data){
    var list = '';
    data.forEach(function(elem){
      list += searchItemTpl.replace(/\{\{(.*?)\}\}/gim, function(node, key){
        return {
          url: elem.alt,
          title: elem.title,
          image: elem.image,
          singer: elem.singer ? elem.singer : ''
        }[key];
      })
    });

    oList.innerHTML = list;
    showList(true);

  }

  function musicSearch(){
    var keyword = trimSpace(oInput.value),
        len = kw.length;
    if(len > 0){
      dataRequest(keyword, musicCount);
    }else{
      showList(false);
    }
  }

  function dataRequest(keyword, musicCount){
    xhr.ajax({
      url: 'https://api.douban.com/v2/music/search?q='+ keyword + '&count=' + musicCount,
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'callback',
      success: function(data){
        // 判断是否有内容可渲染
        if(data && data.musics.length > 0){
          renderList(data.musics);
          showList(ture);
        }
      }
    });
  }
  
  init();
})(document);



// X百度音乐搜索JSONP API
// http://tingapi.ting.baidu.com/v1/restserver/ting/?callback=jQuery191015391240878762824_1548487987902&query=歌名关键字&method=baidu.ting.search.common&_=1548487987915


// 个人身份基本信息JSONP API
// https://api.asilu.com/idcard/?callback=jQuery191015391240878762824_1548487987902&id=身份证号码&_=1548487987911

// 淘宝商品联想词JSONP API
// http://suggest.taobao.com/sug?code=utf-8&q=商品关键字&callback=cb
// 手机号码归属地、运营商查询JSONP API
// https://www.baifubao.com/callback?cmd=1059&callback=phone&phone=手机号
// 当前所在城市天气JSONP API
// https://api.asilu.com/weather_v2/?callback=jQuery191015391240878762824_1548487987902&&_=1548487987905