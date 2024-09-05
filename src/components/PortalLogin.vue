<template>
<div>    

    <b-row>
        <b-col class="col-12">
            <h5>USER LOGIN</h5>
        </b-col>

        <b-col class="col-12 mt-3">
            
                    
                        <label>E-Mail Address</label>
                            <b-form-input 
                                type="search"
                                placeholder=""
                                autocomplete="off" 
                                v-model="username" 
                                name="username"
                                v-validate="{required:true}"
                                :class="{'darkinput': true, 'is-danger': errors.has('username') }"
                                @change = "validateField('username')" 
                                @input = "validateField('username')"  
                                />

                                <span class="invalid-feedback" role="alert" v-if="loginerror">
                                    <strong>Login error</strong>
                                </span>
        </b-col>
        <b-col class="col-12 mt-3">

                            <label for="password">Password</label>

                            <b-form-input 
                                type="password"
                                placeholder=""
                                autocomplete="off" 
                                v-model="password" 
                                name="password"
                                v-validate="{required:true}"
                                :class="{'darkinput': true, 'is-danger': errors.has('password') }"
                                @change = "validateField('password')" 
                                @input = "validateField('password')"  
                                />

                                <span class="invalid-feedback" role="alert" v-if="loginerror==true">
                                    <strong>Login error</strong>
                                </span>
        </b-col>

        <b-col class="col-12 mt-5">
                <b-button variant="success" @click="login()">Login</b-button>
                <b-button variant="outline" style="color:white" @click="forgotPassword()">Forgot your password?</b-button>
        </b-col>
        
    </b-row>  

</div>
</template> 

<script>
    import axios from 'axios'
    export default {
        name: 'PortalLogin',
        data(){
            return {
                    token:'',
                    username:'',
                    password:'',
                    loginerror:false
                };
                
                },

		mounted(){
                this.token = '12345ABCDE'
             },

          
        methods: {
        
         login(){

          this.$validator.validateAll().then(result => { 
                if (result){
                    axios({
                    method: 'post',
                    url: '/api/auth/vuelogin',
                    data:{
                        email: this.username,
                        password: this.password
                    }
                    })
                    .then((response) => {

                        if(response.data.status =='ok'){
                            this.$store.commit('settoken',response.data.token)
                            this.$store.commit('setloggedin',true)
                            this.$store.commit('setuser',response.data.user)
                            this.$store.commit('setbasket',[])
                            this.$store.commit('setcoupon','')
                            this.$store.commit('setbaskettotal',0)
                            this.$emit('loggedin')
                        } else this.loginerror = true
                    })
                }
          })
        },

        forgotPassword(){
          this.$router.push({ name: 'reset-password', params: {} }).catch(()=>{})
      },

        validateField(field){
               this.$validator.validate(field)
        },
           
    },
};
</script>