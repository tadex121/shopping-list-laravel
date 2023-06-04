<template>
    <form :model="model" @submit.prevent="saveList">
        <div class="list">
            <input v-model="model.text" required id="list" type="text" placeholder="dodaj na seznam">
            <button @click="saveList()" type="button" class="btn-primary">Dodaj</button>
        </div>
    </form>
</template>
  
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    
  setup() {
    const model = ref({
      text: null
    });

    const store = useStore();

    const saveList = () => {
        if (!model.value.text.trim()) {
        return; 
      }
      store.dispatch('saveList', model.value);
    };

    return {
      model,
      saveList
    };
  }
};
</script>
  
<style></style>