

const ap = new APlayer({
    container: document.getElementById('aplayer'),
	
    fixed: true, 		// 吸底模式
	//mini: true,		// mini 模式
    autoplay: false,	// 自动播放
	theme: '#eee' ,		//主题色
	loop: 'all', 		// 循环播放, 可选值: 'all', 'one', 'none'
	order: 'list',		// 循环顺序, 可选值: 'list', 'random'
	preload: 'auto',	// 预加载，可选值: 'none', 'metadata', 'auto'
	volume: 0.7,		// 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
	mutex: true,		// 阻止多个播放器同时播放
	listFolded: false,	// 列表默认折叠
	listMaxHeight: 90,	// 列表最大高度
	lrcType: 1,
    audio: [
      {
        name: "清新的小女孩 (For Ma)", 		//名称
        artist: 'July Tun',			// 艺术家 
        url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_4208162&response=res&type=convert_url&',				//链接 
        cover: 'http://imge.kugou.com/stdmusic/150/20200114/20200114142306429193.jpg',	//封面
		//theme: '#b7daff', 			//音频时的主题色
      }
    ]
});