<template>
<div class="modal-dialog modal-dialog_message-mask" @click="$close(false)">
  <div id="delete-confirmation-dialog">
     <div class="modal-dialog_content">
      <p>Registreringen lyckades, fortsätt genom att logga in!</p>
      <div class="modal-dialog_buttons">
         <button @click="$close(true)">OK</button>
      </div>
     </div>
  </div>
</div>
</template>
