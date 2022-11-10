<template>
  <div>
    <Card>
      <template #content />
      <template #footer>
        <Button
          icon="pi pi-arrow-right"
          label="Windows Login"
          @click="windowsLogin"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Card from 'primevue/card';
import Button from 'primevue/button';
import authenticator from '../lib/auth';
import router from '@/router';

useI18n();
async function windowsLogin(): Promise<void> {
  if (!authenticator.getActiveAccount()) {
    authenticator.doLogin();
  } else {
    router.push({ name: 'home'});
  }
}
</script>
