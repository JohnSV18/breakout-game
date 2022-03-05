(()=>{"use strict";const t=class{constructor(t=0,i=0,e=0,s=0,h="#f00"){this.x=t,this.y=i,this.width=e,this.height=s,this.color=h}render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}},i=class extends t{constructor(t,i,e,s="",h="black",r="16px Arial"){super(i,e,0,0,h),this.font=r,this.text=t,this.value=s}render(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`${this.text} ${this.value}`,this.x,this.y)}};class e extends t{constructor(t,i,e=75,s=20,h="orange"){super(t,i,e,s,h),this.status=1,this.bricks=[],this.brickRowCount=3,this.brickColumnCount=5,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=30}setBricks(){for(let t=0;t<this.brickColumnCount;t+=1){this.bricks[t]=[];for(let i=0;i<this.brickRowCount;i+=1){this.bricks[t][i]=new e;const s=t*(this.width+this.brickPadding)+this.brickOffsetLeft,h=i*(this.height+this.brickPadding)+this.brickOffsetTop;this.bricks[t][i].x=s,this.bricks[t][i].y=h}}}brickCollisionDetection(t,i){for(let e=0;e<this.brickColumnCount;e+=1)for(let s=0;s<this.brickRowCount;s+=1){const h=this.bricks[e][s];1===h.status&&t.x>h.x&&t.x<h.x+h.width&&t.y>h.y&&t.y<h.y+h.height&&(t.dy=-t.dy,h.status=0,i.value+=1,i.value===this.brickRowCount*this.brickColumnCount&&(window.confirm("YOU WIN, CONGRATULATIONS!"),document.location.reload()))}}render(t){for(let i=0;i<this.brickColumnCount;i+=1)for(let e=0;e<this.brickRowCount;e+=1){const s=this.bricks[i][e];1===s.status&&(t.beginPath(),t.rect(s.x,s.y,s.width,s.height),t.fillStyle=e%2==0&&i%2==0||e%2==1&&i%2==1?"#000000":"orange",t.fill(),t.closePath())}}}const s=e,h=document.getElementById("myCanvas"),r=h.getContext("2d"),o=h.width/2,n=h.height-30,d=(h.width-75)/2;let c=!1,l=!1;const a=new class extends t{render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}}(0,0,h.width,h.height,"teal"),u=new class extends t{constructor(t,i,e=10,s="yellow"){super(t,i,0,0,s),this.radius=e,this.dx=2,this.dy=-2}move(){this.x+=this.dx,this.y+=this.dy}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}}(o,n),f=new class extends t{constructor(t,i,e=75,s=10,h="red"){super(t,i,e,s,h)}render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height,this.color),t.fillStyle=this.color,t.fill(),t.closePath()}}(d,h.height-10),y=new i("Lives: ",h.width-65,20,3),w=new i("Break Out!",200,20),x=new i("Score: ",8,20,0),k=new s;document.addEventListener("keydown",(function(t){"Right"===t.key||"ArrowRight"===t.key?c=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(l=!0)}),!1),document.addEventListener("keyup",(function(t){"Right"===t.key||"ArrowRight"===t.key?c=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(l=!1)}),!1),document.addEventListener("mousemove",(function(t){const i=t.clientX-h.offsetLeft;i>0&&i<h.width&&(f.x=i-f.width/2)}),!1),function t(){r.clearRect(0,0,h.width,h.height),a.render(r),k.setBricks(),k.brickCollisionDetection(u,x),k.render(r),u.render(r),u.move(),f.render(r),x.render(r),y.render(r),w.render(r),u.y+u.dy<u.radius?u.dy=-u.dy:u.y+u.dy>h.height-u.radius&&(u.x>f.x&&u.x<f.x+f.width?u.dy=-u.dy:(y.value-=1,y.value?(u.x=h.width/2,u.y=h.height-30,u.dx=2,u.dy=-2,f.x=(h.width-f.width)/2):(window.confirm("GAME OVER"),document.location.reload()))),(u.x+u.dx<u.radius||u.x+u.dx>h.width-u.radius)&&(r.fillStyle="#FF0000",r.fill(),u.dx=-u.dx),c?(f.x+=13,f.x+f.width>h.width&&(f.x=h.width-f.width)):l&&(f.x-=13,f.x<0&&(f.x=0)),requestAnimationFrame(t)}()})();