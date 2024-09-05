<template>
  <div class="loginpage">

    <b-container>

      <b-row class="vh-100" align-v="center">

        <b-col class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4 p-3 loginbox">

          <b-row v-if="!sent">
            <b-col class="col-12 mt-3">
              <label for="email">E-mail</label>
              <input type="search" id="email" class="form-control" placeholder="user@example.com" v-model="email"
                required>
            </b-col>

            <b-col class="col-12" v-if="has_error">
              <span class="xinvalid-feedback">
                <strong>Email address not found</strong>
              </span>
            </b-col>

            <b-col class="col-12 mt-5">
              <div class="brochurebutton" @click.stop="requestResetPassword()">Send Reset Link</div>
            </b-col>

          </b-row>

          <b-row v-if="sent">
            <b-col class="col-12 mt-1">
              Your password reset email has been sent to {{ email }}
            </b-col>
          </b-row>

        </b-col>

      </b-row>


      <div class="fluid-container footer">
        <p class="text-center">CloudBase Positioning Ltd &copy; 2023</p>
      </div>

    </b-container>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ForgotPassword',
  components:{
    
  },
  data() {
    return {
      email: '',
      has_error: false,
      sent: false,
      errorresponse: {},
    }
  },
  methods: {
    requestResetPassword() {

      if (this.email == '') {
        return
      }

      this.has_error = false

      axios({
        method: 'post',
        url: '/api/portalresetpassword',
        data: { email: this.email }
      })
        .then((response) => {
          if (response.data?.code == 999) {
            this.errorresponse = response.data
            return;
          }
          if (response.data.error == false) {
            this.sent = true
          } else {
            this.has_error = true
            return
          }

        })
        .catch((err) => {
          this.errorresponse = err;
        });
    }
  }
}
</script>