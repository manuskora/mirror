let capture
let tracker


function setup() {

    createCanvas(800, 600).parent('p5')

    // start capturing video
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    // create the tracker
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)

}

function draw() {

    // draw background stuff
    background(0)

    // show the mirrored video feed
    showFlippedCapture()

    // get new data from tracker
    let features = tracker.getCurrentPosition()


    // sometimes the tracker doesn't capture anything100
    // in that case, we want to stop the function right here using 'return'
    if (features.length == 0) {
        return
    }
    let flength = features[7].y-features[33].y
    let fwidth = features[7].x-features[33].x
    let fsize = pow(pow(flength,2)+pow(fwidth,2),.5)
    let tilt_y = (features[37].y-features[33].y)/(features[7].y-features[37].y)
    let point74 = {x:features[33].x-(fwidth),y:features[33].y-(.1+tilt_y)*(flength)}
    let point77 = {x:features[0].x-.4*(features[4].x-features[0].x),y:features[0].y-tilt_y*.4*(features[4].y-features[0].y)}
    let point71 = {x:features[14].x-.4*(features[10].x-features[14].x),y:features[14].y-tilt_y*.4*(features[10].y-features[14].y)}
    let point76 = {x:features[0].x-3.5*(features[1].x-features[0].x),y:features[0].y-(tilt_y+2.5)*(features[1].y-features[0].y)}
    let point72 = {x:features[14].x-3.5*(features[13].x-features[14].x),y:features[14].y-(tilt_y+2.5)*(features[13].y-features[14].y)}
    let point78 = {x:(point72.x+point74.x)/2,y:(point72.y+point74.y)/2}
    let point79 = {x:(point76.x+point74.x)/2,y:(point76.y+point74.y)/2}
    let point73 = {x:point78.x-(.03+.03*tilt_y)*(features[7].x-point78.x),y:point78.y-(.03+.03*tilt_y)*(features[7].y-point78.y)}
    let point75 = {x:point79.x-(.03+.03*tilt_y)*(features[7].x-point79.x),y:point79.y-(.03+.03*tilt_y)*(features[7].y-point79.y)}
    let point80 = {x:(point74.x+tilt_y*features[33].x)/(tilt_y+1),y:(point74.y+tilt_y*features[33].y)/(tilt_y+1)}

    // 'features' is an array of objects with x, y properties
    // for (let feature of features) {
    //     stroke(255,255,255,0)
    //     fill(255,255,255,100)
    //     circle(feature.x, feature.y, 4)
    //
    // }

    let jaw=[features[0],
    features[1],
    features[2],
    features[3],
    features[4],
    features[5],
    features[6],
    features[7],
    features[8],
    features[9],
    features[10],
    features[11],
    features[12],
    features[13],
    features[14],
    point71,
    point72,
    point73,
    point74,
    point75,
    point76,
    point77
    ]

    let left_eye =[features[23],
    features[63],
    features[24],
    features[64],
    features[25],
    features[65],
    features[26],
    features[66],
    ]
    let right_eye =[features[28],
    features[67],
    features[29],
    features[68],
    features[30],
    features[69],
    features[31],
    features[70],
  ]

  let upper_lip = [ features[44],
  features[45],
  features[46],
  features[47],
  features[48],
  features[49],
  features[50],
  features[59],
  features[60],
  features[61]
  ]

  let lower_lip = [ features[50],
  features[51],
  features[52],
  features[53],
  features[54],
  features[55],
  features[44],
  features[56],
  features[57],
  features[58]
  ]

    noStroke()
    fill(0,255,255,155)
    beginShape()
    for (let jaw_point of jaw){
      curveVertex(jaw_point.x,jaw_point.y)
    }
    endShape(CLOSE)

    
    fill(255,255,255,255)
    stroke(0,0,0)
    strokeWeight(fsize*.02)
    beginShape()
    for (let eye_point of left_eye){
      curveVertex(eye_point.x,eye_point.y)
    }
    endShape(CLOSE)
    beginShape()
    for (let eye_point of right_eye){
      curveVertex(eye_point.x,eye_point.y)
    }
    endShape(CLOSE)

    noStroke()
    for(let i=-1;i<=1;i+=.05){
      let hair={x:((features[14].x+features[0].x)/2+(features[0].x-features[14].x)*i/2)*abs(i)+point80.x*(1-abs(i)),   y:point80.y+pow(i,2)*(0-point80.y)+pow(i,2)*(features[14].y+features[0].y)/2+(features[0].y-features[14].y)*i/2}
      let end={x:hair.x-(.5+sin(frameCount*.1+30*pow(i,2)))*(features[33].x-hair.x),y:hair.y-(.5+sin(frameCount*.1+30*pow(i,2)))*(features[33].y-hair.y)}
      let hair_angle=atan((end.x-hair.x)/(end.y-hair.y))
      let hairmid = {x:(hair.x+end.x)/2,y:(hair.y+end.y)/2}
      let hair2 = {x:hairmid.x+30*cos(hair_angle),y:hairmid.y-30*sin(hair_angle)}
      let hair3 = {x:hairmid.x-30*cos(hair_angle),y:hairmid.y+30*sin(hair_angle)}
      fill(100+50*sin(frameCount*.1),255-100*pow(i,2),(5+sin(frameCount*.1+30*pow(i,2))),150)
      beginShape()
      curveVertex(hair.x,hair.y)
      curveVertex(hair2.x,hair2.y)
      curveVertex(end.x,end.y)
      curveVertex(hair3.x,hair3.y)
      endShape(CLOSE)
       }

    //





    //lips
    noStroke()
    fill(255,0,100,100)
    beginShape()
    for (let lip_point of upper_lip){
      curveVertex(lip_point.x,lip_point.y)
    }
    endShape(CLOSE)

    beginShape()
    for (let lip_point of lower_lip){
      curveVertex(lip_point.x,lip_point.y)
    }
    endShape(CLOSE)

    fill(0,255,255)
    noStroke()
    circle(features[32].x,features[32].y,fsize/10)
    circle(features[27].x,features[27].y,fsize/10)
    fill(0)
    circle(features[32].x,features[32].y,fsize/20)
    circle(features[27].x,features[27].y,fsize/20)
}

// this function flips the webcam and displays it
function showFlippedCapture() {
    push()
    translate(capture.width, 0)
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height)
    pop()
}
