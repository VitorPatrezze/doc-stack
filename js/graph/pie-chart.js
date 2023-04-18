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


function loadChart() {
    var ctx1 = document.getElementById("pieChart1");
    var dict = {"Geral": 300, "Raquianestesia": 100, "Bloqueio Periférico": 200, "Sedação": 50}
    new Chart(ctx1, {
        type: 'pie',
        options: {
            legend: {
                position: 'left',
                labels: {
                    boxWidth: 10,
                    fontStyle: 'italic',
                    fontColor: '#aaa',
                    usePointStyle: true,
                }
            },
    
        },
        data: {
            labels: Object.keys(dict),
            datasets: [
                {
                    data: Object.values(dict),
                    borderWidth: 0,
                    backgroundColor: [
                        '#a5c8e6',
                        '#7eb0db',
                        '#658daf',
                        "#324658"
                    ],
                    hoverBackgroundColor: [
                        '#a5c8e6',
                        '#7eb0db',
                        '#658daf',
                        "#324658"
                    ]
                }]
            }
        });
}
