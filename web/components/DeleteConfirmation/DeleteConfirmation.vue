<template>
<div class="modal-dialog modal-dialog_message-mask" @click="$close(false)">
  <div id="delete-confirmation-dialog">
     <div class="modal-dialog_content">
      <p>{{data.question}}</p>
      <p v-if="data.details">{{data.details}}</p>
      <div class="modal-dialog_buttons">
         <button class="secondary" @click="$close(false)">Avbryt</button>
         <button @click="$close(true)">Ta bort</button>
      </div>
     </div>
  </div>
</div>
</template>
