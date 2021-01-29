<template>
    <v-container>
        <v-card class="pa-5">
            <h3>Sessions in the last 30 day</h3>
            <div id="sessions-chart"></div>
        </v-card>
        <v-card class="pa-5">
            <h3>Top 5 Most Visited Pages in the last 30 days</h3>
            <div id="mostVisitedPage-chart"></div>
        </v-card>
         <v-card class="pa-5">
            <h3>Users per day</h3>
            <div id="chart-user-day"></div>
        </v-card>
           <v-card class="pa-5">
            <h3>Average Session Duration</h3>
            <div id="chart-average-session-duration"></div>
        </v-card>
         <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64" color="#E52B38"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import Analytics from '../../../services/AnalyticsDataService';
export default {
    data: ()=>({
        loading: false,
    }),
    methods: {
        async Dashboard(){
          const gapi = window.gapi;
          this.loading=true
            const accessToken = await Analytics.getAccessToken();
            console.log(accessToken);
            await gapi.analytics.ready(function() {
                gapi.analytics.auth.authorize({
                    'serverAuth': {
                        'access_token':accessToken.data
                    },
                });
            
                var sessionsChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids':'ga:234832316',
                        metrics: 'ga:sessions',
                        dimensions: 'ga:date',
                        'start-date': '30daysAgo',
                        'end-date': 'yesterday'
                        },
                        chart: {
                            container: 'sessions-chart',
                            type: 'LINE',
                            options: {
                                width: '100%'
                            }
                        }
                    });
                    
                var mostVisitedPageChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234832316',
                        'start-date': '30daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:bounces,ga:entrances,ga:exits',
                        'sort': '-ga:pageviews',
                        'dimensions': 'ga:pagePath',
                        'max-results': 5
                    },
                    chart: {
                        'container': 'mostVisitedPage-chart',
                        'type': 'PIE',
                        'options': {
                            'width': '50%',
                            'pieHole': 0.4,
                        }
                    }
                });

                   var UserDayChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234832316', // <-- Replace with the ids value for your view.
                        'start-date': '30daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:users',
                        'dimensions': 'ga:date'
                    },
                    chart: {
                        'container': 'chart-user-day',
                        'type': 'LINE',
                        'options': {
                            'width': '100%'
                        }
                    }
                });
                var AverageSessionChart= new gapi.analytics.googleCharts.DataChart({
                query: {
                        ids: "ga:234832316", // <-- Replace with the ids value for your view.
                        "start-date": "7daysAgo",
                        "end-date": "today",
                        metrics: "ga:avgSessionDuration",
                        dimensions: "ga:date",
                    },
                chart: {
                        container: "chart-average-session-duration",
                        type: "LINE",
                        options: {
                        width: "100%",
                        },
                    },
                    });
                    
                    sessionsChart.execute();
                    mostVisitedPageChart.execute();
                    UserDayChart.execute();
                     AverageSessionChart.execute();
                   
            })
            this.loading=false
        }
        
    },
    mounted(){
        this.Dashboard();
    }
};
</script>

<style>
.pa-5{
    margin-bottom:20px;
    font-family:'Playfair Display' 
}

.container{
  margin-top: 100px;
}

</style>