<template>
  <div>
    <Card>
      <template #content>
        <div class="field grid">
          <label
            for="username"
            class="col-12"
          >Username</label>
          <div class="col-12">
            <InputText
              id="username"
              v-model="loginInfo.username"
              type="text"
              class="w-full"
            />
          </div>
        </div>
        <div class="field grid">
          <label
            for="password"
            class="col-12"
          >Password</label>
          <div class="col-12">
            <Password
              v-model="loginInfo.password"
              input-id="password"
              :feedback="false"
              class="w-full"
              input-class="w-full"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <Button
          icon="pi pi-arrow-right"
          label="Login"
          @click="doLogin"
        />
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
import { reactive } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import msalInstance from '../lib/auth';
import router from '@/router';

useI18n();

const loginInfo = reactive({ username: '', password: '' });
async function doLogin(): Promise<void> {
  console.log(loginInfo);
}

const accounts = msalInstance.getAllAccounts();
console.log(accounts);
window.msal = msalInstance;

async function windowsLogin(): Promise<void> {
  await msalInstance.handleRedirectPromise();
  
  const accounts = msalInstance.getAllAccounts();
  console.log(accounts);
  
  if (accounts.length === 0) {
      // No user signed in
      msalInstance.loginRedirect({
        scopes: ['api://a3537053-d976-4278-9b48-35af70728663/Contact.View']
      });
  } else {
    router.push({ name: 'home'});
  }
}
</script>
