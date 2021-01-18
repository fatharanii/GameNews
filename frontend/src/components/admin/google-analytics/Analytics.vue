<template>
    <v-container>
        <v-card class="pa-5">
            <h3 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Sessions</h3>
            <div id="sessions-chart"></div>
        </v-card>
    </v-container>
</template>

<script>
import Analytics from '../../../services/AnalyticsDataService';
export default {
    data: ()=>({
    }),
    methods: {
        async Dashboard(){
          const gapi = window.gapi;
            const accessToken = await Analytics.getAccessToken();
            console.log(accessToken);
            await gapi.analytics.ready(function() {
                gapi.analytics.auth.authorize({
                    'serverAuth': {
                        'access_token':accessToken
                          
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
                    sessionsChart.execute();
            })
        },
    },
    mounted(){
        this.Dashboard();
    }
};
</script>