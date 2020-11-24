<template>
  <div class="home pa-4">
    <!-- El v-model es el que permite vincular el valor que se pone en el campo de texto con la variable del mism nombre en la seccion data() -->
    <!-- @click:append="addTask" ejecuta ese metodo. es el mas o cruz de nueva tarea -->
    <!-- @keyup.enter="addTask" hace que al presionar enter se ejecute adherir tarea -->
    <v-text-field
      v-model="newTask"
      @click:append="addTaskToDb"
      @keyup.enter="addTaskToDb"
      class="pa-2"
      outlined
      label="Nueva Tarea"
      append-icon="mdi-plus"
      hide-details=""
      clearable
    ></v-text-field>
    <v-divider></v-divider>
    <v-card max-width="475" class="mx-auto">
      <v-list subheader flat>
        <v-subheader>Listas de tareas To Do...</v-subheader>
        <v-divider></v-divider>
        <v-list-item
          v-for="tarea in tareas"
          :key="tarea.id"
          @click="doneTask(tarea.id)"
          :class="{ 'blue lighten-5': tarea.done }"
        >
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': tarea.done }"
              >
                {{ tarea.description }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <!-- Le pasamos a la propiedad  :input-value el valor "tareas.done" segun sea nuestra data en el array tareas -->
              <v-checkbox
                :input-value="tarea.done"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>
            <!-- el boton de eliminar -->
            <v-list-item-action>
              <!-- con stop detenemos que tome como que se hizo click en todo el componente padre o elemento padre -->
              <v-btn @click.stop="deleteTask(tarea.id)" icon>
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
//hacemos un import de la constante db para manejar firebase:
import { db } from "../firebase/db";

export default {
  name: "Home",
  data() {
    return {
      //la data del campo de texto que agrega tareas
      newTask: "",
      // pongo un array de tareas
      tareas: [
        //esto es la forma estatica de probar datos en el array
        /*  {
          id: 1,
          description: "Deployando en GitHub Pages",
          done: false,
        }, */
      ],
    };
  },
  methods: {
    /**
     * addTAsk agrega una nueva tarea
     */
    addTask() {
      let nuevaTarea = {
        id: Date.now(),
        description: this.newTask,
        done: false,
      };
      // cargamos el objeto al array tareas que esta en data()
      this.tareas.push(nuevaTarea);
      this.newTask = "";
    },
    /**
     * metodo que cambia el check de la tarea
     */
    doneTask(id) {
      let tarea = this.tareas.filter((tarea) => tarea.id === id)[0];
      tarea.done = !tarea.done;
      // console.log(tarea.done);
    },
    /**
     * metodo que filtra la data para que se quite la tarea que se quiere eliminar
     */
    deleteTask(id) {
      this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    },
    /**
     * para subir a la db de firebase
     */
    // se le debe porne la propiedad async
    async addTaskToDb() {
      if (this.newTask) {
        //lo que va entre aprentesis es el nombre de la coleccion
        await db
          .collection("ToDos")
          .add({ description: this.newTask, done: false });
        this.newTask = "";
      }
    },
  },
  // Se pone una referencia a la db como propiedad de export default, para vincular el array de tareas con la DB y que sea dinamico:

  firestore: {
    tareas: db.collection("ToDos"),
  },
};
</script>
