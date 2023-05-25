// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


 //let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];
 //+++++++++++++++++++++++++設定畫points所有點的物件變數

 var ball  //目前要處理的物件,暫時放在ball變數內
 var balls =[] // 一群很多個,把產生"所有"的物件,為物件倉庫
 //+++++++++++++設定飛彈變數
 var bullet //目前要處理的物件,暫時放在bullet變數內
 var bullets=[] //把產生"所有"的物件,為物件倉庫,所有物件都在這
 //+++++++++++++++++++++++++++
 var score =0
let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，大象
var fill_colors = "03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8".split("-").map(a=>"#"+a)
var line_colors = "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a".split("-").map(a=>"#"+a)

//class:類別,粒子//先宣告
 class Obj{  //宣告一個類別,針對一個畫的圖案 鼻子
  constructor(args){ //預設值.基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
    //this.p = args.p||{x:random(width),y:random(height)}  //描述為該物件的初始位置
                                  //||(or),當產生一個物件時,有傳給位置參數,則使用該參數,如果沒有傳參數,就已||後為設定
    this.p = args.p||createVector(random(width),random(height))
    //this.v = {x:random(-1,1),y:random(-1,1)}//設定一個物件移動速度
    this.v =createVector(random(-1,1),random(-1,1))//把原本把原本(x:...,y:.....)改成"向量"
    this.size =random(15,30)  //一個物件的放大倍率
    this.color =random(fill_colors)//充滿顏色
    this.stroke =random(line_colors)//外框線條顏色
  }
  draw(){  //畫出單一個物件形狀
    push()// 執行push()後,依照我的設定,設定原點(0,0)的位置
     translate(this.p.x,this.p.y)//以該物件為原點
     scale(this.v.x<0?1:-1,-1)//x軸放大倍率如果this.v.x<0條件成立,值為1,否則為-1,y軸-1為上下轉
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(4)//線條粗細
     beginShape()
     for(var k=0; k<points.length;k=k+1){
       //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)//須提供兩個點的座標
       //vertex(points[k][0]*this.size,points[k][1]*this.size)//只要設定一個點,當指令到endshape(),會把所有的點串接再一起
       curveVertex(points[k][0]*this.size,points[k][1]*this.size)//畫線為圓弧
    }
    endShape()
    pop() //執行pop()後,原點設定回到整個視窗左上角
  }
  update(){ //移動程式碼
    this.p.x =this.p.x+this.v.x  //x軸目前位置(this.p.x)加上x軸的移動速度(this.v.x)
    this.p.y =this.p.y+this.v.y //y軸目前位置(this.p.y)加上y軸的移動速度(this.v.y)
    this.p.add(this.v) //設定好向量,使用add與上面兩行指令一樣
    // 向量sub==>減號
    
    //知道滑鼠的位置,並建立滑鼠的向量
    let mouseV =createVector(mouseX,mouseY)//滑鼠位置轉換成一個向量值
    let delta = mouseV.sub(this.p).limit(this.v.mag()*2) //sud計算出滑鼠所在位置向量(mouseV)到物件向量(this.p),每次以3的距離移動,(this.v.mag()*2)為一個大小方向、物件速度大小
    this.p.add(delta)



    if(this.p.x<=0||this.p.x>=width){   //x軸碰到左邊(<=0),或是碰到左邊(>=width)
      this.v.x=-this.v.x // 把方向速度改變
    }
    if(this.p.y<=0||this.p.y>=height){  //y軸碰到上邊(<=0),或是碰到下邊(>=height)
      this.v.y=-this.v.y //把y軸方向速度改變

    }
  }
  isBallInRanger(){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
    let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算兩點(滑鼠按下及物件中心)之間的距離,放到d變數內
    if(d<4*this.size){
      return true // 滑鼠與物件的距離小於物件寬度,代表碰觸了,則傳回true的值(碰觸)
    }else{
      return false // 滑鼠與物件的距離大於物件寬度,代表沒有碰觸了,則傳回false的值(沒碰觸)
    }


  }
}
// class Bullet{
//  constructor(args){

//  }
//  draw(){ //匯出物件程式碼

//  }
//  update(){ //計算移動後的位置

//  }

//}

//+++++++++++++++++++++++++設定畫points所有點的物件變數

function setup() {
  createCanvas(windowWidth,windowHeight);
for(var i=0;i<10;i=i+1){ //i=0,1,2,4,6,8圈
 ball =new Obj({})   //產生一個新的obj class元件
 balls.push(ball)  //把ball的物件放入balls陣列內
}

}

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball =balls[j]
  //   ball.draw()
  //   ball.update()
  //}
  //大象顯示
  for(let ball of balls) //陣列的方式,都可以利用此方式處理
  {
  ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
         balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被按滑鼠按到的物件編號,(balls.indexOf(ball))
        bullets.splice(bullets.indexOf(bullet),1)
        score = score +1
       }
  }
  //炸彈顯示
  for(let bullet of bullets) //陣列的方式,都可以利用此方式處理
  {
    
   bullet.draw()
   bullet.update()
  }
}
  textSize(50)
  text(score,50,50) //在座標為(50,50)上,顯示score分數內容
  push()//重新規劃原點(0,0),在視窗中間
  let dx =mouseX - width/2
  let dy =mouseY - height/2
  let angle =atan2(dy,dx)
   translate(width/2,height/2)//將原點放中心
   fill("#219ebc")
   noStroke()
   rotate(angle)
   triangle(-25,25,-25,-25,50,0)//設定三個點,畫成一個三角形
   ellipse(0,0,50)
   pop()//恢復原本設定,原點(0,0),在視窗中間
}

function mousePressed(){//滑鼠按下
  //+++++++++++++產生一個物件
  // ball =new Obj({
  //   P:{x:mouseX,y:mouseY}
  // })   //在滑鼠按下的地方,產生一個新的obj class元件
  // balls.push(ball)  //把ball的物件放入balls陣列內(丟到倉庫)
  //+++++++++++++++++++++++

  //在物件上按下滑鼠,物件消失,加1分
// for(let ball of balls){  //檢查每一個物件
//  if(ball.isBallInRanger(mouseX,mouseY)){
//   balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被按滑鼠按到的物件編號,(balls.indexOf(ball))
//   score = score +1
//  }
// }
// //+++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++按一下產生飛彈
bullet =new Bullet({
  r:50
}) //在滑鼠按下的地方,產生一個新的obj class元件(產生一個飛彈)
bullets.push(bullet)//把bullet的物件放入bullet陣列內(丟到倉庫)
}