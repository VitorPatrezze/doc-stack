// MAKE ROUNDED EDGES FOR PIE CHARTS
Chart.defaults.RoundedDoughnut    = Chart.helpers.clone(Chart.defaults.doughnut);
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function(ease) {
        var ctx           = this.chart.ctx;
        var easingDecimal = ease || 1;
        var arcs          = this.getMeta().data;
        Chart.helpers.each(arcs, function(arc, i) {
            arc.transition(easingDecimal).draw();

            var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
            var pColor = pArc._view.backgroundColor;

            var vm         = arc._view;
            var radius     = (vm.outerRadius + vm.innerRadius) / 2;
            var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
            var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
            var angle      = Math.PI - vm.endAngle - Math.PI / 2;

            ctx.save();
            ctx.translate(vm.x, vm.y);

            ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
            ctx.beginPath();
            ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = vm.backgroundColor;
            ctx.beginPath();
            ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
            ctx.fill();

            ctx.restore();
        });
    }
});

const chartThemes = {
    "red": [
        '#feadad',
        '#E97777',
        '#ba5f5f',
        '#8c4747'
    ], 
    "green": [
        '#86C8BC',
        '#6ba096',
        '#507871',
        '#43645e'
    ],
    "blue": [
        '#a5c8e6',
        '#7eb0db',
        '#658daf',
        '#324658'
    ]
} 

function createCharts(profile) {
    var charts = [
        {
            "id": "teste1",
            "title": "Anestesias Realizadas",
            "data": {
                "raqui": 100,
                "geral": 300,
                "sedação": 500
            },
            "theme" : "blue"
        },
        {
            "id": "teste2",
            "title": "Porte Cirurgico",
            "data": {
                "Grande": 300,
                "Médio": 100,
                "Pequeno": 50
            },
            "theme" : "red"   
        },
        {
            "id": "teste3",
            "title": "Cirurgia Realizada",
            "data": {
                "Cardiovasc": 100,
                "Ortopedica": 130,
                "Renal": 50,
                "Outras": 350
            },
            "theme" : "green"   
        }
    ]
    charts.forEach(function(chart){
        newChart(chart)
    });
}


function newChart(chart) {
    console.log(chart)
    chartId = chart["id"]

    //Add graph element
    const tempDiv = document.createElement("div");
    tempDiv.className = "col-sm";
    tempDiv.className = "chart";
    const tempTitle = document.createElement("h6");
    tempTitle.innerHTML = chart["title"]
    const tempCanvas = document.createElement("canvas");
    tempCanvas.id = chartId
    tempDiv.insertAdjacentElement("afterBegin", tempTitle)
    tempDiv.insertAdjacentElement("beforeend", tempCanvas)
    
    document.getElementById("charts-container").insertAdjacentElement("beforeend", tempDiv)

    ctx = document.getElementById(chartId)
    var chart = new Chart(ctx, {
        type: 'pie',
        options: {
            legend: {
                position: 'left',
                labels: {
                    boxWidth: 10,
                    fontStyle: 'italic',
                    fontColor: '#555',
                    usePointStyle: true,
                }
            },
    
        },
        data: {
            labels: Object.keys(chart["data"]),
            datasets: [
                {
                    data: Object.values(chart["data"]),
                    borderWidth: 0,
                    backgroundColor: chartThemes[chart["theme"]],
                    hoverBackgroundColor: chartThemes[chart["theme"]]
                }]
            }
        });
}
