<template>
<div>
<b-container>

<transition name="slide"> 

   <div v-show="menuopen" class="sidebar-panel" @mouseleave="closeMenu()">

    <b-row class="mt-2">

        <b-col class="col-12">
            <h5>{{ companytitle }}</h5>   
        </b-col>
    
        <b-col class="col-12 mt-3">  
   
        <ul class='nav'>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.selectCompany.includes(route)},'dropdown_item-1']" @click.stop="menuLink('adminselectcompany')" v-if="role == 1">
                <b-icon-person-circle  v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.selectCompany.includes(route)},'sidemenuicon']"  /> Select Company
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.homepage.includes(route)},'dropdown_item-1']" @click.stop="menuLink('homepage')">
                <b-icon-house v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.homepage.includes(route)},'sidemenuicon']" /> Home
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.rovers.includes(route)},'dropdown_item-1']"  @click.stop="menuLink('roverslist')">
                <b-icon-geo  v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.rovers.includes(route)},'sidemenuicon']" /> Rovers
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.subscriptions.includes(route)},'dropdown_item-1']"  @click.stop="menuLink('subscriptions')">
                <b-icon-collection-play  v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.subscriptions.includes(route)},'sidemenuicon']" /> Subscriptions
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.loggedRovers.includes(route)},'dropdown_item-1']" @click.stop="menuLink('roversdisplay')">
                <b-icon-map v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.loggedRovers.includes(route)},'sidemenuicon']" /> Map
            </li>

             <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.network.includes(route)},'dropdown_item-1']" @click.stop="menuLink('networkdisplay')">
                <b-icon-broadcast-pin v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.network.includes(route)},'sidemenuicon']" /> Network
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.company.includes(route)},'dropdown_item-1']"  @click.stop="menuLink('companydetails')">
                <b-icon-building v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.company.includes(route)},'sidemenuicon']" /> Company
            </li>

            <li v-bind:class="[{ selectedmenuitem: menuHighlightingRoutes.logout.includes(route)},'dropdown_item-1']"  @click.stop="menuLink('logout')">
                <b-icon-box-arrow-right  v-bind:class="[{ selectedmenuicon: menuHighlightingRoutes.logout.includes(route)},'sidemenuicon']" /> Logout
            </li>
           
          </ul>

        </b-col>
        </b-row> 

        <b-row>
             <b-col class="col-12 mt-3"><h6>QUICK LINKS</h6></b-col>
            
             <b-col class="col-12 mt-3">
                <b-button size="md" variant="outline-success" block @click.stop="menuLink('subscriptionadd')" class="quicklinkbutton">
                    <b-icon-plus-circle style="margin-right:10px" />  Buy subscriptions
                </b-button>
            </b-col>

            <b-col class="col-12 mt-3">
                  <b-button size="md" variant="outline-success" block  @click.stop="addRover()" class="quicklinkbutton">
                      <b-icon-plus-circle style="margin-right:10px" /> Add  new rover
                  </b-button>
            </b-col>

        </b-row> 

        <b-row class="mt-3">
            <b-col>
                <h6>V5.13 18/7/24</h6>
            </b-col>
        </b-row>
     
   </div>

</transition>


</b-container>

</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name:'SideMenu',
        data() {
            return {
                menuopen: false,
                route:'home',
                phone:false,
                companytitle:'SYSADMIN',
                menuHighlightingRoutes:{
                  //if $route.name matches the string for a menu item it will highlight
                  selectCompany:['adminselect'],
                  loggedRovers:['roversdisplay'],
                  network:['networkdisplay'],
                  subscriptions:['subscriptions','subscriptionadd'],
                  homepage:['homepage'],
                  rovers:['roverslist','roverlist','rovermanage','casterroverhistory'],
                  company:['companydetails'],
                  users:['users'],
                  logout:['logout']
                }
            }
        },     
        created(){
            this.role = this.$store.getters.user.role
            this.route = this.$route.name
            this.phone = this.$store.getters.mobile
            if(this.$store.getters.company.id !== 0){this.companytitle = this.$store.getters.company.title}
            this.menuopen = this.$store.getters.openmenu
         },

        computed: {
          ...mapState(['openmenu','company','mobile']),
        },

        beforeDestroy(){
          this.$store.commit('setopenmenu',false);
          document.body.style.overflowY = 'scroll';
        },

        watch: {
            openmenu: function () {
               this.menuopen = this.openmenu
               this.toggleMainPageScrolling();
            },

            company: function(){
                this.companytitle = this.company.title
            },

            mobile: function(){
              this.phone = this.mobile
            },

            '$route.name'(newRoute) {
              this.route = newRoute
            }
          }, 
        
        methods: {

            menuLink(name){
                this.closeMenu()
                this.$emit('linkname',name);
            },

            addRover(){
                this.$router.push({ name: 'machineedit', params: {id:0} }).catch(()=>{})
            },

            closeMenu(){
                this.$store.commit('setopenmenu',false)  
            },

            toggleMainPageScrolling(){
              if(window.innerWidth <= 800 && this.menuopen === true ){
                //disable main page scrolling
                document.body.style.overflowY = 'hidden';
              }else{
                //enable main page scrolling
                document.body.style.overflowY = 'scroll';
              }
            },

		}	   
	
	};
</script> 