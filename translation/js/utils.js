function trimSpace(str){
	return str.replace(/\s+/gim, '');
}

function debounce(fn, time, triggleNow){
  var t = null,
      res;

  var debounced = function(){
    var _self = this,
        args = arguments;

    if(t){
      clearTimeout(t);
    }

    if(triggleNow){
      var exec = !t;
      t = setTimeout(function(){
        t = null;
      }, time);

      if(exec){
        res = fn.apply(_self, args);
      }
    }else{
      t = setTimeout(function(){
        res = fn.apply(_self, args);
      }, time);
    }
    return res;
  }

  debounced.remove = function(){
    clearTimeout(t);
    t = null;
  }

  return debounced;
}