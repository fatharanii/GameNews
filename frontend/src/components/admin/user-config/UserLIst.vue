<template>
<div v-if="adminAuth">
  <div id="brand">
  <div class="news-list">
    <v-container>
    <v-row justify="space-around">
      <v-col>
        <v-card>
          <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">LIST USER</v-card-title>
          <div class="col-md-12">
            <div class="input-group mb-1">
              <input type="text" class="form-control" placeholder="Search by Username"
                v-model="username"/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                  @click="searchUsername"
                  :to="'/api/user?username=' + username"
                >
                Search
              </button>
              </div>
            </div>
          </div>
              <v-data-table
              :headers="headers"
              :items="users"
              :items-per-page="5"
              class="grey lighten-5"
              fixed-header
            >
             <template v-slot:[`item.actions`]="{ item }">
                <v-btn 
                class="ma-2"
                width="110px"  
                color="warning" 
                :to="'/api/users/' + item.id_user"
                :loading="item.createloading" 
                :disabled="createloading">
                Update
                </v-btn>
                <br> 
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="290"
                  :retain-focus="false"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="ma-2"
                    elevation="6"
                    color="error"
                    width="110px"       
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="selectedNews(item.id_user)"
                  >
                  Delete
                  </v-btn>
                    </template>
                      <v-card>
                        <v-card-title class="text-h8">
                          Apakah Anda yakin untuk menghapus User ini? (ID = :{{selectedIdUser}})
                          </v-card-title>
                          <v-card-text></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="grey darken-1"
                              text
                              @click="dialog = false"
                            >
                              Batal
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog = false"
                              @click.prevent="deleteNews(selectedIdUser)"
                            >
                              Yakin
                            </v-btn>
                          </v-card-actions>
                        </v-card> 
                      </v-dialog>  
                </template>
              </v-data-table>
          </v-card>
        </v-col>
    </v-row>
  </v-container>
</div>
</div>
</div>

<div v-else>
      <h4>Admin Content</h4>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import UserDataService from '../../../services/UserDataService';
export default {
    name:"users",
    data () {
      return {
        users: [],
        headers: [
        { text: "ID User",align: "center",sortable: true, value: "id_user" },
        { text: "Username",align: "center",sortable: false, value: "username" },
        { text: "Email", align: "center", sortable: false,value: "email"},
        { text: "Password", align: "center", sortable: false, value: "password"},
        { text: "is Admin", align: "center", sortable: false, value: "is_admin"},
        { text: "Action", align: "center",sortable: false, value: "actions"},
      ],
        key: "",
        id: 0,
        dialog: false,
        isLoading: false,
        username: "",
        selectedIdUser: null,
        adminAuth: false
      }
    },
    methods:{
        retrieve(){
          UserDataService.getAll()
            .then((response) =>{
              this.users = response.data;
            })
            .catch((e)=>{
              console.log(e);
            });
        },
        searchUsername() {
          UserDataService.search(this.username)
            .then(response => {
              this.users = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteUser(id_user) {
          UserDataService.delete(id_user)
            .then(response => {
              console.log(response.data);
              this.retrieve();
            })
            .catch(e => {
              console.log(e);
            });
        },
        selectedUser(id_user) {
          this.selectedIdUser = id_user
        },
        authenticateAdmin() {
          UserDataService.adminAuthentication()
            .then(response => {
              this.adminAuth = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
    },
    mounted(){
      this.retrieve();
      this.authenticateAdmin();
    },
};
</script>

<style scoped>
.progressbar {
  position: relative;
  bottom: 50%;
  left: 50%;
}
</style>