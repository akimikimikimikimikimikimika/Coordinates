(()=>{

	let ce=t=>document.createElement(t),cd=i=>{let d=ce("div");if (i) d.id=i;return d;},ap=(p,c)=>p.appendChild(c),rc=c=>c.parentNode.removeChild(c),ael=(e,t,f)=>e.addEventListener(t,f);

	let main=()=>{

		if (!window.PointerEvent) {
			console.log("Pointer event is not supported on this browser");
			return;
		}

		/* Renderer management */
		var current=floor(Math.random()*2);
		let renderer=[
			canvasRenderer,svgRenderer
		];


		/* Functions */
		let funcs={
			resized:()=>{
				let r=d.getBoundingClientRect(),pr=window.devicePixelRatio;
				let w=r.width*pr,h=r.height*pr;
				let c=(coord.w!=w)||(coord.h!=h);
				if (c) {
					coord.w=w;
					coord.h=h;
					input.resized();
				}
				return c;
			},
			schemeChanged:()=>{
				setTimeout(()=>{
					let r=renderer[current];
					if (r.redrawOnSchemeChanged) r.draw(coord);
				},300);
			},
			renderer:()=>{
				while (d.firstChild) rc(d.firstChild);
				current=(current+1)%renderer.length;
				ap(d,renderer[current].artifact);
				menu.renderer(renderer[current].icon);
				coord.calc();
			},
			pointer:()=>{
				let s=status;
				s.inputMode=(s.inputMode+1)%3;
				menu.pointer((["c","a","v"])[s.inputMode]);
			},
			calc:()=>coord.calc(),
			draw:()=>renderer[current].draw(coord),
			buttonUpdate:()=>menu.update()
		};

		let status=statusInit(funcs);
		let coord=coordInit(status,funcs);
		let input=inputInit(coord,status,funcs);
		let menu=menuInit(status,coord,funcs);

		ael(window,"resize",()=>{
			if (funcs.resized()) funcs.draw();
			setTimeout(()=>{
				if (funcs.resized()) funcs.draw();
			},100);
		});

		/* Nodes */
		let d=cd("drawView");
		(()=>{
			let b=ap(document.body,cd("base"));
			ap(b,cd("statusbar"));
			ap(b,d);
			ap(b,input.view);
			ap(b,menu.view);
			ap(b,menu.button);
		})();

		(()=>{
			funcs.resized();
			coord.x=coord.w/6,coord.y=coord.h/8,coord.a=coord.w/12,coord.oblique.v=0.3;
			funcs.renderer();
		})();

	};

	var canvasRenderer,svgRenderer,coordInit,inputInit,menuInit,statusInit;
	new Promise(r=>{

		var counter=0;
		let getResource=(n,s)=>{
			switch (n) {
				case "canvas":
					canvasRenderer=s;
					counter++;
					break;
				case "svg":
					svgRenderer=s;
					counter++;
					break;
				case "calculator":
					coordInit=s;
					counter++;
					break;
				case "input":
					inputInit=s;
					counter++;
					break;
				case "menu":
					menuInit=s;
					counter++;
					break;
				case "status":
					statusInit=s;
					counter++;
					break;
			}
			confirm();
		};
		let confirm=()=>{
			if (counter==6) {
				delete window.res;
				r();
			}
		};
		window.res=(n,s)=>getResource(n,s);

	}).then(main);

})();