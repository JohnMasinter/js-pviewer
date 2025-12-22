// pviewer0.js
// simple JavaScript picture viewer, open source released under MIT License
// version 0, not latest ver, offered for learning puposes
// https://github.com/JohnMasinter/js-pviewer

/*
Display an image within a scrolling div window, with buttons to zoom in/out,
and picture info displayed on inactive button faces. (buttons just as a text frame)
*/

var sFit = 'width'; // initial zoom set to image "width" or "height"
var iStep = 200;    // +/- change step pixels
var iMin = 400;     // min zoom width, arbitrary

var wWid = 0;       // window dimensions
var wHig = 0;
var iWid = 0;       // image dimensions, wid x hig
var iHig = 0;
var zWid = 0;       // current zoom dimensions, wid x hig    
var zHig = 0;
var dWid = 0;       // image div dimensions, wid x hig    
var dHig = 0;
var nWid = 0;       // nav bar div dimensions, wid x hig    
var nHig = 0;


const imgObj = new Image(); // used to preload image

//--------------------------------------------------------------------------------
// call back when image load complete
// fetch images raw pixel dimensions, set zoom dimensions on button
//--------------------------------------------------------------------------------
imgObj.onload = function() {

    // save image raw dimensions
    iWid = this.naturalWidth;
    iHig = this.naturalHeight; 

    // display image raw dimensions on button
    let sDim = `${iWid}x${iHig}`;
    console.log(`onload:sDim = ${sDim}`);
    document.getElementById('bDim').textContent = sDim;

    // display image in img tag
    const oImg = document.getElementById('imgTag');
    oImg.src = imgObj.src;

} // imgObj.onload

//------------------------------------------------------------
// callback when imgTag preload completes, set image zoom
//------------------------------------------------------------
function fInit() { 

    const oImg = document.getElementById('imgTag');

    // set fit-width zoom
    if (sFit == 'width') {
        let sZomW = `${zWid}px`;
        oImg.style.width  = sZomW;
        oImg.style.height = 'auto';
        console.log(`fInit: sZomW=${sZomW}`); 
    }

    // set fit-height zoom
    else {
        let sZomH = zHig-8+'px';
        oImg.style.width  = 'auto';
        oImg.style.height = sZomH;
        console.log(`imgTag.onload:BEG: set sZomH=${sZomH}`); 
    }

    // get img zoom dimensions (account for auto wid or hig)
    zWid = oImg.clientWidth;                   
    zHig = oImg.clientHeight;

    // update button text with dimenions
    document.getElementById('bZom').textContent = `${zWid}x${zHig}`;  // set zoom dim text
    document.getElementById('bDim').textContent = `${iWid}x${iHig}`;  // set img dimension text

    console.log(`imgTag.onload:imgDim=${iWid}x${iHig}, zomWid=${zWid}, zomHig=${zHig}`); 

} // fInit

//--------------------------------------------------------------------------------
// initial function to setup viewer, display image
//--------------------------------------------------------------------------------
function pViewer() {

    const sVal = window.location.href;
    console.log(`pViewer:sUrl = ${sVal}`);

    // initial pic width pixels = width of window
    wWid = window.innerWidth - 10;
    console.log(`pViewer:wWid = ${wWid}`);

    // parse url-encoded values, e.g. href="viewer.html?img=/img/tree.jpg"
    const oPar = new URLSearchParams(window.location.search);
    const sImg = oPar.get('img');           // e.g. /img/tree.jpg
    console.log(`pViewer:sImg = ${sImg}`);
    const sNam = sImg.split('/').pop();     // e.g. tree.jpg
    console.log(`pViewer:sNam = ${sNam}`);

    // overall window dimension (was iWinW iWinH)
    wWid = window.innerWidth;       // window width  (used for initial pic width)
    wHig = window.innerHeight;      // window height (set limit on div)

    // nav div dimensions (top nav bar buttons)
    const  dNav = document.getElementById('navDiv');
    nWid = dNav.clientWidth;      // fetch nav width, set in html to fixed width!
    nHig = dNav.clientHeight;     // fetch nav height, used to determine img height

    // img div wraps img tag
    const dImg = document.getElementById('imgDiv');
    //dWid = dImg.clientWidth;           // fetch img div width, to set img width
    dWid = wWid;                       // fetch img div width, to set img width
    dHig = wHig - nHig - 10;           // calc what vert space left for image
    dImg.style.height = dHig + 'px';   // set explicit img div height for vert scrolling
    //dImg.style.width  = divWid + 'px'; // no need to set explicit width

    zWid = dWid; // - 8;               // calc 'fit width'  zoom, if desired for initial img zoom
    zHig = dHig; // - 5;               // calc 'fit height' zoom, if desired for initial img zoom

    // debug, print all area dimensions
    console.log(`wWid=${wWid}, wHig=${wHig} nWid=${nWid} nHig=${nHig}, dWid=${dWid} dHig=${dHig} zWid=${zWid}, zHig=${zHig}`);

    // display image name of button face
    document.getElementById('bNam').textContent = sNam;

    // set tab name to image name
    document.title = sNam;

    // load image - will call our onload when finished loading
    imgObj.src = sImg;

} // pViewer

//--------------------------------------------------------------------------------
// call back for image zoom buttons
//--------------------------------------------------------------------------------
function fMag(sAct) {

    let zSav = zWid; // for debugging

    // get current image zoom
    const oImg = document.getElementById('imgTag');
    zWid = oImg.clientWidth;                   

    // '-' button, shrink by iStep pixels, or min if too small
    if (sAct == '-') {
        if (zWid > iMin+iStep) zWid = zWid - iStep;
        else                   zWid = iMin;
    }

    // '+' button, shrink by iStep pixels
    if (sAct == '+')
        zWid = zWid + iStep;

    // 'Min' button, shrink to 10%
    if (sAct == 'm')
        zWid = iMin;

    // 'Max' button, shrink to 10%
    if (sAct == 'M')
        zWid = iWid;           // calc new width

    console.log(`fMag:zWid:beg=${zSav},end=${zWid}`);

    // set new image size
    oImg.style.width = zWid + 'px';;
    oImg.style.height = 'auto';

    // get new dimenions (becuase of auto), update zoom button text
    zWid = oImg.clientWidth;                   
    zHig = oImg.clientHeight;
    document.getElementById('bZom').textContent = `${zWid}x${zHig}`

} // fMag
//--------------------------------------------------------------------------------

