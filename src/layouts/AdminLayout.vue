<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.js';

const route = useRoute();
const routeTitle = computed(() => route?.meta?.title);
const linkOfNewObject = computed(() => route?.meta?.linkOfNewObject);

console.log(route.meta)

const userStore = useUserStore();

const prefix = '/admin';
const options = ref([
    {
        icon: 'view-dashboard-outline',
        title: 'Dashboard',
        value: 'dashboard',
        link: prefix
    },
    {
        icon: 'account-group-outline',
        title: 'Users',
        value: 'users',
        count: 2,
        link: `${prefix}/users`
    },
    {
        icon: 'note-outline',
        title: 'Notes',
        value: 'notes',
        count: 5,
        link: `${prefix}/notes`
    },
    {
        icon: 'file-document-outline',
        title: 'Articles',
        value: 'articles',
        count: 45,
        link: `${prefix}/articles`
    },
    {
        icon: 'logout',
        title: 'Logout',
        value: 'logout',
        onClick: userStore.logout
    },
])

// toggle drawer size
const rail = ref(!!window.localStorage.rail);
const toggleRail = () => {
    rail.value = !rail.value;
    
    if(rail.value)
        window.localStorage.setItem('rail', true);
    else
        window.localStorage.removeItem('rail');
}
</script>

<template>
    <v-navigation-drawer permanent :rail="rail">
        <v-list density="compact" nav>
            <template
                v-for="(item, index) in options"
                :key="index"
            >
                <v-tooltip :text="item.title">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            :prepend-icon="`mdi-${item.icon}`"
                            :to="item.link"
                            :value="item.value"
                            :title="item.title"
                            @click="item.onClick"
                            exact
                            v-bind="{
                                ...(item.count && !rail ? {
                                    lines: 'two',
                                    subtitle: `${item.count} items`,
                                }: {}),
                                ...(rail ? props : {})
                            }"
                        />
                    </template>
                </v-tooltip>
            </template>
        </v-list>
    </v-navigation-drawer>

    <v-main>
        <div class="pa-4">
            <v-app-bar flat border>
                <v-btn icon @click="toggleRail">
                    <v-icon :icon="`mdi-chevron-${rail ? 'right' : 'left'}`"></v-icon>
                </v-btn>

                <v-app-bar-title v-show="routeTitle" class="flex-0-0">
                    {{ routeTitle }}
                </v-app-bar-title>

                <template v-if="linkOfNewObject">
                    <v-divider vertical class="mx-5 h-75 my-auto"></v-divider>

                    <v-btn
                        flat
                        variant="tonal"
                        prepend-icon="mdi-plus"
                        color="success"
                        :to="{name: linkOfNewObject}"
                    >
                        Create new
                    </v-btn>
                </template>
            </v-app-bar>

            <RouterView />
        </div>
    </v-main>
</template>