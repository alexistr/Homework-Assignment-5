/*
*
* Some funtions to test
*
*/

"use strict";

const lib = {};
//parametre <tag>-<id>-<id_mat>-<id_elv>
//return {tag:<tag>,id:<id>,id_mat:<id_mat>,id_elv:<id_elv>}
lib.parseArgsToObject = (args) => {
  args = typeof(args) == 'string' ? args : '';
  let [tag,id,id_mat,id_elv] = args.split('-');
  tag = typeof(tag) == 'string' && tag.trim().length > 0 ? tag : false;
  id = Number.isInteger(parseInt(id)) ? parseInt(id) : false;
  id_mat = Number.isInteger(parseInt(id_mat)) ? parseInt(id_mat) : false;
  id_elv = Number.isInteger(parseInt(id_elv)) ? parseInt(id_elv) : false;
  if(tag && id!==false && id_mat!==false && id_elv!==false) {
    // args has been parse to object return it
    return {'tag' : tag, 'id' : id, 'id_mat': id_mat,'id_elv': id_elv};
  } else {
    // It was impossible to parse args
    return false;
  }
};

//Iterate the haystack for needle, callback the index when found or false
lib.findNeedle = (haystack,needle,callback) => {
  haystack = haystack != null && typeof haystack[Symbol.iterator] === 'function' ? haystack : false;
  if(haystack!== false) {
    let index = false;
    for(let i=0; i < haystack.length;i++) {
      if(haystack[i] == needle) {
          index = i;
          break;
      }
    }
    callback(false,index);
  } else {
    callback({'Erreur': 'haystack is not iterable' });
  }

};

// export lib

module.exports = lib;
