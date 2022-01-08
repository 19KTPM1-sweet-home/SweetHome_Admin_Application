$(window).on('load', function () {
    var homeTourOverviewChart;
    var propertiesOfInterestChart;

    
    loadHomeTourByDays();
    loadPropertiesOfInterest();
    loadTop10PropertiesOfInterest();

    $('.select-filter').on('change', function() {
        const selectedOption = $(this).find(":selected").text();
        $('.home-tour-title').html('Home Tour Per ' + selectedOption);
        homeTourOverviewChart.destroy();

        switch(selectedOption) { 
            case 'Day':
                loadHomeTourByDays();
                break;
            case 'Month':
                loadHomeTourByMonths();
                break;
            case 'Quarter':
                loadHomeTourByQuarters();
                break;
            case 'Year':
                loadHomeTourByYears();
        };
        
    });

    function configBarChart(label, datasets) {
        const ctx = document.getElementById('homeTourOverview');
        datasets[0]["backgroundColor"] = 'rgb(0, 51, 153)';
        datasets[1]["backgroundColor"] = 'rgb(204, 204, 0)';
        datasets[2]["backgroundColor"] = 'rgb(153, 51, 153)';
        datasets[3]["backgroundColor"] = 'rgb(51, 153, 51)';
        
        homeTourOverviewChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function loadHomeTourByDays() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'home-tour-overview/day';
        $.get(url, function (res) {
            configBarChart(res.listOfDate, res.datasets);
        });
    }

    function loadHomeTourByMonths() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'home-tour-overview/month';
        $.get(url, function (res) {
            configBarChart(res.listOfMonth, res.datasets);
        });
    }

    function loadHomeTourByQuarters() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'home-tour-overview/quarter';
        $.get(url, function (res) {
            configBarChart(res.listOfQuarter, res.datasets);
        });
    }

    function loadHomeTourByYears() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'home-tour-overview/year';
        $.get(url, function (res) {
            configBarChart(res.listOfYear, res.datasets);
        });
    }

    function configPieChart(label, datasets) {
        const ctx = document.getElementById('propertiesOfInterest');
    
        propertiesOfInterestChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [
                {
                    data: datasets,
                    backgroundColor: [
                        'rgb(0, 51, 153)',
                        'rgb(204, 204, 0)',
                        'rgb(153, 51, 153)',
                        'rgb(51, 153, 51)'
                    ]
                },
                ],
                labels: label,
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                      weight: 'bold',
                      size: 16,
                    },
                    formatter: (val) => {
                    return val + '%';
                    }
                }
                }
            }
        });
        
    }

    function loadPropertiesOfInterest() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'properties-of-interest';
        $.get(url, function (res) {
            configPieChart(res.listOfCategory, res.datasets);
        });
    }

    function loadTop10PropertiesOfInterest() {
        const origin = window.location.origin + window.location.pathname;
        const url = origin + 'top-10-properties-of-interest';

        $.get(url, function (data) {
            var template = Handlebars.compile(`
            {{#each property}}
            <tr">
                <td>
                    <div class="rank-col">#{{math @index "+" 1}}</div>
                </td>
                <td>
                    <div class="name-col">{{this.name}}</div>
                </td>
                <td>
                    <div class="category-col">{{this.category}}</div>
                </td>
                <td>
                    <div class="seller-col">{{this.seller}}</div>
                </td>
                <td>
                    <div class="price-col">{{this.price}}</div>
                </td>
                <td>
                    <div class="num-of-interest-col">{{this.count}}</div>
                </td>
                
            </tr>
            {{/each}}
            `);

            $('.table-body').html(template({property: data}));
        })
    };
});