(()=>{let c=document.createElement("canvas");let ct=c.getContext("2d");let style=k=>getComputedStyle(c).getPropertyValue(`--${k}`);let draw=o=>{let x=o.x,y=o.y,r=o.r,t=o.t,a=o.a,w=o.w/2,h=o.h/2,pr=window.devicePixelRatio;let line=(x1,y1,x2,y2)=>{ct.moveTo(w+x1,h-y1);ct.lineTo(w+x2,h-y2);};let hl=y=>line(-w,y,+w,y);let vl=x=>line(x,-h,x,+h);let circle=(x,y,r)=>{ct.moveTo(w+x+r,h-y);ct.arc(w+x,h-y,r,0,2*PI,false);};let curve=(x1,y1,x2,y2,x3,y3)=>{if (!isNaN(x1)&&!isNaN(y1)) ct.moveTo(x1+w,-y1+h);ct.quadraticCurveTo(x2+w,-y2+h,x3+w,-y3+h);};c.width=w*2;c.height=h*2;ct.clearRect(0,0,w*2,h*2);ct.beginPath();ct.lineWidth=1*pr;hl(0);vl(0);ct.strokeStyle=style("cartesian");ct.stroke();ct.lineWidth=3*pr;(()=>{if (!o.cartesian) return;ct.beginPath();ct.strokeStyle=style("cartesian");hl(y);vl(x);ct.stroke();})();(o=>{if (!o.on) return;let v=o.v;ct.beginPath();ct.strokeStyle=style("oblique");var mx,my;ct.lineWidth=1*pr;if (o.v) {mx=sign(v)*min(w,h*abs(1/v)),my=min(w*abs(v),h);line(-mx,-my,+mx,+my);mx=sign(v)*min(w,h*abs(v)),my=min(w/abs(v),h);line(-mx,-my,+mx,+my);}else {hl(0);vl(0);}ct.stroke();ct.beginPath();ct.lineWidth=3*pr;if (v) {line(max(-w,(-h-y)/v+x),max((-w-x)*v+y,-h),min(+w,(+h-y)/v+x),min((+w-x)*v+y,+h));line(max(-w,(-h-y)*v+x),max((-w-x)/v+y,-h),min(+w,(+h-y)*v+x),min((+w-x)/v+y,+h));}else {hl(y);vl(x);}ct.stroke();})(o.oblique);(()=>{if (!o.polar) return;if (r>0) {ct.beginPath();ct.strokeStyle=style("polar");circle(0,0,r);let R=hypot(w,h)*1.2;line(0,0,R*cos(t),R*sin(t));ct.stroke();}})();(o=>{if (!o.on) return;let R=hypot(w,h);let m=sqrt(w+R);let f=(p1,p2)=>{let a=(p1?+1:-1)/2*m**2;let b=p2*m*(p1?o.v:o.u);let c=(p1?-1:+1)/2*(p1?o.v:o.u)**2;curve(c,0,c,b/2,a+c,b);};ct.beginPath();ct.strokeStyle=style("parabolic");if (o.v==0) line(0,0,+w,0);else {f(true,+1);f(true,-1);}if (o.u==0) line(0,0,-w,0);else {if (o.v!=0) f(false,+1);ct.stroke();ct.beginPath();ct.strokeStyle=style("parabolic-counterpart");if (o.v==0) f(false,+1);f(false,-1);}ct.stroke();})(o.parabolic);(o=>{if (!o.on) return;ct.beginPath();ct.strokeStyle=style("elliptic");if (o.u==0) line(-a,0,+a,0);else ct.ellipse(w,h,a*cosh(o.u),a*sinh(o.u),0,0,2*PI,false);if ((y==0)&&(abs(x)>=a)) {let d=sign(x);line(+d*a,0,+d*w,0);ct.stroke();ct.beginPath();ct.strokeStyle=style("elliptic-counterpart");line(-d*a,0,-d*w,0);}else if (x==0) {let d=sign(y);if (d) line(0,0,0,+d*h);ct.stroke();ct.beginPath();ct.strokeStyle=style("elliptic-counterpart");if (d) line(0,0,0,-d*h);else vl(0);}else {let p=min(acosh(w/(a*abs(cos(o.v)))),asinh(h/(a*abs(sin(o.v)))))+0.1;let m=p/2;let f=(sx,sy)=>{let c=sx*cos(o.v),s=sy*sin(o.v);curve(a*c,0,a*c,a*s*(1/tanh(m)-1/sinh(m)),a*c*cosh(m),a*s*sinh(m));curve(NaN,NaN,a*c*(1/sinh(p)-1/sinh(m))/(1/tanh(p)-1/tanh(m)),a*s*(1/cosh(m)-1/cosh(p))/(tanh(p)-tanh(m)),a*c*cosh(p),a*s*sinh(p));};if (y!=0) f(+1,+1);ct.stroke();ct.beginPath();ct.strokeStyle=style("elliptic-counterpart");if (y==0) f(+1,+1);f(+1,-1);f(-1,+1);f(-1,-1);}ct.stroke();})(o.elliptic);(o=>{if (!o.on) return;ct.beginPath();ct.strokeStyle=style("bipolar");if (o.v==0) vl(0);else circle(a/tanh(o.v),0,abs(a/sinh(o.v)));if ((o.u==0)||(abs(o.u)==PI)) {let f1=()=>{line(+a,0,+w,0);line(-a,0,-w,0);},f2=()=>line(+a,0,-a,0);(o.u?f2:f1)();ct.stroke();ct.beginPath();ct.strokeStyle=style("bipolar-counterpart");(o.u?f1:f2)();}else {let x=w,y=-a/tan(o.u)+h,r=abs(a/sin(o.u));let t=[-atan2(-a/tan(o.u),+a),-atan2(-a/tan(o.u),-a)];ct.moveTo(a+w,h);ct.arc(x,y,r,t[0],t[1],o.u>0);ct.stroke();ct.beginPath();ct.strokeStyle=style("bipolar-counterpart");ct.arc(x,y,r,t[0],t[1],o.u<0);}ct.stroke();})(o.bipolar);ct.beginPath();ct.fillStyle=style("point");circle(x,y,10*pr);ct.fill();};window.res("canvas",{name:"Canvas",icon:"C",artifact:c,draw:draw,redrawOnSchemeChanged:true});})();