(()=>{

	let sa=(e,k,v)=>e.setAttribute(k,v),ra=(e,k)=>e.removeAttribute(k),sc=(e,c)=>{if (c) sa(e,"class",c);else ra(e,"class");return e;},html=document.documentElement;

	let cs=(()=>{
		let mm=s=>window.matchMedia(`(prefers-color-scheme: ${s})`);
		return {
			light:mm("light"),
			dark:mm("dark")
		};
	})();
	var funcs;

	let update=t=>{
		let c=[
			"js",
			t.colorSchemePreferred?"pcs":(t.dark?"dark":"light"),
			msl[ms]
		];
		if (t.standalone) c.push("standalone");
		if (t.browser) c.push(t.browser.toLowerCase());
		sc(html,c.join(" "));
		switch (t.scheme) {
			case 0:t.dark=false;break;
			case 2:t.dark=true;break;
			case 1:t.dark=cs.dark.matches;break;
		}
	};
	let setter=(t,p,v)=>{
		if ((p=="dark")&&(t[p]!=v)&&funcs) funcs.schemeChanged();
		if ((p=="menuShown")&&(t[p]!=v)) {
			if (msi) clearTimeout(msi);
			ms=v?1:3;
			msi=setTimeout(()=>{
				ms=v*2;
				msi=null;
				update(t);
			},v?0:500);
		}
		if ((p=="coordinates")&&(t[p]!=v)&&funcs) {
			t[p]=v;
			funcs.buttonUpdate();
			funcs.calc();
		}
		t[p]=v;
		update(t);
	};
	var msi=null;
	let msl=["menu-hidden","before-menu-shown","menu-shown","hiding-menu"];
	var ms=0;

	let s=new Proxy({
		menuShown:false,
		dark:false,
		inputMode:0,
		coordinates:1,
		colorSchemePreferred:false,
		browser:null,
		standalone:false,
		online:false
	},{set:setter});

	(()=>{
		s.standalone=navigator.standalone||(/standalone=yes/).test(location.search);
		s.online=(()=>{
			let p=location.protocol;
			return /https/.test(p)||(/http/.test(p)&&location.hostname=="localhost");
		})();
		if (window.ApplePaySession) s.browser="Safari";
		if (window.chrome) s.browser="Chrome";
		if (window.sidebar) s.browser="Firefox";
		let csp=cs.light.matches||cs.dark.matches;
		s.colorSchemePreferred=csp;
		if (csp) s.dark=cs.dark.matches;
		cs.light.addListener(m=>{if (s.colorSchemePreferred&&m.matches) s.dark=false;});
		cs.dark.addListener(m=>{if (s.colorSchemePreferred&&m.matches) s.dark=true;});
	})();

	if (s.online) try{
		["../Library/ServiceWorker.js","ServiceWorker.js"].forEach(f=>navigator.serviceWorker.register(f).then(r=>r.update()));
	}catch(e){}

	window.res("status",f=>{
		funcs=f;
		return s;
	});

})();