<template>
  <Card>
    <template #content>
      <span>Hola</span>
    </template>
    <template #footer>
      <Button
        icon="pi pi-arrow-right"
        label="Windows Login"
        @click="logout"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import msalInstance from '../lib/auth';
import axios from 'axios';

window.msal = msalInstance;

const account = msalInstance.getAllAccounts()[0];
const token = await msalInstance.acquireTokenSilent({ 
  account,
  scopes: ['api://a3537053-d976-4278-9b48-35af70728663/Contact.View']
});
console.log(token);

callTemplate();

function logout() {
  msalInstance.logoutRedirect({
    onRedirectNavigate: () => {
        // Return false if you would like to stop navigation after local logout
        return false;
    }
  });
}

async function callTemplate() {
  const template = await axios.get('https://localhost:7287/template', 
  {
    headers: {
      'Authorization': 'Bearer ' + token.idToken
    }
  });
  console.log(template);
  
}

</script>
