(()=>{

	let ce=t=>document.createElementNS("http://www.w3.org/2000/svg",t),ap=(p,c)=>p.appendChild(c),ib=(e,a)=>a.parentNode.insertBefore(e,a),rc=c=>c.parentNode.removeChild(c),sa=(e,k,v)=>e.setAttribute(k,v),ra=(e,k)=>e.removeAttribute(k),ael=(e,t,f)=>e.addEventListener(t,f),sc=(e,c)=>{if (c) sa(e,"class",c);else ra(e,"class");return e;};

	let qm=(...args)=>{
		let g=ce("g");
		let l=Array.from(args).map(v=>ap(g,ce(v)));
		l.unshift(g);
		return l;
	};

	let s=ce("svg"),st=ce("style"),
	ax=qm("path"),
	ct=qm("path"),
	pl=qm("path"),
	ob=qm("path","path"),
	pb=qm("path","path"),
	ep=qm("path","path","path"),
	bp=qm("path","path"),
	pt=qm("circle");

	let gl=[ct,pl,ob,pb,ep,bp,pt],onOff=(g,w)=>{
		let p=g[0].parentNode;
		if (!w&&p) rc(g[0]);
		if (w&&!p) {
			var i=false;
			for (var n=0;n<gl.length;n++) {
				if (gl[n][0]==g[0]) i=true;
				else if (i&&gl[n][0].parentNode) {
					ib(g[0],gl[n][0]);
					i=false;
				}
				if (!g[0].parentNode) ap(s,g[0]);
			};
		}
	};

	(()=>{

		let pr=window.devicePixelRatio;

		ap(s,st);
		st.textContent=`
			svg>*{
				fill:none;
				stroke-width:${3*pr};
			}
			.thin{stroke-width:${1*pr};}
			.counterpart{opacity:0.3;}
		`;

		sa(ax[0],"style","stroke:var(--cartesian);");
		sc(ax[1],"thin");
		onOff(ax,true);

		sa(ct[0],"style","stroke:var(--cartesian);");

		sa(ob[0],"style","stroke:var(--oblique);");
		sc(ob[2],"thin");

		sa(pl[0],"style","stroke:var(--polar);");

		sa(pb[0],"style","stroke:var(--parabolic);");
		sc(pb[2],"counterpart");

		sa(ep[0],"style","stroke:var(--elliptic);");
		sc(ep[2],"counterpart");
		sc(ep[3],"counterpart thin");

		sa(bp[0],"style","stroke:var(--bipolar);");
		sc(bp[2],"counterpart");

		sa(pt[0],"style","fill:var(--point);");
		sa(pt[1],"r",10*pr);
		onOff(pt,true);

	})();

	let draw=o=>{
		let x=o.x,y=o.y,r=o.r,t=o.t,a=o.a,w=o.w/2,h=o.h/2;
		let oo=o.on;

		sa(s,"width",w*2);
		sa(s,"height",h*2);
		sa(s,"viewBox",`-${w} -${h} ${w*2} ${h*2}`);

		let curve=(x1,y1,x2,y2,x3,y3,rev,nm)=>{
			if (rev) {
				let t=`Q ${+x2} ${-y2} ${+x1} ${-y1}`;
				return (nm?"":`M ${+x3} ${-y3} `)+t;
			}
			else {
				let t=`Q ${+x2} ${-y2} ${+x3} ${-y3}`;
				return (nm?"":`M ${+x1} ${-y1} `)+t;
			}
		};
		/* draw line ax+by=c */
		let linear=(a,b,c)=>{
			if (a==0&&b==0) return "";
			else if (a==0) return `M ${-w},${-c/b} H ${+w}`;
			else if (b==0) return `M ${+c/a},${-h} V ${+h}`;
			else {
				let l=[+a*w+b*h-c,-a*w+b*h-c,-a*w-b*h-c,+a*w-b*h-c],p=[];
				if (l[1]*l[2]<0) p.push(-w,(c+a*w)/b);
				if (l[3]*l[0]<0) p.push(+w,(c-a*w)/b);
				if (l[0]*l[1]<0) p.push((c-b*h)/a,+h);
				if (l[2]*l[3]<0) p.push((c+b*h)/a,-h);
				if (l[0]==0) p.push(+w,+h);
				if (l[1]==0) p.push(-w,+h);
				if (l[2]==0) p.push(-w,-h);
				if (l[3]==0) p.push(+w,-h);
				if (p.length==4) return `M ${+p[0]},${-p[1]} L ${+p[2]},${-p[3]}`;
				else return "";
			}
		};

		sa(ax[1],"d",`M -${w},0 H ${w} M 0,-${h} V ${h}`);

		/* Cartesian */
		(()=>{
			onOff(ct,oo&1);
			if (!(oo&1)) return;
			sa(ct[1],"d",`M -${w},${-y} H ${w} M ${+x},-${h} V ${h}`);
		})();

		/* Oblique */
		(o=>{
			onOff(ob,oo&4);
			if (!(oo&4)) return;
			let v=o.v;
			sa(ob[1],"d",linear(+v,-1,v*x-y)+" "+linear(-1,+v,v*y-x));
			sa(ob[2],"d",linear(+v,-1,0)+" "+linear(-1,+v,0));
		})(o.oblique);

		/* Polar */
		(()=>{
			onOff(pl,oo&2);
			if (!(oo&2)) return;
			let R=hypot(w,h)*1.2;
			sa(pl[1],"d",`M ${r},0 A ${r},${r} 0 1 0 -${r},0 A ${r},${r} 0 1 0 ${r},0 M 0,0 L ${+R*cos(t)},${-R*sin(t)}`);
		})();

		/* Parabolic */
		(o=>{
			onOff(pb,oo&8);
			if (!(oo&8)) return;
			let R=hypot(w,h);
			let m=sqrt(w+R);
			var dm,dc="M 0,0";
			let f=(p1,p2,rev,nm)=>{
				let a=(p1?+1:-1)/2*m**2;
				let b=p2*m*(p1?o.v:o.u);
				let c=(p1?-1:+1)/2*(p1?o.v:o.u)**2;
				return curve(c,0,c,b/2,a+c,b,rev,nm);
			};
			/* v=Const. curve */
			if (o.v==0) dm="M 0,0 H "+w;
			else dm=f(true,+1,true,false)+" "+f(true,-1,false,true);
			/* u=Const. curve */
			if (o.u==0) dm+=" M 0,0 H -"+w;
			else if (o.v==0) dc=f(false,+1,true,false)+" "+f(false,-1,false,true);
			else {
				dm+=" "+f(false,+1);
				dc=f(false,-1);
			}
			sa(pb[1],"d",dm);
			sa(pb[2],"d",dc);
		})(o.parabolic);

		/* Elliptic */
		(o=>{
			onOff(ep,oo&16);
			if (!(oo&16)) return;
			var dm,dc,da;
			/* u=Const. curve */
			if (o.u==0) dm=`M ${a},0 H -${a}`;
			else {
				let c=a*cosh(o.u),s=a*sinh(o.u);
				dm=`M ${c},0 A ${c},${s} 0 1 0 -${c},0 A ${c},${s} 0 1 0 ${c},0`;
			}
			/* v=Const. curve */
			if ((y==0)&&(abs(x)>=a)) {
				let d=sign(x);
				dm+=` M ${+d*a},0 H ${+d*w}`;
				dc=`M ${-d*a},0 H ${-d*w}`;
			}
			else if (x==0) {
				let d=sign(y);
				if (d) {
					dm+=` M 0,0 V ${-d*h}`;
					dc=`M 0,0 V ${+d*h}`;
				}
				else dc=`M 0,-${h} V ${h}`;
			}
			else {
				let p=min(acosh(w/(a*abs(cos(o.v)))),asinh(h/(a*abs(sin(o.v)))))+0.1;
				let m=p/2;
				let f=(sx,sy,rev,nm)=>{
					let c=sx*cos(o.v),s=sy*sin(o.v);
					let l=[
						a*c,0,
						a*c,a*s*(1/tanh(m)-1/sinh(m)),
						a*c*cosh(m),a*s*sinh(m),
						a*c*(1/sinh(p)-1/sinh(m))/(1/tanh(p)-1/tanh(m)),
						a*s*(1/cosh(m)-1/cosh(p))/(tanh(p)-tanh(m)),
						a*c*cosh(p),a*s*sinh(p)
					];
					if (rev) return curve(l[8],l[9],l[6],l[7],l[4],l[5],false,nm)+" "+curve(NaN,NaN,l[2],l[3],l[0],l[1],false,true);
					else return curve(l[0],l[1],l[2],l[3],l[4],l[5],false,nm)+" "+curve(NaN,NaN,l[6],l[7],l[8],l[9],false,true);
				};
				if (y!=0) {
					dm+=" "+f(+1,+1);
					dc=f(+1,-1);
				}
				else dc=f(+1,-1,true,false)+" "+f(+1,+1,false,true);
				dc+=" "+f(-1,-1,true,false)+" "+f(-1,+1,false,true);
			}
			/* Asymptote */
			let c=abs(cos(o.v)),s=abs(sin(o.v));
			if (s==1) da="M 0,0";
			else if (c==1) da=`M ${w},0 H -${w}`;
			else {
				let mx=min(w,h*c/s),my=min(w*s/c,h);
				da=`M ${+mx},${+my} L ${-mx},${-my} M ${+mx},${-my} L ${-mx},${+my}`;
			}
			sa(ep[1],"d",dm);
			sa(ep[2],"d",dc);
			sa(ep[3],"d",da);
		})(o.elliptic);

		/* Bipolar */
		(o=>{
			onOff(bp,oo&32);
			if (!(oo&32)) return;
			var dm,dc;
			if ((abs(x)==a)&&(y==0)) dm="M 0,0",dc=`M -${w},0 H ${w}`;
			else {
				/* v=Const. curve */
				if (o.v==0) dm=`M 0,-${h} v ${2*h}`;
				else {
					var r=abs(a/sinh(o.v)),x=a/tanh(o.v),s=sign(x);
					dm=`M ${x-r*s},0 a ${r},${r} 0 1 1 ${+2*r*s},0 a ${r},${r} 0 1 1 ${-2*r*s},0`;
				}
				/* u=Const. curve */
				if ((o.u==0)||(abs(o.u)==PI)) {
					let l=[`H ${w} M -${w},0 H -${a}`,`H -${a}`];
					dm=`M ${a},0 ${o.u?l[1]:l[0]} `+dm;
					dc=`M ${a},0 `+(o.u>a?l[0]:l[1]);
				}
				else {
					let cy=-a/tan(o.u),r=abs(a/sin(o.u));
					dm=`M ${a},0 A ${r},${r} 0 ${y*cy<0?1:0} ${y>0?0:1} -${a},0 `+dm;
					dc=`M ${a},0 A ${r},${r} 0 ${y*cy<0?0:1} ${y>0?1:0} -${a},0`;
				}
			}
			sa(bp[1],"d",dm);
			sa(bp[2],"d",dc);
		})(o.bipolar);

		sa(pt[1],"cx",+x);
		sa(pt[1],"cy",-y);

	};

	window.res("svg",{
		name:"SVG",
		icon:"S",
		artifact:s,
		draw:draw,
		redrawOnSchemeChanged:false
	});

})();