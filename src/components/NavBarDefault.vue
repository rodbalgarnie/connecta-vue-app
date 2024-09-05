<template>
<div>

<b-navbar type="dark" variant="dark" style="position:absolute;left:0;width:100%;z-index:998">
    <b-navbar-brand href="/" style="height:75px;">
    <img :src="logo" style="height:65px;padding:5px;">  
    </b-navbar-brand>
</b-navbar>
     
</div>
</template> 

<script>


import logo from '@/assets/images/branding/cloudbaselogo.png'

export default {
  name: 'NavBarDefault', 
  data(){
    return{
      logo   
    }
  },

}
</script>  