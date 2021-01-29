<template>
<v-app light>
  <h1>NEWS</h1>
  <v-row>
    <v-col
      cols="8"
      class="flex-grow-0 flex-shrink-0"
    >
      <v-main>
            <v-container style="margin-top:0px">
                <v-layout row wrap align-center>
                    <v-flex xs11 offset-md1>
                        <div v-for="news in visiblePages" :key="news.id_berita">
                            <v-card class="my-4 mx-2" hover>
                                <v-img
                                height="250px"
                                v-bind:src="baseURL + '/api/news_thumbnail/' + news.id_berita"
                                ></v-img>
                                <v-card-media>
                                    <v-container style="margin-top:0px">
                                        <v-layout>
                                            <v-flex xs12 align-end d-flex>
                                                <RouterLink :to="'/news/'+news.id_berita" class="routerlinkheadline">
                                                    <span class="headline">{{ news.judul_berita }}</span>
                                                </RouterLink>
                                            </v-flex>
                                            <!-- <v-btn 
                                            icon>
                                              <v-icon>mdi-bookmark</v-icon>
                                            </v-btn> -->
                                        </v-layout>
                                    </v-container>
                                </v-card-media>
                                <div class="mx-4 my-1 subtitle-1 text--primary">
                                  {{ news.kategori }}
                                </div>
                                <div class="text-start mx-4 text--secondary" v-if="!readMoreActivated" v-html="news.isi.slice(0, 300)">
                                </div>
                                 <readmore  class="mx-4"  v-if="!readMoreActivated">...</readmore>
                                <v-divider class="mx-5 my-0"></v-divider>
                                <v-card-actions>
                                    <v-chip small class="grey--text">
                                      <span>{{new Date(news.publish_date).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        })}}
                                      </span>
                                    </v-chip>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="deep-purple lighten-2"
                                      text
                                    >
                                      <readmore v-if="!readMoreActivated">
                                        <RouterLink :to="'/news/'+news.id_berita" class="routerlinkgame">
                                          Read More
                                        </RouterLink>
                                      </readmore>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <v-pagination
                              v-model="page"
                              :length="Math.ceil(articles.length/perPage)"
                              @input="handlePageChange"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-col>
    <v-col
      cols=""
      class="flex-grow-1 flex-shrink-0"
    >
      <v-row>
      <v-flex  sm6 ml-4>
        <v-text-field
          label='Cari berita'
          v-model='searchString'
          clearable
          >
        </v-text-field>
      </v-flex>
      <v-btn
        icon
        color="black"
        v-on:click="selectKategori('All')"
        class="mt-6 ml-2"
        x-small
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        elevation="2"
        color="error"
        @click="searchNews"
        class="mt-5 ml-2"
        small
      >
        <span>Search</span>
      </v-btn>
      </v-row>
      <div class="game_by">
        <h2>Kategori :</h2>
        <v-card
          class="d-flex align-content-center flex-wrap"
          flat
          tile
        >
          <v-btn
            v-for="n in kategori"
            :key="n"
            class="pa-1 mx-1 my-2"
            elevation="2"
            rounded
            small
            color="grey lighten-2"
            v-on:click="selectKategori(n)"
          >
						{{n}}
          </v-btn>
        </v-card>
      </div>
      <div class="game_by">
        <h2>Urutkan :</h2>
        <v-card
          class="d-flex align-content-center flex-wrap"
          flat
          tile
        >
          <v-btn
            v-for="n in urutkan"
            :key="n"
            class="pa-1 mx-1 my-2"
            elevation="2"
            rounded
            small
            color="grey lighten-2"
            v-on:click="selectUrutkan(n)"
          >
						{{n}}
          </v-btn>
        </v-card>
      </div>
    </v-col>
  </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="#E52B38"></v-progress-circular>
    </v-overlay>
</v-app>
</template>

