<template>
  <div class="loginpage">

    <b-container>

      <b-row class="vh-100" align-v="center">

        <b-col class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4 p-3 loginbox" v-if="!passwordchanged">
          <b-row class="mb-3">
            <b-col class="col-12">
              <h5>Reset Password</h5>
            </b-col>
          </b-row>

          <b-row>

            <b-col class="col-12 mt-3">
              <label>E-mail</label>
              <b-form-input type="search" placeholder="" autocomplete="off" v-model="useremail" name="useremail"
                v-validate="{ required: true }" :class="{ 'xdarkinput': true, 'is-danger': errors.has('useremail') }"
                @input="checkPW(0)" @change="validateField('useremail')" />
            </b-col>
            <b-col class="col-12 mt-3">
              <label>Password</label>
              <b-form-input type="search" placeholder="min 6 chars" autocomplete="off" v-model="password"
                name="password" v-validate="{ required: true }"
                :class="{ 'xdarkinput': true, 'is-danger': errors.has('password') }" @input="validateField('password')"
                @change="validateField('password')" />

              <span class="invalid-feedback" v-if="has_error_short">Password must be minimum 6 characters long</span>
              <span class="invalid-feedback" v-if="has_error">* Password must include uppercase, lowercase and number
                characters</span>
            </b-col>
            <b-col class="col-12 mt-3">
              <label>Confirm Password</label>
              <b-form-input type="search" placeholder="" autocomplete="off" v-model="password_confirmation"
                name="password_confirmation" v-validate="{ required: true }"
                :class="{ 'xdarkinput': true, 'is-danger': errors.has('password_confirmation') }"
                @input="validateField('password_confirmation')" @change="validateField('password_confirmation')" />

              <span class="invalid-feedback" v-if="has_error_match">Passwords do not match</span>
            </b-col>
            <b-col class="col-12 mt-5">
              <div class="brochurebutton" @click.stop="checkPW(1)">Submit</div>
            </b-col>

          </b-row>

        </b-col>


        <b-col class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4 p-3 loginbox" v-else>
          <b-row class="mb-3">
            <b-col class="col-12">
              <h5>Reset Password</h5>
            </b-col>
          </b-row>

          <b-row>

            <b-col class="col-12 mt-3">
              <h5>Your password has been updated</h5>
            </b-col>

            <b-col class="col-12 mt-5">
              <div class="brochurebutton" @click.stop="login()">Login</div>
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

<style scoped>
.invalid-feedback {
  color: white !important;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'ResetPasswordForm',
  components:{
    
  },
  data() {
    return {
      password: '',
      password_confirmation: '',
      has_error: false,
      has_error_short: false,
      has_error_match: false,
      useremail: '',
      usertoken: '',
      passwordchanged: false,
      errorresponse: {},

    }
  },

  mounted() {
    this.usertoken = this.$route.query.token
    this.useremail = this.$route.query.email
  },

  methods: {

    validateField(field) {
      this.$validator.validate(field)
    },

    checkPW(submit) {

      this.has_error_match = false

      if (this.password.length < 6) {
        this.has_error_short = true
        return
      } else {
        this.has_error_short = false

        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
        if (strongPassword.test(this.password)) {
          this.has_error = false
          if (submit == 1) { this.resetPassword() }
        }
        else {
          this.has_error = true
        }
      }
    },

    resetPassword() {

      if (this.password == '' || this.password != this.password_confirmation) {
        this.has_error_match = true
        return
      } else {


        axios({
          method: 'post',
          url: '/api/portalresetpasswordsubmit',
          data: {
            token: this.usertoken,
            email: this.useremail,
            password: this.password,
          }
        })
          .then((response) => {
            if (response.data.error) {
              this.errorresponse = response.data;
            } else {
              this.passwordchanged = true
            }

          })
          .catch( (err) => {
            this.errorresponse = err;
          });
      }

    },

    login() {
      this.$router.push({ name: 'login' }).catch(() => { })
    }


  }
}
</script>