<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div style=margin-top:60px class="card">
        <div class="card-header">
          Sign Up
        </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" placeholder="Name.." v-model="user.username">
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" placeholder="Email.." v-model="user.email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password.." v-model="user.password">
              </div>
              <RouterLink :to="'/sign_up/'">
                  <a href="#"><button @click="saveUser" type="submit" class="btn btn-primary">Submit</button></a>
                </RouterLink>
            </form>
          </div>
          <v-alert 
              dense
              outlined
              type="error"
              :icon="false"
              v-if="isError"
              class="text-center text-subtitle-2">
              {{errorMessage}}
            </v-alert>

          <v-alert 
              dense
              outlined
              type="success"
              :icon="false"
              v-if="submitted"
              class="text-center text-subtitle-2">
              You have registered successfully!
            </v-alert>
      </div>
    </div>
  </div>
</template>

<script>

// import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
import UserDataService from "../../../services/UserDataService";
export default {
  template: '#sign-up',
  name: "sign-up",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        is_admin: false
      },
      submitted: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        is_admin: this.user.is_admin
      };

      UserDataService.signUp(data)
        .then(response => {
          if(response.data.message != "registered sucessfully") {
            this.submitted = false;
            this.isError = true;
            this.errorMessage = response.data.message;
            console.log(response.data.message);
            console.log(response.data);
            console.log(data.is_admin)
          }
          else {
            console.log(response.data);
            console.log(data.is_admin)
            this.submitted = true;
            this.isError = false;
            this.$router.push({path: '/login/'});
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    // newUser() {
    //   this.submitted = false;
    //   this.user = {};
    // }
  },
  mounted(){
    this.submitted = false;
    this.user = {};
  }
};
</script>