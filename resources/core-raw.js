window.framework("func",(ael,csal)=>{

	/*
		update(fn) : register a function "fn" in the update list
		update(fn,true) : register a function "fn" in the resize list
		update() : execute all functions in the update list
	*/
	let update=(p,r)=>{
		if (p) {
			updateList.push(p);
			if (r) resizeList.push(p);
		}
		else updateList.forEach(i=>i());
	};
	let updateList=[],resizeList=[];
	csal("light",m=>{if (m.matches) updateList.forEach(i=>i());});
	csal("dark",m=>{if (m.matches) updateList.forEach(i=>i());});
	ael(window,"resize",()=>{
		resizeList.forEach(f=>f());
		setTimeout(()=>resizeList.forEach(f=>f()),100);
	});

	let cueManager=(callable)=>{
		let cues=[];
		f.update(()=>{
			if (callable()) for (let c of cues) c.func();
		});
		f.update(()=>{
			if (callable()) for (let c of cues) if (c.always) c.func();
		},true);
		let addCue=(a,f)=>cues.push({
			always:a,
			func:f
		});
		/*
			a: if false, called only when figures update or status.squared is changed, otherwise also called when the window resized
		*/

		return addCue;
	};

	let f={
		update:update,
		cueManager:cueManager,
		scheme:()=>{
			status.colorSchemePreferred=false;
			status.dark=!status.dark;
		}
	};

	return f;

});

window.framework("renderer",(svg,canvas,cd,ap,rc)=>{

	let d=cd("drawView");
	var current=-1;
	let list=[svg,canvas];

	let o={
		icon:"",
		length:list.length,
		view:d,
		next:()=>{
			var n=(current+1)%list.length;
			if (current>=0) {
				let c=list[current];
				rc(c.artifact);
				c.visible=false;
			}
			else n=floor(random()*2);
			let c=list[n];
			ap(d,c.artifact);
			c.visible=true;
			current=n;
			o.icon=c.icon;
		}
	};

	o.next();

	return o;

});

window.framework("node",(func,renderer,input,menu,cd,ap,rc,ael)=>{

	let b=cd("base");
	ap(b,cd("statusbar"));
	ap(b,renderer.view);
	ap(b,input);
	ap(b,menu.view);
	ap(b,menu.button);

	ael(window,"load",()=>{
		let body=document.body;
		while (body.firstChild) rc(body.firstChild);
		ap(body,b);
		func.update();
	});

});