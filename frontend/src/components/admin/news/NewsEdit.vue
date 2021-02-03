<template id="add-news">
  <div v-if="adminAuth">
    <v-form ref="form" v-model="valid">
      <div v-if="currentNews">
        <v-container>
          <v-card
            width="800px"
            class="mx-auto my-12">
            <v-card-title width="590" style="background:#757575;color:white" class="white--text mt-10">EDIT NEWS</v-card-title>
            <v-row  justify="center">
                <v-col cols="12" md="10">
                    <div class="text-h6">ID Game</div>
                    <v-text-field
                        v-model="currentNews.id_game"
                        placeholder="Id Game"
                        required
                        name="id_game"
                        id="id_game"
                    >
                    </v-text-field>
                    <div class="text-h6"> Judul Berita</div>
                    <v-text-field
                        v-model="currentNews.judul_berita"
                        :rules="judulRules"
                        :counter="100"
                        placeholder="Judul Berita"
                        required
                        name="judul_berita"
                        id="judul_berita"
                    >
                    </v-text-field>
                    <div class="text-h6">Kategori</div>
                    <v-select
                        v-model="currentNews.kategori"
                        :items="listKategori"
                        :rules="kategoriRules"
                        placeholder="Pilih Kategori"
                        requires
                        name="kategori"
                        id="kategori"
                    >
                    </v-select>
                     <div class="text-h6">Konten Berita</div>
                    <vue-editor
                        id="editor"
                        v-model="currentNews.isi"
                    >
                    </vue-editor>
                    <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="400"
                      :retain-focus="false"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="float-right mt-8 mb-4"
                        elevation="6"
                        color="error"
                        width="140px"
                        v-bind="attrs" 
                        v-on ="on"
                        @click="updateNews"
                      >Update
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h8">
                        The News Was Updated Successfully
                      </v-card-title>
                        <v-card-text></v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="warning"
                            dark
                            :to="'/cmsNews'"
                          >
                          Back to Dashboard
                          </v-btn>
                        </v-card-actions> 
                    </v-card>
                    </v-dialog>
                     <v-btn
                        class="float-right mt-8 mx-3 mb-4"
                        elevation="6"
                        color="warning"
                        width="140px"
                        dark
                        :to="'/cmsNews'"
                    >Cancel
                     </v-btn>
                </v-col>
            </v-row>
          </v-card>
        </v-container>
      </div>
       <div v-else>
        <br />
        <p>Please click on a News...</p>
        ID BERITA {{ $route.params.id_berita}}
  </div>
    </v-form>
     <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
          color="#E52B38r"
        ></v-progress-circular>
      </v-overlay>
   </div>
   <div v-else>
    <h4>Admin Content</h4>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import "bootstrap/dist/css/bootstrap.css";
import NewsDataService from "../../../services/NewsDataService";
import UserDataService from '../../../services/UserDataService';
export default {
  components: { VueEditor },
  name: "news-details",
  data() {
    return {
      message: '',
      dialog : false,
      loading : false,
      valid : true,
      currentNews: {
        id_berita: "",
        id_game: "",
        judul_berita: "",
        kategori: "",
        isi: ""
      },
      listKategori: ['Action','Survival','Strategy','Adventure','Sport'],
        judulRules:[
        (v) => !!v || "Judul tidak boleh kosong.",
        (v) => v.length <= 100 || "Judul maksimal 100 karakter",
        (v) => v.length >= 3 || "Judul harus minimal 3 karakter",
      ],
      kategoriRules: [(v) => !!v || "Kategori tidak boleh kosong."],
      isiRules:[
        (v) => !!v|| "Konten Berita Tidak Boleh kosong"
      ],
      adminAuth: false

    };
  },
  methods: {
    getNews() {
      this.loading = true
      NewsDataService.get(this.$route.params.id_berita)
        .then(response => {
          this.currentNews.id_berita = response.data[0].id_berita;
          this.currentNews.id_game = response.data[0].id_game;
          this.currentNews.judul_berita = response.data[0].judul_berita;
          this.currentNews.kategori = response.data[0].kategori;
          this.currentNews.isi = response.data[0].isi;
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        this.loading = false
    },

    updateNews() {
      this.loading=true
      NewsDataService.update(this.$route.params.id_berita, this.currentNews)
        .then(response => {
          console.log(response.data);
          this.message = 'The news was updated successfully!';
          this.loading=false
        })
        .catch(e => {
          console.log(e);
        });
    },
    authenticateAdmin() {
          UserDataService.adminAuthentication()
            .then(response => {
              this.adminAuth = response.data;
              //console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
  },
  mounted() {
    this.getNews();
    this.authenticateAdmin();
  }
};
</script>

<style scoped>
.container{
  margin-top:80px
}
</style>
