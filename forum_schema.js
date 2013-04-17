

Schema = function (data) {

}

ForumSchema = [
	"_id", 
	"name", 
	"group", 
	"image_url", 
	"threads", 
	"posts", 
	"order", 
	"join_group",
	"created_time"
];

ThreadSchema = [
	"_id", 
	"fid", 		//forum id
	"author_id",  	//作者ID
	"author",		//作者名字
	"created_time", //创建时间
	"subject",		//标题
	"first_post",	//1楼
	"lastpost",		//最后回复时间
	"lastpost_id",	//左后回复的作者ID
	"lastposter",	//最后回复的作者名
	"attachment",	//附件URL
	"replies",		//回复数量
	"views",		//查看次数
	"closed"		//帖子是否关闭
];

PostSchema = [
	"_id",
	"fid",			//论坛ID
	"tid",			//帖子ID
	"author_id",	//
	"author",
	"message",		//回复内容
	"stars",		//被赞次数
	"author_ip",	//
	"invisible"		//是否可见， 被屏蔽
];

UserProfile = [
	"alias",		//昵称
	"avatar",		//头像URL
	"created_time",	//创建时间
	"last_login",	//最后登陆时间
	"credit",		//声望
	"score",		//积分
	"group_id",		//用户所属组
	"threads",		//发表的主题
	"friends",		//用户好友IDS
];

Group = [
	"_id",
	"name"
]








