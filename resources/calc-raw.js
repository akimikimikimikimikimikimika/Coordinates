(()=>{

	var status,funcs;

	let calc=()=>{
		o.on=status.coordinates;
		o.r=hypot(o.y,o.x),o.t=atan2(o.y,o.x);
		let t2=o.t+(o.t<0?2*PI:0);
		/* Oblique */
		if (o.on&4) {
			let c=o.oblique;
			let γ=sqrt(1-v**2);
			c.x=γ*o.x-v*γ*o.y;
			c.y=γ*o.y-v*γ*o.x;
		}
		/* Parabolic */
		if (o.on&8) o.parabolic={
			u:sqrt(2*o.r)*cos(t2/2),
			v:sqrt(2*o.r)*sin(t2/2)
		};
		/* Elliptic */
		if (o.on&16) {
			var u,v;
			if (o.y==0) {
				if (abs(o.x)>=o.a) {
					v=o.x<0?PI:0;
					u=acosh(o.x/cos(v)/o.a);
				}
				else {
					u=0;
					v=acos(o.x/o.a);
				}
			}
			else {
				u=solve(1,-4/(o.a**2)*(o.x**2+o.y**2),8*((o.x**2-o.y**2)/(o.a**2)-0.5)).map(e=>{
					if (e<0) return [];
					else return solve(1,-e,1).map(u=>log(u)/2).filter(u=>u>=0);
				}).flat()[0];
				v=atan2(o.y/(o.a*sinh(u)),o.x/(o.a*cosh(u)));
			}
			o.elliptic={
				u:u,
				v:v
			};
		}
		/* Bipolar */
		if (o.on&32) {
			var u=0;
			if (o.r==o.a) u=sign(o.y)*PI/2;
			else {
				u=atan((2*o.y*o.a)/(o.r**2-o.a**2));
				if (o.r<o.a) u+=PI*(o.y<0?-1:+1);
			}
			let v=atanh((2*o.x*o.a)/(o.r**2+o.a**2));
			o.bipolar={
				u:u,
				v:v
			};
		}
		funcs.draw();
	};

	let o={
		x:0,y:0,r:0,t:0,a:0,w:0,h:0,
		on:0,
		oblique:{x:0,y:0,v:0},
		parabolic:{u:0,v:0},
		elliptic:{u:0,v:0},
		bipolar:{u:0,v:0},
		calc:calc
	};

	window.res("calculator",(s,f)=>{
		status=s,funcs=f;
		return o;
	});

})();