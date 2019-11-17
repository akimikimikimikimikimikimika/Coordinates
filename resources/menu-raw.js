(()=>{

	let ce=t=>document.createElement(t),cd=(i,c,t)=>{let d=ce("div");if (i) d.id=i;if (c) d.className=c;if (t) d.textContent=t;return d;},ap=(p,c)=>p.appendChild(c),sa=(e,k,v)=>e.setAttribute(k,v),ael=(e,t,f)=>e.addEventListener(t,f),cc=(e,c)=>e.classList.contains(c),tc=(e,c)=>e.classList.toggle(c);

	var status,funcs;

	/* Convert a div element to button */
	let mb=(d,a)=>{

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

	/* Toggle buttons */
	let tb=[
		["Cartesian","xy"],
		["Polar","rθ"],
		["Oblique","OB"],
		["Parabolic","PB"],
		["Elliptic","EP"],
		["Bipolar","BP"]
	].map((d,i)=>{
		let id=d[0].toLowerCase(),dg=2**i;
		let b=mb(cd(null,id,d[1]),()=>{
			if (status.coordinates&dg) status.coordinates-=dg;
			else status.coordinates+=dg;
		});
		sa(b,"title",d[0]+" coordinate");
		return b;
	});
	let update=()=>{
		let c=status.coordinates;
		tb.forEach((e,i)=>{
			let has=!!(c&(2**i));
			if (cc(e,"on")!=has) tc(e,"on");
		});
	};

	/* Create menu nodes */
	let mv=cd("menuView");
	let ms=ap(mv,cd("menuShadow"));
	let m=ap(ap(mv,cd("menuContainer")),cd("menu"));

	let close=()=>status.menuShown=false;
	mb(ms,close);

	/* Menu buttons */
	mb(ap(m,cd(null,null,"CS")),()=>{
		status.colorSchemePreferred=false;
		status.dark=!status.dark;
	});
	let rb=mb(ap(m,cd()),()=>funcs.renderer());
	tb.forEach(e=>ap(m,e));
	let pb=mb(ap(m,cd(null,null,"c")),()=>funcs.pointer());
	mb(ap(m,cd(null,null,"×")),close);
	let b=mb(cd("menuButton"),()=>status.menuShown=!status.menuShown);

	let o={
		view:mv,
		button:b,
		renderer:v=>rb.textContent=v,
		pointer:v=>pb.textContent=v,
		update:update
	};

	window.res("menu",(s,c,f)=>{
		status=s,coord=c,funcs=f;
		update();
		return o;
	});

})();