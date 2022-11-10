<template>
  <Card>
    <template #content>
      <span v-if="can('READ', 'Workflow')">Hola</span>
    </template>
    <template #footer>
      <Button
        icon="pi pi-arrow-right"
        label="Logout"
        @click="logout"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import authenticator from '../lib/auth';
import { useAbility } from '@casl/vue';

const router = useRouter();
const { can } = useAbility();

function logout() {
  authenticator.doLogout();
  router.push({ name: 'login' });
}
</script>
