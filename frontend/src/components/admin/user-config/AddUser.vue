<template id="add-news">
  <div v-if="adminAuth">
    <div class="submit-form">
      <h2>Add User</h2>
      <div v-if="!submitted">


        <div class="form-group">
          <v-text-field
          v-model="user.username"
          label="username"
          required
          name="username"
          id="username"
        ></v-text-field>
        </div>
      
        <div class="form-group">
          <v-text-field
          v-model="user.email"
          label="email"
          required
          name="email"
          id="kategori"
        ></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field
          v-model="user.password"
          label="password"
          required
          name="password"
          id="password"
        ></v-text-field>
        </div>
        <v-container
        class="px-0"
        fluid
        >
          <v-checkbox
            v-model="user.is_admin"
            :label="`Is Admin: ${user.is_admin.toString()}`"
          ></v-checkbox>
        </v-container>

        <button @click="saveUser" class="btn btn-success">Submit</button>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newUser">Add</button>
      </div>
    </div>
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
export default {
  template: '#add-user',
  name: "add-user",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        is_admin: false
      },
      submitted: false,
      adminAuth: false
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
      this.authenticateAdmin();
    },
};
</script>

