window.framework("input",(func,status,renderer,data,cd,ael,bcr,abort)=>{

	if (!window.PointerEvent) {
		console.log("Pointer event is not supported on this browser");
		abort();
		return;
	}

	var w,h;

	let i=cd("inputView");

	/* Event listeners */
	var valid=false;
	let c=e=>{
		let x=+data.w*(e.clientX/w-0.5),y=-data.h*(e.clientY/h-0.5);
		switch (status.inputMode) {
			case 0:
				data.x=x;
				data.y=y;
				break;
			case 1:
				if (x!=0) data.a=abs(x);
				break;
			case 2:
				switch (sign(abs(y)-abs(x))) {
					case  0:data.oblique.v=sign(x*y);break;
					case +1:data.oblique.v=x/y;break;
					case -1:data.oblique.v=y/x;break;
				}
				break;
		}
		func.update();
	};
	ael(i,"pointerdown",e=>{
		if (!e.isPrimary) return;
		valid=true;
		c(e);
		e.preventDefault();
		return false;
	});
	ael(i,"pointermove",e=>{
		if (!valid) return;
		if (!e.isPrimary) return;
		c(e);
		e.preventDefault();
		return false;
	});
	let end=e=>{
		valid=false;
		e.preventDefault();
	};
	ael(i,"pointerup",end);
	ael(i,"pointercancel",end);
	ael(i,"pointerout",end);
	ael(i,"pointerleave",end);

	let tcd=n=>{
		if (status.coordinates&n) status.coordinates-=n;
		else status.coordinates+=n;
	};
	ael(window,"keyup",e=>{
		switch (e.key) {
			case "d":renderer.next();func.update();break;
			case "m":status.inputMode=(status.inputMode+1)%3;break;
			case "x":case "y":tcd(1);break;
			case "r":case "t":tcd(2);break;
			case "o":tcd(4);break;
			case "p":tcd(8);break;
			case "e":tcd(16);break;
			case "b":tcd(32);break;
		}
	});

	/* Watch input rect size */
	func.update(()=>{
		let r=bcr(i);
		w=r.width;
		h=r.height;
	},true);

	return i;

});