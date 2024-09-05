<template>
<div>

</div>
</template>

<script>
export default {
    name: 'UserLogout',
    
mounted(){
            this.logout()
      },

  methods:{

        logout(){ 
                this.$store.commit('settoken','')
                this.$store.commit('setuser','')
                this.$store.commit('setcompany',{})
                this.$store.commit('setcompanyid',0)
                this.$store.commit('setroverid',0)
                this.$store.commit('setrover',{})
                this.$store.commit('setrovers',{})
                this.$store.commit('setroversmap',[])
                this.$store.commit('setroversession',{})
                this.$store.commit('setroversevents',[])
                this.$store.commit('setsubs',[])
                this.$store.commit('setstocksubs',{})
                this.$store.commit('setstocksims',{})
                this.$store.commit('setsims',{})
                this.$store.commit('setpayment',{})
                this.$store.commit('setpaymentcomplete',false)
                this.$store.commit('setpaymentintent','')
                this.$store.commit('setloggedin',false)
                this.$store.commit('setopenmenu',false)
                this.$router.push({ name: 'login', params: {} }).catch(()=>{}) 
            },
  }            
}
</script>