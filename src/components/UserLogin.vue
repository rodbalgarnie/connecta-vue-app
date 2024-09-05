<template>
<div class="xloginpage">
<NavBarBlank  />
<b-container>
    <b-row class="vh-100" align-v="center">
      <b-col class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-4 p-3 loginbox">
        <PortalLogin v-on:loggedin="loginOk"/>
      </b-col>
   </b-row> 

<div class="fluid-container footer">
    <p class="text-center">Cloudbase Positioning Ltd &;copy 2024</p>
</div>


</b-container>

</div>
</template>

<script>
import NavBarBlank from './NavBarBlank'
import PortalLogin from './PortalLogin'

export default {
  name: 'UserLogin',
  components:{
    NavBarBlank,
    PortalLogin
  },
 
  methods:{

    loginOk(){
       
          this.$router.push({ name: 'homepage', params: {} }).catch(()=>{})
          
    },
 
  }            
}
</script>