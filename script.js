// Global Variable, to be pushed to firebase
var pdfName = 'pdffilename'

// data for horizontal plot
var percentile = 4; 
var topThreeCompany = ['a', 'b', 'c']
var candidiateQualification = [2,3,5]

// dummy data for normal distirbution
var data = [1.5206025085849155, 0.9740789879959566, -0.2620130476711517, 1.2583131581456615, 0.10918594097659713, -0.7249780763566447, 0.5001288155914935, -1.1861517251691744, -0.6077377051811231, 1.1596683352111123, -1.304471401747266, 
    0.796392103059393, 0.33595668725170696, -0.28541349468914456, -0.4736891216501151, -0.5667281939756672, 0.4000156317504568, 0.2883344559978056, -0.6961020600043346, 0.4740358488285466, 1.3204796239856356, 1.3313946349857706, 
    -0.6325970892997843, -1.724963598538283, 0.20971202803464678, 1.3828471991432052, 1.775437613380422, -0.8473163532522062, 1.4280832529294019, -0.8713779389852366, 0.21617703573756497, 0.325724642456385, -1.1151515282981181, 
    0.8477720580339473, 0.6608736964204477, 0.30312380049787213, -2.3197025427872897, 0.40487480888463606, -0.3828174747071659, 0.514428662394733, 0.2964215225733041, -0.561536147209968, -0.9753792971191793, 1.1914815942513117, 
    0.5424075393651866, 1.0223424969641948, 0.8983341982585025, -0.9931717099683276, -0.11865763956848413, 1.3627815742214495, 0.708146750642764, -0.3340182301984101, -0.011185130924706953, 0.10276205188765365, 0.6097991141410941, 
    -0.11035687398767909, -0.34764686416066404, 0.62058816359051, 0.17954662169212213, -1.6404446846963248, 2.023865485372354, 0.658456101588952, 0.8948176871188606, -0.6657326166592495, 0.7433919141997993, -0.1155453208463253, 
    0.5950868790141185, 1.2436304038594628, -0.7896391669623793, 1.3057066558070478, 1.1141075162601066, 0.7204127632269656, 1.6263243453668588, -1.2438142527129703, 1.0109468985153307, -0.13600883806326536, 0.7634875977833324, 
    1.7072853606180132, 0.043547245729618614, -1.121000608522618, -0.3043155700138246, 1.2709040742162114, 2.2209520236335023, 1.5027664114852088, -0.26203739439509033, -0.653324901880799, 1.3169855432448985, -0.9614863645185215, 
    0.7182898213444388, -0.9638913549173418, 1.1314417377162143, -0.1015641350840202, -0.7028943733304026, 1.2478700632189281, 0.432715126646974, -1.0486356855726635, 1.6282331935554184, -0.35195579465409593, -0.9307109213483553, 
    -0.0976717266130579, -0.5150274632151377, -0.5937513515243457, 1.0160317648851853, 0.12997117334221497, 1.4664867743438734, 0.8752628147777318, -1.9960189991223123, -1.1110654178572685, 0.5519632889259382, -0.10897829493520718, 
    -1.0453263176987546, -2.127498422962389, 0.03081667150076462, 0.15524700603373637, -0.8995494190400164, -0.6141643485923347, -0.860915106404238, 0.8858181954095684, -1.8246225065919885, -2.2829453436675107, 1.1720294422599178, 
    0.5806426940917967, -0.05568441530486644, 1.3042869859828488, 0.9797100196814373, -0.35645682308985094, 0.7351223479590535, 0.8820306961844271, -0.5697151023713982, 0.5519740243647874, 0.19558779805732968, 1.3862107742353924, 
    -0.4467557954765779, 0.08974784181638036, -1.7543267929003583, 0.06225790493863885, 0.2687959395230373, 2.3601286479329833, 0.8489636690454982, -1.7796791956312712, 0.6759374461313004, -1.0527530959103708, 0.06783271612067919, 
    0.50258532473686, 0.33378519637917964, 0.8772284218791467, 0.47978998741197243, -0.512979801282761, -1.3710732109302102, 0.3799153765250439
];
var pointsInInterval = 5;
var suggestion_normal = "Percentile Among Complements"
var labels = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'];

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// firebase config
const config = {
    apiKey: "AIzaSyAFruRas5zvYjpQcp43QhVf4I1cFM_6ba0",
    authDomain: "makerthon-1.firebaseapp.com",
    databaseURL: "https://makerthon-1-default-rtdb.firebaseio.com",
    projectId: "makerthon-1",
    storageBucket: "makerthon-1.appspot.com",
    messagingSenderId: "729893438427",
    appId: "1:729893438427:web:d365e6160643dc50e99dfe",
    measurementId: "G-LKFZZYCZDC"
};

