<template>
<div v-if="adminAuth">
  <div>
    <div id="brand">

      <div class="container mt-3">
        <router-view />
      </div>
    </div>
    <div class="user-list">
      <v-row  >
        <v-col cols="8" >
        </v-col>
          <v-col cols="4">
            <v-btn
              color="blue darken-1"
              cols="4"

            >
              <RouterLink :to="'/api/user-add/'" class="white--text" >
                Add User
              </RouterLink>
            </v-btn>
          </v-col>
      </v-row>
      <v-container>
      <v-row>
            <v-col>
              <v-simple-table height="500px" class="grey lighten-5">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>is admin</th>

                      <th class="text-center">Pilihan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id_user">
                      <td class="text-xs-center">{{ user.id_user }}</td>
                      <td class="text-xs-center">{{ user.username }}</td>
                      <td class="text-xs-center">{{ user.email }}</td>
                      <td class="text-xs-center">{{ user.password }}</td>
                      <td class="text-xs-center">{{ user.is_admin }}</td>
                      <td class="text-center">
                          <v-btn
                            class="ma-2"
                            color="warning"
                            dark
                            width="110px"
                            :to="'/api/users/' + user.id_user"
                          >
                          Edit
                        </v-btn>
                          <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="290"
                            :retain-focus="false"
                          >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ma-2"
                              color="error"
                              width="100px"
                              v-bind="attrs"
                              v-on="on"
                              @click.prevent="selectedUser(user.id_user)"
                              >
                              Delete
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="text-h8">
                              Apakah Anda yakin untuk menghapus user ini? (ID = :{{selectedIdUser}})
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
                                @click.prevent="deleteUser(selectedIdUser)"
                              >
                                Yakin
                              </v-btn>
                            </v-card-actions>
                          </v-card> 
                          </v-dialog>
                        </td>
                      </tr> 
                    </tbody>
                </template>
              </v-simple-table>
            </v-col>
      </v-row>
      </v-container>
    </div>
    <div class="col-md-8">
        <div class="input-group mb-3">
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
  </div>
</div>

<div v-else>
      <h4>Admin Content</h4>
</div>
</template>

<script>
import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
import authHeader from '../../../services/auth-header';
export default {
    name:"users",
    data () {
      return {
        users: [],
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
          http
          .get('http://localhost:8000/api/users')
            .then((response) =>{
              this.users = response.data;
            })
            .catch((e)=>{
              console.log(e);
            });
        },
        searchUsername() {
          http.get('http://localhost:8000/api/users/search/'+this.username)
            .then(response => {
              this.news = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteUser(id_user) {
          http.delete('http://localhost:8000/api/users/'+id_user, { headers: authHeader() })
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        selectedUser(id_user) {
          this.selectedIdUser = id_user
        },
        authenticateAdmin() {
          http.get('http://localhost:8000/api/admin/auth', { headers: authHeader() })
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