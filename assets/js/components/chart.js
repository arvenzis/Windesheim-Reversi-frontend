SPA.chart = (function() {
    function init(blackAmount, whiteAmount) {
        let ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Black', 'White'],
                datasets: [{
                    data: [blackAmount, whiteAmount],
                    backgroundColor: [
                        '#000',
                        '#fff'
                    ]
                }]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            beginAtZero: true,
                            display: false
                        }
                    }]
                }
            }
        });
    }

    return {
        init
    }
})();