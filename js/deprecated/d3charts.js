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
            "title": "Porte Cirurgico",
            "data": [
                {name: "Grande", value: 100},
                {name: "Médio", value: 150},
                {name: "Pequeno", value: 200}
            ],
            "theme" : "blue"
        },
        {
            "id": "teste2",
            "title": "Anestesias Realizadas",
            "data": [
                {name: "raqui", value: 100},
                {name: "geral", value: 150},
                {name: "sedação", value: 200},
                {name: "outras", value: 400}
            ],
            "theme" : "green"
        },
        {
            "id": "teste3",
            "title": "Anestesias Realizadas",
            "data": [
                {name: "Cardiovasc", value: 100},
                {name: "Ortopedica", value: 150},
                {name: "Renal", value: 200},
                {name: "Outras", value: 400}
            ],
            "theme" : "red"
        }
    ]
    wid = (document.getElementById("charts-container").offsetWidth)/(charts.length + 1)
    charts.forEach(function(chart){
        newChart(chart, wid)
    });
}


function newChart(chart, wid) {
    const chartId = chart["id"]
    const dados = chart["data"]

    //Add graph element
    const tempDiv = document.createElement("div");
    tempDiv.className = "chart col-sm";
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tempSvg.id = chartId
    tempDiv.insertAdjacentElement("beforeend", tempSvg)

    const container = document.getElementById("charts-container")
    container.insertAdjacentElement("beforeend", tempDiv)

    tempSvg.setAttribute("width", wid)
    tempSvg.setAttribute("height", wid)


    const svg = d3.select("#" + chartId), 
        width = svg.attr("width"), 
        height = svg.attr("height"), 
        radius = wid/2

    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`)
    const pie = d3.pie().value(d => d.value)

    const color = d3.scaleOrdinal(chartThemes[chart["theme"]])

    const arc = d3.arc().outerRadius(radius).innerRadius(0);
    const outerArc = d3.arc().outerRadius(radius).innerRadius(radius);

    const pies = g.selectAll('.arc').data(pie(dados)).enter().append('g').attr('class', 'arc')

    pies.append('path').attr('d', arc).attr('fill', d => color(d.data.value))
   
}