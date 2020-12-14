<template id="news-details">
  <div v-if="adminAuth">
    <div v-if="currentUser" class="edit-form">
      <h4>User</h4>

        <div class="form-group">
          <v-text-field
          v-model="currentUser.username"
          label="username"
          required
          name="username"
          id="username"
        ></v-text-field>
        </div>
      
        <div class="form-group">
          <v-text-field
          v-model="currentUser.email"
          label="email"
          required
          name="email"
          id="email"
        ></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field
          v-model="currentUser.password"
          label="password"
          required
          name="password"
          id="password"
        ></v-text-field>
        </div>

        <v-checkbox
          v-model="currentUser.is_admin"
          label="Is Admin" 
        ></v-checkbox>

      <button type="submit" class="badge badge-success"
        @click="updateUser"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <br />
      <p>Please click on a User...</p>
      ID User {{ $route.params.id_user}}
    </div>
  </div>

  <div v-else>
    <h4>Admin Content</h4>
  </div>
</template>

<script>

import http from "@/http";
import "bootstrap/dist/css/bootstrap.css";
import authHeader from '../services/auth-header';
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
        adminAuth: false
      },
    };
  },
  methods: {
    getUser() {
      http.get('http://localhost:8000/api/users/'+this.$route.params.id_user)
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
      http.put('http://localhost:8000/api/users/'+this.$route.params.id_user, this.currentUser, { headers: authHeader() })
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