<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div v-if="!submitted">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" placeholder="Name.." v-model="user.username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password.." v-model="user.password">
              </div>
                <RouterLink :to="'/'">
                  <a href="#"><button @click="saveUser" type="submit" class="btn btn-primary">Submit</button></a>
                </RouterLink>
              <v-btn
              color="blue darken-1"
              cols="4"
              text
              >
                <RouterLink :to="'/sign_up/'">
                  <a class="nav-link" href="#">Don't Have an Account? Sign Up Here</a>
                </RouterLink>
              </v-btn>
            </form>
          </div>
        </div>

        <div v-else>
          <h4>You logged in successfully!</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";

export default {
  template: '#sign-in',
  name: "sign-in",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username,
        password: this.user.password,
      };

      http.post('http://localhost:8000/api/users/signin', data)
        .then(response => {
          console.log(response.data);
          // console.log(data.is_admin)
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(response.data));
          this.submitted = true;
          //this.$router.push('/')
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