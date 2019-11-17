(()=>{

	let ael=(e,t,f,o)=>e.addEventListener(t,f,o);

	var status,coord,funcs,w,h;

	let i=document.createElement("div");
	i.id="inputView";

	/* Event listeners */
	var valid=false;
	let c=e=>{
		let x=+coord.w*(e.clientX/w-0.5),y=-coord.h*(e.clientY/h-0.5);
		switch (status.inputMode) {
			case 0:
				coord.x=x;
				coord.y=y;
				break;
			case 1:
				if (x!=0) coord.a=abs(x);
				break;
			case 2:
				switch (sign(abs(y)-abs(x))) {
					case  0:coord.oblique.v=sign(x*y);break;
					case +1:coord.oblique.v=x/y;break;
					case -1:coord.oblique.v=y/x;break;
				}
				break;
		}
		coord.calc();
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
			case "d":funcs.renderer();break;
			case "m":funcs.pointer();break;
			case "x":case "y":tcd(1);break;
			case "r":case "t":tcd(2);break;
			case "o":tcd(4);break;
			case "p":tcd(8);break;
			case "e":tcd(16);break;
			case "b":tcd(32);break;
		}
	});

	/* Watch input rect size */
	let resized=()=>{
		let r=i.getBoundingClientRect();
		w=r.width;
		h=r.height;
	};
	ael(window,"resize",resized);

	window.res("input",(c,s,f)=>{
		coord=c;
		status=s;
		funcs=f;
		return {
			view:i,
			resized:resized
		};
	});

})();