<script>
import NewsDataService from "../../../services/NewsDataService";
import BASE_URL from "../../../base-url"
export default {
  data(){
    return{
      drawer : false,
      loading :false,
      filterBy : '',
      articles :[],   
      articlesPerPage:[],
      error:[],
      page: 1,
      perPage: 4,
      kategori:["All","Action", "Survival","Strategy", "Adventure","Sport"],
      kategoriSelected: '',
      urutkan:["All","Terbaru"],
      urutkanSelected: '',
      searchString: '',
      searchStringLast: '',
      baseURL: BASE_URL,
      id_user:''
    }
  },
  computed: {
    visiblePages () {
      window.scrollTo(0,0);
      return this.articlesPerPage
    }
  },
  methods:{
    getRequestParams(page, perPage){
      let params = {};
      if(page){
        params["page"]=page;
      }
      if(perPage){
        params["limit"]=perPage;
      }
      return params;
    },
    retrievePagination() {
      this.loading = true
      const params = this.getRequestParams(this.page, this.perPage);
      NewsDataService.getPagination(params)
      .then(response =>{
        this.articlesPerPage = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    handlePageChange(value) {
      this.page = value;
      if(this.filterBy=='Kategori'){
        this.selectKategori(this.kategoriSelected);
      }else if(this.filterBy=='Urutkan'){
        this.selectUrutkan(this.urutkanSelected)
      }else if(this.filterBy=='Search'){
        this.searchNews ()
      }else{
        this.retrievePagination();
      }
    },
    retrieve() {
      if(this.filterBy=='Kategori'){
        NewsDataService.getByKategori(this.kategoriSelected)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }else if(this.filterBy=='Search'){
        NewsDataService.search(this.searchStringLast)
        .then(response =>{
          this.articles = response.data;
          console.log('data')
          console.log(response.data)
        })
        .catch(e=>{
          this.errors(e)
        })
      }else{
        NewsDataService.getAll()
      .then(response =>{
        this.articles = response.data;
        console.log('data')
        console.log(response.data)
        console.log(this.articles[0])
      })
      .catch(e=>{
        this.errors(e)
      })
      }
    },
    
    selectKategori: function (kategori){
      this.loading = true
      this.filterBy = 'Kategori';
      if(this.kategoriSelected!=kategori){
        this.kategoriSelected=kategori;
        this.page=1;
      }
      if(kategori=='All'){
        this.page=1;
        this.filterBy = 'Default';
      }
        this.retrieve();
        const params = this.getRequestParams(this.page, this.perPage);
        NewsDataService.getPaginationByKategori(params, kategori)
        .then(response =>{
          this.articlesPerPage = response.data;
          console.log('data')
          console.log(response.data)
          this.loading = false
        })
        .catch(e=>{
          this.errors(e)
        })
    },
    searchNews () {
      this.loading = true
      this.filterBy = 'Search';
      if(this.searchStringLast!=this.searchString){
        this.searchStringLast=this.searchString;
        this.page=1;
      }
      this.retrieve();
      const params = this.getRequestParams(this.page, this.perPage);
      NewsDataService.searchPagination(this.searchString, params)
      .then(response =>{
        this.articlesPerPage = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    },
    selectUrutkan: function (urutkan) {
      this.loading = true
      this.filterBy='Urutkan';
      if(this.urutkanSelected!=urutkan){
        this.urutkanSelected=urutkan;
        this.page=1;
      }
      if(urutkan=='All'){ 
        this.page=1;
        this.filterBy = 'Default';
      }
      this.retrieve();
      const params = this.getRequestParams(this.page, this.perPage);
      NewsDataService.getAllNewsASC(params, urutkan)
      .then(response =>{
        this.articlesPerPage = response.data;
        console.log('data')
        console.log(response.data)
        this.loading = false
      })
      .catch(e=>{
        this.errors(e)
      })
    }
  },
  mounted(){
    this.retrieve();
    this.retrievePagination();
  },
}

</script>
<style scoped src="@/assets/styles/style.css"></style>