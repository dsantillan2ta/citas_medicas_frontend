<template>
    <v-app>
        <ToolBar pageTitle="Edit Profile"></ToolBar>
        <!-- <v-main> -->
            <v-container>
                <v-row>
                    <v-col cols="12" class="d-flex justify-start">
                        <h2 class="text-h4">User Information</h2>
                    </v-col>
                </v-row>
                
                <v-row>
                    <AdaptativeBreadcrumbs :routes="routes"></AdaptativeBreadcrumbs>
                    <v-col cols="12" class="d-flex flex-column">
                        <v-card class="pa-md-6 elevation-6" >
                            <UserTabs :userInfo="userInfo" @notify="triggerNotification"></UserTabs>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        <!-- </v-main> -->
        <v-slide-x-reverse-transition>
            <NotificacionAlert :info="notificationMessage" v-if="showNotification" />
        </v-slide-x-reverse-transition>
    </v-app>
</template>

<script>
    import ToolBar from '../components/ToolBar.vue';
    import AdaptativeBreadcrumbs from '../components/AdaptativeBreadcrumbs.vue';
    import UserTabs from '../components/UserTabs.vue';
    import NotificacionAlert from "../components/NotificationAlert.vue";

    export default {
        name: 'UserPage',
        components: {
            ToolBar,
            AdaptativeBreadcrumbs,
            UserTabs,
            NotificacionAlert
        },
        data: () => ({
            userInfo: null,
            routes: [
                {
                    title: 'Home',
                    disabled: false,
                    href: '/home'
                },
                {
                    title: 'User Information',
                    disabled: true,
                    href: '/user/user_information'
                }
            ],
            showNotification: false,
            notificationMessage: null
        }),
        methods: {
            triggerNotification(info) {
                this.notificationMessage = info;
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } 
        },
    }
</script>
