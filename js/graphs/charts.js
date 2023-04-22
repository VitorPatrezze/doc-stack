

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
            "type": "pie",
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
            "type": "pie",
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
            "type": "pie",
            "title": "Cirurgia Realizada",
            "data": {
                "Cardiovascular": 300,
                "homeoplastia": 100,
                "neurocirurgia": 50,
                "outras": 50
            },
            "theme" : "green"   
        },
        {
            "id": "teste4",
            "type": "radar",
            "data": {
                "Cordialidade": 4.5,
                "Pré-Operatório": 3.5,
                "Pós-Operatório": 4,
                "Satisfação do paciente": 2.5,
                "Nota entre médicos": 3
            },
            "theme" : "green"   
        },
    ]
    charts.forEach(function(chart){
        switch (chart["type"]) {
            case "pie":
                pieChart(chart, 12/charts.length)
                break;
            case "radar":
                radarChart(chart)
                break;
            default:
                break;
        }
    });
}


function pieChart(chart) {
    chartId = chart["id"]

    //Add graph element
    const tempDiv = document.createElement("div");
    tempDiv.className = "chart col";
    const tempCanvas = document.createElement("canvas");
    tempCanvas.id = chartId
    tempDiv.insertAdjacentElement("beforeend", tempCanvas)
    
    document.getElementById("pie-charts-container").insertAdjacentElement("beforeend", tempDiv)

    ctx = document.getElementById(chartId)
    var chart = new Chart(ctx, {
        type: 'pie',
        options: {
            title: {
                display: true,
                position: "top",
                text: chart["title"],
            },
            legend: {
                position: 'left',
                labels: {
                    boxWidth: 10,
                    fontStyle: 'italic',
                    fontColor: '#555',
                    usePointStyle: true,
                },
            }
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

function radarChart(chart) {
    chartId = chart["id"]

    //Add graph element
    const tempDiv = document.createElement("div");
    tempDiv.className = "chart col";
    const tempCanvas = document.createElement("canvas");
    tempCanvas.id = chartId
    tempDiv.insertAdjacentElement("beforeend", tempCanvas)
    
    document.getElementById("ratings-container").insertAdjacentElement("beforeend", tempDiv)

    ctx = document.getElementById(chartId)
    var chart = new Chart(ctx, {
        type: 'radar',
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 5,
                    min: 0,
                    stepSize: 1
                }
            }
        },
        data: {
            labels: Object.keys(chart["data"]),
            datasets: [
                {
                    data: Object.values(chart["data"]),
                    fill: true,
                    backgroundColor: 'rgba(126, 176, 219, 0.3)',
                    borderWidth: 1,
                    pointBorderWidth: 1,
                    pointHitRadius: 1
                }]
            }
        });
    chart.options.legend.display = false;
}
