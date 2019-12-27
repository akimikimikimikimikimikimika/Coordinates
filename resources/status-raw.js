window.framework("status",(func,sc,csm,html)=>{

	let update=t=>{
		let c=[
			"js",
			t.colorSchemePreferred?"pcs":(t.dark?"dark":"light"),
			msl[ms]
		];
		if (t.standalone) c.push("standalone");
		if (t.browser) c.push(t.browser.toLowerCase());
		sc(html,c.join(" "));
	};
	let getter=(t,p)=>{
		if (p=="dark") {
			if (t.colorSchemePreferred) return csm("dark");
			else return t.dark;
		}
		else return t[p];
	};
	let setter=(t,p,v)=>{
		if ((p=="menuShown")&&(t[p]!=v)) {
			if (msi) clearTimeout(msi);
			ms=v?1:3;
			msi=setTimeout(()=>{
				ms=v*2;
				msi=null;
				update(t);
			},v?0:500);
		}
		if ((p=="dark")&&t.colorSchemePreferred) return;
		if ((p=="coordinates")&&(t[p]!=v)&&func) {
			t[p]=v;
			func.update();
		}
		t[p]=v;
		update(t);
		func.update();
	};
	var msi=null;
	let msl=["menu-hidden","before-menu-shown","menu-shown","hiding-menu"];
	var ms=0;

	let t={
		menuShown:false,
		dark:csm("dark"),
		colorSchemePreferred:csm("light")||csm("dark"),
		inputMode:0,
		coordinates:1,
		browser:null,
		standalone:false,
		online:false
	};

	let s=new Proxy(t,{get:getter,set:setter});

	(()=>{
		t.standalone=navigator.standalone===true||(/standalone=yes/).test(location.search);
		if (window.ApplePaySession) t.browser="Safari";
		if (window.chrome) t.browser="Chrome";
		if (window.sidebar) t.browser="Firefox";
		s.online=(()=>{
			let p=location.protocol;
			return /https/.test(p)||(/http/.test(p)&&location.hostname=="localhost");
		})();
	})();

	if (s.online) try{
		["../Library/ServiceWorker.js","ServiceWorker.js"].forEach(f=>navigator.serviceWorker.register(f).then(r=>r.update()));
	}catch(e){}

	return s;

});