// Initialize Firebase
firebase.initializeApp(config);
var db = firebase.database();

$('.pdf-upload-wrap').bind('dragover', function () {
    $('.pdf-upload-wrap').addClass('pdf-dropping');
});

$('.pdf-upload-wrap').bind('dragleave', function () {
    $('.pdf-upload-wrap').removeClass('pdf-dropping');
});

function readBinData(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            processOn();
            // get pdfname here
            pdfName = input.files[0].name.split('.pdf')[0];
            console.log(pdfName);
            
            var pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            var loadingTask = pdfjsLib.getDocument({data: pdfData});
            loadingTask.promise.then(function(pdf) {
                console.log('PDF loaded');
                // Fetch the first page
                var pageNumber = 1;
                pdf.getPage(pageNumber).then(function(page) {
                    console.log('Page loaded');
                
                    var scale = 0.7;
                    var viewport = page.getViewport({scale: scale});
            
                    // Prepare canvas using PDF page dimensions
                    var canvas = $("#pdfViewer")[0];
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
            
                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        console.log('Page rendered');
                        onResumeUpload();
                        processOff();
                    });
                });
            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });

            $('.file-upload-pdf').attr('src', e.target.result);
            $('.pdf-title').html(input.files[0].name);
        };
        
        reader.readAsArrayBuffer(input.files[0]);
    } 
    else {
        removeUpload();
    }
}

function removeUpload() {
    $(".file-upload-input")[0].value = '';
    $('.file-upload-content').hide();
    $('.pdf-upload-wrap').show();
    $('.pdf-upload-wrap').removeClass('pdf-dropping');
    document.getElementById("carouselDarkVariant").style.display = "block";
    document.getElementById("charts").style.display = "none";
}

function processOn() {
    document.getElementById("overlay").style.display = "block";
}

function onResumeUpload(){
    var ref = db.ref(pdfName);
    
    ref.on('value', (snapshot) => {
        const data = snapshot.val();
        
        topThreeCompany = data.company;
        candidiateQualification = data.score;
        percentile = data.percentile;

        build_horizontalPlot();
        build_normal();
        console.log(data)
    });
}

function processOff() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("charts").style.display = "block";
    document.getElementById("carouselDarkVariant").style.display = "none";
    $('.file-upload-content').show();
    $('.pdf-upload-wrap').hide();
}

function build_horizontalPlot(){
    Highcharts.chart('container_company', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Top 3 Matched Companies'
        },
        xAxis: {
            categories: topThreeCompany
        },
        yAxis: {
            min: 0,
            max: 10,
            title: {
                text: 'Qualification'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Your Qualification Level',
            data: candidiateQualification
            }]
    
    });
}

function build_normal(){
    labels[percentile] = 'Your Score';

    Highcharts.chart('container_distribution', {
        chart: {
            margin: [50, 0, 50, 50],
            events: {
                load: function () {
                    Highcharts.each(this.series[0].data, function (point, i) {
                        if (i % pointsInInterval === 0) {
                            var colorPaint = 'black';
                            if (Math.floor(i / pointsInInterval) == percentile){
                                colorPaint = 'red';
                            }
                            point.update({
                                color: colorPaint,
                                dataLabels: {
                                    enabled: true,
                                    format: labels[Math.floor(i / pointsInInterval)],
                                    overflow: 'none',
                                    crop: false,
                                    y: -2,
                                    style: {
                                        fontSize: '13px'
                                    }
                                }
                            });
                        }
                    });
                }
            }
        },

        title: {
            text: suggestion_normal
        },

        legend: {
            enabled: false
        },

        xAxis: [{
            title: {
                text: 'Data'
            },
            visible: false
        }, {
            title: {
                text: 'Bell curve'
            },
            opposite: true,
            visible: false
        }],

        yAxis: [{
            title: {
                text: 'Data'
            },
            visible: false
        }, {
            title: {
                text: 'Bell curve'
            },
            opposite: true,
            visible: false
        }],

        series: [{
            name: 'Bell curve',
            type: 'bellcurve',
            xAxis: 1,
            yAxis: 1,
            pointsInInterval: pointsInInterval,
            intervals: 4,
            baseSeries: 1,
            zIndex: -1,
            marker: {
                enabled: true
            }
        }, {
            name: 'Data',
            type: 'scatter',
            data: data,
            visible: false,
            marker: {
                radius: 1.5
            }
        }]
    });
}