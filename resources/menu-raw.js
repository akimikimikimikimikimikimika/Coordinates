window.framework("menu",(func,status,renderer,cd,ap,sa,ael,cc,tc)=>{

	/* Convert a div element to button */
	let mb=(t,a)=>{

		var d;
		if (typeof(t)=="string") d=ap(m,cd(null,null,t));
		else d=t;

		sa(d,"role","button");

		var active=false;
		ael(d,"pointerdown",e=>{
			active=true;
			e.stopPropagation();
		});
		ael(d,"pointerup",e=>{
			if (active) a();
			active=false;
			e.stopPropagation();
		});
		let disable=e=>{
			if (active) active=false;
			e.stopPropagation();
		};
		ael(d,"pointermove",disable);
		ael(d,"pointercancel",disable);
		ael(d,"pointerout",disable);
		ael(d,"pointerleave",disable);

		return d;
	};

	/* update function */
	func.update(()=>{
		pb.textContent=(["c","a","v"])[status.inputMode];
		rb.textContent=renderer.icon;
		let c=status.coordinates;
		tb.forEach((e,i)=>{
			let has=!!(c&(2**i));
			if (cc(e,"on")!=has) tc(e,"on");
		});
	});

	/* Toggle buttons */
	var tb=[
		["Cartesian","xy"],
		["Polar","rθ"],
		["Oblique","OB"],
		["Parabolic","PB"],
		["Elliptic","EP"],
		["Bipolar","BP"]
	];

	/* Create menu nodes */
	let mv=cd("menuView");
	let ms=ap(mv,cd("menuShadow"));
	let m=ap(ap(mv,cd("menuContainer")),cd("menu"));

	let close=()=>status.menuShown=false;
	mb(ms,close);

	/* Menu buttons */
	mb("CS",()=>{
		status.colorSchemePreferred=false;
		status.dark=!status.dark;
	});
	let rb=mb("",()=>{
		renderer.next();
		func.update();
	});
	tb=tb.map((d,i)=>{
		let dg=2**i;
		let b=mb(d[1],()=>{
			if (status.coordinates&dg) status.coordinates-=dg;
			else status.coordinates+=dg;
		});
		tc(b,d[0].toLowerCase());
		sa(b,"title",d[0]+" coordinate");
		return b;
	});
	let pb=mb("c",()=>status.inputMode=(status.inputMode+1)%3);
	mb("×",close);
	let b=mb(cd("menuButton"),()=>status.menuShown=!status.menuShown);

	let o={
		view:mv,
		button:b
	};

	return o;

});