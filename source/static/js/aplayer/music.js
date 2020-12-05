
window.simon = [];

var audio = [];
var names = ['下山','看海'];


function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};
document.cookie = 'kg_mid=${this.Md5('+guid()+')};expires = Session';


var url="https://songsearch.kugou.com/song_search_v2";
var headers = {
    'Accept': '*/*',
	"Content-Type": "application/json",
};
var data = {
	keyword: name,
	platform: 'WebFilter',
	format: 'json',
	page: 1,
	pagesize: 2
};
function get_m(url='', headers={}, data={}) {
	var dtd = $.Deferred();
	$.ajax({
		type: 	'get',
		url: 	url,
		dataType: 	'jsonp',
		headers: 	headers,
		data: 	data
	}).then(function(data){
        dtd.resolve(data);
    }, function(){
        //console.error("获取失败");
        dtd.reject();
    });
	return dtd.promise();
};
/*
var js_file = "/static/js/aPlayer/APlayer.min.js";
get_m(js_file);
var js_file = "/static/js/aPlayer/music.js";
get_m(js_file);*/

names.forEach((name)=>{  
	data.keyword = name;
	get_m(url,headers,data).then(res=>{
		if(res.status==1){
			// 歌曲hash
			FileHash = res.data.lists[0].FileHash;
			// 加盐值后加密值
			//M5 = CryptoJS.MD5(FileHash.toLowerCase()+'kgcloudv2')+'';
			//console.log(M5);
			//
			get_m("http://kugou.com/yy/index.php",{},
				{
					r:'play/getdata',
					hash:FileHash
				}).then(results=>{
						console.log(results);
					if(results.status==1){
						window.simon = window.simon.concat({
							name:results.data.song_name, 
							artist:results.data.author_name, 
							url:results.data.play_url, 
							cover:results.data.img, 
							lrc:results.data.lyrics,
						});	/*
						ap.list.add([{
							name:results.data.song_name, 
							artist:results.data.author_name, 
							url:results.data.play_url, 
							cover:results.data.img, 
							lrc:results.data.lyrics,
						}])*/
					}
				})
		};
	});/*
	if(names[names.length-1] == name){
		const ap = new APlayer({
			container: document.getElementById('aplayer'),

			fixed: true, 		// 吸底模式
			//mini: true,		// mini 模式
			autoplay: false,	// 自动播放
			theme: '#b7daff' ,		//主题色
			loop: 'all', 		// 循环播放, 可选值: 'all', 'one', 'none'
			order: 'list',		// 循环顺序, 可选值: 'list', 'random'
			preload: 'auto',	// 预加载，可选值: 'none', 'metadata', 'auto'
			volume: 0.7,		// 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
			mutex: true,		// 阻止多个播放器同时播放
			listFolded: false,	// 列表默认折叠
			listMaxHeight: 120,	// 列表最大高度
			lrcType: 1,seek: 5,
			audio: [],
		});
		ap.list.add(window.simon);
	}*/
});


const ap = new APlayer({
	container: document.getElementById('aplayer'),

	fixed: true, 		// 吸底模式
	//mini: true,		// mini 模式
	autoplay: false,	// 自动播放
	theme: '#b7daff' ,		//主题色
	loop: 'all', 		// 循环播放, 可选值: 'all', 'one', 'none'
	order: 'list',		// 循环顺序, 可选值: 'list', 'random'
	preload: 'auto',	// 预加载，可选值: 'none', 'metadata', 'auto'
	volume: 0.7,		// 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
	mutex: true,		// 阻止多个播放器同时播放
	listFolded: false,	// 列表默认折叠
	listMaxHeight: 120,	// 列表最大高度
	lrcType: 1,seek: 5,
	audio: [],
});
		console.log(window.simon);
		ap.list.add(window.simon);

var temp_auto =[
	
];