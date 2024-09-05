<template>
<div>
<NavBarBlank v-if="!loggedin" />
<router-view  />

</div>
</template> 

<script>
    import NavBarBlank from './NavBarBlank'
    import { mapState } from 'vuex'

	export default {
        name: 'HomeLanding',
        components:{
            NavBarBlank,
            },
    props:['pwtoken','pwemail'],
    data(){
        return {
            route:''
        };
    },       


    mounted(){
       
        if(this.pwtoken && this.pwemail){ // check for pw reset link
            this.$router.push({ name: 'reset-password-form', params: {token:this.pwtoken,email:this.pwemail} }).catch(()=>{})
         } 
         this.route = this.$route.name    
         
    },

    computed: mapState(['loggedin']),
    
               watch: {
                    loggedin: function () {
                         if(!this.loggedin){this.logout()}
                         },         
            },
    
    methods : {

        logout(){ 
                this.$store.commit('settoken','')
                this.$store.commit('setuser','')
                this.$store.commit('setcompany',{})
                this.$store.commit('setloggedin',false)
                this.$router.push({ name: 'login', params: {} }).catch(()=>{}) 
            },

    }
}
</script>