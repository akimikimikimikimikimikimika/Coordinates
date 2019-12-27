window.framework("preset",()=>{
	return {
		c:{x:1/6,y:1/8},
		a:1/12,
		v:0.3
	};
});



window.framework("header",{
	resources:[
		"preset","func","status","data","svg","canvas","renderer","input","menu","node"
	],
	func:{
		args:["ael","csal"]
	},
	status:{
		args:["func","sc","csm","html"]
	},
	data:{
		args:["preset","func","status","bcr","dpr"]
	},
	svg:{
		args:["func","data","cse","ap","ib","rc","sa","sc","dpr"]
	},
	canvas:{
		args:["func","data","che","gs","dpr"]
	},
	renderer:{
		args:["svg","canvas","cd","ap","rc"]
	},
	input:{
		args:["func","status","renderer","data","cd","ael","bcr","abort"]
	},
	menu:{
		args:["func","status","renderer","cd","ap","sa","ael","cc","tc"]
	},
	node:{
		args:["func","renderer","input","menu","cd","ap","rc","ael"]
	}
});