<template>
<div>

<b-container class="header" :style="{top: headerOffset}"> 

<b-row align-h="between" align-v="center">
  
  <b-col class="col-2 col-sm-2 text-left navicons">
         <b-icon-list @click.stop="toggle"  style="margin-left:5px;" />
  </b-col>

  <b-col class="col-8 col-sm-8 text-center" @click.stop="menuLink('homepage')">
      <img :src="logo" style="width:100%;max-width:320px">  
  </b-col>  

  <b-col class="col-2 col-sm-2 text-center pl-0 pr-1" style="font-size:0.8em">

        <b-icon-person-circle class="navicons" @click.stop="showUserProfile()" />
        <b-icon-basket2-fill class="navicons" style="margin-left:10px" @click.stop="gotoCheckout()" v-if="btotal != 0" /> 

  </b-col>
 

</b-row>

<b-modal ref="user-profile" size="md" hide-footer  centered content-class="darkmodal" @hide="closeModal()">
    <template #modal-title>
        <b-icon-person class="b-icon mr-2" />
        {{  modaltitle }}
    </template>
    
 </b-modal>

</b-container> 

</div>
</template>

<script>
import { mapState } from 'vuex'
import logo from '@/assets/images/cloudbaselogo.png'
export default {
    name: 'NavBarDashboard',
    components:{
        
    },
    data(){
		return {
              openmenu:false,
              logo,
              btotal:0,
              modaltitle:'',    
              headerOffset:'0px',      
              scrollPositionLast:0,   
              scrollDebounce:0,
              user:{},
        }
    },

   mounted(){
         this.btotal = this.$store.getters.baskettotal   
         this.user = this.$store.getters.user;
         this.addScrollListener();
   },
   beforeDestroy(){
    this.removeScrollListener();
   },

   computed: mapState(['baskettotal']),            


    watch: {
             
			baskettotal() {
              this.btotal = this.$store.getters.baskettotal 
              }
        },    

    methods:{

        toggle(){
                this.openmenu = !this.$store.getters.openmenu
                this.$store.commit('setopenmenu',this.openmenu)
            },

        userprofile(){
                this.modaltitle = 'User Profile'
                this.$refs['user-profile'].show()
            },
            
        gotoCheckout(){
                 this.$router.push({ name: 'subscriptionadd', params: {stage:2} }).catch(()=>{})
        },
        
        closeModal(){
            this.$refs['user-profile'].hide()
        },

        menuLink(name, params={}){
            this.$store.commit('setopenmenu',false)
            this.$router.push({ name: name, params: params }).catch(()=>{})
        },

        showUserProfile(){
            this.menuLink( 'useredit', {id:this.user.id} );
        },

        addScrollListener(){
          window.addEventListener('scroll', this.checkHeaderVisibility);
        },

        removeScrollListener(){
          window.removeEventListener('scroll', this.checkHeaderVisibility);
        },
        checkHeaderVisibility(){
          //dont hide if menu is open
          if (this.openmenu) return;

          let scrollTopDist = document.documentElement.scrollTop || window.pageYOffset;
          if ( scrollTopDist > this.scrollPositionLast && window.innerHeight <= 400){
            //were scrolling down so move header out of site on small screen heights
            this.headerOffset = '-100px';
          } else {
            //were scrolling so dont hide menu or its larger enought screen, no need to hide.
            this.headerOffset = '0px';
          }
          this.scrollPositionLast = scrollTopDist;
        }
     
    },


}
</script> 


