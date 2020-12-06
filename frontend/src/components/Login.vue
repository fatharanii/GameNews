<template>
  <div class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="email" class="form-control" placeholder="Email..">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" placeholder="Password..">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
    </div>
  </div>
</template>