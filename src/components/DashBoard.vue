<template>
<div class="mainpage">    
<NavbarDashBoard />

<div class="overlay"></div>

<SideMenu v-on:linkname="menuLink" />

 <b-container :style="{ marginTop: '100px' }">
          <router-view  />
 </b-container>

</div>
</template> 

<script>
    import NavbarDashBoard from './NavBarDashboard'
    import SideMenu from './SideMenu'
    export default {
        name: 'DashBoard',
            components:{
            NavbarDashBoard,
            SideMenu
            },
        data(){
            return {
                    pagewidth:0,
                    margin:0,
                    orient:false,
                    phone:false
                };
                
                },

		created(){
                window.addEventListener("orientationchange", this.orientChange)
                //window.addEventListener("resize", this.setWidth)
                if(window.innerWidth < 800){this.phone = true} else this.phone = false
                
                this.$store.commit('setmobile',this.phone)
                this.setWidth()
          },

        destroyed() {
               //window.removeEventListener("resize",this.setWidth)
               window.removeEventListener("orientationchange",this.orientChange) 
            },
          
        
          methods: {

            orientChange(){
               this.orient = true 
               this.reSize()
            },        

            setWidth(){
               if(this.orient == false){this.reSize()}     
            },

            reSize(){
                if(window.innerWidth < 1000 || window.innerHeight > window.innerWidth){this.mobile = true} else this.mobile = false
                this.$store.commit('setmobile',this.phone)
                this.orient = false
            },
        
            menuLink(name){
                if(this.phone == true){this.$store.commit('setopenmenu',false)}
                this.$router.push({ name: name, params: {} }).catch(()=>{})
            },

            logout(){ 
                this.$store.commit('settoken','')
                this.$store.commit('setuser','')
                this.$store.commit('setcompany',{})
                this.$store.commit('setloggedin',false)
                this.$router.push({ name: 'login', params: {} }).catch(()=>{}) 
            },

          }     
	};
</script>