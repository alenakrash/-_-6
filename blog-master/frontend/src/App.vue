<template>
  <div id="app" class="container">
    <br>
    <b-nav tabs align="center">
      <b-nav-item @click="contact = null; searchMode=false">Все контакты</b-nav-item>
      <b-nav-item @click="addContact">Найти контакт</b-nav-item>
    </b-nav>

    <div v-if="!searchMode">
    <h3 v-if="contacts.length > 0" align="center">Все контакты</h3>
    <b-table striped hover :items="contacts" @row-clicked="contactClick"></b-table>
  </div>

  <b-form @submit.prevent="postContact" v-if="contact && searchMode">
    <h3 align="center">Поиск контактов</h3>
      <b-form-input type="text" v-model="search" placeholder="Поиск"></b-form-input>
      <b-list-group v-if="search.length > 0">
      <b-list-group-item v-for="contact in filteredContacts" :key = "contact.id">{{ contact.name }} - {{ contact.number }}</b-list-group-item>
    </b-list-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchMode: false, 
      contacts: [],
      contact: null, 
      search: '',
      show: false
    }
  },
  computed: {
    filteredContacts: function() {
      var self = this;
      return this.contacts.filter(function(contact) {
        return contact.name.toLowerCase().indexOf(self.search.toLowerCase()) !== -1 || contact.number.toLowerCase().indexOf(self.search.toLowerCase()) !== -1;
      });
    }
  },

  methods: {
    getContacts() {
      this.axios.get("api/contacts").then((response) => {
          this.contacts = response.data
      })
    },
    postContact() {
      if(this.contact.id > 0)
        this.axios.post("api/contact", this.contact).then(() => {
            this.searchMode = false
        }) 
      else 
        this.axios.put("api/contacts", this.contact).then((response) => {
              this.searchMode = false
              this.сontact.id = response.data.insertId
              this.contacts.push(this.contact)
          })    
    },
    contactClick(contact) {
      this.contact = contact
      this.searchMode = false
    },
    addContact() {
      this.contact = {
        id: 0,
        name: '',
        number: ''
      }
      this.searchMode = true
    }
  },
  created() {
    this.getContacts()
  }
}
</script>