<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          Sign Up
        </div>
        <div v-if="!submitted">
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
              <button @click="saveUser" type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <div v-else>
          <h4>You submitted successfully!</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";

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

      http.post('http://localhost:8000/api/users/signup', data)
        .then(response => {
          console.log(response.data);
          console.log(data.is_admin)
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>