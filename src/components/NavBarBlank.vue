<template>
<div style="background-color:#0f0b29">

 
<b-navbar type="dark" variant="dark" toggleable="lg" style="position:absolute;left:0;width:100%;z-index:998;background-color:#0f0b29 !important">
    <b-navbar-brand href="/" style="height:75px;">
    <img :src="logo" class="bmenulogo">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

    <b-navbar-nav  class="ml-auto bmenu">
        
    </b-navbar-nav> 

    </b-collapse>
</b-navbar>



</div>
</template> 

<script>

import logo from '@/assets/images/cloudbaselogo.webp'

export default {
  name:'NavBarBlank', 
  data(){
    return{
      logo,
      page:''
    }
  },

  mounted(){
       this.page = this.$route.name
   },
      
      methods: {
      
  

    } 
}
</script>