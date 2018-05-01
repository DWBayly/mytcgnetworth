var re = /magic\/([^\/]*)\//
let str = "http://store.tcgplayer.com/magic/avacyn-restored/avacyn-angel-of-hope"
console.log(str.match(re)[1]);