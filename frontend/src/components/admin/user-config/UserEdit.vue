<template id="user-edit">
  <div v-if="adminAuth">
    <v-form ref="form" v-model="valid">
    <div v-if="currentUser">
     <v-container>
      <v-card
        width="800px"
        :loading="loading"
        class="mx-auto my-12"
      >
      <v-card-title width="590" style="background:#EF5350;color:white" class="white--text mt-10">UPDATE USER</v-card-title>
         <v-row  justify="center">
          <v-col cols="12" md="10">
            <div class="text-h6">Username</div>
              <v-text-field
                v-model="currentUser.username"
                placeholder="username"
                required
                name="username"
                id="username"
                readonly
            ></v-text-field>

            <div class="text-h6">Email</div>
            <v-text-field
              v-model="currentUser.email"
              label="email"
              required
              name="email"
              id="email"
              readonly
            ></v-text-field>

            <div class="text-h6">Password</div>
            <v-text-field
              v-model="currentUser.password"
              label="password"
              required
              name="password"
              id="password"
              readonly
          ></v-text-field>

          <v-checkbox
            v-model="currentUser.is_admin"
            label="Is Admin" 
          ></v-checkbox>
            <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="400"
                      :retain-focus="false"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="float-right mt-2"
                        elevation="6"
                        color="error"
                        width="140px"
                        v-bind="attrs" 
                        v-on ="on"
                        @click="updateUser"
                      >Update
                      </v-btn>
                    </template>
                    <v-card
                      width="400px">
                      <v-card-tittle class="text-h8">
                        The User Was Updated Successfully
                      </v-card-tittle>
                        <v-card-text></v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="warning"
                            dark
                            :to="'/cmsUser'"
                          >
                          Back to Dashboard
                          </v-btn>
                        </v-card-actions> 
                    </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </div>
            <div v-else>
              <br />
              <p>Please click on a User...</p>
              ID User {{ $route.params.id_user}}
            </div>
    </v-form>
  </div>

  <div v-else>
    <h4>Admin Content</h4>
  </div>
</template>

<script>

// import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
// import authHeader from '../../../services/auth-header';
import UserDataService from '../../../services/UserDataService';
// import { use } from 'vue/types/umd';
export default {
  name: "user-details",
  data() {
    return {
      message: '',
      currentUser: {
        username: "",
        email: "",
        password: "",
        is_admin: "",
      },
      adminAuth: false
    };
  },
  methods: {
    getUser() {
      UserDataService.getById(this.$route.params.id_user)
        .then(response => {
          this.currentUser.username = response.data[0].username;
          this.currentUser.email = response.data[0].email;
          this.currentUser.password = response.data[0].password;
          this.currentUser.is_admin = response.data[0].is_admin;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.$route.params.id_user, this.currentUser)
        .then(response => {
          console.log(response.data.is_admin);
          console.log(this.currentUser);
          this.message = 'The news was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
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
  mounted() {
    this.getUser();
    this.authenticateAdmin();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>