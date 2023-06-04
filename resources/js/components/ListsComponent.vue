<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div id="clipboard-wrapper">
                    <section id="clipboard">
                        <div id="clipboard-grip"></div>
                        <div id="clipboard-lever"></div>
                        <lists-form-component></lists-form-component>
                        <ul class="list">
                            <li v-for="list in lists" :key="list.id"
                                :class="{ 'listitem': true, 'completed': list.completed }">
                                <input class="checkbox-input" type="checkbox" :checked="list.completed"
                                    @change="toggleCompleted(list.id)">
                                <input v-model="list.text" type="text" placeholder="dodaj na seznam"
                                    @blur="handleInputChange(list)">
                                <button @click="deleteList(list.id)" class="btn-secondary" type="button">Izbriši</button>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script>
import { ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    setup() {
        const store = useStore();
        const lists = ref([]);
        const updatedItem = reactive({
            id: null,
            text: '',
        });

        const fetchLists = async () => {
            try {
                const response = await axios.get('/lists');
                lists.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        const deleteList = async (id) => {
            try {
                await axios.delete(`/lists/${id}`);
                store.commit('deleteList', id);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        };

        const getCompletedStatus = (id) => {
            return store.getters.getCompletedStatus(id);
        };

        const updateItem = (item) => {
            updatedItem.id = item.id;
            updatedItem.text = item.text;
        };

        const handleInputChange = async (item) => {
            try {
                await axios.put(`/lists/${item.id}`, { text: item.text });
                store.dispatch('updateList', item);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        };

        const toggleCompleted = async (id) => {
            try {
                const list = lists.value.find((item) => item.id === id);
                const completed = list.completed ? 0 : 1; // Toggle the completed status

                // Send the update to the server
                await axios.put(`/lists/${id}`, { completed });

                // Update the completed status locally
                list.completed = completed;

                console.log('Toggle completed:', list.completed);
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchLists();
        });

        return {
            lists,
            deleteList,
            updateItem,
            handleInputChange,
            toggleCompleted,
            getCompletedStatus
        };
    },
};
</script>
<style>
#clipboard-wrapper {
    width: 100%;
    padding: 5rem;
}

#clipboard {
    margin: 0 auto;
    width: 30rem;
    border: 8px solid #5A707B;
    border-radius: 8% / 6%;
}

#clipboard-grip {
    position: relative;
    top: -1rem;
    margin: 0 auto;
    width: 12rem;
    height: 4rem;
    border: 8px solid #5A707B;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;
    border-bottom-left-radius: 10% 25%;
    border-bottom-right-radius: 10% 25%;

    background-color: #fff;
}

#clipboard-lever {
    position: relative;
    top: -6rem;
    margin: 0 auto;
    width: 6rem;
    height: 1.5em;
    border: 8px solid #5A707B;
    border-top-left-radius: 10% 25%;
    border-top-right-radius: 10% 25%;
    background-color: #fff;
}

.list {
    list-style: none;
    position: relative;
    width: 28rem;
    padding: 0;
    text-align: center;
}

.listitem {
    padding: 3px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 20px;
}

.listitem_box {
    display: inline-block;
    line-height: 1.5rem;
    width: 20rem;
    border: 4px solid #5A707B;
    border-radius: 2% / 25%;
    padding-left: 1rem;
}

.listitem_check {
    line-height: 1.5rem;
    width: 1.5rem;
    border: 4px solid #5A707B;
    border-radius: 25% / 25%;
    text-align: center;
    margin-right: 1rem;
}

.list .btn-primary {
    height: 30px;
    line-height: 30px;
}

.checkbox-input {
    height: 25px;
    width: 25px;
}

.completed input {
    text-decoration: line-through;
}

.completed input[type="text"] {
    pointer-events: none;
}

.completed .btn-secondary {
    pointer-events: none;
}


.btn-primary {
    cursor: pointer;
    border: none;
    background-color: #000;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    transition: .3s all;
}

.btn-primary:hover {
    color: #fff;
    background-color: #000;
    opacity: 0.7;
}

.btn-secondary {
    cursor: pointer;
    border: none;
    background-color: red;
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    transition: .3s all;
    border: 1px solid #000;
}

.btn-secondary:hover {
    opacity: 0.7;
    background-color: red;
}
</style>